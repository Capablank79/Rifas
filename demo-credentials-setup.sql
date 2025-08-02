-- Script para actualizar la tabla demo_requests para el flujo de credenciales temporales
-- Ejecuta este script en el SQL Editor de tu proyecto Supabase

-- 1. Agregar nuevas columnas para credenciales temporales
ALTER TABLE demo_requests 
ADD COLUMN IF NOT EXISTS username VARCHAR(50),
ADD COLUMN IF NOT EXISTS password VARCHAR(100),
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false;

-- 2. Crear índices para las nuevas columnas
CREATE INDEX IF NOT EXISTS idx_demo_requests_username ON demo_requests(username);
CREATE INDEX IF NOT EXISTS idx_demo_requests_expires_at ON demo_requests(expires_at);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);

-- 3. Función para generar credenciales únicas
CREATE OR REPLACE FUNCTION generate_demo_credentials()
RETURNS TRIGGER AS $$
BEGIN
  -- Generar username único: demo_ + timestamp + random
  NEW.username := 'demo_' || EXTRACT(EPOCH FROM NOW())::bigint || '_' || SUBSTR(MD5(RANDOM()::text), 1, 4);
  
  -- Generar password temporal (8 caracteres alfanuméricos)
  NEW.password := UPPER(SUBSTR(MD5(RANDOM()::text), 1, 8));
  
  -- Establecer expiración en 24 horas
  NEW.expires_at := NOW() + INTERVAL '24 hours';
  
  -- Estado inicial
  NEW.status := 'active';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Crear trigger para generar credenciales automáticamente
DROP TRIGGER IF EXISTS trigger_generate_demo_credentials ON demo_requests;
CREATE TRIGGER trigger_generate_demo_credentials
  BEFORE INSERT ON demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION generate_demo_credentials();

-- 5. Función para validar credenciales (para usar en la demo)
CREATE OR REPLACE FUNCTION validate_demo_credentials(input_username TEXT, input_password TEXT)
RETURNS TABLE(
  is_valid BOOLEAN,
  user_id UUID,
  expires_at TIMESTAMP WITH TIME ZONE,
  nombre TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (dr.username IS NOT NULL AND dr.expires_at > NOW() AND dr.status = 'active') as is_valid,
    dr.id as user_id,
    dr.expires_at,
    dr.nombre
  FROM demo_requests dr
  WHERE dr.username = input_username 
    AND dr.password = input_password
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- 5b. Función para validar solo username (para sesiones guardadas)
CREATE OR REPLACE FUNCTION validate_demo_user(p_username TEXT)
RETURNS TABLE(
  id UUID,
  username TEXT,
  email TEXT,
  nombre TEXT,
  expires_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    dr.id,
    dr.username,
    dr.email,
    dr.nombre,
    dr.expires_at
  FROM demo_requests dr
  WHERE dr.username = p_username 
    AND dr.expires_at > NOW() 
    AND dr.status = 'active'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- 6. Función para marcar credenciales como expiradas (tarea de limpieza)
CREATE OR REPLACE FUNCTION expire_old_demo_credentials()
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE demo_requests 
  SET status = 'expired'
  WHERE expires_at < NOW() 
    AND status = 'active';
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- 7. Política RLS para validación de credenciales (permitir consulta pública para login)
CREATE POLICY "Allow public credential validation" ON demo_requests
  FOR SELECT
  USING (true);

-- 8. Verificar la estructura actualizada
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'demo_requests'
ORDER BY ordinal_position;

-- 9. Ejemplo de consulta para probar las credenciales
-- SELECT * FROM validate_demo_credentials('demo_1234567890_abcd', 'ABC12345');

-- 10. Ejemplo de limpieza de credenciales expiradas
-- SELECT expire_old_demo_credentials();