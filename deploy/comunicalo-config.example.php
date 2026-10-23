<?php
// Copia este archivo como comunicalo-config.php UN NIVEL ARRIBA de public_html
// (ej. /home/tuusuario/comunicalo-config.php) y llena tus datos. No lo subas a git.
return [
  // Datos del panel "bases de datos". Se usa el usuario propio de la base (no el maestro comu12)
  'db_host'    => 'sql.comunicalo.mx',
  'db_nombre'  => 'comu12_paginaweb',
  'db_usuario' => 'comu12_paginaweb',
  'db_clave'   => 'CLAVE_DE_LA_BASE',

  // Remitente: debe ser una cuenta de tu mismo dominio para que no caiga en spam
  'correo_remitente' => 'Sitio Comunícalo <web@comunicalo.mx>',
  // Quién recibe los avisos cuando el formulario no indica área (puede ser una lista)
  'correo_destino'   => ['comercialempresarial@comunicalo.mx'],
  // Destino por área (mismas claves que AREAS en src/data/site.js)
  'correo_por_area'  => [
    'ventasEmpresas' => ['comercialempresarial@comunicalo.mx'],
    // Hogar y MAXVISION contratan por WhatsApp; sus leads se guardan y se avisan a comercial
    'ventasHogar'     => ['comercialempresarial@comunicalo.mx'],
    'ventasMaxvision' => ['comercialempresarial@comunicalo.mx'],
  ],
];
