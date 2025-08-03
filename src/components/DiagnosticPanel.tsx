import React, { useEffect, useState } from 'react';

interface DiagnosticData {
  mode: string;
  isProd: boolean;
  isDev: boolean;
  envVars: Record<string, string | undefined>;
  missingVars: string[];
  timestamp: string;
}

const DiagnosticPanel: React.FC = () => {
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [emailTestResult, setEmailTestResult] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Solo mostrar en desarrollo o si se pasa un parámetro especial
    const urlParams = new URLSearchParams(window.location.search);
    const showDiagnostic = import.meta.env.DEV || urlParams.get('debug') === 'env';
    
    if (showDiagnostic) {
      setIsVisible(true);
      runDiagnostic();
    }
  }, []);

  const runDiagnostic = () => {
    console.log('=== DIAGNÓSTICO DE VARIABLES DE ENTORNO ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Environment Mode:', import.meta.env.MODE);
    console.log('Is Production:', import.meta.env.PROD);
    console.log('Is Development:', import.meta.env.DEV);

    const envVars = {
      VITE_RESEND_API_KEY: import.meta.env.VITE_RESEND_API_KEY,
      VITE_FROM_EMAIL: import.meta.env.VITE_FROM_EMAIL,
      VITE_FROM_NAME: import.meta.env.VITE_FROM_NAME
    };

    console.log('\n=== VARIABLES DE ENTORNO ===');
    Object.entries(envVars).forEach(([key, value]) => {
      console.log(`${key}:`, value ? `[CONFIGURADA] ${value.substring(0, 10)}...` : '[NO CONFIGURADA]');
    });

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

    console.log('\n=== OBJETO COMPLETO import.meta.env ===');
    console.log(JSON.stringify(import.meta.env, null, 2));

    setDiagnosticData({
      mode: import.meta.env.MODE,
      isProd: import.meta.env.PROD,
      isDev: import.meta.env.DEV,
      envVars,
      missingVars,
      timestamp: new Date().toISOString()
    });
  };

  const testEmailAPI = async () => {
    setEmailTestResult('🔄 Probando API route de email...');
    
    const fromEmail = import.meta.env.VITE_FROM_EMAIL || 'onboarding@resend.dev';
    const fromName = import.meta.env.VITE_FROM_NAME || 'EasyRif Demo';
    
    try {
      // Probar nuestra API route en lugar de llamar directamente a Resend
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'test@example.com',
          subject: 'Test de diagnóstico desde ' + (import.meta.env.PROD ? 'PRODUCCIÓN' : 'DESARROLLO'),
          html: `<p>Este es un test de diagnóstico ejecutado el ${new Date().toISOString()}</p><p>Entorno: ${import.meta.env.PROD ? 'PRODUCCIÓN' : 'DESARROLLO'}</p>`,
          from: `${fromName} <${fromEmail}>`
        })
      });
      
      console.log('Status de respuesta API route:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        setEmailTestResult(`✅ API route funciona correctamente. Email ID: ${data.emailId}`);
        console.log('✅ API route funciona correctamente', data);
      } else {
        const errorData = await response.json();
        setEmailTestResult(`❌ Error en API route (${response.status}): ${errorData.error}`);
        console.error('❌ Error en API route:', errorData);
        
        // Mostrar detalles adicionales si están disponibles
        if (errorData.details) {
          console.error('❌ Detalles del error:', errorData.details);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setEmailTestResult(`❌ Error al conectar con API route: ${errorMessage}`);
      console.error('❌ Error al conectar con API route:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#1a1a1a',
      color: '#fff',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      fontSize: '12px',
      zIndex: 9999,
      border: '2px solid #333',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#4CAF50' }}>🔍 Diagnóstico ENV</h3>
        <button 
          onClick={() => setIsVisible(false)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}
        >
          ✕
        </button>
      </div>
      
      {diagnosticData && (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Entorno:</strong> {diagnosticData.mode} {diagnosticData.isProd ? '(PROD)' : '(DEV)'}
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Variables:</strong>
            {Object.entries(diagnosticData.envVars).map(([key, value]) => (
              <div key={key} style={{ marginLeft: '10px', color: value ? '#4CAF50' : '#f44336' }}>
                {key}: {value ? '✅ Configurada' : '❌ Faltante'}
              </div>
            ))}
          </div>
          
          {diagnosticData.missingVars.length > 0 && (
            <div style={{ marginBottom: '10px', color: '#f44336' }}>
              <strong>⚠️ Variables faltantes:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {diagnosticData.missingVars.map(varName => (
                  <li key={varName}>{varName}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={testEmailAPI}
            style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px',
              width: '100%'
            }}
          >
            🧪 Probar API de Email
          </button>
          
          {emailTestResult && (
            <div style={{ 
              background: '#333', 
              padding: '8px', 
              borderRadius: '4px',
              fontSize: '11px',
              whiteSpace: 'pre-wrap'
            }}>
              {emailTestResult}
            </div>
          )}
          
          <div style={{ marginTop: '10px', fontSize: '10px', color: '#888' }}>
            Timestamp: {diagnosticData.timestamp}
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '10px', color: '#888' }}>
        💡 Para ver en producción, añade ?debug=env a la URL
      </div>
    </div>
  );
};

export default DiagnosticPanel;