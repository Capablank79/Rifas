-- Script alternativo para solucionar el error 42501
-- Este script usa el rol 'anon' específicamente

-- 1. Verificar el estado actual
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'demo_requests';

-- 2. Ver políticas actuales
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'demo_requests';

-- 3. Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Allow public insert" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated read" ON demo_requests;
DROP POLICY IF EXISTS "allow_public_insert" ON demo_requests;
DROP POLICY IF EXISTS "allow_authenticated_read" ON demo_requests;
DROP POLICY IF EXISTS "Enable insert for anon users" ON demo_requests;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON demo_requests;

-- 4. Deshabilitar RLS completamente
ALTER TABLE demo_requests DISABLE ROW LEVEL SECURITY;

-- 5. Habilitar RLS nuevamente
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- 6. Crear política específica para el rol 'anon' (clave anónima)
CREATE POLICY "Enable insert for anon users" ON demo_requests
    FOR INSERT TO anon
    WITH CHECK (true);

-- 7. Crear política para usuarios autenticados (opcional)
CREATE POLICY "Enable read for authenticated users" ON demo_requests
    FOR SELECT TO authenticated
    USING (true);

-- 8. Verificar que las políticas se crearon
SELECT 
    policyname, 
    cmd, 
    roles,
    with_check
FROM pg_policies 
WHERE tablename = 'demo_requests';

-- 9. Probar inserción con datos de prueba
INSERT INTO demo_requests (
    nombre,
    email,
    telefono,
    tipo_rifa,
    frecuencia,
    comentarios
) VALUES (
    'Test Anon',
    'test.anon@example.com',
    '+56987654321',
    'Productos',
    'Mensual',
    'Prueba con rol anon'
);

-- 10. Verificar inserción
SELECT * FROM demo_requests WHERE nombre = 'Test Anon';

-- 11. Limpiar datos de prueba
DELETE FROM demo_requests WHERE nombre = 'Test Anon';

-- 12. Verificar estado final
SELECT 
    'Tabla: ' || tablename as info,
    'RLS: ' || CASE WHEN rowsecurity THEN 'Habilitado' ELSE 'Deshabilitado' END as estado
FROM pg_tables 
WHERE tablename = 'demo_requests'
UNION ALL
SELECT 
    'Política: ' || policyname as info,
    'Rol: ' || array_to_string(roles, ', ') as estado
FROM pg_policies 
WHERE tablename = 'demo_requests';

-- NOTA IMPORTANTE:
-- Si este script tampoco funciona, el problema puede estar en:
-- 1. La configuración del proyecto Supabase
-- 2. Los permisos de la clave anónima
-- 3. La configuración de autenticación del proyecto