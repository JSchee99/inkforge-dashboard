"""Generate Pinterest caption content from a scraped Amazon product."""

import random
from dataclasses import dataclass
from typing import List

from scraper import Product

_TEMPLATES: List[str] = [
    (
        "🔥 Amazon Best Seller Alert!\n\n"
        "{title}\n\n"
        "💰 Just ${price:.2f} — trending and flying off shelves!\n\n"
        "Shop it here 👇\n{url}\n\n"
        "{hashtags}"
    ),
    (
        "💡 Top Pick of the Week\n\n"
        "{title}\n\n"
        "⭐ Amazon Best Seller · ${price:.2f}\n\n"
        "Don't miss out on this hot deal!\n👉 {url}\n\n"
        "{hashtags}"
    ),
    (
        "🛍️ Spotted on Amazon Best Sellers!\n\n"
        "{title}\n\n"
        "💰 Only ${price:.2f}\n\n"
        "Grab yours before it sells out:\n{url}\n\n"
        "{hashtags}"
    ),
    (
        "✅ Editor's Pick\n\n"
        "{title}\n\n"
        "📦 Fast-seller on Amazon · ${price:.2f}\n\n"
        "See why everyone's buying this:\n{url}\n\n"
        "{hashtags}"
    ),
    (
        "🌟 This week's must-have!\n\n"
        "{title}\n\n"
        "Only ${price:.2f} on Amazon right now.\n\n"
        "Get it here 👇\n{url}\n\n"
        "{hashtags}"
    ),
]

_CATEGORY_TAGS: dict = {
    "Electronics":  ["#TechDeals", "#ElectronicsDeals", "#AmazonTech", "#GadgetAlert", "#TechFinds"],
    "Kitchen":      ["#KitchenEssentials", "#HomeChef", "#CookingTools", "#KitchenDeals", "#KitchenFinds"],
    "Sports":       ["#SportingGoods", "#FitnessDeals", "#WorkoutEssentials", "#ActiveLife", "#SportDeals"],
    "Home Garden":  ["#HomeDecor", "#GardenEssentials", "#HomeImprovement", "#HouseGoals", "#HomeFinds"],
    "Tools":        ["#HomeTools", "#DIYTools", "#GarageEssentials", "#ToolDeals", "#DIYProjects"],
    "Beauty":       ["#BeautyDeals", "#SkincareFinds", "#BeautyEssentials", "#MakeupDeals", "#GlowUp"],
}

_COMMON_TAGS: List[str] = [
    "#AmazonFinds", "#BestSellers", "#AmazonDeals", "#ShopNow",
    "#MustHave", "#Shopping", "#DealAlert", "#TrendingNow",
    "#AffiliateLink", "#OnlineShopping",
]


@dataclass
class PostContent:
    caption: str
    image_url: str
    product_url: str
    title: str
    price: float
    category: str


class PostGenerator:
    def generate(self, product: Product) -> PostContent:
        template = random.choice(_TEMPLATES)

        cat_tags = _CATEGORY_TAGS.get(product.category, [])
        chosen = random.sample(cat_tags, min(3, len(cat_tags)))
        chosen += random.sample(_COMMON_TAGS, min(4, len(_COMMON_TAGS)))
        hashtags = " ".join(chosen)

        caption = template.format(
            title=product.title,
            price=product.price,
            url=product.product_url,
            hashtags=hashtags,
        )

        return PostContent(
            caption=caption,
            image_url=product.image_url,
            product_url=product.product_url,
            title=product.title,
            price=product.price,
            category=product.category,
        )
