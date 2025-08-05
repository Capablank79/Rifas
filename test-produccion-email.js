// Prueba directa del sistema de emails en producción
console.log('🧪 PRUEBA DIRECTA EN PRODUCCIÓN');
console.log('Enviando email de prueba real...');

const testData = {
  to: 'jlloyola@gmail.com',
  subject: '🧪 PRUEBA DIRECTA - EasyRif Demo Credentials',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1>🧪 PRUEBA DIRECTA DE PRODUCCIÓN</h1>
        <p>Test de envío de credenciales</p>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2>Hola Usuario de Prueba,</h2>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3>🔑 Credenciales de Prueba</h3>
          <p><strong>Usuario:</strong> <code>demo_test_${Date.now()}</code></p>
          <p><strong>Contraseña:</strong> <code>test123456</code></p>
          <p><strong>Fecha de prueba:</strong> ${new Date().toLocaleString('es-CL')}</p>
        </div>
        <p>Esta es una prueba directa del sistema de emails en producción.</p>
        <p>Si recibes este email, el sistema está funcionando correctamente.</p>
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>⚠️ IMPORTANTE:</strong> Esta es una prueba del sistema de emails.
          <br>El endpoint de producción está siendo verificado directamente.
        </div>
      </div>
    </div>
  `
};

fetch('https://rifas-bice.vercel.app/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testData)
})
.then(async response => {
  const result = await response.json();
  console.log('📧 RESULTADO:', JSON.stringify(result, null, 2));
  
  if (result.success) {
    console.log('✅ EMAIL ENVIADO EXITOSAMENTE');
    console.log('📬 Revisa la bandeja de entrada de jlloyola@gmail.com');
    console.log('📧 Message ID:', result.messageId);
    console.log('🔍 Response:', result.response);
  } else {
    console.log('❌ ERROR EN EL ENVÍO:', result.error);
    if (result.details) {
      console.log('📋 Detalles:', result.details);
    }
  }
})
.catch(error => {
  console.error('❌ ERROR DE CONEXIÓN:', error);
});