# 🔍 Guía de Debug para Producción - Sistema de Correos

## 🚨 Situación Actual
- ✅ **Local**: Correos funcionan perfectamente
- ❌ **Producción**: Formulario no envía correos
- 🎯 **Objetivo**: Identificar y solucionar el problema en Vercel

## 📋 Checklist de Diagnóstico

### 1️⃣ Verificar Variables de Entorno en Vercel

**Accede a tu Dashboard de Vercel:**
1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Verifica que estas variables existen y tienen los valores correctos:

```env
SMTP_HOST=mail.exesoft.cl
SMTP_PORT=465
SMTP_USER=easyrdemo@exesoft.cl
SMTP_PASS=your_password_here
FROM_EMAIL=easyrdemo@exesoft.cl
FROM_NAME=EasyRif Demo
```

**⚠️ IMPORTANTE**: Configura `SMTP_PASS` con la contraseña correcta del email.

### 2️⃣ Revisar Logs de Vercel

**Pasos para acceder a los logs:**
1. En tu proyecto de Vercel, ve a **Functions**
2. Busca `/api/send-email`
3. Haz clic en **View Function Logs**
4. Busca errores recientes cuando intentaste enviar correos

**Errores comunes a buscar:**
- `Invalid login: 535 Incorrect authentication data` → Credenciales incorrectas
- `ECONNREFUSED` → No se puede conectar al servidor SMTP
- `timeout` → Problema de conectividad
- `Module not found` → Falta la dependencia nodemailer

### 3️⃣ Verificar Deployment

**Confirma que el último deploy incluye los cambios:**
1. Ve a **Deployments**
2. Verifica que el commit `0ec875b` (Fix: Corrección de credenciales SMTP) está deployado
3. Si no, haz un redeploy manual:
   - Haz clic en el deployment más reciente
   - Selecciona **Redeploy**

### 4️⃣ Test del Endpoint en Producción

**Usando la herramienta de debug:**
1. Abre `debug-produccion.js`
2. Actualiza la línea 15 con tu URL real de Vercel:
   ```javascript
   const VERCEL_URL = 'https://TU-PROYECTO.vercel.app';
   ```
3. Ejecuta: `node debug-produccion.js`

**Test manual con curl:**
```bash
curl -X POST https://TU-PROYECTO.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "easyrdemo@exesoft.cl", "subject": "Test", "message": "Test desde curl"}'
```

## 🔧 Soluciones por Tipo de Error

### Error: "Invalid login: 535 Incorrect authentication data"
**Causa**: Credenciales SMTP incorrectas en Vercel

**Solución**:
1. Ve a Vercel → Settings → Environment Variables
2. Edita `SMTP_PASS` y configura la contraseña correcta
3. Guarda y redeploya

### Error: "ECONNREFUSED" o "timeout"
**Causa**: Problema de conectividad con el servidor SMTP

**Solución**:
1. Verifica que `SMTP_HOST=mail.exesoft.cl`
2. Confirma que `SMTP_PORT=465`
3. Contacta al proveedor de hosting si persiste

### Error: "Cannot find module 'nodemailer'"
**Causa**: Dependencia no instalada en producción

**Solución**:
1. Verifica que `package.json` incluye nodemailer
2. Haz un nuevo commit y push
3. Vercel reinstalará las dependencias

### Error: "404 Not Found"
**Causa**: El archivo `/api/send-email.js` no existe en producción

**Solución**:
1. Verifica que el archivo está en tu repositorio
2. Confirma que el último commit lo incluye
3. Redeploya manualmente

## 🛠️ Comandos de Debug Útiles

### Verificar el endpoint desde terminal:
```bash
# Reemplaza TU-URL con tu dominio de Vercel
curl -X POST https://TU-URL.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com", "subject": "Test", "message": "Test message"}' \
  -v
```

### Ver logs en tiempo real:
```bash
# Instala Vercel CLI si no lo tienes
npm i -g vercel

# Autentícate
vercel login

# Ver logs en tiempo real
vercel logs --follow
```

## 📊 Diagnóstico Paso a Paso

### Paso 1: Verificar Variables
- [ ] `SMTP_HOST` = `mail.exesoft.cl`
- [ ] `SMTP_PORT` = `465`
- [ ] `SMTP_USER` = `easyrdemo@exesoft.cl`
- [ ] `SMTP_PASS` = `[contraseña_configurada]`
- [ ] `FROM_EMAIL` = `easyrdemo@exesoft.cl`
- [ ] `FROM_NAME` = `EasyRif Demo`

### Paso 2: Test del Endpoint
- [ ] Endpoint responde (no 404)
- [ ] No hay errores de sintaxis
- [ ] Credenciales funcionan
- [ ] Correo se envía exitosamente

### Paso 3: Verificar Logs
- [ ] No hay errores en Function Logs
- [ ] Deployment fue exitoso
- [ ] Todas las dependencias se instalaron

## 🎯 Próximos Pasos

1. **Ejecuta el checklist** de arriba en orden
2. **Usa la herramienta de debug** (`debug-produccion.js`)
3. **Revisa los logs de Vercel** para errores específicos
4. **Aplica la solución** correspondiente al error encontrado
5. **Prueba nuevamente** el formulario en producción

## 📞 Si Necesitas Ayuda Adicional

Si después de seguir esta guía el problema persiste:

1. **Copia los logs de error** de Vercel
2. **Ejecuta el debug-produccion.js** y copia la salida
3. **Verifica que todas las variables** están configuradas correctamente
4. **Intenta un redeploy manual** desde Vercel

---

**Estado**: 🔍 **DEBUGGING EN PROGRESO** - Sigue los pasos de esta guía