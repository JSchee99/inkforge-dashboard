"""Amazon Best Sellers scraper using Playwright (Chromium via Chrome DevTools Protocol)."""

import asyncio
import json
import random
import re
import csv
from dataclasses import dataclass, asdict
from typing import List, Optional

from playwright.async_api import async_playwright, Page, BrowserContext

USER_AGENTS: List[str] = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
]

BEST_SELLER_CATEGORIES: List[dict] = [
    {"name": "Electronics",   "url": "https://www.amazon.com/gp/bestsellers/electronics/"},
    {"name": "Kitchen",       "url": "https://www.amazon.com/gp/bestsellers/kitchen/"},
    {"name": "Sports",        "url": "https://www.amazon.com/gp/bestsellers/sporting-goods/"},
    {"name": "Home Garden",   "url": "https://www.amazon.com/gp/bestsellers/home-garden/"},
    {"name": "Tools",         "url": "https://www.amazon.com/gp/bestsellers/hi/"},
    {"name": "Beauty",        "url": "https://www.amazon.com/gp/bestsellers/beauty/"},
]

# CSS selectors tried in order — Amazon restructures its DOM periodically
_TITLE_SELECTORS = [
    "._cDEzb_p13n-sc-css-line-clamp-3_g3dy1",
    ".p13n-sc-truncate-desktop-type2",
    ".p13n-sc-truncated",
    "span[class*='zg-bdg-text']",
    "a.a-link-normal span",
]

_PRICE_SELECTORS = [
    ".p13n-sc-price",
    "span.a-price .a-offscreen",
    "span[class*='price']",
]

_ITEM_SELECTORS = [
    "#gridItemRoot",
    ".zg-item-immersion",
    "li.zg-item-immersion",
    "[data-asin]",
]


@dataclass
class Product:
    title: str
    price: float
    image_url: str
    product_url: str
    category: str
    rank: int = 0
    asin: str = ""


