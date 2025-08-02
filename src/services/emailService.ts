// Servicio de email para envío de credenciales de demo
// Este archivo simula el envío de emails y puede ser reemplazado por un servicio real

interface EmailCredentials {
  nombre: string
  email: string
  username: string
  password: string
  expires_at: string
}

// Función para formatear la fecha de expiración
const formatExpirationDate = (isoDate: string): string => {
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

// Template del email
const createEmailTemplate = (credentials: EmailCredentials): string => {
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
      <h2>Hola ${credentials.nombre},</h2>
      
      <p>¡Gracias por tu interés en EasyRif! Tus credenciales de acceso a la demo interactiva están listas.</p>
      
      <div class="credentials">
        <h3>🔑 Credenciales de Acceso</h3>
        <p><strong>Usuario:</strong> <code>${credentials.username}</code></p>
        <p><strong>Contraseña:</strong> <code>${credentials.password}</code></p>
        <p><strong>Válido hasta:</strong> ${expirationDate}</p>
      </div>
      
      <div class="warning">
        <strong>⏰ Importante:</strong> Estas credenciales expiran en 24 horas. Durante este tiempo puedes:
        <ul>
          <li>✅ Explorar todas las funcionalidades</li>
          <li>✅ Crear rifas de prueba</li>
          <li>✅ Cerrar y abrir sesión las veces que quieras</li>
          <li>✅ Unirte a nuestra waitlist desde la demo</li>
        </ul>
      </div>
      
      <div style="text-align: center;">
        <a href="https://rifas-demo.vercel.app/login" class="button">🚀 Acceder a la Demo</a>
      </div>
      
      <h3>💡 ¿Qué puedes hacer en la demo?</h3>
      <ul>
        <li><strong>Crear rifas:</strong> Configura rifas con diferentes tipos de premios</li>
        <li><strong>Gestionar participantes:</strong> Añade y administra participantes</li>
        <li><strong>Realizar sorteos:</strong> Ejecuta sorteos automáticos y transparentes</li>
        <li><strong>Ver reportes:</strong> Analiza estadísticas y resultados</li>
        <li><strong>Configurar pagos:</strong> Explora las opciones de monetización</li>
      </ul>
      
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos:</p>
      <ul>
        <li>📧 Email: easyrdemo@exesoft.cl</li>
        <li>📱 WhatsApp: +56928762136</li>
      </ul>
      
      <div class="footer">
        <p>Este email fue enviado automáticamente. Por favor no respondas a este mensaje.</p>
        <p>© 2024 EasyRif - Gestión profesional de rifas</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

// Función principal para enviar credenciales
export const sendDemoCredentials = async (credentials: EmailCredentials): Promise<boolean> => {
  try {
    // En desarrollo, simular el envío
    if (import.meta.env.DEV) {
      console.log('📧 SIMULANDO ENVÍO DE EMAIL:')
      console.log('Para:', credentials.email)
      console.log('Nombre:', credentials.nombre)
      console.log('Usuario:', credentials.username)
      console.log('Contraseña:', credentials.password)
      console.log('Expira:', formatExpirationDate(credentials.expires_at))
      console.log('\n📧 Template HTML:')
      console.log(createEmailTemplate(credentials))
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000))
      return true
    }
    
    // TODO: Aquí integrar servicio real de email
    // Opciones recomendadas:
    // 1. EmailJS (frontend): https://www.emailjs.com/
    // 2. Resend (API): https://resend.com/
    // 3. SendGrid (API): https://sendgrid.com/
    // 4. Netlify Functions + Nodemailer
    // 5. Vercel Edge Functions + Resend
    
    console.warn('⚠️ Servicio de email no configurado en producción')
    return false
    
  } catch (error) {
    console.error('Error enviando email:', error)
    return false
  }
}

// Función para enviar email de recordatorio (opcional)
export const sendExpirationReminder = async (credentials: EmailCredentials): Promise<boolean> => {
  try {
    const reminderTemplate = `
      <h2>⏰ Tu demo de EasyRif expira pronto</h2>
      <p>Hola ${credentials.nombre},</p>
      <p>Te recordamos que tu acceso a la demo de EasyRif expira el ${formatExpirationDate(credentials.expires_at)}.</p>
      <p>Si aún no has explorado todas las funcionalidades, ¡este es el momento perfecto!</p>
      <a href="https://rifas-demo.vercel.app/login">Acceder a la Demo</a>
    `
    
    console.log('📧 Recordatorio de expiración para:', credentials.email)
    return true
    
  } catch (error) {
    console.error('Error enviando recordatorio:', error)
    return false
  }
}

// Exportar template para testing
export { createEmailTemplate, formatExpirationDate }