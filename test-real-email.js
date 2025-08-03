// Script para probar el envío REAL de email con Resend
// Verifica variables de entorno y hace una prueba real

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🧪 INICIANDO PRUEBA REAL DE EMAIL - PROYECTO RIFAS')
console.log('=' .repeat(60))
console.log('Fecha:', new Date().toLocaleString('es-CL'))
console.log('')

// Función para cargar variables de entorno
const loadEnvVars = () => {
  try {
    const envPath = path.join(__dirname, '.env')
    console.log('📁 Leyendo archivo:', envPath)
    const envContent = fs.readFileSync(envPath, 'utf8')
    
    const envVars = {}
    envContent.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim()
        }
      }
    })
    
    console.log('✅ Variables de entorno cargadas')
    return envVars
  } catch (error) {
    console.error('❌ Error leyendo .env:', error.message)
    return {}
  }
}

// Función para probar el envío real
const testRealEmailSend = async (credentials, envVars) => {
  const resendApiKey = envVars.VITE_RESEND_API_KEY
  const fromEmail = envVars.VITE_FROM_EMAIL || 'onboarding@resend.dev'
  const fromName = envVars.VITE_FROM_NAME || 'EasyRif Demo'
  
  console.log('🔍 VERIFICANDO CONFIGURACIÓN:')
  console.log('API Key:', resendApiKey ? `${resendApiKey.substring(0, 10)}...` : '❌ NO CONFIGURADA')
  console.log('From Email:', fromEmail)
  console.log('From Name:', fromName)
  console.log('Destinatario:', credentials.email)
  console.log('')
  
  if (!resendApiKey) {
    console.error('❌ VITE_RESEND_API_KEY no configurada')
    return { success: false, error: 'API Key no configurada' }
  }
  
  if (fromEmail === 'noreply@resend.dev') {
    console.warn('⚠️ ADVERTENCIA: Usando noreply@resend.dev - debería ser onboarding@resend.dev')
  } else if (fromEmail === 'onboarding@resend.dev') {
    console.log('✅ Usando email correcto: onboarding@resend.dev')
  }
  
  const emailData = {
    from: `${fromName} <${fromEmail}>`,
    to: [credentials.email],
    subject: '🎉 Credenciales de Acceso - EasyRif Demo (PRUEBA REAL)',
    html: `
      <h2>🎉 ¡Bienvenido a EasyRif Demo!</h2>
      <p>Hola <strong>${credentials.nombre}</strong>,</p>
      <p>Esta es una <strong>PRUEBA REAL</strong> del sistema de envío de emails.</p>
      <div style="background: #f0f0f0; padding: 15px; margin: 15px 0; border-radius: 5px;">
        <h3>🔑 Tus Credenciales de Prueba:</h3>
        <p><strong>Usuario:</strong> ${credentials.username}</p>
        <p><strong>Contraseña:</strong> ${credentials.password}</p>
        <p><strong>Email:</strong> ${credentials.email}</p>
      </div>
      <p><a href="https://rifas-demo.vercel.app/login" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">🚀 Acceder a la Demo</a></p>
      <p><small>Este es un email de prueba del sistema EasyRif.</small></p>
    `
  }
  
  try {
    console.log('📤 ENVIANDO EMAIL REAL A RESEND...')
    console.log('Datos del email:', JSON.stringify({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    }, null, 2))
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
    
    console.log('📊 RESPUESTA DE RESEND:')
    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    
    if (response.ok) {
      const result = await response.json()
      console.log('\n✅ ¡EMAIL ENVIADO EXITOSAMENTE!')
      console.log('Email ID:', result.id)
      console.log('Para:', credentials.email)
      console.log('Desde:', emailData.from)
      console.log('Timestamp:', new Date().toISOString())
      
      return {
        success: true,
        emailId: result.id,
        recipient: credentials.email,
        timestamp: new Date().toISOString()
      }
    } else {
      const errorText = await response.text()
      console.error('\n❌ ERROR EN ENVÍO:')
      console.error('Status:', response.status)
      console.error('Error:', errorText)
      
      // Analizar errores comunes
      if (response.status === 401) {
        console.error('🔑 ERROR 401: API Key inválida o expirada')
      } else if (response.status === 403) {
        console.error('🚫 ERROR 403: Dominio no verificado o sin permisos')
      } else if (response.status === 422) {
        console.error('📝 ERROR 422: Datos del email inválidos')
        console.error('Revisar formato del email o contenido')
      }
      
      return {
        success: false,
        error: errorText,
        status: response.status
      }
    }
  } catch (error) {
    console.error('\n💥 ERROR EN LA PETICIÓN:')
    console.error('Detalle:', error.message)
    
    return {
      success: false,
      error: error.message,
      type: 'network_error'
    }
  }
}

// Datos de prueba
const testCredentials = {
  nombre: "José Luis Loyola",
  email: "jlloyola@gmail.com",
  username: "demo_jlloyola_real",
  password: "Demo2025Real!",
  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
}

// Función principal
const runTest = async () => {
  try {
    console.log('📋 CARGANDO VARIABLES DE ENTORNO...')
    const envVars = loadEnvVars()
    
    console.log('\n📧 DATOS DE PRUEBA:')
    console.log('Nombre:', testCredentials.nombre)
    console.log('Email:', testCredentials.email)
    console.log('Usuario:', testCredentials.username)
    console.log('')
    
    console.log('🚀 EJECUTANDO PRUEBA REAL...')
    const result = await testRealEmailSend(testCredentials, envVars)
    
    console.log('\n📈 RESULTADO FINAL:')
    console.log(JSON.stringify(result, null, 2))
    
    if (result.success) {
      console.log('\n🎉 ¡ÉXITO! EMAIL ENVIADO CORRECTAMENTE')
      console.log('✅ El sistema de email está funcionando')
      console.log('✅ Revisa la bandeja de entrada de jlloyola@gmail.com')
      console.log('✅ También revisa la carpeta de spam/promociones')
      console.log('\n📧 Detalles del envío:')
      console.log('- Email ID:', result.emailId)
      console.log('- Enviado a:', result.recipient)
      console.log('- Timestamp:', result.timestamp)
      console.log('\n🔧 PRÓXIMOS PASOS:')
      console.log('1. Verificar que llegó el email')
      console.log('2. Probar el formulario real en la aplicación')
      console.log('3. Verificar que la base de datos se actualice correctamente')
    } else {
      console.log('\n❌ FALLO EN EL ENVÍO')
      console.log('Error:', result.error)
      
      if (result.status === 401) {
        console.log('\n🔧 SOLUCIÓN SUGERIDA:')
        console.log('1. Verificar que VITE_RESEND_API_KEY sea correcta')
        console.log('2. Verificar que la API Key no haya expirado')
        console.log('3. Verificar que la API Key tenga permisos de envío')
      } else if (result.status === 403) {
        console.log('\n🔧 SOLUCIÓN SUGERIDA:')
        console.log('1. Verificar que el dominio esté verificado en Resend')
        console.log('2. Usar onboarding@resend.dev en lugar de dominios personalizados')
        console.log('3. Verificar límites de envío en la cuenta de Resend')
      }
    }
  } catch (error) {
    console.error('\n💥 ERROR CRÍTICO:', error)
  }
}

// Ejecutar la prueba
runTest()