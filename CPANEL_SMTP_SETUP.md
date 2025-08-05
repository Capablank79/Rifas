# 📧 Configuración de cPanel SMTP para Envío de Correos

Esta guía te ayudará a configurar tu propio servicio SMTP de cPanel para enviar correos, reemplazando Resend y evitando costos adicionales.

## 🎯 Ventajas de usar cPanel SMTP

✅ **Sin costos adicionales** - Usa tu hosting existente  
✅ **Control total** - Tu propio servidor de correo  
✅ **Sin límites de terceros** - No dependes de servicios externos  
✅ **Dominio profesional** - Correos desde tu dominio (ej: `noreply@tudominio.com`)  
✅ **Mayor privacidad** - Los correos no pasan por servicios externos  

## 📋 Requisitos Previos

- ✅ Hosting con cPanel
- ✅ Dominio propio
- ✅ Acceso a cPanel
- ✅ Node.js y npm instalados

## 🚀 Paso 1: Crear Cuenta de Email en cPanel

### 1.1 Acceder a cPanel
1. Inicia sesión en tu cPanel
2. Busca la sección **"Email"**
3. Haz clic en **"Email Accounts"**

### 1.2 Crear Nueva Cuenta
1. Haz clic en **"+ Create"**
2. Completa los datos:
   - **Email**: `noreply` (o el nombre que prefieras)
   - **Domain**: Selecciona tu dominio
   - **Password**: Crea una contraseña segura
   - **Mailbox Quota**: Puedes usar "Unlimited" o asignar espacio
3. Haz clic en **"Create"**

## 🔧 Paso 2: Obtener Configuración SMTP

### 2.1 Acceder a Configuración
1. En la lista de cuentas de email, busca tu cuenta recién creada
2. Haz clic en **"Connect Devices"** al lado de tu cuenta

### 2.2 Copiar Configuración SMTP
En la página que se abre, busca la sección **"Mail Client Manual Settings"** y anota:

**Configuración SSL/TLS (Recomendada):**
- **Outgoing Server (SMTP)**: `tudominio.com` o `mail.tudominio.com`
- **SMTP Port**: `465`
- **Security**: SSL/TLS
- **Authentication**: Required

**Configuración Alternativa:**
- **Outgoing Server (SMTP)**: `mail.tudominio.com`
- **SMTP Port**: `587`
- **Security**: STARTTLS
- **Authentication**: Required

## ⚙️ Paso 3: Configurar Variables de Entorno

### 3.1 Archivo .env Local
Actualiza tu archivo `.env` con la nueva configuración:

```env
# Configuración SMTP de cPanel (reemplaza las variables de Resend)
SMTP_HOST=tudominio.com
SMTP_PORT=465
SMTP_USER=noreply@tudominio.com
SMTP_PASS=tu_contraseña_aqui
FROM_EMAIL=noreply@tudominio.com
FROM_NAME=EasyRif Demo

# Variables del frontend (mantener para compatibilidad)
VITE_FROM_EMAIL=noreply@tudominio.com
VITE_FROM_NAME=EasyRif Demo
```

### 3.2 Variables en Vercel (Producción)
Si usas Vercel, configura estas variables en tu dashboard:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `SMTP_HOST` | `tudominio.com` | Servidor SMTP de tu cPanel |
| `SMTP_PORT` | `465` | Puerto SMTP (465 para SSL) |
| `SMTP_USER` | `noreply@tudominio.com` | Usuario de email completo |
| `SMTP_PASS` | `tu_contraseña` | Contraseña del email |
| `FROM_EMAIL` | `noreply@tudominio.com` | Email remitente |
| `FROM_NAME` | `EasyRif Demo` | Nombre del remitente |

**⚠️ IMPORTANTE**: Después de agregar las variables, haz **Redeploy** del proyecto.

## 📦 Paso 4: Instalar Dependencias

Ejecuta en tu terminal:

```bash
npm install nodemailer
```

## 🧪 Paso 5: Probar la Configuración

### 5.1 Verificar Variables de Entorno
Visita: `https://tu-dominio.vercel.app/api/send-email?check=env`

Deberías ver:
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

### 5.2 Probar Envío de Email
Usa tu aplicación normalmente para solicitar una demo. El sistema ahora usará tu SMTP de cPanel.

## 🔍 Solución de Problemas

### ❌ Error: "Error de autenticación SMTP"
**Causa**: Credenciales incorrectas  
**Solución**: 
- Verifica que `SMTP_USER` sea el email completo (`noreply@tudominio.com`)
- Confirma que la contraseña sea correcta
- Intenta recrear la cuenta de email en cPanel

### ❌ Error: "Error de conexión SMTP"
**Causa**: Configuración de servidor incorrecta  
**Solución**: 
- Verifica que `SMTP_HOST` sea correcto (prueba `tudominio.com` o `mail.tudominio.com`)
- Confirma el puerto (465 para SSL, 587 para STARTTLS)
- Contacta a tu proveedor de hosting para confirmar configuración

### ❌ Error: "Timeout de conexión SMTP"
**Causa**: Firewall o restricciones del servidor  
**Solución**: 
- Contacta a tu proveedor de hosting
- Pregunta si hay restricciones en puertos SMTP
- Solicita que habiliten el envío SMTP externo

### ❌ Emails llegan a spam
**Causa**: Falta de registros DNS  
**Solución**: 
- Configura registros SPF en tu DNS
- Agrega registro SPF: `v=spf1 include:tudominio.com ~all`
- Considera configurar DKIM si tu hosting lo soporta

## 📊 Comparación: Resend vs cPanel SMTP

| Característica | Resend | cPanel SMTP |
|----------------|--------|-------------|
| **Costo** | $20/mes después de límite | Incluido en hosting |
| **Límite de envíos** | 3,000/mes gratis | Sin límite específico |
| **Configuración** | Fácil | Moderada |
| **Control** | Limitado | Total |
| **Dominio** | Requiere verificación | Tu dominio |
| **Dependencia** | Servicio externo | Tu hosting |

## 🎉 ¡Listo!

Ahora tu aplicación enviará correos usando tu propio servidor SMTP de cPanel, sin costos adicionales y con control total sobre el proceso.

### Próximos pasos recomendados:
1. ✅ Probar envío de correos
2. ✅ Configurar registros SPF para mejor entregabilidad
3. ✅ Monitorear logs de cPanel para verificar envíos
4. ✅ Considerar configurar DKIM para mayor seguridad

---

**💡 Tip**: Guarda las credenciales SMTP en un lugar seguro y considera usar un gestor de contraseñas para las variables de entorno de producción.