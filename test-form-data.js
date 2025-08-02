// Script de prueba que simula exactamente el envío del formulario
import { createClient } from '@supabase/supabase-js';

// Usar exactamente las mismas credenciales que el .env
const supabaseUrl = 'https://fdqmyjuzgqvklhdesgik.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcW15anV6Z3F2a2xoZGVzZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTQ4MzIsImV4cCI6MjA2OTY5MDgzMn0.kJMvEuoO-0BSdYRAi1Yc00erlCqnoj9Kd2R3z9VWUaM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función idéntica a la del componente
const insertDemoRequest = async (data) => {
  // Si estamos usando credenciales placeholder, simular la respuesta
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.warn('⚠️ Using placeholder Supabase credentials. Request simulated.');
    return [{ ...data, id: 'placeholder-id', created_at: new Date().toISOString() }];
  }

  const { data: result, error } = await supabase
    .from('demo_requests')
    .insert([data])
    .select();

  if (error) {
    throw error;
  }

  return result;
};

async function testFormSubmission() {
  console.log('🧪 Probando envío de formulario...');
  console.log('📍 URL:', supabaseUrl);
  console.log('🔑 Key:', supabaseAnonKey.substring(0, 20) + '...');
  
  // Datos exactos como los del formulario
  const formData = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '+56987654321',
    tipo_rifa: 'Productos',
    frecuencia: 'Mensual',
    comentarios: 'Quiero probar EasyRif para mi negocio'
  };
  
  console.log('📝 Datos a enviar:', formData);
  
  try {
    console.log('\n🚀 Enviando datos...');
    const result = await insertDemoRequest(formData);
    
    console.log('✅ ¡Éxito! Datos enviados correctamente');
    console.log('📄 Resultado:', result);
    
    // Intentar limpiar los datos de prueba
    if (result && result.length > 0) {
      console.log('\n🧹 Limpiando datos de prueba...');
      const { error: deleteError } = await supabase
        .from('demo_requests')
        .delete()
        .eq('id', result[0].id);
      
      if (deleteError) {
        console.warn('⚠️ No se pudo eliminar el registro de prueba:', deleteError.message);
        console.log('💡 Puedes eliminarlo manualmente desde el Table Editor de Supabase');
      } else {
        console.log('✅ Datos de prueba eliminados');
      }
    }
    
    console.log('\n🎉 ¡La conexión funciona perfectamente!');
    console.log('💡 El formulario debería funcionar sin problemas ahora.');
    
  } catch (error) {
    console.error('❌ Error al enviar datos:', error);
    console.error('📝 Detalles completos del error:');
    console.error('   - Código:', error.code);
    console.error('   - Mensaje:', error.message);
    console.error('   - Detalles:', error.details);
    console.error('   - Hint:', error.hint);
    
    if (error.code === '42501') {
      console.log('\n🔧 DIAGNÓSTICO:');
      console.log('El error 42501 indica que las políticas RLS están bloqueando la inserción.');
      console.log('\n📋 PASOS PARA SOLUCIONARLO:');
      console.log('1. Ve al SQL Editor de Supabase: https://fdqmyjuzgqvklhdesgik.supabase.co');
      console.log('2. Ejecuta el archivo fix-rls-policies.sql que se creó');
      console.log('3. Verifica que la política "allow_public_insert" se creó correctamente');
      console.log('4. Vuelve a ejecutar este script para confirmar que funciona');
    }
  }
}

// Ejecutar la prueba
testFormSubmission();