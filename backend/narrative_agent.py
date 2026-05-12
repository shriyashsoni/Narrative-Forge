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
        - "chartData" (list of objects): 5 points like [{"time": "T1", "val": 20}, ...] for a sparkline.
        
        News: {json.dumps(news_data[:10])}
        Sectors: {json.dumps(sectors)}
        """
        
        try:
            print(f"Gemini: Sending prompt with {len(news_data)} news items...")
            response = self.model.generate_content(prompt)
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
                "theme": "Market Stability",
                "momentum": 50,
                "summary": "AI Analysis failed, defaulting to general market observation.",
                "tokens": ["BTC", "ETH", "SOL"]
            }]

    def calculate_composition(self, momentum: int, tokens: List[str]) -> List[Dict[str, Any]]:
        """Calculate weights for an SSI Index composition."""
        # Simple equal weight for now, or weighted by momentum/sentiment
        weight = 100 / len(tokens)
        return [{"symbol": t, "weight": weight} for t in tokens]
