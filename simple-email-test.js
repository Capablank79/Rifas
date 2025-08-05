import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

console.log('🚀 DIAGNÓSTICO SIMPLE DE CORREOS SMTP');
console.log('='.repeat(50));

// Verificar variables de entorno
console.log('\n🔍 VERIFICANDO VARIABLES DE ENTORNO:');
const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL', 'FROM_NAME'];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName.includes('PASS') ? '***OCULTO***' : value}`);
  } else {
    console.log(`❌ ${varName}: NO CONFIGURADA`);
  }
});

// Probar conexión SMTP
console.log('\n🔌 PROBANDO CONEXIÓN SMTP:');

try {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    debug: true,
    logger: true
  });
  
  console.log('📡 Verificando conexión...');
  
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ ERROR DE CONEXIÓN:', error.message);
      
      // Diagnóstico específico
      if (error.code === 'ECONNREFUSED') {
        console.log('💡 POSIBLE CAUSA: Servidor SMTP no disponible o puerto bloqueado');
      } else if (error.code === 'EAUTH') {
        console.log('💡 POSIBLE CAUSA: Credenciales incorrectas');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('💡 POSIBLE CAUSA: Timeout de conexión');
      }
    } else {
      console.log('✅ CONEXIÓN SMTP EXITOSA!');
      
      // Enviar correo de prueba
      console.log('\n📧 ENVIANDO CORREO DE PRUEBA:');
      
      const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: process.env.FROM_EMAIL,
        subject: '🧪 Prueba de SMTP - ' + new Date().toLocaleString(),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">✅ Prueba de SMTP Exitosa</h2>
            <p>Este correo confirma que la configuración SMTP está funcionando.</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
              <h3>Configuración utilizada:</h3>
              <ul>
                <li><strong>Host:</strong> ${process.env.SMTP_HOST}</li>
                <li><strong>Puerto:</strong> ${process.env.SMTP_PORT}</li>
                <li><strong>Usuario:</strong> ${process.env.SMTP_USER}</li>
              </ul>
            </div>
            <p style="color: #059669;">🎉 Sistema listo para enviar correos!</p>
          </div>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('❌ ERROR AL ENVIAR:', error.message);
          
          if (error.responseCode === 550) {
            console.log('💡 POSIBLE CAUSA: Dirección de correo rechazada');
          } else if (error.responseCode === 554) {
            console.log('💡 POSIBLE CAUSA: Mensaje rechazado como spam');
          }
        } else {
          console.log('✅ CORREO ENVIADO EXITOSAMENTE!');
          console.log('📧 Message ID:', info.messageId);
          if (info.response) {
            console.log('📋 Respuesta del servidor:', info.response);
          }
        }
        
        console.log('\n🎯 RESUMEN:');
        console.log('='.repeat(30));
        if (error) {
          console.log('❌ El envío de correos NO está funcionando');
          console.log('🔧 Revisa la configuración SMTP en Vercel');
        } else {
          console.log('✅ El envío de correos está funcionando correctamente');
          console.log('🚀 El problema puede estar en el endpoint de la API');
        }
      });
    }
  });
  
} catch (error) {
  console.log('❌ ERROR FATAL:', error.message);
}