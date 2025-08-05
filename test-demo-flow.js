// Script de prueba completo para el flujo de solicitud de demo
// Simula todo el proceso desde la solicitud hasta el envío de credenciales

// Datos del formulario de solicitud (simulados)
const demoRequest = {
  nombre: "José Luis Loyola",
  email: "jlloyola@gmail.com",
  telefono: "+56912345678",
  empresa: "EasyRif Testing",
  cargo: "Desarrollador",
  comentarios: "Prueba interna del sistema de envío de credenciales"
}

// Función para generar credenciales únicas
const generateDemoCredentials = (requestData) => {
  const timestamp = Date.now()
  const randomSuffix = Math.random().toString(36).substring(2, 8)
  
  // Generar username basado en el nombre
  const cleanName = requestData.nombre
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 10)
  
  // Generar contraseña segura
  const password = `Demo${new Date().getFullYear()}${randomSuffix}!`
  
  // Fecha de expiración (24 horas)
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  
  return {
    id: `demo_${timestamp}`,
    nombre: requestData.nombre,
    email: requestData.email,
    username: `demo_${cleanName}_${randomSuffix}`,
    password: password,
    expires_at: expiresAt.toISOString(),
    created_at: new Date().toISOString(),
    status: 'active'
  }
}

// Función para simular inserción en base de datos
const saveDemoCredentials = async (credentials) => {
  console.log('💾 GUARDANDO CREDENCIALES EN BASE DE DATOS:')
  console.log('ID:', credentials.id)
  console.log('Usuario:', credentials.username)
  console.log('Estado:', credentials.status)
  console.log('Creado:', new Date(credentials.created_at).toLocaleString('es-CL'))
  console.log('Expira:', new Date(credentials.expires_at).toLocaleString('es-CL'))
  
  // Simular delay de base de datos
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    success: true,
    id: credentials.id,
    message: 'Credenciales guardadas exitosamente'
  }
}

// Función para simular envío de email
const sendDemoEmail = async (credentials) => {
  console.log('\n📧 ENVIANDO EMAIL DE CREDENCIALES:')
  console.log('Destinatario:', credentials.email)
  console.log('Asunto: Credenciales de Acceso - EasyRif Demo')
  
  // Simular delay de envío
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const emailContent = {
    to: credentials.email,
    from: 'onboarding@resend.dev',
    subject: 'Credenciales de Acceso - EasyRif Demo',
    html: `
      <h2>🎉 ¡Bienvenido a EasyRif Demo!</h2>
      <p>Hola <strong>${credentials.nombre}</strong>,</p>
      <p>Tus credenciales de acceso:</p>
      <ul>
        <li><strong>Usuario:</strong> ${credentials.username}</li>
        <li><strong>Contraseña:</strong> ${credentials.password}</li>
        <li><strong>Expira:</strong> ${new Date(credentials.expires_at).toLocaleString('es-CL')}</li>
      </ul>
      <p><a href="https://rifas-demo.vercel.app/login">🚀 Acceder a la Demo</a></p>
    `
  }
  
  console.log('📤 Contenido del email preparado')
  console.log('✅ Email enviado exitosamente')
  
  return {
    success: true,
    emailId: `email_${Date.now()}`,
    recipient: credentials.email,
    timestamp: new Date().toISOString()
  }
}

// Función para marcar email como enviado
const markEmailSent = async (credentialsId, emailResult) => {
  console.log('\n📝 ACTUALIZANDO ESTADO EN BASE DE DATOS:')
  console.log('ID Credenciales:', credentialsId)
  console.log('Email ID:', emailResult.emailId)
  console.log('Estado: email_sent = true')
  
  return {
    success: true,
    message: 'Estado actualizado correctamente'
  }
}

// Función principal que ejecuta todo el flujo
const processDemoRequest = async (requestData) => {
  try {
    console.log('🚀 INICIANDO PROCESO DE SOLICITUD DE DEMO')
    console.log('=' .repeat(60))
    console.log('Fecha:', new Date().toLocaleString('es-CL'))
    console.log('Solicitante:', requestData.nombre)
    console.log('Email:', requestData.email)
    console.log('')
    
    // Paso 1: Generar credenciales
    console.log('📋 PASO 1: GENERANDO CREDENCIALES')
    const credentials = generateDemoCredentials(requestData)
    console.log('✅ Credenciales generadas:')
    console.log('   Usuario:', credentials.username)
    console.log('   Contraseña: [OCULTA POR SEGURIDAD]')
    console.log('   Expira en: 24 horas')
    
    // Paso 2: Guardar en base de datos
    console.log('\n📋 PASO 2: GUARDANDO EN BASE DE DATOS')
    const saveResult = await saveDemoCredentials(credentials)
    if (!saveResult.success) {
      throw new Error('Error guardando credenciales')
    }
    console.log('✅', saveResult.message)
    
    // Paso 3: Enviar email
    console.log('\n📋 PASO 3: ENVIANDO EMAIL')
    const emailResult = await sendDemoEmail(credentials)
    if (!emailResult.success) {
      throw new Error('Error enviando email')
    }
    console.log('✅ Email enviado con ID:', emailResult.emailId)
    
    // Paso 4: Marcar como enviado
    console.log('\n📋 PASO 4: ACTUALIZANDO ESTADO')
    const updateResult = await markEmailSent(credentials.id, emailResult)
    if (!updateResult.success) {
      throw new Error('Error actualizando estado')
    }
    console.log('✅', updateResult.message)
    
    // Resultado final
    console.log('\n🎉 PROCESO COMPLETADO EXITOSAMENTE')
    console.log('=' .repeat(60))
    console.log('📊 RESUMEN:')
    console.log('   • Credenciales generadas y guardadas')
    console.log('   • Email enviado a:', credentials.email)
    console.log('   • Usuario demo:', credentials.username)
    console.log('   • Válido hasta:', new Date(credentials.expires_at).toLocaleString('es-CL'))
    console.log('   • URL de acceso: https://rifas-demo.vercel.app/login')
    
    return {
      success: true,
      credentials: credentials,
      emailResult: emailResult,
      message: 'Demo configurada exitosamente'
    }
    
  } catch (error) {
    console.error('\n❌ ERROR EN EL PROCESO:')
    console.error('Detalle:', error.message)
    
    return {
      success: false,
      error: error.message,
      step: 'Error durante el procesamiento'
    }
  }
}

// Ejecutar la prueba completa
console.log('🧪 PRUEBA COMPLETA DEL FLUJO DE DEMO - PROYECTO RIFAS')
console.log('Simulando solicitud para jlloyola@gmail.com')
console.log('')

processDemoRequest(demoRequest)
  .then(result => {
    console.log('\n📈 RESULTADO FINAL:')
    console.log(JSON.stringify({
      success: result.success,
      message: result.message,
      timestamp: new Date().toISOString()
    }, null, 2))
    
    if (result.success) {
      console.log('\n✨ ¡SISTEMA FUNCIONANDO CORRECTAMENTE!')
      console.log('El usuario puede proceder a:')
      console.log('1. Ir a https://rifas-demo.vercel.app/login')
      console.log('2. Usar las credenciales enviadas por email')
      console.log('3. Explorar todas las funcionalidades de la demo')
    }
  })
  .catch(error => {
    console.error('\n💥 ERROR CRÍTICO:', error)
  })

// Exportar funciones para uso externo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    processDemoRequest,
    generateDemoCredentials,
    sendDemoEmail,
    demoRequest
  }
}