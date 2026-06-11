@echo off
echo ============================================================
echo  Amazon ^> Pinterest Affiliate Tool  --  Windows Setup
echo ============================================================

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found. Install from https://python.org
    pause
    exit /b 1
)

:: Create virtual environment
if not exist ".venv" (
    echo [*] Creating virtual environment...
    python -m venv .venv
)

:: Activate and install
echo [*] Installing dependencies...
call .venv\Scripts\activate.bat
pip install --upgrade pip -q
pip install -r requirements.txt

:: Install Playwright Chromium browser
echo [*] Installing Playwright Chromium browser...
python -m playwright install chromium

:: Copy .env if missing
if not exist ".env" (
    copy .env.example .env
    echo [*] Created .env from template -- please fill in your API keys!
) else (
    echo [*] .env already exists -- skipping copy.
)

echo.
echo ============================================================
echo  Setup complete!
echo.
echo  Next steps:
echo    1. Edit .env and add your API keys
echo    2. Run:  .venv\Scripts\activate
echo             python main.py --dry-run
echo ============================================================
pause
