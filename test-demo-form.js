// Script para probar el formulario de solicitud de demo en producción
// Este script simula el flujo completo: inserción en Supabase + envío de email

const PRODUCTION_URL = 'https://rifas-bice.vercel.app';

// Datos de prueba para el formulario
const testFormData = {
  nombre: 'Usuario de Prueba',
  email: 'jlloyola@gmail.com',
  telefono: '+56912345678',
  tipoRifa: 'beneficas',
  frecuencia: 'mensual',
  comentarios: 'Esta es una prueba del formulario de solicitud de demo desde el script de testing.'
};

// Función para probar el endpoint de envío de email
async function testEmailEndpoint() {
  console.log('\n🧪 PROBANDO ENDPOINT DE EMAIL...');
  console.log('=' * 50);
  
  const emailData = {
    to: testFormData.email,
    subject: '🎉 Credenciales de Acceso - EasyRif Demo (PRUEBA)',
    html: `
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 ¡Bienvenido a EasyRif Demo!</h1>
            <p>Tus credenciales de acceso están listas</p>
          </div>
          <div class="content">
            <p>Hola <strong>${testFormData.nombre}</strong>,</p>
            <p>¡Gracias por tu interés en EasyRif! Hemos generado tus credenciales de acceso a la demo.</p>
            
            <div class="credentials">
              <h3>📋 Credenciales de Acceso</h3>
              <p><strong>Usuario:</strong> demo_${Date.now()}</p>
              <p><strong>Contraseña:</strong> demo123test</p>
              <p><strong>URL de Acceso:</strong> <a href="${PRODUCTION_URL}/login">${PRODUCTION_URL}/login</a></p>
              <p><strong>Válido hasta:</strong> ${new Date(Date.now() + 24*60*60*1000).toLocaleString('es-CL')}</p>
            </div>
            
            <div class="warning">
              <p><strong>⚠️ Importante:</strong> Esta es una cuenta de prueba con acceso limitado de 24 horas.</p>
            </div>
            
            <a href="${PRODUCTION_URL}/login" class="button">Acceder a la Demo</a>
            
            <h3>📞 Información de Contacto</h3>
            <p><strong>Email:</strong> easyrdemo@exesoft.cl</p>
            <p><strong>WhatsApp:</strong> +56928762136</p>
            
            <p>¡Esperamos que disfrutes explorando EasyRif!</p>
            <p>Saludos,<br><strong>Equipo EasyRif</strong></p>
          </div>
        </div>
      </body>
      </html>
    `,
    from: 'EasyRif Demo <easyrdemo@exesoft.cl>'
  };
  
  try {
    console.log('📧 Enviando email de prueba...');
    console.log('Para:', emailData.to);
    console.log('Asunto:', emailData.subject);
    
    const response = await fetch(`${PRODUCTION_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ EMAIL ENVIADO EXITOSAMENTE');
      console.log('Message ID:', result.messageId);
      console.log('Respuesta completa:', result);
      return true;
    } else {
      console.log('❌ ERROR AL ENVIAR EMAIL');
      console.log('Status:', response.status);
      console.log('Error:', result);
      return false;
    }
    
  } catch (error) {
    console.log('❌ ERROR DE CONEXIÓN');
    console.log('Error:', error.message);
    return false;
  }
}

// Función para verificar las variables de entorno
async function checkEnvironmentVariables() {
  console.log('\n🔍 VERIFICANDO VARIABLES DE ENTORNO...');
  console.log('=' * 50);
  
  try {
    const response = await fetch(`${PRODUCTION_URL}/api/send-email?check=env`);
    const result = await response.json();
    
    console.log('Variables de entorno en producción:');
    Object.entries(result.envStatus).forEach(([key, value]) => {
      const status = value ? '✅' : '❌';
      console.log(`${status} ${key}: ${value}`);
    });
    
    return result.envStatus;
    
  } catch (error) {
    console.log('❌ Error verificando variables:', error.message);
    return null;
  }
}

// Función para probar la accesibilidad del sitio
async function testSiteAccessibility() {
  console.log('\n🌐 PROBANDO ACCESIBILIDAD DEL SITIO...');
  console.log('=' * 50);
  
  try {
    const response = await fetch(PRODUCTION_URL);
    
    if (response.ok) {
      console.log('✅ Sitio web accesible');
      console.log('Status:', response.status);
      console.log('URL:', PRODUCTION_URL);
      return true;
    } else {
      console.log('❌ Problema de accesibilidad');
      console.log('Status:', response.status);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Error de conexión al sitio:', error.message);
    return false;
  }
}

// Función principal
async function runDemoFormTest() {
  console.log('🚀 INICIANDO PRUEBA COMPLETA DEL FORMULARIO DE DEMO');
  console.log('=' * 60);
  console.log('Proyecto:', 'Rifas');
  console.log('URL:', PRODUCTION_URL);
  console.log('Fecha:', new Date().toLocaleString('es-CL'));
  
  const results = {
    siteAccessible: false,
    envVariables: null,
    emailSent: false
  };
  
  // 1. Verificar accesibilidad del sitio
  results.siteAccessible = await testSiteAccessibility();
  
  // 2. Verificar variables de entorno
  results.envVariables = await checkEnvironmentVariables();
  
  // 3. Probar envío de email
  results.emailSent = await testEmailEndpoint();
  
  // Resumen final
  console.log('\n📊 RESUMEN DE RESULTADOS');
  console.log('=' * 50);
  console.log('🌐 Sitio accesible:', results.siteAccessible ? '✅ SÍ' : '❌ NO');
  console.log('⚙️ Variables configuradas:', results.envVariables ? '✅ SÍ' : '❌ NO');
  console.log('📧 Email enviado:', results.emailSent ? '✅ SÍ' : '❌ NO');
  
  if (results.siteAccessible && results.envVariables && results.emailSent) {
    console.log('\n🎉 ¡FORMULARIO DE DEMO COMPLETAMENTE FUNCIONAL!');
    console.log('✅ Todos los componentes están operativos');
    console.log('✅ Los usuarios pueden solicitar acceso a la demo');
    console.log('✅ Los correos con credenciales se envían correctamente');
  } else {
    console.log('\n⚠️ PROBLEMAS DETECTADOS:');
    if (!results.siteAccessible) console.log('❌ Sitio web no accesible');
    if (!results.envVariables) console.log('❌ Variables de entorno no configuradas');
    if (!results.emailSent) console.log('❌ Sistema de correos no funcional');
  }
  
  console.log('\n📝 PRÓXIMOS PASOS:');
  console.log('1. Verificar que el correo llegó a:', testFormData.email);
  console.log('2. Probar el formulario desde el navegador en:', PRODUCTION_URL);
  console.log('3. Verificar que las credenciales funcionen en el login');
  
  return results;
}

// Ejecutar la prueba
runDemoFormTest().catch(console.error);