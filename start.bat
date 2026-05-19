@echo off
echo ============================================
echo  Chef's Pho - Starting Application
echo ============================================
echo.
echo  Backend  : http://localhost:5029
echo  Frontend : http://localhost:5174
echo.
echo  Press Ctrl+C in each window to stop.
echo ============================================
echo.

start "ChefsPho Backend" cmd /k "cd /d %~dp0backend && npm start"
timeout /t 2 /nobreak >nul
start "ChefsPho Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 3 /nobreak >nul
start "" http://localhost:5174
