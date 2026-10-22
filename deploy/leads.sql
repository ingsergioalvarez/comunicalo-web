-- Tabla de prospectos que llegan desde los formularios del sitio.
-- Ejecútala una vez en phpMyAdmin (pestaña SQL) sobre tu base de datos.
CREATE TABLE IF NOT EXISTS leads (
  id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  creado    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMP: el servidor es MariaDB 5.5
  actualizado DATETIME NULL,                -- último paso guardado (DATETIME: MariaDB 5.5 solo admite un TIMESTAMP automático)
  origen    VARCHAR(30)  NOT NULL,          -- empresa | hogar | evento | cotizacion (contacto general)
  area      VARCHAR(30)  NOT NULL DEFAULT '', -- ventasEmpresas | ventasHogar (clave de AREAS en site.js)
  folio     VARCHAR(40)  NOT NULL DEFAULT '', -- identifica los pasos de un mismo formulario
  estado    VARCHAR(12)  NOT NULL DEFAULT 'completo', -- incompleto | completo
  interes   VARCHAR(120) NOT NULL DEFAULT '',
  nombre    VARCHAR(150) NOT NULL,
  empresa   VARCHAR(150) NOT NULL DEFAULT '',
  telefono  VARCHAR(40)  NOT NULL,
  correo    VARCHAR(150) NOT NULL DEFAULT '',
  zona      VARCHAR(200) NOT NULL DEFAULT '',
  mensaje   TEXT,
  atributos TEXT,                           -- detalle del formulario en JSON { "Etiqueta": "valor" }
  pagina    VARCHAR(200) NOT NULL DEFAULT '',
  ip        VARCHAR(45)  NOT NULL DEFAULT '',
  agente    VARCHAR(255) NOT NULL DEFAULT '',
  atendido  TINYINT(1)   NOT NULL DEFAULT 0, -- márcalo en 1 cuando ventas le dé seguimiento
  notificado TINYINT(1)  NOT NULL DEFAULT 0, -- ya se envió el aviso por correo
  INDEX idx_creado (creado),
  INDEX idx_folio (folio),
  INDEX idx_pendientes (estado, notificado),
  INDEX idx_ip_creado (ip, creado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
