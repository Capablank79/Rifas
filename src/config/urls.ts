// Configuración de URLs para el proyecto
export const URLS = {
  // URL del demo (desde variables de entorno o fallback)
  DEMO: import.meta.env.VITE_DEMO_URL || 'https://rifas-demo.vercel.app/login',
  
  // URLs locales para desarrollo
  DEMO_LOCAL: import.meta.env.VITE_DEMO_LOCAL_URL || 'http://localhost:3001',
  
  // Función para obtener la URL correcta según el entorno
  getDemoUrl: () => {
    // En desarrollo usa localhost, en producción usa la URL de Vercel
    return import.meta.env.DEV ? URLS.DEMO_LOCAL : URLS.DEMO;
  }
};

// Rutas específicas del demo
export const DEMO_ROUTES = {
  HOME: '/',
  CREATE_RAFFLE: '/crear-rifa',
  MANAGE_RAFFLE: '/gestionar-rifa',
  SELL: '/vender',
  BUY: '/comprar'
};