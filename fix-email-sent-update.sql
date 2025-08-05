-- Script para diagnosticar y corregir el problema con email_sent
-- El campo email_sent siempre queda en false debido a políticas RLS restrictivas

-- 1. Verificar políticas RLS actuales para demo_requests
SELECT 
    '🔍 POLÍTICAS RLS ACTUALES:' as info,
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'demo_requests'
ORDER BY cmd;

-- 2. Verificar si RLS está habilitado
SELECT 
    '🔒 ESTADO RLS:' as info,
    tablename,
    CASE 
        WHEN rowsecurity THEN '✅ HABILITADO' 
        ELSE '❌ DESHABILITADO' 
    END as rls_status
FROM pg_tables 
WHERE tablename = 'demo_requests';

-- 3. Crear política específica para permitir UPDATE del campo email_sent
-- Esta política permite que el sistema actualice email_sent después del envío
CREATE POLICY "Allow email_sent update" ON demo_requests
    FOR UPDATE
    USING (true)  -- Permitir actualización desde cualquier contexto
    WITH CHECK (true);  -- Sin restricciones en la verificación

-- 4. Alternativamente, crear política más específica solo para email_sent
-- (Comentada por seguridad, usar solo si la anterior no funciona)
/*
CREATE POLICY "Allow email_sent field update" ON demo_requests
    FOR UPDATE
    USING (true)
    WITH CHECK (
        -- Solo permitir actualización del campo email_sent
        OLD.nombre = NEW.nombre AND
        OLD.email = NEW.email AND
        OLD.telefono = NEW.telefono AND
        OLD.username = NEW.username AND
        OLD.password = NEW.password
    );
*/

-- 5. Verificar que las políticas se crearon correctamente
SELECT 
    '✅ POLÍTICAS DESPUÉS DEL FIX:' as info,
    policyname,
    cmd
FROM pg_policies 
WHERE tablename = 'demo_requests' AND cmd = 'UPDATE'
ORDER BY policyname;

-- 6. Test de actualización manual para verificar que funciona
-- (Ejecutar solo si hay registros de prueba)
/*
UPDATE demo_requests 
SET email_sent = true 
WHERE email_sent = false 
AND created_at > NOW() - INTERVAL '1 hour'
LIMIT 1;
*/

-- 7. Verificar registros recientes y su estado de email_sent
SELECT 
    '📊 REGISTROS RECIENTES:' as info,
    id,
    nombre,
    email,
    email_sent,
    created_at
FROM demo_requests 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC
LIMIT 5;

-- INSTRUCCIONES:
-- 1. Ejecuta este script en el SQL Editor de Supabase
-- 2. Verifica que las políticas se crearon correctamente
-- 3. Prueba el formulario de demo nuevamente
-- 4. Verifica que email_sent se actualiza a true después del envío