class Scraper:
    def __init__(self, affiliate_tag: str, min_price: float = 50.0, max_products: int = 10):
        self.affiliate_tag = affiliate_tag
        self.min_price = min_price
        self.max_products = max_products
        self.products: List[Product] = []

    # ------------------------------------------------------------------ helpers

    def _affiliate_url(self, url: str) -> str:
        if not self.affiliate_tag or not url:
            return url
        sep = "&" if "?" in url else "?"
        return f"{url}{sep}tag={self.affiliate_tag}"

    @staticmethod
    def _parse_price(text: str) -> Optional[float]:
        cleaned = text.replace(",", "").strip()
        m = re.search(r"\$?([\d]+\.?\d*)", cleaned)
        if m:
            try:
                return float(m.group(1))
            except ValueError:
                pass
        return None

    @staticmethod
    async def _random_delay(lo: float = 2.0, hi: float = 5.0) -> None:
        await asyncio.sleep(random.uniform(lo, hi))

    @staticmethod
    async def _first_text(el, selectors: List[str]) -> str:
        for sel in selectors:
            try:
                node = await el.query_selector(sel)
                if node:
                    txt = (await node.inner_text()).strip()
                    if txt:
                        return txt
            except Exception:
                pass
        return ""

    @staticmethod
    async def _first_attr(el, selectors: List[str], attr: str) -> str:
        for sel in selectors:
            try:
                node = await el.query_selector(sel)
                if node:
                    val = await node.get_attribute(attr)
                    if val:
                        return val
            except Exception:
                pass
        return ""

    # ------------------------------------------------------------------ scraping

    async def _scrape_category(
        self,
        page: Page,
        context: BrowserContext,
        category: dict,
    ) -> List[Product]:
        url = category["url"]
        name = category["name"]
        products: List[Product] = []

        for attempt in range(3):
            try:
                await context.set_extra_http_headers(
                    {"User-Agent": random.choice(USER_AGENTS)}
                )
                await page.goto(url, wait_until="domcontentloaded", timeout=40_000)
                await self._random_delay(2, 4)

                html = await page.content()
                if "captcha" in html.lower() or "enter the characters" in html.lower():
                    print(f"    [!] CAPTCHA detected (attempt {attempt + 1}/3) — rotating UA…")
                    await self._random_delay(6, 12)
                    continue

                # Collect item containers
                items = []
                for sel in _ITEM_SELECTORS:
                    items = await page.query_selector_all(sel)
                    if items:
                        break

                if not items:
                    print(f"    [!] No item containers found (attempt {attempt + 1}/3)")
                    await self._random_delay(4, 8)
                    continue

                rank = 0
                for item in items:
                    try:
                        title = await self._first_text(item, _TITLE_SELECTORS)
                        if not title:
                            continue

                        price_text = await self._first_attr(item, _PRICE_SELECTORS, "aria-label")
                        if not price_text:
                            price_text = await self._first_text(item, _PRICE_SELECTORS)
                        price = self._parse_price(price_text)
                        if price is None or price < self.min_price:
                            continue

                        # Image
                        img_el = await item.query_selector("img")
                        image_url = ""
                        if img_el:
                            image_url = (
                                await img_el.get_attribute("src")
                                or await img_el.get_attribute("data-src")
                                or ""
                            )

                        # Product URL — look for /dp/ ASIN links
                        link_el = await item.query_selector('a[href*="/dp/"]')
                        product_url = ""
                        asin = ""
                        if link_el:
                            href = await link_el.get_attribute("href") or ""
                            if href.startswith("/"):
                                href = f"https://www.amazon.com{href}"
                            m = re.search(r"/dp/([A-Z0-9]{10})", href)
                            if m:
                                asin = m.group(1)
                                product_url = f"https://www.amazon.com/dp/{asin}"

                        if not product_url:
                            continue

                        rank += 1
                        products.append(
                            Product(
                                title=title,
                                price=price,
                                image_url=image_url,
                                product_url=self._affiliate_url(product_url),
                                category=name,
                                rank=rank,
                                asin=asin,
                            )
                        )

                    except Exception:
                        continue

                if products:
                    return products

            except Exception as e:
                print(f"    [!] Error on attempt {attempt + 1}: {e}")
                if attempt < 2:
                    await self._random_delay(5, 10)

        return products

    # ------------------------------------------------------------------ public

    async def scrape(self) -> List[Product]:
        print("\n[*] Launching browser (Chromium/CDP)…")
        print(f"[*] Minimum price filter: ${self.min_price:.2f}")
        print(f"[*] Max products to collect: {self.max_products}")

        async with async_playwright() as pw:
            browser = await pw.chromium.launch(
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-blink-features=AutomationControlled",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                ],
            )
            context = await browser.new_context(
                user_agent=random.choice(USER_AGENTS),
                viewport={"width": 1920, "height": 1080},
                locale="en-US",
            )
            # Remove automation fingerprint
            await context.add_init_script(
                "Object.defineProperty(navigator,'webdriver',{get:()=>undefined});"
            )
            page = await context.new_page()

            all_products: List[Product] = []
            for cat in BEST_SELLER_CATEGORIES:
                remaining = self.max_products - len(all_products)
                if remaining <= 0:
                    break
                print(f"\n[*] Scraping → {cat['name']}")
                found = await self._scrape_category(page, context, cat)
                print(f"    [+] {len(found)} product(s) over ${self.min_price:.2f}")
                all_products.extend(found[:remaining])
                await self._random_delay(3, 7)

            await browser.close()

        self.products = all_products[: self.max_products]
        return self.products

    # ------------------------------------------------------------------ export

    def save_to_json(self, filepath: str) -> None:
        with open(filepath, "w", encoding="utf-8") as fh:
            json.dump([asdict(p) for p in self.products], fh, indent=2, ensure_ascii=False)
        print(f"\n[+] Saved {len(self.products)} product(s) → {filepath}")

    def save_to_csv(self, filepath: str) -> None:
        if not self.products:
            return
        fields = list(asdict(self.products[0]).keys())
        with open(filepath, "w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=fields)
            writer.writeheader()
            writer.writerows(asdict(p) for p in self.products)
        print(f"[+] Saved {len(self.products)} product(s) → {filepath}")
