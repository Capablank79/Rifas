-- Función para validar credenciales de demo
CREATE OR REPLACE FUNCTION validate_demo_credentials(p_username TEXT, p_password TEXT)
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
    dr.username::TEXT,
    dr.email::TEXT,
    dr.nombre::TEXT,
    dr.expires_at
  FROM demo_requests dr
  WHERE dr.username = p_username 
    AND dr.password = p_password
    AND dr.expires_at > NOW() 
    AND dr.status = 'active'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Función para validar solo username (para sesiones guardadas)
CREATE OR REPLACE FUNCTION validate_demo_user_by_username(p_username TEXT)
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
    dr.username::TEXT,
    dr.email::TEXT,
    dr.nombre::TEXT,
    dr.expires_at
  FROM demo_requests dr
  WHERE dr.username = p_username 
    AND dr.expires_at > NOW() 
    AND dr.status = 'active'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;