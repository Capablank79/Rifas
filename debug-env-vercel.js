// Script de diagnóstico para variables de entorno en Vercel
// Este script ayuda a identificar problemas con variables VITE_ en producción

console.log('=== DIAGNÓSTICO DE VARIABLES DE ENTORNO ===');
console.log('Timestamp:', new Date().toISOString());
console.log('Environment Mode:', import.meta.env.MODE);
console.log('Is Production:', import.meta.env.PROD);
console.log('Is Development:', import.meta.env.DEV);

// Verificar variables de entorno específicas
const envVars = {
  VITE_RESEND_API_KEY: import.meta.env.VITE_RESEND_API_KEY,
  VITE_FROM_EMAIL: import.meta.env.VITE_FROM_EMAIL,
  VITE_FROM_NAME: import.meta.env.VITE_FROM_NAME
};

console.log('\n=== VARIABLES DE ENTORNO ===');
Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key}:`, value ? `[CONFIGURADA] ${value.substring(0, 10)}...` : '[NO CONFIGURADA]');
});

// Verificar si todas las variables están configuradas
const missingVars = Object.entries(envVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('\n❌ VARIABLES FALTANTES:', missingVars);
  console.error('\n🔧 SOLUCIÓN:');
  console.error('1. Ir al dashboard de Vercel');
  console.error('2. Configurar las variables en Settings > Environment Variables');
  console.error('3. Asegurar que estén configuradas para Production');
  console.error('4. Hacer redeploy sin usar caché');
} else {
  console.log('\n✅ Todas las variables están configuradas');
}

// Verificar objeto completo import.meta.env
console.log('\n=== OBJETO COMPLETO import.meta.env ===');
console.log(JSON.stringify(import.meta.env, null, 2));

// Función para probar el envío de email
export const testEmailService = async () => {
  console.log('\n=== PRUEBA DE SERVICIO DE EMAIL ===');
  
  if (!envVars.VITE_RESEND_API_KEY) {
    console.error('❌ No se puede probar: VITE_RESEND_API_KEY no configurada');
    return false;
  }
  
  try {
    // Simular llamada a Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${envVars.VITE_RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: envVars.VITE_FROM_EMAIL || 'test@example.com',
        to: 'test@example.com',
        subject: 'Test de diagnóstico',
        html: '<p>Este es un test de diagnóstico</p>'
      })
    });
    
    console.log('Status de respuesta:', response.status);
    
    if (response.ok) {
      console.log('✅ API de Resend responde correctamente');
      return true;
    } else {
      const errorData = await response.text();
      console.error('❌ Error en API de Resend:', errorData);
      return false;
    }
  } catch (error) {
    console.error('❌ Error al conectar con Resend:', error.message);
    return false;
  }
};

// Ejecutar diagnóstico automáticamente
if (typeof window !== 'undefined') {
  // Solo ejecutar en el navegador
  console.log('\n=== EJECUTANDO EN NAVEGADOR ===');
  testEmailService();
}

export default {
  envVars,
  missingVars,
  testEmailService
};