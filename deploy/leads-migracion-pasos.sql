-- Migración para los formularios por pasos (prospectos incompletos y atributos).
-- Ejecútala UNA vez en phpMyAdmin (pestaña SQL) sobre la tabla leads que ya existe,
-- ANTES de subir la nueva versión de api/lead.php.
ALTER TABLE leads
  ADD COLUMN actualizado DATETIME NULL AFTER creado,
  ADD COLUMN area VARCHAR(30) NOT NULL DEFAULT '' AFTER origen,
  ADD COLUMN folio VARCHAR(40) NOT NULL DEFAULT '' AFTER area,
  ADD COLUMN estado VARCHAR(12) NOT NULL DEFAULT 'completo' AFTER folio,
  ADD COLUMN atributos TEXT AFTER mensaje,
  ADD COLUMN notificado TINYINT(1) NOT NULL DEFAULT 1 AFTER atendido,
  ADD INDEX idx_folio (folio),
  ADD INDEX idx_pendientes (estado, notificado);

-- Los leads anteriores ya se avisaron por correo; los nuevos arrancan en 0
ALTER TABLE leads ALTER COLUMN notificado SET DEFAULT 0;
