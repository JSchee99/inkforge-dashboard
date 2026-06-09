import os
from dotenv import load_dotenv

load_dotenv()

AMAZON_AFFILIATE_TAG: str = os.getenv("AMAZON_AFFILIATE_TAG", "")
AYRSHARE_API_KEY: str = os.getenv("AYRSHARE_API_KEY", "")
MIN_PRICE: float = float(os.getenv("MIN_PRICE", "50.0"))
MAX_PRODUCTS: int = int(os.getenv("MAX_PRODUCTS", "10"))
OUTPUT_FILE: str = os.getenv("OUTPUT_FILE", "products.json")
