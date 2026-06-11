# Amazon > Pinterest Affiliate Tool — PowerShell setup script
# Run with:  powershell -ExecutionPolicy Bypass -File setup.ps1

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Amazon > Pinterest Affiliate Tool  --  Windows Setup"      -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# Check Python
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Python not found. Install from https://python.org" -ForegroundColor Red
    exit 1
}

# Create venv
if (-not (Test-Path ".venv")) {
    Write-Host "[*] Creating virtual environment..." -ForegroundColor Yellow
    python -m venv .venv
}

# Activate
Write-Host "[*] Activating virtual environment..." -ForegroundColor Yellow
& .\.venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "[*] Installing Python dependencies..." -ForegroundColor Yellow
pip install --upgrade pip -q
# Force binary wheel for greenlet — avoids Miniconda/Python 3.13 C-header build error
pip install --only-binary :all: greenlet
pip install -r requirements.txt

# Install Playwright browser
Write-Host "[*] Installing Playwright Chromium browser..." -ForegroundColor Yellow
python -m playwright install chromium

# Copy .env template
if (-not (Test-Path ".env")) {
    Copy-Item .env.example .env
    Write-Host "[*] Created .env from template — fill in your API keys!" -ForegroundColor Green
} else {
    Write-Host "[*] .env already exists — skipping." -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "  Next steps:"
Write-Host "    1. Edit .env  — add AMAZON_AFFILIATE_TAG and AYRSHARE_API_KEY"
Write-Host "    2. Run:  python main.py --dry-run"
Write-Host "============================================================" -ForegroundColor Cyan
