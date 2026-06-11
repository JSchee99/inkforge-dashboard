import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv

# Always load the .env next to this file, regardless of cwd
_ENV_PATH = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=_ENV_PATH, override=True)

AMAZON_AFFILIATE_TAG: str = os.getenv("AMAZON_AFFILIATE_TAG", "")
AYRSHARE_API_KEY: str = os.getenv("AYRSHARE_API_KEY", "")
MIN_PRICE: float = float(os.getenv("MIN_PRICE", "50.0"))
MAX_PRODUCTS: int = int(os.getenv("MAX_PRODUCTS", "10"))
OUTPUT_FILE: str = os.getenv("OUTPUT_FILE", "products.json")

# Comma-separated brand names to skip (case-insensitive title match)
_raw_brands = os.getenv("EXCLUDE_BRANDS", "Apple,Samsung,Sony,Microsoft,Google,Amazon")
EXCLUDE_BRANDS: List[str] = [b.strip().lower() for b in _raw_brands.split(",") if b.strip()]
