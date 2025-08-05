# 🔄 Migración de Resend a cPanel SMTP

## 📋 Resumen de Cambios Realizados

Se ha migrado el sistema de envío de correos de **Resend** a **cPanel SMTP** para eliminar costos y tener control total sobre el envío de correos.

### 📁 Archivos Modificados

1. **`/api/send-email.js`** - API principal de envío
   - ✅ Reemplazado Resend API con Nodemailer
   - ✅ Agregada configuración SMTP
   - ✅ Mejorado manejo de errores específicos

2. **`package.json`** - Dependencias
   - ✅ Agregado `nodemailer@^6.9.8`

3. **`.env.example`** - Variables de entorno
   - ✅ Agregadas variables SMTP
   - ✅ Comentadas variables de Resend

4. **`CPANEL_SMTP_SETUP.md`** - Documentación nueva
   - ✅ Guía completa de configuración
   - ✅ Solución de problemas

## 🚀 Pasos para Completar la Migración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar cPanel

#### 2.1 Crear Cuenta de Email
1. Accede a tu cPanel
2. Ve a **Email → Email Accounts**
3. Crea una nueva cuenta:
   - Email: `noreply@tudominio.com`
   - Contraseña: (genera una segura)

#### 2.2 Obtener Configuración SMTP
1. Haz clic en **"Connect Devices"** junto a tu nueva cuenta
2. Anota la configuración SMTP:
   - **Host**: `tudominio.com` o `mail.tudominio.com`
   - **Puerto**: `465` (SSL) o `587` (STARTTLS)
   - **Usuario**: `noreply@tudominio.com`
   - **Contraseña**: la que creaste

### 3. Actualizar Variables de Entorno

#### 3.1 Archivo .env Local
Crea/actualiza tu archivo `.env`:

```env
# Configuración SMTP de cPanel
SMTP_HOST=tudominio.com
SMTP_PORT=465
SMTP_USER=noreply@tudominio.com
SMTP_PASS=tu_contraseña_aqui
FROM_EMAIL=noreply@tudominio.com
FROM_NAME=EasyRif Demo

# Frontend (compatibilidad)
VITE_FROM_EMAIL=noreply@tudominio.com
VITE_FROM_NAME=EasyRif Demo
```

#### 3.2 Variables en Vercel
Si usas Vercel, configura en **Settings → Environment Variables**:

| Variable | Valor |
|----------|-------|
| `SMTP_HOST` | `tudominio.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `noreply@tudominio.com` |
| `SMTP_PASS` | `tu_contraseña` |
| `FROM_EMAIL` | `noreply@tudominio.com` |
| `FROM_NAME` | `EasyRif Demo` |

**⚠️ IMPORTANTE**: Haz **Redeploy** después de agregar variables.

### 4. Eliminar Variables de Resend (Opcional)

Puedes eliminar estas variables de Vercel:
- `RESEND_API_KEY`
- `VITE_RESEND_API_KEY`

*(Mantén las de `FROM_EMAIL` y `FROM_NAME` ya que ahora apuntan a tu dominio)*

## 🧪 Verificación

### 1. Verificar Variables
Visita: `https://tu-app.vercel.app/api/send-email?check=env`

Espera ver todas las variables SMTP como `true`:
```json
{
  "envStatus": {
    "SMTP_HOST": true,
    "SMTP_PORT": true,
    "SMTP_USER": true,
    "SMTP_PASS": true,
    "FROM_EMAIL": true,
    "FROM_NAME": true
  }
}
```

### 2. Probar Envío
1. Ve a tu landing page
2. Solicita una demo con tu email
3. Verifica que llegue el correo

## 🔧 Solución de Problemas

### ❌ "Error de autenticación SMTP"
- Verifica credenciales en cPanel
- Asegúrate que `SMTP_USER` sea el email completo
- Confirma que la contraseña sea correcta

### ❌ "Error de conexión SMTP"
- Prueba diferentes hosts: `tudominio.com` vs `mail.tudominio.com`
- Verifica el puerto (465 vs 587)
- Contacta a tu hosting para confirmar configuración

### ❌ "Timeout de conexión"
- Tu hosting puede tener restricciones SMTP
- Contacta soporte para habilitar envío SMTP externo

### ❌ Correos van a spam
- Configura registro SPF en tu DNS:
  ```
  v=spf1 include:tudominio.com ~all
  ```
- Considera configurar DKIM si está disponible

## 📊 Beneficios de la Migración

| Aspecto | Antes (Resend) | Ahora (cPanel) |
|---------|----------------|----------------|
| **Costo mensual** | $20+ después de límite | $0 (incluido en hosting) |
| **Límite de envíos** | 3,000/mes gratis | Sin límite específico |
| **Control** | Limitado | Total |
| **Dependencia** | Servicio externo | Tu hosting |
| **Dominio** | Requiere verificación | Tu dominio |

## 🎯 Próximos Pasos Recomendados

1. ✅ **Monitorear logs** - Revisa logs de cPanel para verificar envíos
2. ✅ **Configurar SPF** - Mejora la entregabilidad
3. ✅ **Backup de configuración** - Guarda las credenciales SMTP
4. ✅ **Documentar para el equipo** - Comparte la nueva configuración

## 🔄 Rollback (Si es necesario)

Si necesitas volver a Resend:

1. Descomenta las variables de Resend en `.env.example`
2. Revierte los cambios en `/api/send-email.js`
3. Elimina `nodemailer` del `package.json`
4. Configura las variables de Resend en Vercel

---

**✅ ¡Migración Completada!**

Ahora tu aplicación envía correos usando tu propio servidor SMTP sin costos adicionales y con control total del proceso.