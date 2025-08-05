// Prueba con múltiples emails para verificar entrega
console.log('🧪 PRUEBA CON MÚLTIPLES EMAILS');
console.log('Probando diferentes proveedores de email...');

const emails = [
  'jlloyola@gmail.com',
  'easyrdemo@exesoft.cl',
  'test@gmail.com' // Este debería fallar para confirmar que el sistema funciona
];

async function testEmail(email, index) {
  console.log(`\n📧 PRUEBA ${index + 1}: ${email}`);
  
  const testData = {
    to: email,
    subject: `🧪 PRUEBA ${index + 1} - EasyRif Email Test`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1>🧪 PRUEBA DE EMAIL ${index + 1}</h1>
          <p>Verificación de entrega de emails</p>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2>Email de Prueba</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3>📋 Información de la Prueba</h3>
            <p><strong>Email destino:</strong> ${email}</p>
            <p><strong>Número de prueba:</strong> ${index + 1}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Fecha local:</strong> ${new Date().toLocaleString('es-CL')}</p>
          </div>
          <p>Si recibes este email, significa que el sistema de envío está funcionando correctamente.</p>
          <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>✅ SISTEMA OPERATIVO:</strong> El endpoint de producción está enviando emails correctamente.
          </div>
        </div>
      </div>
    `
  };

  try {
    const response = await fetch('https://rifas-bice.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ ENVIADO: ${email}`);
      console.log(`📧 Message ID: ${result.messageId}`);
      console.log(`🔍 Response: ${result.response}`);
    } else {
      console.log(`❌ ERROR: ${email}`);
      console.log(`📋 Detalles:`, result.error);
    }
    
    return result;
  } catch (error) {
    console.log(`❌ CONEXIÓN ERROR: ${email}`);
    console.error(error.message);
    return { success: false, error: error.message };
  }
}

// Ejecutar pruebas secuencialmente
async function runTests() {
  console.log('🚀 INICIANDO PRUEBAS DE EMAIL...');
  
  for (let i = 0; i < emails.length; i++) {
    await testEmail(emails[i], i);
    // Esperar 2 segundos entre emails
    if (i < emails.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n🏁 PRUEBAS COMPLETADAS');
  console.log('📬 Revisa las bandejas de entrada de los emails válidos');
  console.log('⚠️ Si no llegan los emails, puede ser un problema de:');
  console.log('   - Filtros de spam');
  console.log('   - Configuración del proveedor de email');
  console.log('   - Reputación del dominio remitente');
}

runTests();