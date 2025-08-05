/**
 * Verificador de Logs de Vercel y Endpoint
 * 
 * Este script ayuda a diagnosticar problemas específicos
 * del endpoint /api/send-email en producción
 */

// Función para hacer una petición de prueba al endpoint
async function testProductionEndpoint(baseUrl = 'https://tu-app.vercel.app') {
  console.log('🔍 PROBANDO ENDPOINT EN PRODUCCIÓN');
  console.log('='.repeat(50));
  
  const testData = {
    to: 'test@example.com',
    subject: 'Prueba de diagnóstico',
    message: 'Este es un mensaje de prueba para diagnosticar el envío de correos.'
  };
  
  try {
    console.log('📡 Enviando petición al endpoint...');
    console.log(`URL: ${baseUrl}/api/send-email`);
    console.log('Datos:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log(`\n📊 Respuesta del servidor:`);
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log(`\n📄 Cuerpo de la respuesta:`);
    
    try {
      const jsonResponse = JSON.parse(responseText);
      console.log(JSON.stringify(jsonResponse, null, 2));
      
      // Analizar la respuesta
      if (response.ok) {
        console.log('\n✅ ÉXITO: El endpoint respondió correctamente');
        if (jsonResponse.envStatus) {
          console.log('\n🔧 Variables de entorno detectadas:');
          Object.entries(jsonResponse.envStatus).forEach(([key, value]) => {
            console.log(`  ${key}: ${value ? '✅' : '❌'}`);
          });
        }
      } else {
        console.log('\n❌ ERROR: El endpoint devolvió un error');
        if (jsonResponse.error) {
          console.log(`Mensaje de error: ${jsonResponse.error}`);
        }
        if (jsonResponse.details) {
          console.log(`Detalles: ${jsonResponse.details}`);
        }
      }
    } catch (parseError) {
      console.log('Respuesta no es JSON válido:');
      console.log(responseText);
    }
    
  } catch (error) {
    console.log('\n❌ ERROR DE CONEXIÓN:');
    console.log(`Mensaje: ${error.message}`);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 POSIBLES CAUSAS:');
      console.log('  - URL incorrecta');
      console.log('  - Aplicación no desplegada');
      console.log('  - Problemas de DNS');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 POSIBLES CAUSAS:');
      console.log('  - Servidor no disponible');
      console.log('  - Puerto bloqueado');
    }
  }
}

// Función para generar comandos de diagnóstico
function generateDiagnosticCommands() {
  console.log('\n🛠️  COMANDOS DE DIAGNÓSTICO ADICIONALES');
  console.log('='.repeat(50));
  
  console.log('\n📋 Para revisar logs en Vercel:');
  console.log('1. Ve a https://vercel.com/dashboard');
  console.log('2. Selecciona tu proyecto');
  console.log('3. Ve a la pestaña "Functions"');
  console.log('4. Busca "/api/send-email"');
  console.log('5. Revisa los logs en tiempo real');
  
  console.log('\n🔍 Para probar localmente:');
  console.log('```bash');
  console.log('# Instalar dependencias si no están');
  console.log('npm install nodemailer dotenv');
  console.log('');
  console.log('# Ejecutar agente de diagnóstico');
  console.log('node email-debug-agent.js');
  console.log('```');
  
  console.log('\n🌐 Para probar el endpoint en producción:');
  console.log('```bash');
  console.log('# Reemplaza TU_URL con tu URL de Vercel');
  console.log('curl -X POST https://TU_URL.vercel.app/api/send-email \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"to": "test@example.com", "subject": "Prueba", "message": "Mensaje de prueba"}\'');
  console.log('```');
  
  console.log('\n📧 Variables que deben estar en Vercel:');
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER', 
    'SMTP_PASS',
    'FROM_EMAIL',
    'FROM_NAME'
  ];
  
  requiredVars.forEach(varName => {
    console.log(`  ✓ ${varName}`);
  });
}

// Función para analizar errores comunes
function analyzeCommonErrors() {
  console.log('\n🚨 ERRORES COMUNES Y SOLUCIONES');
  console.log('='.repeat(50));
  
  const commonErrors = [
    {
      error: 'ECONNREFUSED',
      description: 'Conexión rechazada al servidor SMTP',
      solutions: [
        'Verificar SMTP_HOST y SMTP_PORT',
        'Comprobar que el servidor SMTP esté activo',
        'Revisar firewall del servidor'
      ]
    },
    {
      error: 'EAUTH',
      description: 'Error de autenticación SMTP',
      solutions: [
        'Verificar SMTP_USER y SMTP_PASS',
        'Comprobar que la cuenta esté habilitada para SMTP',
        'Revisar si requiere autenticación de dos factores'
      ]
    },
    {
      error: 'ETIMEDOUT',
      description: 'Timeout de conexión',
      solutions: [
        'Verificar conexión a internet',
        'Comprobar si el ISP bloquea el puerto SMTP',
        'Intentar con puerto alternativo (587 en lugar de 465)'
      ]
    },
    {
      error: '550 Mailbox not found',
      description: 'Dirección de correo no válida',
      solutions: [
        'Verificar que FROM_EMAIL sea una dirección válida',
        'Comprobar que la dirección esté configurada en cPanel',
        'Revisar sintaxis del correo electrónico'
      ]
    },
    {
      error: 'Variables undefined',
      description: 'Variables de entorno no configuradas',
      solutions: [
        'Verificar que todas las variables estén en Vercel',
        'Comprobar que no haya espacios extra en los valores',
        'Redeployar después de cambiar variables'
      ]
    }
  ];
  
  commonErrors.forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.error}`);
    console.log(`   📝 ${item.description}`);
    console.log('   💡 Soluciones:');
    item.solutions.forEach(solution => {
      console.log(`      - ${solution}`);
    });
  });
}

// Función principal
async function main() {
  console.clear();
  console.log('🔍 VERIFICADOR DE LOGS Y DIAGNÓSTICO DE CORREOS');
  console.log('='.repeat(60));
  
  // Obtener URL desde argumentos de línea de comandos
  const args = process.argv.slice(2);
  const baseUrl = args[0];
  
  if (baseUrl) {
    await testProductionEndpoint(baseUrl);
  } else {
    console.log('\n⚠️  No se proporcionó URL de producción');
    console.log('Uso: node vercel-logs-checker.js https://tu-app.vercel.app');
  }
  
  generateDiagnosticCommands();
  analyzeCommonErrors();
  
  console.log('\n🎯 PRÓXIMOS PASOS RECOMENDADOS:');
  console.log('='.repeat(50));
  console.log('1. Ejecuta el agente de diagnóstico local: node email-debug-agent.js');
  console.log('2. Revisa los logs de Vercel en tiempo real');
  console.log('3. Verifica que todas las variables estén configuradas en Vercel');
  console.log('4. Prueba el endpoint con la URL real de tu aplicación');
  console.log('5. Si persiste el problema, revisa la configuración de cPanel');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testProductionEndpoint,
  generateDiagnosticCommands,
  analyzeCommonErrors
};