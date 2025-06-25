@echo off
REM 3D Portfolio Deployment Script for Windows
REM This script helps deploy the portfolio to various hosting platforms

setlocal enabledelayedexpansion

REM Configuration
set PROJECT_NAME=3d-portfolio
set VERSION=2.0.0
set AUTHOR=Soumyadip Saha

echo.
echo 🚀 3D Portfolio Deployment Script
echo Version: %VERSION%
echo Author: %AUTHOR%
echo.

REM Function to print colored output
:print_status
echo ✅ %~1
goto :eof

:print_warning
echo ⚠️  %~1
goto :eof

:print_error
echo ❌ %~1
goto :eof

:print_info
echo ℹ️  %~1
goto :eof

REM Check if required files exist
:check_files
call :print_info "Checking required files..."

set required_files=index.html CSS\style.css JS\main.js README.md

for %%f in (%required_files%) do (
    if exist "%%f" (
        call :print_status "Found %%f"
    ) else (
        call :print_error "Missing required file: %%f"
        exit /b 1
    )
)

call :print_status "All required files found"
goto :eof

REM Create deployment package
:create_package
call :print_info "Creating deployment package..."

REM Create dist directory
if not exist "dist" mkdir dist

REM Copy files to dist
xcopy /E /I /Y index.html dist\
xcopy /E /I /Y CSS dist\CSS\
xcopy /E /I /Y JS dist\JS\
xcopy /E /I /Y assets dist\assets\
xcopy /E /I /Y README.md dist\
xcopy /E /I /Y package.json dist\

REM Create .nojekyll for GitHub Pages
echo. > dist\.nojekyll

call :print_status "Deployment package created in dist\ directory"
goto :eof

REM Deploy to GitHub Pages
:deploy_github_pages
call :print_info "Deploying to GitHub Pages..."

if exist ".git" (
    REM Check if gh-pages branch exists
    git show-ref --verify --quiet refs/heads/gh-pages
    if !errorlevel! equ 0 (
        git checkout gh-pages
    ) else (
        git checkout -b gh-pages
    )
    
    REM Copy dist contents to root
    xcopy /E /I /Y dist\* .
    
    REM Add and commit changes
    git add .
    git commit -m "Deploy version %VERSION% - %date% %time%"
    
    REM Push to GitHub
    git push origin gh-pages
    
    REM Return to main branch
    git checkout main
    
    call :print_status "Deployed to GitHub Pages"
    call :print_info "Your site will be available at: https://yourusername.github.io/%PROJECT_NAME%"
) else (
    call :print_error "Not a git repository. Please initialize git and add remote origin."
)
goto :eof

REM Start local development server
:start_dev_server
call :print_info "Starting development server..."

REM Try Python first
python --version >nul 2>&1
if !errorlevel! equ 0 (
    call :print_info "Starting Python HTTP server on port 8000..."
    python -m http.server 8000
    goto :eof
)

REM Try Python3
python3 --version >nul 2>&1
if !errorlevel! equ 0 (
    call :print_info "Starting Python3 HTTP server on port 8000..."
    python3 -m http.server 8000
    goto :eof
)

REM Try Node.js
node --version >nul 2>&1
if !errorlevel! equ 0 (
    call :print_info "Starting Node.js server on port 8000..."
    npx serve . -p 8000
    goto :eof
)

call :print_error "No suitable server found. Please install Python or Node.js."
goto :eof

REM Show help
:show_help
echo Usage: %0 [OPTION]
echo.
echo Options:
echo   check     - Check required files and validate structure
echo   package   - Create deployment package
echo   github    - Deploy to GitHub Pages
echo   dev       - Start local development server
echo   help      - Show this help message
echo.
echo Examples:
echo   %0 check     # Check files and validate
echo   %0 package   # Create deployment package
echo   %0 github    # Deploy to GitHub Pages
echo   %0 dev       # Start development server
goto :eof

REM Main script logic
if "%1"=="" goto show_help
if "%1"=="help" goto show_help
if "%1"=="check" goto check_files
if "%1"=="package" (
    call :check_files
    call :create_package
    goto :end
)
if "%1"=="github" (
    call :check_files
    call :create_package
    call :deploy_github_pages
    goto :end
)
if "%1"=="dev" goto start_dev_server
if "%1"=="all" (
    call :check_files
    call :create_package
    call :print_info "Deployment package ready. Choose your deployment platform:"
    echo 1. GitHub Pages
    echo 2. Manual deployment
    goto :end
)

echo Unknown option: %1
goto show_help

:end
echo.
call :print_status "Deployment script completed!"
pause 