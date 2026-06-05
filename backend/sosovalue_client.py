import os
import httpx
from typing import List, Dict, Any

class SoSoValueClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://openapi.sosovalue.com/openapi/v1"
        self.headers = {"x-soso-api-key": api_key}

    async def get_hot_news(self, page_size: int = 10) -> List[Dict[str, Any]]:
        """Fetch real-time hot news clusters from SoSoValue."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/news/hot",
                    headers=self.headers,
                    params={"pageSize": page_size},
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json().get("data", [])
                else:
                    print(f"SoSoValue API Error (Hot News): HTTP {response.status_code} - {response.text}")
                    return []
            except Exception as e:
                print(f"SoSoValue API Error (Hot News): {e}")
                return []

    async def get_sector_spotlight(self) -> List[Dict[str, Any]]:
        """Fetch trending sectors and their momentum."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/currencies/sector-spotlight",
                    headers=self.headers,
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json().get("data", [])
                else:
                    print(f"SoSoValue API Error (Sector): HTTP {response.status_code} - {response.text}")
                    return []
            except Exception as e:
                print(f"SoSoValue API Error (Sector): {e}")
                return []

    async def get_token_economics(self, symbol: str) -> Dict[str, Any]:
        """Fetch detailed metrics for a specific token."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/currencies/{symbol}/token-economics",
                    headers=self.headers
                )
                response.raise_for_status()
                return response.json().get("data", {})
            except Exception as e:
                print(f"SoSoValue API Error (Token Econ): {e}")
                return {}
