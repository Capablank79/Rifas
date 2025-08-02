# 🚀 Guía de Deployment en Vercel - EasyRif

## 📋 Preparación para Producción

### ✅ Estado Actual
- ✅ Formulario funcionando en localhost
- ✅ Conexión a Supabase establecida
- ✅ RLS configurado correctamente
- ✅ Archivos de configuración listos

## 🌐 Deployment en Vercel

### 1. **Preparar el Repositorio**

```bash
# Si no tienes Git inicializado
git init
git add .
git commit -m "Initial commit - EasyRif ready for production"

# Subir a GitHub/GitLab
git remote add origin https://github.com/tu-usuario/easyrif.git
git push -u origin main
```

### 2. **Configurar Variables de Entorno en Vercel**

En el dashboard de Vercel → Settings → Environment Variables:

```env
# Supabase (CRÍTICO - usar los valores exactos del .env)
VITE_SUPABASE_URL=https://fdqmyjuzgqvklhdesgik.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcW15anV6Z3F2a2xoZGVzZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTQ4MzIsImV4cCI6MjA2OTY5MDgzMn0.kJMvEuoO-0BSdYRAi1Yc00erlCqnoj9Kd2R3z9VWUaM

# Contacto
VITE_CONTACT_EMAIL=easyrdemo@exesoft.cl
VITE_CONTACT_PHONE=+56912345678

# Demo URL (actualizar con tu dominio de Vercel)
VITE_DEMO_URL=https://tu-proyecto.vercel.app
```

### 3. **Configuración de Build en Vercel**

**Framework Preset**: `Vite`
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

### 4. **Verificar vercel.json**

El archivo `vercel.json` ya está configurado correctamente:
- ✅ SPA routing configurado
- ✅ Headers de seguridad
- ✅ Cache para assets

## 🔧 Pasos de Deployment

### Opción A: Desde GitHub
1. **Conectar repositorio** en Vercel
2. **Configurar variables** de entorno
3. **Deploy automático** en cada push

### Opción B: Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login y deploy
vercel login
vercel

# Configurar variables de entorno
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
# ... resto de variables

# Redeploy con variables
vercel --prod
```

## ✅ Checklist Post-Deployment

### 1. **Verificar Formulario**
- [ ] Abrir `https://tu-proyecto.vercel.app`
- [ ] Llenar formulario "Solicitar Demo Gratuita"
- [ ] Confirmar que se envía sin errores
- [ ] Verificar datos en Supabase Table Editor

### 2. **Verificar Funcionalidades**
- [ ] Slideshow funcionando
- [ ] Navegación entre secciones
- [ ] Botones CTA funcionando
- [ ] Responsive design
- [ ] Velocidad de carga

### 3. **Configurar Dominio Personalizado** (Opcional)
```
Vercel Dashboard → Settings → Domains
→ Agregar tu dominio personalizado
→ Configurar DNS según instrucciones
```

## 🚨 Troubleshooting

### Error: "Formulario no envía datos"
**Solución**: Verificar variables de entorno en Vercel
```bash
# Verificar variables
vercel env ls

# Si faltan, agregarlas
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Error: "Build failed"
**Solución**: Verificar dependencias
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error: "404 en rutas"
**Solución**: Ya configurado en `vercel.json` con rewrites

## 📊 Monitoreo Post-Deployment

### 1. **Analytics de Vercel**
- Visitas y rendimiento
- Core Web Vitals
- Errores de función

### 2. **Supabase Dashboard**
- Requests de API
- Datos del formulario
- Logs de errores

### 3. **Logs en Tiempo Real**
```bash
# Ver logs de Vercel
vercel logs https://tu-proyecto.vercel.app
```

## 🎯 URLs Finales

**Producción**: `https://tu-proyecto.vercel.app`
**Preview**: `https://tu-proyecto-git-branch.vercel.app`
**Dashboard**: `https://vercel.com/tu-usuario/tu-proyecto`

---

## 🚀 ¡Listo para Producción!

Una vez completados estos pasos:
1. ✅ **Formulario funcionando** en producción
2. ✅ **Datos guardándose** en Supabase
3. ✅ **SSL automático** con Vercel
4. ✅ **CDN global** para velocidad
5. ✅ **Dominio personalizado** (opcional)

**¡Tu landing page EasyRif estará lista para recibir solicitudes de demo reales!**