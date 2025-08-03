# 🚀 Configuración de Variables de Entorno en Vercel

## ⚠️ IMPORTANTE: Seguridad de API Keys

La API key de Resend fue expuesta en el repositorio público. Para solucionarlo:

### 1. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a **Settings** → **Environment Variables**
3. Añade las siguientes variables:

```
VITE_RESEND_API_KEY=re_Crcpwrdh_G4XseJS2sRC938N6hixaxEKm
VITE_FROM_EMAIL=onboarding@resend.dev
VITE_FROM_NAME=EasyRif Demo
```

### 2. Configurar para todos los entornos

- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### 3. Redeploy después de configurar

Después de añadir las variables de entorno:
1. Ve a **Deployments**
2. Haz clic en **Redeploy** en el último deployment
3. Selecciona **Use existing Build Cache** = NO

### 4. Verificar configuración

Las variables de entorno deben estar disponibles en `process.env` o `import.meta.env` en Vite.

### 5. Seguridad adicional

- ❌ **NUNCA** commitear API keys reales al repositorio
- ✅ Usar placeholders en archivos `.env` del repositorio
- ✅ Configurar API keys reales solo en Vercel
- ✅ Rotar la API key expuesta en Resend Dashboard

## 🔄 Próximos pasos

1. **Rotar API Key en Resend:**
   - Ve a Resend Dashboard
   - Genera una nueva API key
   - Actualiza la variable en Vercel
   - Elimina la API key comprometida

2. **Limpiar historial de Git (opcional):**
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch EMAIL_TROUBLESHOOTING.md' --prune-empty --tag-name-filter cat -- --all
   ```

3. **Verificar funcionamiento:**
   - Probar formulario en producción
   - Confirmar recepción de emails
   - Verificar logs en Vercel