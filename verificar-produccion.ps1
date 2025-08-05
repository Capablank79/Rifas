# 🔍 Script de Verificación de Producción
# Ejecutar después de actualizar las variables en Vercel

Write-Host "🔍 VERIFICACIÓN DEL SISTEMA DE CORREOS EN PRODUCCIÓN" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

$baseUrl = "https://rifas-bice.vercel.app"

# Función para mostrar resultados
function Show-Result {
    param(
        [string]$Test,
        [bool]$Success,
        [string]$Details = ""
    )
    
    if ($Success) {
        Write-Host "✅ $Test" -ForegroundColor Green
    } else {
        Write-Host "❌ $Test" -ForegroundColor Red
    }
    
    if ($Details) {
        Write-Host "   $Details" -ForegroundColor Gray
    }
}

# Test 1: Verificar variables de entorno
Write-Host "`n1️⃣ VERIFICANDO VARIABLES DE ENTORNO..." -ForegroundColor Yellow

try {
    $envResponse = Invoke-RestMethod -Uri "$baseUrl/api/send-email?check=env" -Method GET
    $envStatus = $envResponse.envStatus
    
    # Verificar que las variables SMTP estén presentes
    $smtpVarsPresent = $envStatus.SMTP_HOST -and $envStatus.SMTP_PORT -and $envStatus.SMTP_USER -and $envStatus.SMTP_PASS
    $resendPresent = $envStatus.PSObject.Properties.Name -contains "RESEND_API_KEY"
    
    Show-Result "Variables SMTP configuradas" $smtpVarsPresent
    Show-Result "Resend eliminado" (-not $resendPresent)
    
    if ($smtpVarsPresent -and -not $resendPresent) {
        Write-Host "   ✅ Configuración correcta detectada" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Configuración incorrecta - revisar variables en Vercel" -ForegroundColor Red
        Write-Host "   Variables detectadas:" -ForegroundColor Gray
        $envStatus | Format-Table -AutoSize
    }
    
} catch {
    Show-Result "Acceso al endpoint de verificación" $false "Error: $($_.Exception.Message)"
}

# Test 2: Probar envío de correo
Write-Host "`n2️⃣ PROBANDO ENVÍO DE CORREO..." -ForegroundColor Yellow

$emailData = @{
    to = "easyrdemo@exesoft.cl"
    subject = "✅ Test de Producción - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    html = @"
<h1>🎉 ¡Éxito en Producción!</h1>
<p>Este correo confirma que el sistema de envío está funcionando correctamente en Vercel.</p>
<ul>
<li>✅ Variables SMTP configuradas</li>
<li>✅ Endpoint funcionando</li>
<li>✅ Autenticación exitosa</li>
<li>✅ Correo enviado desde producción</li>
</ul>
<p><strong>Fecha:</strong> $(Get-Date)</p>
<p><strong>Servidor:</strong> Vercel + cPanel SMTP</p>
"@
} | ConvertTo-Json

try {
    $emailResponse = Invoke-RestMethod -Uri "$baseUrl/api/send-email" -Method POST -ContentType "application/json" -Body $emailData
    
    if ($emailResponse.success) {
        Show-Result "Envío de correo" $true "Correo enviado exitosamente"
        Write-Host "   📧 Revisa la bandeja de entrada de easyrdemo@exesoft.cl" -ForegroundColor Green
    } else {
        Show-Result "Envío de correo" $false "Error: $($emailResponse.error)"
    }
    
} catch {
    $errorDetails = $_.Exception.Message
    if ($errorDetails -like "*resend*") {
        Show-Result "Envío de correo" $false "Todavía usando Resend - actualizar variables en Vercel"
    } elseif ($errorDetails -like "*authentication*") {
        Show-Result "Envío de correo" $false "Error de autenticación SMTP - verificar credenciales"
    } else {
        Show-Result "Envío de correo" $false "Error: $errorDetails"
    }
}

# Test 3: Verificar endpoint del formulario
Write-Host "`n3️⃣ VERIFICANDO ACCESO AL SITIO WEB..." -ForegroundColor Yellow

try {
    $webResponse = Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing
    Show-Result "Sitio web accesible" ($webResponse.StatusCode -eq 200)
    Write-Host "   🌐 Sitio disponible en: $baseUrl" -ForegroundColor Green
} catch {
    Show-Result "Sitio web accesible" $false "Error: $($_.Exception.Message)"
}

# Resumen final
Write-Host "`n📊 RESUMEN DE VERIFICACIÓN" -ForegroundColor Cyan
Write-Host "=" * 40 -ForegroundColor Cyan

Write-Host "`n🎯 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "1. Si todos los tests pasaron: ✅ El sistema está funcionando"
Write-Host "2. Si hay errores de variables: 🔧 Actualizar en Vercel Dashboard"
Write-Host "3. Si hay errores de autenticación: 🔐 Verificar credenciales SMTP"
Write-Host "4. Probar el formulario web en: $baseUrl"

Write-Host "`n🔗 ENLACES ÚTILES:" -ForegroundColor Yellow
Write-Host "• Vercel Dashboard: https://vercel.com/dashboard"
Write-Host "• Sitio web: $baseUrl"
Write-Host "• API Endpoint: $baseUrl/api/send-email"
Write-Host "• Variables Check: $baseUrl/api/send-email?check=env"

Write-Host "`n✨ Verificación completada - $(Get-Date)" -ForegroundColor Green