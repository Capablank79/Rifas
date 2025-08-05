/**
 * Agente de Diagnóstico de Correos SMTP
 * 
 * Este script diagnostica problemas en el envío de correos
 * analizando logs y probando la configuración SMTP
 */

import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de colores para la consola
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

function logError(message) {
  log(`❌ ERROR: ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ SUCCESS: ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  WARNING: ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  INFO: ${message}`, 'blue');
}

// Función para verificar variables de entorno
function checkEnvironmentVariables() {
  logSection('🔍 VERIFICACIÓN DE VARIABLES DE ENTORNO');
  
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT', 
    'SMTP_USER',
    'SMTP_PASS',
    'FROM_EMAIL',
    'FROM_NAME'
  ];
  
  let allPresent = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      logSuccess(`${varName}: ${varName.includes('PASS') ? '***OCULTO***' : value}`);
    } else {
      logError(`${varName}: NO CONFIGURADA`);
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Función para probar la conexión SMTP
async function testSMTPConnection() {
  logSection('🔌 PRUEBA DE CONEXIÓN SMTP');
  
  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      debug: true, // Habilitar logs detallados
      logger: true // Habilitar logger
    });
    
    logInfo('Verificando conexión al servidor SMTP...');
    await transporter.verify();
    logSuccess('Conexión SMTP establecida correctamente');
    
    return transporter;
  } catch (error) {
    logError(`Error de conexión SMTP: ${error.message}`);
    
    // Diagnóstico específico de errores comunes
    if (error.code === 'ECONNREFUSED') {
      logWarning('El servidor SMTP rechazó la conexión. Verifica:');
      log('  - Host y puerto correctos', 'yellow');
      log('  - Firewall no bloquea la conexión', 'yellow');
    } else if (error.code === 'EAUTH') {
      logWarning('Error de autenticación. Verifica:');
      log('  - Usuario y contraseña correctos', 'yellow');
      log('  - Cuenta de email habilitada para SMTP', 'yellow');
    } else if (error.code === 'ETIMEDOUT') {
      logWarning('Timeout de conexión. Verifica:');
      log('  - Conexión a internet estable', 'yellow');
      log('  - Puerto no bloqueado por ISP', 'yellow');
    }
    
    return null;
  }
}

// Función para enviar correo de prueba
async function sendTestEmail(transporter) {
  logSection('📧 ENVÍO DE CORREO DE PRUEBA');
  
  const testEmail = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: process.env.FROM_EMAIL, // Enviar a nosotros mismos
    subject: '🧪 Prueba de Configuración SMTP - ' + new Date().toLocaleString(),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">✅ Prueba de SMTP Exitosa</h2>
        <p>Este correo confirma que la configuración SMTP está funcionando correctamente.</p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Detalles de la configuración:</h3>
          <ul>
            <li><strong>Host:</strong> ${process.env.SMTP_HOST}</li>
            <li><strong>Puerto:</strong> ${process.env.SMTP_PORT}</li>
            <li><strong>Usuario:</strong> ${process.env.SMTP_USER}</li>
            <li><strong>Desde:</strong> ${process.env.FROM_EMAIL}</li>
          </ul>
        </div>
        <p style="color: #059669;">🎉 ¡El sistema de correos está listo para usar!</p>
        <hr>
        <p style="font-size: 12px; color: #6b7280;">Enviado el: ${new Date().toLocaleString()}</p>
      </div>
    `
  };
  
  try {
    logInfo('Enviando correo de prueba...');
    const result = await transporter.sendMail(testEmail);
    logSuccess(`Correo enviado exitosamente!`);
    logInfo(`Message ID: ${result.messageId}`);
    if (result.response) {
      logInfo(`Respuesta del servidor: ${result.response}`);
    }
    return true;
  } catch (error) {
    logError(`Error al enviar correo: ${error.message}`);
    
    // Diagnóstico de errores de envío
    if (error.code === 'EMESSAGE') {
      logWarning('Error en el formato del mensaje');
    } else if (error.responseCode === 550) {
      logWarning('Dirección de correo rechazada por el servidor');
    } else if (error.responseCode === 554) {
      logWarning('Mensaje rechazado como spam');
    }
    
    return false;
  }
}

// Función para simular el endpoint de la API
async function simulateAPIEndpoint() {
  logSection('🔄 SIMULACIÓN DEL ENDPOINT /api/send-email');
  
  const testData = {
    to: process.env.FROM_EMAIL,
    subject: 'Prueba desde simulación de API',
    message: 'Este es un mensaje de prueba desde la simulación del endpoint.'
  };
  
  try {
    logInfo('Simulando llamada al endpoint...');
    
    // Simular la lógica del endpoint
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: testData.to,
      subject: testData.subject,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Mensaje desde la API</h2>
          <p>${testData.message}</p>
          <hr>
          <p style="font-size: 12px; color: #666;">Enviado desde: ${process.env.FROM_EMAIL}</p>
        </div>
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    logSuccess('Simulación del endpoint exitosa!');
    logInfo(`Message ID: ${result.messageId}`);
    
    return true;
  } catch (error) {
    logError(`Error en simulación del endpoint: ${error.message}`);
    return false;
  }
}

// Función principal de diagnóstico
async function runDiagnostics() {
  console.clear();
  logSection('🚀 AGENTE DE DIAGNÓSTICO DE CORREOS SMTP');
  log('Iniciando diagnóstico completo del sistema de correos...\n', 'magenta');
  
  // Paso 1: Verificar variables de entorno
  const varsOK = checkEnvironmentVariables();
  if (!varsOK) {
    logError('❌ Faltan variables de entorno críticas. Configúralas antes de continuar.');
    return;
  }
  
  // Paso 2: Probar conexión SMTP
  const transporter = await testSMTPConnection();
  if (!transporter) {
    logError('❌ No se pudo establecer conexión SMTP. Revisa la configuración.');
    return;
  }
  
  // Paso 3: Enviar correo de prueba
  const emailSent = await sendTestEmail(transporter);
  if (!emailSent) {
    logError('❌ No se pudo enviar el correo de prueba.');
    return;
  }
  
  // Paso 4: Simular endpoint de API
  const apiOK = await simulateAPIEndpoint();
  if (!apiOK) {
    logError('❌ Error en la simulación del endpoint.');
    return;
  }
  
  // Resumen final
  logSection('📊 RESUMEN DEL DIAGNÓSTICO');
  logSuccess('✅ Variables de entorno: OK');
  logSuccess('✅ Conexión SMTP: OK');
  logSuccess('✅ Envío de correo: OK');
  logSuccess('✅ Simulación de API: OK');
  
  log('\n🎉 ¡DIAGNÓSTICO COMPLETO! El sistema de correos está funcionando correctamente.', 'green');
  log('\nSi aún tienes problemas, revisa:', 'yellow');
  log('  1. Los logs de Vercel en tiempo real', 'yellow');
  log('  2. La configuración de variables en Vercel Dashboard', 'yellow');
  log('  3. Que el endpoint /api/send-email esté siendo llamado correctamente', 'yellow');
}

// Ejecutar diagnóstico si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  // Cargar variables de entorno desde .env si existe
  try {
    config();
  } catch (e) {
    logWarning('dotenv no encontrado. Asegúrate de tener las variables de entorno configuradas.');
  }
  
  runDiagnostics().catch(error => {
    logError(`Error fatal en diagnóstico: ${error.message}`);
    process.exit(1);
  });
}

export {
  runDiagnostics,
  checkEnvironmentVariables,
  testSMTPConnection,
  sendTestEmail,
  simulateAPIEndpoint
};