#!/usr/bin/env python3
"""
InkForge Amazon → Pinterest Affiliate Tool
Usage: python main.py [--dry-run] [--csv]
"""

import argparse
import asyncio
import sys

import config  # config.py handles dotenv loading with an explicit path
from scraper import Scraper, Product
from post_generator import PostGenerator, PostContent
from publish_manager import PublishManager


# ──────────────────────────────────────────────────────────────── display helpers

SEP_THIN  = "─" * 62
SEP_THICK = "═" * 62


def _banner(text: str) -> None:
    print(f"\n{SEP_THICK}\n  {text}\n{SEP_THICK}")


def _display_product(p: Product, idx: int) -> None:
    print(f"\n{SEP_THIN}")
    print(f"  #{idx + 1}  {p.title[:70]}{'…' if len(p.title) > 70 else ''}")
    print(f"       Price    : ${p.price:.2f}")
    print(f"       Category : {p.category}  (Best Sellers rank #{p.rank})")
    print(f"       ASIN     : {p.asin}")
    print(f"       URL      : {p.product_url[:80]}{'…' if len(p.product_url) > 80 else ''}")
    print(f"       Image    : {'✓' if p.image_url else '✗ (none)'}")


def _display_post(post: PostContent, n: int, total: int) -> None:
    print(f"\n{SEP_THICK}")
    print(f"  PINTEREST POST PREVIEW  ({n}/{total})")
    print(SEP_THICK)
    print(f"\n{post.caption}\n")
    print(SEP_THIN)
    if post.image_url:
        print(f"  Image : {post.image_url[:80]}{'…' if len(post.image_url) > 80 else ''}")
    else:
        print("  Image : (none — pin will be text-only)")
    print(SEP_THIN)


def _ask(prompt: str) -> bool:
    while True:
        answer = input(f"\n  {prompt} [y/n]: ").strip().lower()
        if answer in ("y", "yes"):
            return True
        if answer in ("n", "no"):
            return False
        print("  Please type 'y' or 'n'.")


# ──────────────────────────────────────────────────────────────── validation

def _validate_config(dry_run: bool) -> None:
    if not config.AMAZON_AFFILIATE_TAG:
        print("[!] Warning: AMAZON_AFFILIATE_TAG not set — product URLs will have no affiliate tag.")
    else:
        print(f"[*] Affiliate tag loaded : {config.AMAZON_AFFILIATE_TAG}")
    if config.EXCLUDE_BRANDS:
        print(f"[*] Excluding brands     : {', '.join(config.EXCLUDE_BRANDS)}")
    if not config.AYRSHARE_API_KEY and not dry_run:
        print("[!] Error: AYRSHARE_API_KEY is missing.")
        print("    Add it to your .env file:  AYRSHARE_API_KEY=your_key_here")
        print("    Or run with --dry-run to test without publishing.")
        sys.exit(1)


# ──────────────────────────────────────────────────────────────── main

async def run(dry_run: bool, save_csv: bool) -> None:
    _banner("INKFORGE  ·  Amazon → Pinterest Affiliate Tool")
    _validate_config(dry_run)

    if dry_run:
        print("\n  [DRY-RUN] Posts will NOT be published to Pinterest.")

    # ── Phase 1: scrape ──────────────────────────────────────────────────────
    scraper = Scraper(
        affiliate_tag=config.AMAZON_AFFILIATE_TAG,
        min_price=config.MIN_PRICE,
        max_products=config.MAX_PRODUCTS,
        exclude_brands=config.EXCLUDE_BRANDS,
    )
    products = await scraper.scrape()

    if not products:
        print("\n[!] No products found.")
        print("    Amazon may have blocked the request, or no items matched the price filter.")
        sys.exit(1)

    print(f"\n[+] Scraped {len(products)} product(s) priced above ${config.MIN_PRICE:.2f}.")

    # ── Verification preview ─────────────────────────────────────────────────
    _banner(f"SCRAPED PRODUCTS  (showing first {min(3, len(products))} of {len(products)})")
    for i, p in enumerate(products[:3]):
        _display_product(p, i)

    if not _ask(f"Proceed to generate Pinterest posts for all {len(products)} product(s)?"):
        scraper.save_to_json(config.OUTPUT_FILE)
        if save_csv:
            scraper.save_to_csv(config.OUTPUT_FILE.replace(".json", ".csv"))
        print("\n[*] Data saved. Exiting.")
        sys.exit(0)

    # ── Save scraped data ────────────────────────────────────────────────────
    scraper.save_to_json(config.OUTPUT_FILE)
    if save_csv:
        scraper.save_to_csv(config.OUTPUT_FILE.replace(".json", ".csv"))

    # ── Phase 2: generate & publish ──────────────────────────────────────────
    generator = PostGenerator()
    publisher = PublishManager(api_key=config.AYRSHARE_API_KEY) if not dry_run else None

    published = skipped = failed = 0

    for i, product in enumerate(products):
        print(f"\n[*] Product {i + 1}/{len(products)}: generating post…")
        post = generator.generate(product)
        _display_post(post, i + 1, len(products))

        if not _ask("Publish this post to Pinterest?"):
            print("    Skipped.")
            skipped += 1
            continue

        if dry_run:
            print("    [DRY-RUN] Would publish — skipping actual API call.")
            published += 1
            continue

        print("    Publishing…", end=" ", flush=True)
        result = publisher.publish_to_pinterest(post)

        if result.success:
            print("✓")
            print(f"    Post ID : {result.post_id}")
            if result.url:
                print(f"    URL     : {result.url}")
            published += 1
        else:
            print("✗")
            print(f"    Error   : {result.error}")
            failed += 1

    # ── Summary ──────────────────────────────────────────────────────────────
    _banner("SUMMARY")
    print(f"  Products scraped : {len(products)}")
    print(f"  Posts published  : {published}")
    print(f"  Posts skipped    : {skipped}")
    if failed:
        print(f"  Publish failures : {failed}")
    print(f"  Data saved to    : {config.OUTPUT_FILE}")
    print(SEP_THICK)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Scrape Amazon Best Sellers and publish affiliate Pins to Pinterest."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Scrape and preview posts without actually publishing to Pinterest.",
    )
    parser.add_argument(
        "--csv",
        action="store_true",
        help="Also save scraped products as a CSV file.",
    )
    args = parser.parse_args()
    asyncio.run(run(dry_run=args.dry_run, save_csv=args.csv))


if __name__ == "__main__":
    main()
