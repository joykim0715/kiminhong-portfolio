@echo off
chcp 65001 >nul
title Portfolio Dev — 김인홍

set "NODE=C:\Program Files\nodejs"
set "PATH=%NODE%;%PATH%"
set "ROOT=%~dp0"
set "URL=http://localhost:3000"

cd /d "%ROOT%"

if not exist "%NODE%\npm.cmd" (
  echo [오류] Node.js를 찾을 수 없습니다.
  echo 경로 확인: %NODE%\npm.cmd
  pause
  exit /b 1
)

if not exist "package.json" (
  echo [오류] portfolio 폴더가 아닙니다. package.json을 찾을 수 없습니다.
  pause
  exit /b 1
)

cls
echo.
echo  ============================================
echo    김인홍 포트폴리오 — 개발 서버
echo  ============================================
echo.
echo    URL  : %URL%
echo    경로 : %ROOT%
echo    종료 : 이 창에서 Ctrl+C
echo.
echo    서버 준비 후 브라우저가 자동으로 열립니다.
echo    변경이 안 보이면 Ctrl+Shift+R (강력 새로고침)
echo  ============================================
echo.

start "" /MIN powershell -NoProfile -ExecutionPolicy Bypass -Command "for($i=0;$i -lt 45;$i++){try{Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2|Out-Null;Start-Process '%URL%';break}catch{Start-Sleep -Seconds 2}}"

"%NODE%\npm.cmd" run dev
