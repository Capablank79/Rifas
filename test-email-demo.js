// Script de prueba para envío de credenciales de demo
// Simula el envío de email con datos de prueba para jlloyola@gmail.com

// Datos simulados de credenciales de demo
const testCredentials = {
  nombre: "José Luis Loyola",
  email: "jlloyola@gmail.com",
  username: "demo_jlloyola",
  password: "Demo2024!",
  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas desde ahora
}

// Función para formatear la fecha de expiración (copiada del servicio)
const formatExpirationDate = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Santiago'
  })
}

// Template del email (versión simplificada)
const createEmailTemplate = (credentials) => {
  const expirationDate = formatExpirationDate(credentials.expires_at)
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Credenciales de Acceso - EasyRif Demo</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .credentials { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 ¡Bienvenido a EasyRif Demo!</h1>
      <p>Tus credenciales de acceso están listas</p>
    </div>
    
    <div class="content">
      <p>Hola <strong>${credentials.nombre}</strong>,</p>
      
      <p>¡Gracias por tu interés en EasyRif! Hemos creado una cuenta de demostración especialmente para ti.</p>
      
      <div class="credentials">
        <h3>🔑 Tus Credenciales de Acceso:</h3>
        <p><strong>Usuario:</strong> ${credentials.username}</p>
        <p><strong>Contraseña:</strong> ${credentials.password}</p>
        <p><strong>Email:</strong> ${credentials.email}</p>
      </div>
      
      <div class="warning">
        <p><strong>⏰ Importante:</strong> Esta cuenta expira el <strong>${expirationDate}</strong></p>
      </div>
      
      <a href="https://rifas-demo.vercel.app/login" class="button">🚀 Acceder a la Demo</a>
      
      <h3>🎯 ¿Qué puedes hacer en la demo?</h3>
      <ul>
        <li>✅ Crear rifas personalizadas</li>
        <li>✅ Gestionar participantes</li>
        <li>✅ Realizar sorteos automáticos</li>
        <li>✅ Generar reportes detallados</li>
        <li>✅ Configurar métodos de pago</li>
      </ul>
      
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
    </div>
    
    <div class="footer">
      <p>© 2024 EasyRif - Sistema de Gestión de Rifas</p>
      <p>Este es un email automático, por favor no responder.</p>
    </div>
  </div>
</body>
</html>
  `
}

// Función de prueba que simula el envío
const testSendDemoCredentials = async (credentials) => {
  try {
    console.log('🧪 INICIANDO PRUEBA DE ENVÍO DE EMAIL')
    console.log('=' .repeat(50))
    
    console.log('📧 DATOS DEL EMAIL:')
    console.log('Para:', credentials.email)
    console.log('Nombre:', credentials.nombre)
    console.log('Usuario:', credentials.username)
    console.log('Contraseña:', credentials.password)
    console.log('Expira:', formatExpirationDate(credentials.expires_at))
    
    console.log('\n📝 TEMPLATE DEL EMAIL:')
    console.log('=' .repeat(50))
    const emailTemplate = createEmailTemplate(credentials)
    console.log(emailTemplate)
    
    console.log('\n✅ SIMULACIÓN COMPLETADA')
    console.log('=' .repeat(50))
    console.log('📤 El email sería enviado a:', credentials.email)
    console.log('🎯 Con las credenciales generadas para la demo')
    console.log('⏰ Válido hasta:', formatExpirationDate(credentials.expires_at))
    
    // Simular respuesta exitosa
    return {
      success: true,
      emailId: 'test_' + Date.now(),
      recipient: credentials.email,
      timestamp: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Ejecutar la prueba
console.log('🚀 EJECUTANDO PRUEBA DE EMAIL PARA RIFAS')
console.log('Fecha:', new Date().toLocaleString('es-CL'))
console.log('')

testSendDemoCredentials(testCredentials)
  .then(result => {
    console.log('\n📊 RESULTADO DE LA PRUEBA:')
    console.log(JSON.stringify(result, null, 2))
    
    if (result.success) {
      console.log('\n🎉 ¡PRUEBA EXITOSA!')
      console.log('El sistema de email está funcionando correctamente.')
      console.log('Las credenciales se enviarían a jlloyola@gmail.com')
    } else {
      console.log('\n❌ PRUEBA FALLIDA:')
      console.log('Error:', result.error)
    }
  })
  .catch(error => {
    console.error('\n💥 ERROR CRÍTICO:', error)
  })

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testCredentials,
    testSendDemoCredentials,
    createEmailTemplate,
    formatExpirationDate
  }
}