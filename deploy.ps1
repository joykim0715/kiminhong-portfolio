# Portfolio deploy: GitHub upload + Vercel guide
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Root = $PSScriptRoot
Set-Location $Root

$Git = "C:\Program Files\Git\bin\git.exe"
$Gh = "C:\Program Files\GitHub CLI\gh.exe"
$Npm = "C:\Program Files\nodejs\npm.cmd"

function Test-GhLoggedIn {
    cmd /c "`"$Gh`" auth status >nul 2>nul"
    return ($LASTEXITCODE -eq 0)
}

function Test-GhRepoLinked {
    cmd /c "`"$Gh`" repo view >nul 2>nul"
    return ($LASTEXITCODE -eq 0)
}

Write-Host ""
Write-Host "========================================"
Write-Host "  Portfolio deploy (GitHub + Vercel)"
Write-Host "========================================"
Write-Host ""

if (-not (Test-Path $Git)) {
    Write-Host "[ERROR] Git not found. Install Git for Windows first."
    exit 1
}

if (-not (Test-Path $Gh)) {
    Write-Host "[ERROR] GitHub CLI not found. Run: winget install GitHub.cli"
    exit 1
}

if (-not (Test-Path $Npm)) {
    Write-Host "[ERROR] npm not found. Install Node.js first."
    exit 1
}

Write-Host "[1/4] GitHub login..."
if (-not (Test-GhLoggedIn)) {
    Write-Host ""
    Write-Host "Not logged in yet. Browser will open."
    Write-Host "Complete GitHub login, then return here."
    Write-Host ""
    & $Gh auth login -h github.com -p https -w
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] GitHub login failed."
        exit 1
    }
    if (-not (Test-GhLoggedIn)) {
        Write-Host "[ERROR] Still not logged in. Run this script again."
        exit 1
    }
}
Write-Host "GitHub login OK."

Write-Host ""
Write-Host "[2/4] Production build..."
& $Npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Build failed."
    exit 1
}

Write-Host ""
Write-Host "[3/4] GitHub repo create / push..."
if (-not (Test-GhRepoLinked)) {
    $defaultName = "kiminhong-portfolio"
    $repoInput = Read-Host "Repo name (Enter = $defaultName)"
    if ([string]::IsNullOrWhiteSpace($repoInput)) { $repoInput = $defaultName }
    & $Gh repo create $repoInput --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Repo create/push failed. Try another repo name."
        exit 1
    }
} else {
    Write-Host "Remote exists. Pushing to origin/main..."
    & $Git push -u origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] git push failed."
        exit 1
    }
}

$repoUrl = (& $Gh repo view --json url -q .url 2>$null).Trim()
if (-not $repoUrl) { $repoUrl = "(see GitHub)" }

Write-Host ""
Write-Host "[4/4] Vercel"
Write-Host ""
Write-Host "GitHub OK: $repoUrl"
Write-Host ""
Write-Host "Next on Vercel:"
Write-Host "  1. https://vercel.com/new"
Write-Host "  2. Import this repo"
Write-Host "  3. Framework: Next.js (auto)"
Write-Host "  4. Root Directory: leave empty"
Write-Host "  5. Deploy"
Write-Host ""

$open = Read-Host "Open Vercel in browser? (Y/n)"
if ($open -ne "n" -and $open -ne "N") {
    Start-Process "https://vercel.com/new"
}

Write-Host ""
Write-Host "Later: git add . -> git commit -m msg -> git push"
Write-Host "Vercel redeploys automatically."
Write-Host ""
