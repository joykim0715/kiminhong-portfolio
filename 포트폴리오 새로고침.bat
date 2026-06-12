@echo off
chcp 65001 >nul
title Portfolio — 브라우저 열기

set "URL=http://localhost:3000"

echo.
echo  포트폴리오 페이지를 엽니다: %URL%
echo.
echo  * 개발 서버가 먼저 실행 중이어야 합니다.
echo    (포트폴리오 시작.bat 사용)
echo  * 화면이 이전과 같으면 Ctrl+Shift+R 로 강력 새로고침
echo.

start "" "%URL%"
