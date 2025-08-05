/**
 * 🔍 HERRAMIENTA PARA ENCONTRAR LA URL DE PRODUCCIÓN
 * 
 * Este script ayuda a identificar la URL correcta del proyecto RIFAS en Vercel
 */

console.log('🔍 BUSCANDO URL DE PRODUCCIÓN DEL PROYECTO RIFAS');
console.log('=' .repeat(60));

console.log('\n📋 INFORMACIÓN DEL PROYECTO:');
console.log('• Nombre del proyecto: vite_react_shadcn_ts');
console.log('• Carpeta: RIFAS (no RIFAS-DEMO)');
console.log('• Framework: Vite + React');

console.log('\n🎯 POSIBLES URLs DE PRODUCCIÓN:');
const possibleUrls = [
  'https://vite-react-shadcn-ts.vercel.app',
  'https://easyrif.vercel.app', 
  'https://rifas.vercel.app',
  'https://easyrif-rifas.vercel.app',
  'https://rifas-easyrif.vercel.app',
  'https://easyrifas.vercel.app'
];

possibleUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

console.log('\n🛠️ PASOS PARA ENCONTRAR LA URL CORRECTA:');
console.log('\n1️⃣ REVISAR VERCEL DASHBOARD:');
console.log('   • Ve a https://vercel.com/dashboard');
console.log('   • Busca el proyecto que corresponde a la carpeta RIFAS');
console.log('   • Copia la URL de producción');

console.log('\n2️⃣ VERIFICAR EN GIT:');
console.log('   • git remote -v');
console.log('   • Buscar el repositorio conectado a Vercel');

console.log('\n3️⃣ PROBAR URLs MANUALMENTE:');
console.log('   • Abre cada URL posible en el navegador');
console.log('   • Identifica cuál muestra el proyecto RIFAS');

console.log('\n4️⃣ VERIFICAR LOGS DE ERROR:');
console.log('   • Los logs muestran que el error viene del proyecto en producción');
console.log('   • El error indica: "API Key no configurada"');
console.log('   • Esto confirma que el proyecto existe pero tiene mal configuradas las variables');

console.log('\n🔧 COMANDOS DE VERIFICACIÓN:');
console.log('\nPara cada URL posible, ejecuta:');
console.log('```powershell');
possibleUrls.forEach(url => {
  console.log(`# Probar ${url}`);
  console.log(`Invoke-RestMethod -Uri "${url}/api/send-email?check=env" -Method GET`);
  console.log('');
});
console.log('```');

console.log('\n✅ CUANDO ENCUENTRES LA URL CORRECTA:');
console.log('1. Actualiza debug-produccion.js con la URL real');
console.log('2. Actualiza verificar-produccion.ps1 con la URL real');
console.log('3. Ejecuta las herramientas de debug');
console.log('4. Configura las variables SMTP en Vercel');

console.log('\n🚨 RECORDATORIO:');
console.log('• El error "API Key no configurada" indica que el proyecto existe');
console.log('• Pero está usando Resend en lugar de cPanel SMTP');
console.log('• Una vez encontrada la URL, hay que actualizar las variables en Vercel');

console.log('\n📞 SI NO ENCUENTRAS LA URL:');
console.log('• Revisa el dashboard de Vercel');
console.log('• Busca proyectos recientes');
console.log('• Verifica que el proyecto RIFAS esté deployado');
console.log('• Si no existe, hay que hacer el primer deploy');