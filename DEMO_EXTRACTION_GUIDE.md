# Guía para Extraer la Carpeta DEMO como Proyecto Independiente

## Pasos para Separar el Proyecto DEMO

### 1. Preparar la Nueva Ubicación
```bash
# Crear una nueva carpeta fuera del proyecto principal
mkdir C:\Users\JLLV\Desktop\EasyRif-Demo
cd C:\Users\JLLV\Desktop\EasyRif-Demo
```

### 2. Copiar la Carpeta DEMO
```bash
# Copiar todo el contenido de la carpeta DEMO
cp -r C:\Users\JLLV\Desktop\EasyRif\EASYR\Rifas\DEMO/* C:\Users\JLLV\Desktop\EasyRif-Demo
```

### 3. Inicializar Git en el Nuevo Proyecto
```bash
cd C:\Users\JLLV\Desktop\EasyRif-Demo
git init
git add .
git commit -m "Initial commit: EasyRif Demo application"
```

### 4. Configurar Variables de Entorno
Crear archivo `.env` basado en `.env.example`:
```env
# Configuración de la aplicación
VITE_APP_NAME=EasyRif Demo
VITE_APP_VERSION=1.0.0

# URLs de servicios (para producción)
VITE_MERCADOPAGO_PUBLIC_KEY=tu_clave_publica_aqui
VITE_API_BASE_URL=https://tu-api.com

# Configuración de desarrollo
VITE_DEV_MODE=false
VITE_DEBUG=false

# Configuración de pagos (demo)
VITE_PAYMENT_DEMO_MODE=true
```

### 5. Instalar Dependencias
```bash
npm install
```

### 6. Probar el Proyecto
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Configuración para Vercel

### 1. Crear Repositorio en GitHub
1. Ve a GitHub y crea un nuevo repositorio llamado `easyrif-demo`
2. Conecta tu proyecto local:
```bash
git remote add origin https://github.com/tu-usuario/easyrif-demo.git
git branch -M main
git push -u origin main
```

### 2. Configurar Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa el repositorio `easyrif-demo`
4. Configura las variables de entorno en Vercel:
   - `VITE_APP_NAME=EasyRif Demo`
   - `VITE_APP_VERSION=1.0.0`
   - `VITE_MERCADOPAGO_PUBLIC_KEY=tu_clave_aqui`
   - `VITE_API_BASE_URL=https://tu-api.com`
   - `VITE_DEV_MODE=false`
   - `VITE_DEBUG=false`
   - `VITE_PAYMENT_DEMO_MODE=true`

### 3. Configuración Automática de Vercel
Vercel detectará automáticamente:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Desplegar
1. Haz clic en "Deploy"
2. Espera a que termine el build
3. Tu aplicación estará disponible en una URL como: `https://easyrif-demo.vercel.app`

## Ventajas de Separar el Proyecto

✅ **Control de versiones independiente**
✅ **Despliegue más rápido** (solo la demo)
✅ **Configuración específica** para la demo
✅ **Menor tamaño del repositorio**
✅ **Facilita colaboración** en la demo
✅ **URLs personalizadas** para la demo

## Estructura Final
```
C:\Users\JLLV\Desktop\
├── EasyRif\                    # Proyecto principal (landing)
│   └── EASYR\Rifas\
└── EasyRif-Demo\               # Proyecto demo independiente
    ├── src\
    ├── public\
    ├── package.json
    ├── vercel.json
    └── ...
```

## Comandos Útiles

```bash
# En el proyecto demo
cd C:\Users\JLLV\Desktop\EasyRif-Demo

# Desarrollo
npm run dev

# Build
npm run build

# Actualizar en GitHub
git add .
git commit -m "Update demo"
git push
```

¡Listo! Ahora tienes la demo como un proyecto completamente independiente y listo para Vercel.