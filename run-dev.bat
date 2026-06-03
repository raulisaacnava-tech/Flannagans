@echo off
cd /d "F:\Flannagans qr"
echo Starting Flanagans local server...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "while ($true) { Start-Sleep -Seconds 60; '' }" | npm.cmd run dev -- --port 3000 > dev-visible.log 2>&1
type dev-visible.log
pause
