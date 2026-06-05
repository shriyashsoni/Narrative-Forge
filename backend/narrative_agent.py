import os
import json
import google.generativeai as genai
from typing import List, Dict, Any

class NarrativeAgent:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def analyze_narratives(self, news_data: List[Dict[str, Any]], sectors: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Uses Gemini to analyze news and sectors to identify top 3 market narratives.
        """
        prompt = f"""
        Analyze these crypto news items and sector data. 
        Identify the top 3-4 most powerful market narratives.
        Return ONLY a JSON list of objects with these keys: 
        - "theme" (string): Catchy name
        - "momentum" (int 1-100): Strength score
        - "summary" (string): 1-sentence explanation
        - "tokens" (list): 3-4 relevant symbols
        - "verdict" (string): AI professional opinion (e.g., "High potential, monitor social volume")
        - "suggestion" (string): Actionable strategy (e.g., "Accumulate during retests")
        - "chartData" (list of objects): 5 points like [{{"time": "T1", "val": 20}}, ...] for a sparkline.
        
        News: {str(news_data)[:5000]}
        Sectors: {str(sectors)[:2000]}
        """
        
        try:
            print(f"Gemini: Sending prompt with {len(news_data)} news items...")
            response = await self.model.generate_content_async(prompt)
            text = response.text
            print(f"Gemini: Raw Response: {text[:200]}...")
            
            # Extract JSON from markdown if present
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            
            data = json.loads(text)
            return data
        except Exception as e:
            print(f"Gemini Analysis Error: {e}")
            # Return a fallback narrative if AI fails
            return [{
                "theme": "Core Accumulation Phase",
                "momentum": 65,
                "summary": "AI API integration encountered an error. Falling back to default technical observations.",
                "tokens": ["BTC", "ETH", "SOL"],
                "verdict": "Moderate Risk - Awaiting AI confirmation. Rely on standard technical supports.",
                "suggestion": "Monitor major moving averages. Do not deploy heavy capital until Gemini stream reconnects."
            }]

    def calculate_composition(self, momentum: int, tokens: List[str]) -> List[Dict[str, Any]]:
        """Calculate weights for an SSI Index composition (must sum to 10000 basis points)."""
        if not tokens:
            return []
            
        # Distribute weights equally, ensuring the sum is exactly 10000
        base_weight = 10000 // len(tokens)
        remainder = 10000 % len(tokens)
        
        composition = []
        for i, t in enumerate(tokens):
            weight = base_weight + (1 if i < remainder else 0)
            composition.append({"symbol": t, "weight": weight})
            
        return composition
