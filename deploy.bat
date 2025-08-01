@echo off
echo ========================================
echo    EASYRIF - SCRIPT DE DEPLOYMENT
echo ========================================
echo.

echo [1/4] Limpiando builds anteriores...
if exist "dist" rmdir /s /q "dist"
if exist "DEMO\dist" rmdir /s /q "DEMO\dist"

echo [2/4] Construyendo Landing Principal...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Fallo en build de Landing
    pause
    exit /b 1
)

echo [3/4] Construyendo Demo...
cd DEMO
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Fallo en build de Demo
    pause
    exit /b 1
)
cd ..

echo [4/4] Copiando archivos de configuración...
copy "dist\.htaccess" "dist\.htaccess.backup" >nul 2>&1
copy "DEMO\dist\.htaccess" "DEMO\dist\.htaccess.backup" >nul 2>&1

echo.
echo ========================================
echo        DEPLOYMENT COMPLETADO
echo ========================================
echo.
echo Archivos listos para subir:
echo.
echo Landing Principal: dist\
echo Demo Funcional:    DEMO\dist\
echo.
echo Consulta DEPLOYMENT_GUIDE.md para instrucciones detalladas.
echo.
pause