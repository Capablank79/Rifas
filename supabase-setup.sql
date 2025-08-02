-- Instrucciones para configurar la base de datos en Supabase
-- Ejecuta este script en el SQL Editor de tu proyecto Supabase

-- 1. Crear la tabla demo_requests
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  tipo_rifa VARCHAR(100),
  frecuencia VARCHAR(50),
  comentarios TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices para mejorar el rendimiento
CRETE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- 4. Crear política para permitir inserción pública (solo INSERT)
CREATE POLICY "Allow public insert" ON demo_requests
  FOR INSERT
  WITH CHECK (true);

-- 5. Crear política para lectura solo para usuarios autenticados (opcional)
-- Descomenta si quieres crear un panel de administración
/*
CREATE POLICY "Allow authenticated read" ON demo_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');
*/

-- 6. Verificar que la tabla se creó correctamente
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'demo_requests'
ORDER BY ordinal_position;