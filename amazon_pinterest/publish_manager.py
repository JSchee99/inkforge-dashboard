"""Publish Pinterest posts via the Ayrshare REST API."""

import requests
from dataclasses import dataclass
from typing import Optional

from post_generator import PostContent

_AYRSHARE_POST_URL = "https://app.ayrshare.com/api/post"

# Pinterest caption hard-limits
_MAX_DESCRIPTION = 500
_MAX_TITLE = 100


@dataclass
class PublishResult:
    success: bool
    post_id: Optional[str] = None
    url: Optional[str] = None
    error: Optional[str] = None


class PublishManager:
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("AYRSHARE_API_KEY is required.")
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

    def publish_to_pinterest(self, post: PostContent) -> PublishResult:
        """Send a single pin to Pinterest via Ayrshare.

        Ayrshare's Pinterest integration maps:
          post   → pin description (truncated to 500 chars)
          title  → pin title (truncated to 100 chars)
          link   → destination URL
          mediaUrls[0] → pin image
        """
        payload: dict = {
            "post": post.caption[:_MAX_DESCRIPTION],
            "platforms": ["pinterest"],
            "title": post.title[:_MAX_TITLE],
            "link": post.product_url,
        }
        if post.image_url:
            payload["mediaUrls"] = [post.image_url]

        try:
            resp = requests.post(
                _AYRSHARE_POST_URL,
                json=payload,
                headers=self.headers,
                timeout=30,
            )
            resp.raise_for_status()
            data = resp.json()

            if data.get("status") == "success":
                pin_data = data.get("postIds", {}).get("pinterest", {})
                return PublishResult(
                    success=True,
                    post_id=str(pin_data.get("id", "")),
                    url=pin_data.get("postUrl", ""),
                )

            # Ayrshare returns errors inside the response body even on 200
            errors = data.get("errors", [{}])
            msg = errors[0].get("message", str(data)) if errors else str(data)
            return PublishResult(success=False, error=msg)

        except requests.exceptions.HTTPError as exc:
            return PublishResult(
                success=False,
                error=f"HTTP {exc.response.status_code}: {exc.response.text[:200]}",
            )
        except requests.exceptions.RequestException as exc:
            return PublishResult(success=False, error=str(exc))
