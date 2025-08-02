-- Script para deshabilitar completamente RLS en demo_requests
-- Esto permitirá todas las inserciones sin restricciones

-- 1. Verificar estado actual
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'demo_requests';

-- 2. Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Allow public insert" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated read" ON demo_requests;
DROP POLICY IF EXISTS "allow_public_insert" ON demo_requests;
DROP POLICY IF EXISTS "allow_authenticated_read" ON demo_requests;
DROP POLICY IF EXISTS "Enable insert for anon users" ON demo_requests;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON demo_requests;
DROP POLICY IF EXISTS "enable insert for anon users" ON demo_requests;
DROP POLICY IF EXISTS "enable read for authenticated users" ON demo_requests;

-- 3. DESHABILITAR RLS COMPLETAMENTE
ALTER TABLE demo_requests DISABLE ROW LEVEL SECURITY;

-- 4. Verificar que RLS está deshabilitado
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN 'RLS HABILITADO' ELSE 'RLS DESHABILITADO' END as estado
FROM pg_tables 
WHERE tablename = 'demo_requests';

-- 5. Verificar que no hay políticas
SELECT COUNT(*) as politicas_restantes FROM pg_policies WHERE tablename = 'demo_requests';

-- 6. Probar inserción
INSERT INTO demo_requests (
    nombre,
    email,
    telefono,
    tipo_rifa,
    frecuencia,
    comentarios
) VALUES (
    'Test Sin RLS',
    'test.sinrls@example.com',
    '+56987654321',
    'Productos',
    'Mensual',
    'Prueba sin RLS'
);

-- 7. Verificar inserción
SELECT * FROM demo_requests WHERE nombre = 'Test Sin RLS';

-- 8. Limpiar datos de prueba
DELETE FROM demo_requests WHERE nombre = 'Test Sin RLS';

-- RESULTADO ESPERADO:
-- - RLS DESHABILITADO
-- - 0 políticas restantes
-- - Inserción exitosa
-- - Datos limpiados

SELECT 'RLS completamente deshabilitado. El formulario debería funcionar ahora.' as resultado;