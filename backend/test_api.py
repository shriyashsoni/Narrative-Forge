import asyncio
import os
from dotenv import load_dotenv
from sosovalue_client import SoSoValueClient

load_dotenv()

async def test():
    client = SoSoValueClient(os.getenv("SOSO_API_KEY"))
    print("Testing News...")
    news = await client.get_hot_news()
    print(f"News: {news}")
    
    print("\nTesting Sectors...")
    sectors = await client.get_sector_spotlight()
    print(f"Sectors: {sectors}")

if __name__ == "__main__":
    asyncio.run(test())
