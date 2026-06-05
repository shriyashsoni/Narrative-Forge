---
sidebar_position: 1
---

# The AI Oracle Engine

The AI Oracle Engine is the central nervous system of NarrativeForge. Built in Python, it operates entirely off-chain to prevent prohibitive gas costs associated with Large Language Model (LLM) processing on Ethereum.

## 1. Data Ingestion Pipeline

The pipeline begins with a WebSockets and REST integration into financial data terminals.

- **News Parsing**: The agent pulls unstructured text data (breaking news, regulatory announcements, hack reports).
- **Sector Filtering**: It cross-references the news against predefined Web3 sectors (e.g., L1s, DeFi, Gaming, RWA).

## 2. Gemini 1.5 Pro Processing

We utilize Google's **Gemini 1.5 Pro** model to synthesize the unstructured data. Unlike standard static algorithms, Gemini can understand context and nuance.

The Oracle passes a massive JSON payload of the day's news to the LLM with a highly engineered strict prompt. The prompt forces the LLM to return exactly:
1. **Narrative Theme**: A catchy, institutional-grade name for the trend (e.g., "Core Accumulation Phase").
2. **Momentum Score (1-100)**: A quantitative rating of how strong the narrative is.
3. **Asset Basket**: An array of 3 to 4 token symbols (`BTC`, `ETH`, `SOL`) highly correlated to the narrative.
4. **Risk Verdict & Strategy**: Text-based analysis for the trader dashboard.

## 3. Mathematical Validation

Before the payload is passed to the frontend for on-chain signature, the Python engine enforces strict mathematical validation.

### Basis Point Calculation
Smart contracts cannot easily perform floating-point math. Therefore, the Oracle converts the AI's suggested token weightings into **Basis Points (bps)**, where `10000 bps = 100.00%`.

```python
def calculate_composition(self, momentum: int, tokens: List[str]) -> List[Dict[str, Any]]:
    # Distribute weights equally, ensuring the sum is exactly 10000
    base_weight = 10000 // len(tokens)
    remainder = 10000 % len(tokens)
    
    composition = []
    for i, t in enumerate(tokens):
        weight = base_weight + (1 if i < remainder else 0)
        composition.append({"symbol": t, "weight": weight})
        
    return composition
```

This strict math ensures that if a user allocates 1,000 USDT to the index, the SoDEX routing engine can deterministically buy exactly the right fractions of the underlying assets.
