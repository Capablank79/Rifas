// Script de prueba de conexión a Supabase
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://fdqmyjuzgqvklhdesgik.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcW15anV6Z3F2a2xoZGVzZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTQ4MzIsImV4cCI6MjA2OTY5MDgzMn0.kJMvEuoO-0BSdYRAi1Yc00erlCqnoj9Kd2R3z9VWUaM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔍 Iniciando prueba de conexión a Supabase...');
  console.log('📍 URL:', supabaseUrl);
  console.log('🔑 Key:', supabaseAnonKey.substring(0, 20) + '...');
  
  try {
    // 1. Probar conexión básica
    console.log('\n1️⃣ Probando conexión básica...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('demo_requests')
      .select('count', { count: 'exact', head: true });
    
    if (healthError) {
      console.error('❌ Error en conexión básica:', healthError);
      return;
    }
    console.log('✅ Conexión básica exitosa');
    
    // 2. Verificar políticas RLS
    console.log('\n2️⃣ Verificando políticas RLS...');
    try {
      const { data: policies, error: policiesError } = await supabase
        .from('pg_policies')
        .select('*')
        .eq('tablename', 'demo_requests');
      
      if (policiesError) {
        console.warn('⚠️ No se pudieron verificar las políticas:', policiesError.message);
      } else {
        console.log('📋 Políticas encontradas:', policies);
      }
    } catch (policyError) {
      console.warn('⚠️ Error al verificar políticas:', policyError.message);
    }
    
    // 3. Probar inserción de datos de prueba
    console.log('\n3️⃣ Probando inserción de datos...');
    const testData = {
      nombre: 'Test Usuario',
      email: 'test@example.com',
      telefono: '+56912345678',
      tipo_rifa: 'Productos',
      frecuencia: 'Mensual',
      comentarios: 'Prueba de conexión automática'
    };
    
    const { data: insertResult, error: insertError } = await supabase
      .from('demo_requests')
      .insert([testData])
      .select();
    
    if (insertError) {
      console.error('❌ Error en inserción:', insertError);
      console.error('📝 Detalles del error:');
      console.error('   - Código:', insertError.code);
      console.error('   - Mensaje:', insertError.message);
      console.error('   - Detalles:', insertError.details);
      console.error('   - Hint:', insertError.hint);
      
      if (insertError.code === '42501') {
        console.log('\n🔧 SOLUCIÓN PARA ERROR 42501:');
        console.log('Este error indica que las políticas RLS no permiten la inserción.');
        console.log('Ejecuta este SQL en el SQL Editor de Supabase:');
        console.log(`
-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Allow public insert" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated read" ON demo_requests;

-- Habilitar RLS
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserción pública
CREATE POLICY "Allow public insert" ON demo_requests
  FOR INSERT
  WITH CHECK (true);

-- Verificar que la política se creó
SELECT * FROM pg_policies WHERE tablename = 'demo_requests';`);
      }
      return;
    }
    
    console.log('✅ Inserción exitosa!');
    console.log('📄 Datos insertados:', insertResult);
    
    // 4. Limpiar datos de prueba
    if (insertResult && insertResult.length > 0) {
      console.log('\n4️⃣ Limpiando datos de prueba...');
      const { error: deleteError } = await supabase
        .from('demo_requests')
        .delete()
        .eq('id', insertResult[0].id);
      
      if (deleteError) {
        console.warn('⚠️ No se pudo eliminar el registro de prueba:', deleteError.message);
      } else {
        console.log('✅ Datos de prueba eliminados');
      }
    }
    
    console.log('\n🎉 ¡Prueba de conexión completada exitosamente!');
    
  } catch (error) {
    console.error('💥 Error inesperado:', error);
  }
}

// Ejecutar la prueba
testConnection();