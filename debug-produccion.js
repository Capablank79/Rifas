/**
 * 🔍 HERRAMIENTA DE DEBUG PARA PRODUCCIÓN
 * 
 * Esta herramienta te ayuda a diagnosticar problemas de correo en Vercel
 * cuando funciona localmente pero no en producción.
 */

// Usando fetch nativo de Node.js (disponible desde v18)

// ========================================
// CONFIGURACIÓN
// ========================================

// URL de tu proyecto en Vercel
const VERCEL_URL = 'https://rifas-bice.vercel.app';

// Datos de prueba
const testData = {
  to: 'easyrdemo@exesoft.cl',
  subject: 'Test desde Debug Producción',
  message: 'Este es un correo de prueba desde la herramienta de debug de producción.'
};

// ========================================
// FUNCIONES DE DEBUG
// ========================================

async function testProductionEndpoint() {
  console.log('🚀 TESTING ENDPOINT DE PRODUCCIÓN');
  console.log('='.repeat(50));
  
  try {
    console.log(`📡 Enviando request a: ${VERCEL_URL}/api/send-email`);
    console.log('📋 Datos:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(`${VERCEL_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log(`\n📊 Status: ${response.status} ${response.statusText}`);
    
    const responseText = await response.text();
    console.log('📄 Response Body:', responseText);
    
    if (response.ok) {
      console.log('✅ SUCCESS: El endpoint responde correctamente');
      try {
        const jsonResponse = JSON.parse(responseText);
        console.log('📧 Respuesta JSON:', JSON.stringify(jsonResponse, null, 2));
      } catch (e) {
        console.log('⚠️  La respuesta no es JSON válido');
      }
    } else {
      console.log('❌ ERROR: El endpoint falló');
      analyzeError(response.status, responseText);
    }
    
  } catch (error) {
    console.log('💥 ERROR DE CONEXIÓN:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('💡 CAUSA: URL incorrecta o dominio no existe');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 CAUSA: Servidor no disponible');
    }
  }
}

function analyzeError(status, body) {
  console.log('\n🔍 ANÁLISIS DEL ERROR:');
  
  switch (status) {
    case 404:
      console.log('💡 CAUSA: Endpoint /api/send-email no encontrado');
      console.log('🔧 SOLUCIÓN: Verifica que el archivo api/send-email.js existe');
      break;
      
    case 500:
      console.log('💡 CAUSA: Error interno del servidor');
      console.log('🔧 SOLUCIÓN: Revisa los logs de Vercel');
      if (body.includes('SMTP')) {
        console.log('📧 ESPECÍFICO: Error relacionado con SMTP');
      }
      break;
      
    case 405:
      console.log('💡 CAUSA: Método no permitido');
      console.log('🔧 SOLUCIÓN: Verifica que el endpoint acepta POST');
      break;
      
    default:
      console.log(`💡 Status ${status}: Error no común`);
  }
  
  // Buscar errores específicos en el body
  if (body.includes('Invalid login')) {
    console.log('🔐 ESPECÍFICO: Credenciales SMTP incorrectas en Vercel');
  }
  if (body.includes('ECONNREFUSED')) {
    console.log('🌐 ESPECÍFICO: No se puede conectar al servidor SMTP');
  }
  if (body.includes('timeout')) {
    console.log('⏱️  ESPECÍFICO: Timeout de conexión SMTP');
  }
}

function showVercelDebuggingSteps() {
  console.log('\n🛠️  PASOS PARA DEBUG EN VERCEL');
  console.log('='.repeat(50));
  
  console.log('\n1️⃣  REVISAR LOGS DE VERCEL:');
  console.log('   • Ve a https://vercel.com/dashboard');
  console.log('   • Selecciona tu proyecto');
  console.log('   • Ve a "Functions" → "View Function Logs"');
  console.log('   • Busca errores en /api/send-email');
  
  console.log('\n2️⃣  VERIFICAR VARIABLES DE ENTORNO:');
  console.log('   • Ve a Settings → Environment Variables');
  console.log('   • Confirma que estas variables existen:');
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL', 'FROM_NAME'];
  requiredVars.forEach(varName => {
    console.log(`     ✓ ${varName}`);
  });
  
  console.log('\n3️⃣  COMANDOS DE DEBUG ADICIONALES:');
  console.log('```bash');
  console.log('# Test directo con curl');
  console.log(`curl -X POST ${VERCEL_URL}/api/send-email \\`);
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"to": "test@example.com", "subject": "Test", "message": "Test message"}\'');
  console.log('```');
  
  console.log('\n4️⃣  VERIFICAR DEPLOYMENT:');
  console.log('   • Ve a "Deployments"');
  console.log('   • Confirma que el último deploy fue exitoso');
  console.log('   • Verifica que incluye los cambios recientes');
}

function showCommonSolutions() {
  console.log('\n💡 SOLUCIONES COMUNES');
  console.log('='.repeat(50));
  
  console.log('\n🔐 Si el error es de autenticación:');
  console.log('   1. Verifica SMTP_PASS en Vercel = r1f4s2025.@');
  console.log('   2. Confirma SMTP_USER = easyrdemo@exesoft.cl');
  console.log('   3. Redeploya después de cambiar variables');
  
  console.log('\n🌐 Si el error es de conexión:');
  console.log('   1. Verifica SMTP_HOST = mail.exesoft.cl');
  console.log('   2. Confirma SMTP_PORT = 465');
  console.log('   3. Verifica que el servidor SMTP esté disponible');
  
  console.log('\n📦 Si el endpoint no existe:');
  console.log('   1. Confirma que api/send-email.js está en el repo');
  console.log('   2. Verifica que el último commit incluye el archivo');
  console.log('   3. Redeploya manualmente si es necesario');
}

// ========================================
// EJECUCIÓN PRINCIPAL
// ========================================

async function main() {
  console.log('🔍 DEBUG DE PRODUCCIÓN - SISTEMA DE CORREOS');
  console.log('='.repeat(60));
  
  console.log('\n⚠️  IMPORTANTE: Actualiza VERCEL_URL en este archivo');
  console.log(`📍 URL actual: ${VERCEL_URL}`);
  
  if (VERCEL_URL.includes('tu-proyecto')) {
    console.log('\n❌ ERROR: Debes actualizar VERCEL_URL con tu dominio real');
    console.log('💡 Ejemplo: https://mi-proyecto.vercel.app');
    return;
  }
  
  await testProductionEndpoint();
  showVercelDebuggingSteps();
  showCommonSolutions();
  
  console.log('\n🎯 PRÓXIMOS PASOS:');
  console.log('1. Actualiza VERCEL_URL en este archivo');
  console.log('2. Ejecuta: node debug-produccion.js');
  console.log('3. Revisa los logs de Vercel');
  console.log('4. Aplica las soluciones sugeridas');
}

// Solo ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { testProductionEndpoint, analyzeError, showVercelDebuggingSteps };