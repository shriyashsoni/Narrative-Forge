# NarrativeForge Whitepaper: The Autonomous Index Publisher

## 1. Executive Summary
NarrativeForge is a decentralized autonomous agent architecture designed to bridge the gap between financial intelligence (SoSoValue) and on-chain execution (SSI Protocol & SoDEX). It enables "one-person fund management" by automating the discovery, construction, and rebalancing of thematic indexes.

## 2. Core Architecture
The system consists of three primary layers:
1. **The Intelligence Layer (SoSoValue Terminal):** Constant monitoring of market news, social sentiment, and token metadata.
2. **The Decision Layer (AI Agent):** A generative AI model (Gemini) that classifies narratives (e.g., "AI Season", "RWA Surge") and calculates momentum scores. *Note: We utilize advanced Prompt Engineering and in-context learning to achieve this, without requiring static model fine-tuning.*
3. **The Execution Layer (SSI & SoDEX):** Automatic generation of index compositions on SSI Protocol and execution of rebalance trades on SoDEX.

## 3. Narrative Momentum Scoring
The agent calculates momentum using a weighted average of:
- **Relative Volume (RVOL):** 40%
- **Social Sentiment Drift:** 30%
- **Token Correlation Strength:** 20%
- **Macro Alignment:** 10%

## 4. SSI Protocol Integration
NarrativeForge publishes compositions directly to the SSI Protocol. Users can subscribe to these indexes, which are automatically rebalanced by the NarrativeForge agent when momentum shifts or drift exceeds the set tolerance (e.g., 1.5%).

## 5. Risk Controls
- **Max Concentration:** No single token can exceed 40% of an index.
- **Circuit Breaker:** Auto-pause rebalancing if volatility exceeds 15% in 1 hour.
- **Stale Narrative Detection:** Indexes are marked "Stale" if momentum drops below 30/100.
