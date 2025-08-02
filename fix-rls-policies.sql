-- Script para solucionar el error 42501 (RLS Policy)
-- Ejecutar en el SQL Editor de Supabase

-- 1. Verificar el estado actual de la tabla
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'demo_requests';

-- 2. Verificar políticas existentes
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'demo_requests';

-- 3. Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Allow public insert" ON public.demo_requests;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.demo_requests;
DROP POLICY IF EXISTS "allow_public_insert" ON public.demo_requests;
DROP POLICY IF EXISTS "allow_authenticated_read" ON public.demo_requests;

-- 4. Deshabilitar RLS temporalmente
ALTER TABLE public.demo_requests DISABLE ROW LEVEL SECURITY;

-- 5. Habilitar RLS nuevamente
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- 6. Crear política de inserción pública (CRÍTICO)
CREATE POLICY "allow_public_insert" 
ON public.demo_requests 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 7. Crear política de lectura para usuarios autenticados (opcional)
CREATE POLICY "allow_authenticated_read" 
ON public.demo_requests 
FOR SELECT 
TO authenticated 
USING (true);

-- 8. Verificar que las políticas se crearon correctamente
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'demo_requests';

-- 9. Probar inserción manual
INSERT INTO public.demo_requests (
  nombre,
  email,
  telefono,
  tipo_rifa,
  frecuencia,
  comentarios
) VALUES (
  'Test Manual',
  'test@example.com',
  '+56912345678',
  'Productos',
  'Mensual',
  'Prueba manual desde SQL'
);

-- 10. Verificar que se insertó correctamente
SELECT * FROM public.demo_requests WHERE nombre = 'Test Manual';

-- 11. Limpiar datos de prueba
DELETE FROM public.demo_requests WHERE nombre = 'Test Manual';

-- NOTA: Si este script funciona, el problema estará resuelto.
-- Si sigue fallando, el problema puede estar en:
-- 1. Permisos de la clave anónima
-- 2. Configuración del proyecto Supabase
-- 3. Configuración de autenticación