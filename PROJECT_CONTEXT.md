# 📋 Contexto del Proyecto EasyRif

## 🎯 Propósito General
Este proyecto es un **SaaS de gestión de rifas** que utiliza una estrategia de marketing de dos niveles:

### 🏠 **Proyecto Principal** (Carpeta Raíz)
- **Función**: Landing page promocional para el SaaS
- **Tecnologías**: React + TypeScript + Vite + shadcn-ui + Tailwind CSS
- **Objetivo**: 
  - Mostrar características del producto
  - Captar leads y registros
  - Promocionar el sistema de rifas
  - Convertir visitantes en usuarios registrados

### 🎮 **Carpeta DEMO**
- **Función**: Sistema completo y funcional de gestión de rifas
- **Tecnologías**: React + TypeScript + Bootstrap 5 + React Router
- **Características**:
  - Gestión completa de rifas
  - Sistema de vendedores
  - Proceso de compra
  - Sistema de sorteos
  - Gestión financiera (simulada)
  - Autenticación y roles
- **Acceso**: Solo para usuarios que se registren a través de la landing page

## 🔄 Flujo de Usuario
1. **Usuario visita** la landing page (proyecto principal)
2. **Se informa** sobre las características del SaaS
3. **Se registra** para solicitar acceso al demo
4. **Recibe acceso** al sistema completo (carpeta DEMO)
5. **Prueba** todas las funcionalidades antes de contratar

## 🛠️ Configuración de Desarrollo

### Proyecto Principal
```bash
cd Rifas
npm install --legacy-peer-deps
# Configurar variables de entorno (copiar .env.example a .env)
cp .env.example .env
# Editar .env con tus credenciales de Supabase
npm run dev
# Servidor: http://localhost:8080/
```

### DEMO
```bash
cd Rifas/DEMO
npm install
npm run dev
# Servidor: http://localhost:5173/
```

## 📁 Estructura de Archivos Importantes

### Proyecto Principal
- `src/App.tsx` - Configuración de rutas principales
- `src/pages/` - Páginas de la landing (Home, Pricing, etc.)
- `src/components/` - Componentes reutilizables con shadcn-ui
- `tailwind.config.ts` - Configuración de Tailwind CSS

### DEMO
- `src/App.tsx` - Aplicación completa con autenticación
- `src/pages/` - Páginas funcionales (Dashboard, CreateRaffle, etc.)
- `src/context/` - Contextos de React (Auth, Raffle)
- `src/services/` - Servicios y API calls

## 🎨 Tecnologías Utilizadas

### Landing Page
- **React 18** con TypeScript
- **Vite** como bundler
- **shadcn-ui** para componentes
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **TanStack Query** para manejo de estado
- **Supabase** para base de datos y backend

### DEMO
- **React 18** con TypeScript
- **Bootstrap 5** para UI
- **React Router DOM** para navegación
- **React Context** para estado global
- **Framer Motion** para animaciones
- **qrcode.react** para códigos QR

## 🚀 Scripts Disponibles

### Proyecto Principal
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build

### DEMO
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build

## 📝 Notas Importantes

1. **Separación clara**: La landing page y el DEMO son proyectos independientes
2. **Estrategia de negocio**: Landing para marketing, DEMO para conversión
3. **Dependencias**: Usar `--legacy-peer-deps` en el proyecto principal si hay conflictos
4. **Puertos**: Landing en 8080, DEMO en 5173 (por defecto)
5. **Vulnerabilidades**: Hay 7 vulnerabilidades menores que pueden resolverse con `npm audit fix`
6. **Base de datos**: Supabase configurado para capturar solicitudes de demo
7. **Configuración**: Ejecutar `supabase-setup.sql` en Supabase antes del primer uso

## 🔧 Solución de Problemas Comunes

### Error de instalación de dependencias
```bash
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
npm install --legacy-peer-deps
```

### Error de rollup/Node.js
- Problema conocido con Node.js v22.17.1
- Solución: Reinstalar dependencias con `--legacy-peer-deps`

### Puerto ocupado
- Cambiar puerto en `vite.config.ts` o usar `--port` flag

---

**Última actualización**: $(Get-Date -Format "yyyy-MM-dd HH:mm")
**Versión Node.js recomendada**: 16+ (evitar v22.17.1 por problemas con rollup)