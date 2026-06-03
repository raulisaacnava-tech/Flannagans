Set-Location -LiteralPath 'F:\Flannagans qr'

$hostIp = '192.168.1.110'
$port = 3000
$url = "http://${hostIp}:${port}/menu"

Write-Host ""
Write-Host "Flanagans mobile preview"
Write-Host "Open this URL on your phone while both devices use the same Wi-Fi:"
Write-Host $url
Write-Host ""
Write-Host "If Windows Firewall asks for permission, allow Node.js on private networks."
Write-Host ""

& npm.cmd run dev -- --hostname 0.0.0.0 --port $port
