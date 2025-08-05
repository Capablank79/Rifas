// Script para probar el flujo completo del formulario de demo
// Simula exactamente lo que hace el formulario cuando se presiona enviar

// Usar fetch nativo de Node.js (disponible desde v18)

// Datos de prueba que simula lo que envía el formulario
const datosFormulario = {
  nombre: "Usuario Test Formulario",
  email: "jlloyola@gmail.com", // Cambia por tu email para probar
  telefono: "+56912345678",
  tipo_rifa: "productos",
  frecuencia: "mensual",
  comentarios: "Prueba desde script que simula formulario"
};

async function probarFormularioCompleto() {
  console.log('🔍 PROBANDO FLUJO COMPLETO DEL FORMULARIO');
  console.log('==========================================');
  
  try {
    // PASO 1: Simular inserción en Supabase (esto normalmente lo hace insertDemoRequest)
    console.log('\n📝 PASO 1: Simulando inserción en base de datos...');
    console.log('Datos del formulario:', JSON.stringify(datosFormulario, null, 2));
    
    // PASO 2: Simular obtención de credenciales (esto normalmente lo hace getDemoCredentials)
    console.log('\n🔑 PASO 2: Simulando generación de credenciales...');
    const credencialesSimuladas = {
      id: 999, // ID simulado
      nombre: datosFormulario.nombre,
      email: datosFormulario.email,
      username: `demo_${Date.now()}`,
      password: 'demo123',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 días
    };
    console.log('Credenciales generadas:', {
      ...credencialesSimuladas,
      password: '[OCULTA]'
    });
    
    // PASO 3: Probar envío de email usando la misma lógica del formulario
    console.log('\n📧 PASO 3: Enviando email con credenciales...');
    
    // Crear el template HTML (simulando createEmailTemplate)
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Credenciales EasyRif Demo</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">🎉 ¡Bienvenido a EasyRif Demo!</h1>
            
            <p>Hola <strong>${credencialesSimuladas.nombre}</strong>,</p>
            
            <p>Tu solicitud de demo ha sido procesada exitosamente. Aquí tienes tus credenciales de acceso:</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">📋 Credenciales de Acceso</h3>
                <p><strong>Usuario:</strong> ${credencialesSimuladas.username}</p>
                <p><strong>Contraseña:</strong> ${credencialesSimuladas.password}</p>
                <p><strong>Válido hasta:</strong> ${new Date(credencialesSimuladas.expires_at).toLocaleDateString('es-ES')}</p>
            </div>
            
            <p>Puedes acceder a la demo en: <a href="https://rifas-bice.vercel.app/login">https://rifas-bice.vercel.app/login</a></p>
            
            <p>¡Disfruta explorando EasyRif!</p>
            
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">Este email fue enviado desde el formulario de demo de EasyRif</p>
        </div>
    </body>
    </html>
    `;
    
    // Usar la misma URL que usa el formulario
    const apiUrl = 'https://rifas-bice.vercel.app/api/send-email';
    
    console.log('🌐 URL de API:', apiUrl);
    console.log('📧 Enviando a:', credencialesSimuladas.email);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: credencialesSimuladas.email,
        subject: '🎉 Credenciales de Acceso - EasyRif Demo',
        html: htmlTemplate,
        from: 'EasyRif Demo <noreply@exesoft.cl>'
      })
    });
    
    console.log('📊 Status de respuesta:', response.status);
    console.log('📊 Status text:', response.statusText);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ ÉXITO: Email enviado desde simulación de formulario');
      console.log('📧 Message ID:', result.messageId);
      console.log('📧 Respuesta completa:', result);
    } else {
      const error = await response.json();
      console.error('❌ ERROR: Fallo en envío desde simulación de formulario');
      console.error('❌ Error:', error);
      
      if (error.details) {
        console.error('❌ Detalles:', error.details);
      }
    }
    
  } catch (error) {
    console.error('❌ ERROR GENERAL en simulación de formulario:', error);
    console.error('❌ Stack:', error.stack);
  }
}

// Ejecutar la prueba
probarFormularioCompleto()
  .then(() => {
    console.log('\n🏁 Prueba de formulario completada');
  })
  .catch(error => {
    console.error('💥 Error fatal en prueba:', error);
  });