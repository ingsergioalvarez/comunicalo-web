<?php
// Recibe los formularios del sitio: guarda el lead en MySQL y avisa por correo.
// Las credenciales viven en comunicalo-config.php, FUERA de public_html (ver deploy/LEADS.md).
//
// Los formularios por pasos mandan un folio y una etapa:
//   etapa "parcial"  → el cliente pasó un paso: se guarda/actualiza como incompleto, sin correo
//   etapa "abandono" → salió sin terminar: se actualiza y se avisa a ventas (una sola vez)
//   sin etapa        → envío final: se marca completo y se avisa a ventas
// Los incompletos sin aviso de más de 30 minutos (p. ej. en celular, donde no siempre llega
// el abandono) se avisan en la siguiente petición que reciba este archivo.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header_remove('X-Powered-By'); // no anunciar la versión de PHP

function responder($codigo, $datos) {
  http_response_code($codigo);
  echo json_encode($datos, JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder(405, ['ok' => false, 'error' => 'Método no permitido']);

// Busca la configuración primero fuera de la carpeta pública
$config = null;
foreach ([__DIR__ . '/../../comunicalo-config.php', __DIR__ . '/../comunicalo-config.php'] as $ruta) {
  if (is_file($ruta)) { $config = require $ruta; break; }
}
if (!$config) responder(500, ['ok' => false, 'error' => 'Configuración no encontrada']);

$entrada = json_decode(file_get_contents('php://input'), true);
if (!is_array($entrada)) responder(400, ['ok' => false, 'error' => 'Datos inválidos']);

// Campo trampa: los humanos no lo ven, los bots lo llenan. Se responde "ok" para no darles pistas.
if (!empty($entrada['sitio_web'])) responder(200, ['ok' => true]);

function campo($entrada, $clave, $max = 200) {
  $valor = isset($entrada[$clave]) && is_scalar($entrada[$clave]) ? trim((string) $entrada[$clave]) : '';
  return mb_substr($valor, 0, $max);
}

$etapa = campo($entrada, 'etapa', 12);
if (!in_array($etapa, ['parcial', 'abandono'], true)) $etapa = '';

// Atributos: detalle del formulario como { "Etiqueta": "valor" }
$atributos = [];
if (isset($entrada['atributos']) && is_array($entrada['atributos'])) {
  foreach (array_slice($entrada['atributos'], 0, 30, true) as $clave => $valor) {
    if (!is_scalar($valor)) continue;
    $clave = mb_substr(trim((string) $clave), 0, 60);
    $valor = mb_substr(trim((string) $valor), 0, 600);
    if ($clave !== '' && $valor !== '') $atributos[$clave] = $valor;
  }
}

$lead = [
  'origen'    => campo($entrada, 'origen', 30) ?: 'cotizacion',
  'area'      => campo($entrada, 'area', 30),
  'folio'     => preg_replace('/[^A-Za-z0-9\-]/', '', campo($entrada, 'folio', 40)),
  'estado'    => $etapa === '' ? 'completo' : 'incompleto',
  'interes'   => campo($entrada, 'interes', 120),
  'nombre'    => campo($entrada, 'nombre', 150),
  'empresa'   => campo($entrada, 'empresa', 150),
  'telefono'  => campo($entrada, 'telefono', 40),
  'correo'    => campo($entrada, 'correo', 150),
  'zona'      => campo($entrada, 'zona', 200),
  'mensaje'   => campo($entrada, 'mensaje', 5000),
  'atributos' => $atributos ? json_encode($atributos, JSON_UNESCAPED_UNICODE) : '',
  'pagina'    => campo($entrada, 'pagina', 200),
  'ip'        => mb_substr($_SERVER['REMOTE_ADDR'] ?? '', 0, 45),
  'agente'    => mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255),
];

if ($lead['nombre'] === '' || !preg_match('/^[0-9 +()\-]{8,}$/', $lead['telefono'])) {
  responder(422, ['ok' => false, 'error' => 'Nombre y teléfono son obligatorios']);
}
if ($lead['correo'] !== '' && !filter_var($lead['correo'], FILTER_VALIDATE_EMAIL)) $lead['correo'] = '';

// Arma y envía el aviso por correo al área del lead ($lead es una fila de la tabla o el lead recibido)
function avisar($config, $lead, $titulo, $nota = '') {
  $etiquetas = [
    'origen' => 'Formulario', 'interes' => 'Interés', 'nombre' => 'Nombre', 'empresa' => 'Empresa',
    'telefono' => 'Teléfono', 'correo' => 'Correo', 'zona' => 'Zona', 'pagina' => 'Página',
  ];
  $cuerpo = "$titulo desde comunicalo.mx\n";
  if ($nota !== '') $cuerpo .= "\n$nota\n";
  $cuerpo .= "\n";
  foreach ($etiquetas as $clave => $etiqueta) {
    if (($lead[$clave] ?? '') !== '') $cuerpo .= "$etiqueta: {$lead[$clave]}\n";
  }
  $atributos = json_decode($lead['atributos'] ?? '', true);
  if (is_array($atributos) && $atributos) {
    $cuerpo .= "\nDetalle:\n";
    foreach ($atributos as $clave => $valor) $cuerpo .= "• $clave: $valor\n";
  }
  // El mensaje completo solo cuando terminó: en incompletos repetiría campos vacíos
  if (($lead['estado'] ?? 'completo') === 'completo' && ($lead['mensaje'] ?? '') !== '') $cuerpo .= "\nMensaje:\n{$lead['mensaje']}\n";
  if (($lead['folio'] ?? '') !== '') $cuerpo .= "\nFolio: {$lead['folio']}";
  $cuerpo .= "\nFecha: " . date('d/m/Y H:i') . "\nIP: {$lead['ip']}\n";

  $asunto = "$titulo: " . ($lead['interes'] ?: $lead['origen']) . ' — ' . $lead['nombre'];
  $cabeceras = [
    'From: ' . $config['correo_remitente'],
    'Content-Type: text/plain; charset=UTF-8',
  ];
  if (($lead['correo'] ?? '') !== '') $cabeceras[] = 'Reply-To: ' . $lead['correo'];

  // Se quitan saltos de línea del asunto para evitar inyección de cabeceras
  $asunto = '=?UTF-8?B?' . base64_encode(str_replace(["\r", "\n"], ' ', $asunto)) . '?=';
  // Cada área recibe sus leads; si el área no viene o no está configurada, va a correo_destino
  $destino = $config['correo_por_area'][$lead['area'] ?? ''] ?? $config['correo_destino'];
  $enviado = mail(implode(',', (array) $destino), $asunto, $cuerpo, implode("\r\n", $cabeceras));
  if (!$enviado) error_log('[lead.php] No se pudo enviar el correo del lead');
  return $enviado;
}

const NOTA_INCOMPLETO = 'Dejó el formulario sin terminar. Llámale para completar la información.';

// 1) Guardar en la base de datos (si trae folio y ya existe, se actualiza la misma fila)
$db = null;
$guardado = false;
$id = null;
$notificado = 0;
try {
  $db = new PDO(
    "mysql:host={$config['db_host']};dbname={$config['db_nombre']};charset=utf8mb4",
    $config['db_usuario'],
    $config['db_clave'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );

  $previo = null;
  if ($lead['folio'] !== '') {
    $q = $db->prepare('SELECT id, estado, notificado FROM leads WHERE folio = ? LIMIT 1');
    $q->execute([$lead['folio']]);
    $previo = $q->fetch(PDO::FETCH_ASSOC) ?: null;
  }
  // Si ya terminó, un aviso tardío de parcial/abandono no lo regresa a incompleto
  if ($previo && $previo['estado'] === 'completo' && $etapa !== '') responder(200, ['ok' => true]);

  if ($previo) {
    $id = (int) $previo['id'];
    $notificado = (int) $previo['notificado'];
    $columnas = array_keys($lead);
    $sql = 'UPDATE leads SET ' . implode(',', array_map(function ($c) { return "$c = :$c"; }, $columnas)) . ', actualizado = NOW() WHERE id = :id';
    $db->prepare($sql)->execute($lead + ['id' => $id]);
  } else {
    // Límite simple contra abuso: máximo 5 prospectos nuevos por IP cada 10 minutos
    $q = $db->prepare('SELECT COUNT(*) FROM leads WHERE ip = ? AND creado > (NOW() - INTERVAL 10 MINUTE)');
    $q->execute([$lead['ip']]);
    if ($q->fetchColumn() >= 5) responder(429, ['ok' => false, 'error' => 'Demasiados envíos, intenta más tarde']);

    $columnas = array_keys($lead);
    $sql = 'INSERT INTO leads (' . implode(',', $columnas) . ', actualizado) VALUES (:' . implode(',:', $columnas) . ', NOW())';
    $db->prepare($sql)->execute($lead);
    $id = (int) $db->lastInsertId();
  }
  $guardado = true;
} catch (Throwable $e) {
  error_log('[lead.php] Error de base de datos: ' . $e->getMessage());
}

// 2) Avisar por correo
$enviado = false;
if ($etapa === '') {
  $enviado = avisar($config, $lead, $notificado ? 'Lead completado' : 'Nuevo lead',
    $notificado ? 'Ya se había avisado como incompleto; ahora terminó el formulario.' : '');
} elseif (($etapa === 'abandono' && !$notificado) || !$guardado) {
  // Sin base de datos también se avisa el parcial, para no perder el prospecto
  $enviado = avisar($config, $lead, 'Prospecto incompleto', NOTA_INCOMPLETO);
}
if (!$guardado && $enviado) error_log('[lead.php] Lead avisado por correo pero no guardado en la base de datos');

if ($db) {
  try {
    if ($enviado && $id) $db->prepare('UPDATE leads SET notificado = 1 WHERE id = ?')->execute([$id]);

    // Incompletos que nadie avisó: sin movimiento en 30 minutos
    $pendientes = $db->query("SELECT * FROM leads WHERE estado = 'incompleto' AND notificado = 0 AND actualizado < (NOW() - INTERVAL 30 MINUTE) LIMIT 5");
    foreach ($pendientes->fetchAll(PDO::FETCH_ASSOC) as $fila) {
      if (avisar($config, $fila, 'Prospecto incompleto', NOTA_INCOMPLETO)) {
        $db->prepare('UPDATE leads SET notificado = 1 WHERE id = ?')->execute([$fila['id']]);
      }
    }
  } catch (Throwable $e) {
    error_log('[lead.php] Error al marcar avisos: ' . $e->getMessage());
  }
}

responder($guardado || $enviado ? 200 : 500, ['ok' => $guardado || $enviado]);
