@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion

set "GIT=C:\Program Files\Git\bin\git.exe"
set "GH=C:\Program Files\GitHub CLI\gh.exe"
set "ROOT=%~dp0"
cd /d "%ROOT%"

echo.
echo ========================================
echo   김인홍 포트폴리오 - GitHub + Vercel 배포
echo ========================================
echo.

if not exist "%GIT%" (
  echo [오류] Git이 없습니다. Git for Windows를 설치한 뒤 다시 실행하세요.
  pause
  exit /b 1
)

if not exist "%GH%" (
  echo [오류] GitHub CLI가 없습니다. winget install GitHub.cli 후 다시 실행하세요.
  pause
  exit /b 1
)

echo [1/4] GitHub 로그인 확인...
"%GH%" auth status >nul 2>&1
if errorlevel 1 (
  echo.
  echo 브라우저가 열리면 GitHub 로그인을 완료하세요.
  echo.
  "%GH%" auth login -h github.com -p https -w
  if errorlevel 1 (
    echo [오류] GitHub 로그인에 실패했습니다.
    pause
    exit /b 1
  )
)

echo.
echo [2/4] 프로덕션 빌드 확인...
call npm.cmd run build
if errorlevel 1 (
  echo [오류] 빌드 실패. 위 메시지를 확인하세요.
  pause
  exit /b 1
)

echo.
echo [3/4] GitHub 저장소 생성 및 업로드...
"%GH%" repo view >nul 2>&1
if errorlevel 1 (
  set /p REPO_NAME="GitHub 저장소 이름 (기본: kiminhong-portfolio): "
  if "!REPO_NAME!"=="" set "REPO_NAME=kiminhong-portfolio"
  "%GH%" repo create !REPO_NAME! --public --source=. --remote=origin --push
  if errorlevel 1 (
    echo [오류] 저장소 생성/업로드 실패. 이름이 이미 있으면 다른 이름을 입력하세요.
    pause
    exit /b 1
  )
) else (
  echo 기존 remote가 있습니다. push만 진행합니다.
  "%GIT%" push -u origin main
  if errorlevel 1 (
    echo [오류] push 실패.
    pause
    exit /b 1
  )
)

for /f "delims=" %%u in ('"%GH%" repo view --json url -q .url') do set "REPO_URL=%%u"

echo.
echo [4/4] Vercel 배포 안내
echo.
echo GitHub 업로드 완료: %REPO_URL%
echo.
echo 이제 Vercel에서 Import만 하면 공개 링크가 생깁니다.
echo   1. https://vercel.com/new  접속 (GitHub 로그인)
echo   2. 방금 올린 저장소 선택 - Import
echo   3. Framework: Next.js (자동) - Deploy
echo.
echo Root Directory는 비워 두세요. (portfolio 폴더 자체가 repo 루트)
echo.

set /p OPEN_VERCEL="Vercel 새 프로젝트 페이지를 브라우저에서 열까요? (Y/n): "
if /i not "%OPEN_VERCEL%"=="n" start "" "https://vercel.com/new"

echo.
echo 이후 수정 시:
echo   코드 수정 -^> git add . -^> git commit -m "메시지" -^> git push
echo   Vercel이 자동으로 다시 배포합니다.
echo.
pause
