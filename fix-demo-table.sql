-- Script para agregar las columnas faltantes a la tabla demo_requests
-- Ejecuta este script en el SQL Editor de Supabase

-- Agregar columnas necesarias para credenciales temporales
ALTER TABLE demo_requests 
ADD COLUMN IF NOT EXISTS username VARCHAR(50),
ADD COLUMN IF NOT EXISTS password VARCHAR(100),
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false;

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_demo_requests_username ON demo_requests(username);
CREATE INDEX IF NOT EXISTS idx_demo_requests_expires_at ON demo_requests(expires_at);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);

-- Función para generar credenciales automáticamente
CREATE OR REPLACE FUNCTION generate_demo_credentials()
RETURNS TRIGGER AS $$
BEGIN
  -- Generar username único
  NEW.username := 'demo_' || EXTRACT(EPOCH FROM NOW())::bigint || '_' || SUBSTR(MD5(RANDOM()::text), 1, 4);
  
  -- Generar password temporal
  NEW.password := UPPER(SUBSTR(MD5(RANDOM()::text), 1, 8));
  
  -- Establecer fecha de expiración (24 horas)
  NEW.expires_at := NOW() + INTERVAL '24 hours';
  
  -- Estado inicial
  NEW.status := 'active';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para generar credenciales automáticamente
DROP TRIGGER IF EXISTS trigger_generate_demo_credentials ON demo_requests;
CREATE TRIGGER trigger_generate_demo_credentials
  BEFORE INSERT ON demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION generate_demo_credentials();