// Script para comparar el comportamiento del formulario real vs script de prueba
// Identifica diferencias en variables de entorno y configuración

async function debugFormularioVsScript() {
  console.log('🔍 COMPARANDO FORMULARIO REAL VS SCRIPT DE PRUEBA');
  console.log('==================================================');
  
  try {
    // PASO 1: Verificar variables de entorno en producción
    console.log('\n📋 PASO 1: Verificando variables de entorno en producción...');
    
    const envResponse = await fetch('https://rifas-bice.vercel.app/api/send-email?check=env');
    const envResult = await envResponse.json();
    
    console.log('Variables de entorno en servidor:');
    Object.entries(envResult.envStatus).forEach(([key, value]) => {
      const status = value ? '✅' : '❌';
      console.log(`${status} ${key}: ${value}`);
    });
    
    // PASO 2: Simular exactamente lo que hace el formulario
    console.log('\n📧 PASO 2: Simulando envío EXACTO del formulario...');
    
    // Estas son las variables que usa el formulario en emailService.ts
    const fromEmail = 'easyrdemo@exesoft.cl'; // VITE_FROM_EMAIL del .env
    const fromName = 'EasyRif Demo'; // VITE_FROM_NAME del .env
    
    console.log('Variables del formulario:');
    console.log(`📧 FROM_EMAIL: ${fromEmail}`);
    console.log(`👤 FROM_NAME: ${fromName}`);
    
    // Datos exactos como los genera el formulario
    const credencialesFormulario = {
      nombre: "Usuario Test Formulario Real",
      email: "jlloyola@gmail.com",
      username: `demo_${Date.now()}`,
      password: 'demo123',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    // Template HTML exacto como lo genera createEmailTemplate
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Credenciales EasyRif Demo</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .credentials-box { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 25px 0; }
            .credential-item { margin: 15px 0; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }
            .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 28px;">🎉 ¡Bienvenido a EasyRif Demo!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Tu acceso está listo</p>
            </div>
            
            <div class="content">
                <p>Hola <strong>${credencialesFormulario.nombre}</strong>,</p>
                
                <p>Tu solicitud de demo ha sido procesada exitosamente. Aquí tienes tus credenciales de acceso:</p>
                
                <div class="credentials-box">
                    <h3 style="margin-top: 0; color: #667eea;">📋 Credenciales de Acceso</h3>
                    
                    <div class="credential-item">
                        <strong>👤 Usuario:</strong> ${credencialesFormulario.username}
                    </div>
                    
                    <div class="credential-item">
                        <strong>🔐 Contraseña:</strong> ${credencialesFormulario.password}
                    </div>
                    
                    <div class="credential-item">
                        <strong>⏰ Válido hasta:</strong> ${new Date(credencialesFormulario.expires_at).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="https://rifas-bice.vercel.app/login" class="button">🚀 Acceder a la Demo</a>
                </div>
                
                <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0; color: #92400e;"><strong>💡 Tip:</strong> Guarda estas credenciales en un lugar seguro. El acceso expira automáticamente.</p>
                </div>
                
                <p>¡Disfruta explorando todas las funcionalidades de EasyRif!</p>
                
                <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                
                <p>Saludos,<br><strong>El equipo de EasyRif</strong></p>
            </div>
            
            <div class="footer">
                <p>Este email fue enviado automáticamente desde EasyRif Demo</p>
                <p>© 2024 EasyRif - Sistema de Gestión de Rifas</p>
            </div>
        </div>
    </body>
    </html>
    `;
    
    // PASO 3: Envío con configuración EXACTA del formulario
    console.log('\n🚀 PASO 3: Enviando con configuración exacta del formulario...');
    
    const requestBody = {
      to: credencialesFormulario.email,
      subject: '🎉 Credenciales de Acceso - EasyRif Demo',
      html: htmlTemplate,
      from: `${fromName} <${fromEmail}>` // Formato exacto del formulario
    };
    
    console.log('📦 Datos de la petición:');
    console.log(`📧 TO: ${requestBody.to}`);
    console.log(`📝 SUBJECT: ${requestBody.subject}`);
    console.log(`👤 FROM: ${requestBody.from}`);
    console.log(`📄 HTML: ${htmlTemplate.length} caracteres`);
    
    const response = await fetch('https://rifas-bice.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log(`\n📊 Respuesta del servidor:`);
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ ÉXITO: Email enviado con configuración exacta del formulario');
      console.log('📧 Message ID:', result.messageId);
      console.log('📧 Response:', result.response);
      
      console.log('\n🎯 CONCLUSIÓN: El problema NO está en la configuración del envío');
      console.log('🔍 El problema debe estar en:');
      console.log('   1. La lógica del formulario React');
      console.log('   2. El manejo de errores en el frontend');
      console.log('   3. La integración con Supabase');
      console.log('   4. Variables de entorno del frontend');
      
    } else {
      const error = await response.json();
      console.error('❌ ERROR: Fallo con configuración exacta del formulario');
      console.error('❌ Error:', error);
      
      console.log('\n🎯 CONCLUSIÓN: El problema SÍ está en la configuración del envío');
      console.log('🔍 Revisar:');
      console.log('   1. Variables de entorno en Vercel');
      console.log('   2. Configuración SMTP');
      console.log('   3. Permisos del dominio remitente');
    }
    
  } catch (error) {
    console.error('❌ ERROR GENERAL en debug:', error);
    console.error('❌ Stack:', error.stack);
  }
}

// Ejecutar el debug
debugFormularioVsScript()
  .then(() => {
    console.log('\n🏁 Debug completado');
  })
  .catch(error => {
    console.error('💥 Error fatal en debug:', error);
  });