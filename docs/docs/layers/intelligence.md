---
sidebar_position: 1
---

# Intelligence Layer

The protocol leverages the **SoSoValue Open API** as its primary sensory organ. We utilize three core modules to ensure 360-degree market awareness.

## Module 01: Feeds (Hot News)
**Real-time cluster analysis.** 
The agent monitors the `v1/news/flash` endpoint to detect high-confidence event clusters as they happen.

## Module 02: Sector Spotlight
**Relative volume and TVL delta monitoring.**
Using the `v1/asset/sector` endpoints, the agent verifies if a narrative is supported by actual capital inflow or if it is purely speculative noise.

## Module 03: Token Economics
**Supply and inflationary pressure validation.**
Before including a token in an index composition, the agent validates the tokenomics via SoSoValue data to protect users from high-inflation or low-liquidity assets.

---

:::info Sensory Integration
All data is normalized into a "Context Buffer" before being passed to the Gemini 1.5 Reasoning engine. This ensures the AI has a clean, noise-free view of the market.
:::
