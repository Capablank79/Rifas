# 🚀 Guía de Deployment - EasyRif

## 📋 Resumen del Proyecto

- **Landing Principal**: Página de presentación con slideshow y formulario de contacto
- **Demo Funcional**: Aplicación completa para gestión de rifas
- **Comunicación**: La landing enlaza al demo mediante botones CTA

## 🏗️ Estructura de Deployment

```
Landing Principal (tudominio.com)
├── dist/ (archivos compilados)
└── Enlaza a → Demo (demo.tudominio.com)

Demo Funcional (demo.tudominio.com)
├── DEMO/dist/ (archivos compilados)
└── Aplicación completa de rifas
```

## 📁 Archivos Listos para Subir

### 1. Landing Principal
**Carpeta**: `Rifas-main/dist/`
**Destino**: Dominio principal (tudominio.com)
**Archivos**:
- `index.html` (página principal)
- `assets/` (CSS, JS, imágenes)
- `favicon.svg`
- `slides/` (45 imágenes del slideshow)
- `robots.txt`

### 2. Demo Funcional
**Carpeta**: `Rifas-main/DEMO/dist/`
**Destino**: Subdominio (demo.tudominio.com)
**Archivos**:
- `index.html` (aplicación demo)
- `assets/` (CSS, JS, fuentes)
- `favicon.svg`
- `images/` (ilustraciones)

## 🌐 Opciones de Hosting

### Opción 1: Hosting Tradicional (cPanel)
1. **Landing**: Subir `dist/` a `public_html/`
2. **Demo**: Subir `DEMO/dist/` a `public_html/demo/` o subdominio

### Opción 2: Servicios Separados
- **Landing**: Vercel/Netlify (gratis)
- **Demo**: Tu hosting actual

### Opción 3: Todo en tu Hosting
- **Landing**: Dominio principal
- **Demo**: Subdominio configurado

## ⚙️ Configuración Requerida

### 1. Variables de Entorno (Landing)
Crear archivo `.env` en la raíz:
```env
VITE_DEMO_URL=https://demo.tudominio.com
VITE_CONTACT_EMAIL=tu-email@dominio.com
```

### 2. Configuración del Servidor
- **Tipo**: SPA (Single Page Application)
- **Fallback**: Todas las rutas → `index.html`
- **HTTPS**: Recomendado para ambos sitios

## 📝 Pasos de Deployment

### Para Hosting Tradicional (cPanel):

1. **Preparar archivos**:
   ```bash
   # Ya están listos en:
   Rifas-main/dist/          # Landing
   Rifas-main/DEMO/dist/     # Demo
   ```

2. **Subir Landing**:
   - Acceder a cPanel → File Manager
   - Ir a `public_html/`
   - Subir todo el contenido de `dist/`

3. **Configurar Subdominio**:
   - cPanel → Subdomains
   - Crear: `demo.tudominio.com`
   - Apuntar a carpeta: `public_html/demo/`

4. **Subir Demo**:
   - Ir a `public_html/demo/`
   - Subir todo el contenido de `DEMO/dist/`

5. **Configurar Redirects** (opcional):
   - Crear `.htaccess` en ambas carpetas:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### Para Vercel/Netlify:

1. **Landing en Vercel**:
   - Conectar repositorio
   - Build command: `npm run build`
   - Output directory: `dist`
   - Configurar variable: `VITE_DEMO_URL`

2. **Demo en tu hosting**:
   - Subir `DEMO/dist/` al subdominio

## 🔗 URLs Finales

- **Landing**: `https://tudominio.com`
- **Demo**: `https://demo.tudominio.com`
- **Enlace automático**: El botón "Probar Demo Interactivo" abre el demo

## ✅ Verificación Post-Deployment

1. **Landing**:
   - ✅ Página carga correctamente
   - ✅ Slideshow funciona (45 imágenes)
   - ✅ Formulario de contacto
   - ✅ Botón "Probar Demo" enlaza al subdominio

2. **Demo**:
   - ✅ Aplicación carga en subdominio
   - ✅ Navegación funciona
   - ✅ Crear rifa funciona
   - ✅ Gestión de vendedores
   - ✅ Proceso de compra

## 🛠️ Troubleshooting

### Problema: "404 Not Found" en rutas
**Solución**: Configurar fallback a `index.html`

### Problema: Imágenes no cargan
**Solución**: Verificar que la carpeta `slides/` se subió correctamente

### Problema: Demo no enlaza
**Solución**: Verificar variable `VITE_DEMO_URL` en `.env`

## 📞 Soporte

Si necesitas ayuda con el deployment, contacta con el equipo de desarrollo.

---

**¡Tu plataforma EasyRif está lista para producción!** 🎉