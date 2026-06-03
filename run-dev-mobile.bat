@echo off
cd /d "F:\Flannagans qr"
echo.
echo Flanagans mobile preview
echo Open this URL on your phone while both devices use the same Wi-Fi:
echo http://192.168.1.110:3000/menu
echo.
echo If Windows Firewall asks for permission, allow Node.js on private networks.
echo.
npm.cmd run dev -- --hostname 0.0.0.0 --port 3000
pause
