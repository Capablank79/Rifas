# 🗄️ Configuración de Supabase para EasyRif

Esta guía te ayudará a configurar Supabase para capturar las solicitudes de demo del formulario de la landing page.

## 📋 Prerrequisitos

1. Cuenta en [Supabase](https://supabase.com)
2. Proyecto creado en Supabase
3. Acceso al SQL Editor de tu proyecto

## 🚀 Pasos de Configuración

### 1. Obtener Credenciales de Supabase

1. Ve a tu proyecto en Supabase
2. Navega a **Settings** → **API**
3. Copia los siguientes valores:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public key** (VITE_SUPABASE_ANON_KEY)

### 2. Configurar Variables de Entorno ✅ COMPLETADO

Las credenciales ya están configuradas en el archivo `.env`:
```env
VITE_SUPABASE_URL=https://fdqmyjuzgqvklhdesgik.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcW15anV6Z3F2a2xoZGVzZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTQ4MzIsImV4cCI6MjA2OTY5MDgzMn0.kJMvEuoO-0BSdYRAi1Yc00erlCqnoj9Kd2R3z9VWUaM
```

### 3. Crear la Tabla en Supabase 🔄 PENDIENTE

**IMPORTANTE**: Debes ejecutar este paso manualmente en Supabase:

1. Ve a tu proyecto en Supabase: https://fdqmyjuzgqvklhdesgik.supabase.co
2. Navega a **SQL Editor**
3. Crea una nueva query
4. Copia y pega el contenido del archivo `supabase-setup.sql` (ya corregido)
5. Ejecuta la query

**Script SQL listo para ejecutar:**
```sql
-- El script completo está en supabase-setup.sql
-- Crea la tabla demo_requests con todas las políticas de seguridad
```

### 4. Verificar la Configuración

1. Ve a **Table Editor** en Supabase
2. Deberías ver la tabla `demo_requests` creada
3. La tabla debe tener las siguientes columnas:
   - `id` (UUID, Primary Key)
   - `nombre` (VARCHAR)
   - `email` (VARCHAR)
   - `telefono` (VARCHAR)
   - `tipo_rifa` (VARCHAR)
   - `frecuencia` (VARCHAR)
   - `comentarios` (TEXT)
   - `created_at` (TIMESTAMP)

## 🔒 Seguridad

La tabla está configurada con **Row Level Security (RLS)** habilitado:

- ✅ **Inserción pública**: Cualquiera puede enviar solicitudes de demo
- ❌ **Lectura restringida**: Solo usuarios autenticados pueden leer los datos
- ❌ **Modificación/Eliminación**: No permitida públicamente

## 📊 Visualizar Solicitudes

Para ver las solicitudes de demo recibidas:

1. Ve a **Table Editor** en Supabase
2. Selecciona la tabla `demo_requests`
3. Verás todas las solicitudes ordenadas por fecha (más recientes primero)

## 🔧 Funciones Disponibles

El archivo `src/config/supabase.ts` incluye:

- `insertDemoRequest()` - Insertar nueva solicitud
- `getDemoRequests()` - Obtener todas las solicitudes (requiere autenticación)

## 🚨 Solución de Problemas

### Error: "Missing Supabase environment variables"
- Verifica que el archivo `.env` existe
- Confirma que las variables están correctamente configuradas
- Reinicia el servidor de desarrollo

### Error: "relation demo_requests does not exist"
- Ejecuta el script `supabase-setup.sql` en el SQL Editor
- Verifica que la tabla se creó correctamente

### Error de permisos
- Verifica que RLS está habilitado
- Confirma que las políticas se crearon correctamente

## 📈 Próximos Pasos

1. **Panel de Administración**: Crear una interfaz para gestionar solicitudes
2. **Notificaciones**: Configurar emails automáticos cuando lleguen solicitudes
3. **Analytics**: Implementar métricas de conversión
4. **Integración CRM**: Conectar con herramientas de gestión de clientes

---

**¿Necesitas ayuda?** Revisa la [documentación oficial de Supabase](https://supabase.com/docs) o contacta al equipo de desarrollo.