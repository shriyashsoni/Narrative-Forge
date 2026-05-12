---
sidebar_position: 1
slug: /
---

# NarrativeForge Protocol: Technical Specification

**Autonomous Narrative Intelligence & On-Chain Execution**

NarrativeForge is a decentralized autonomous agent architecture designed to bridge the gap between high-level market sentiment and on-chain capital allocation. By synthesizing raw data from **SoSoValue** with the reasoning power of **Gemini 1.5**, we create a self-correcting loop of thematic index publishing on **ValueChain**.

---

## 🛠️ The Tech Stack

The protocol is built on four pillars of modern decentralized technology:

1.  **Intelligence Layer**: SoSoValue Open API (Real-time Sector & News clusters).
2.  **Reasoning Layer**: Google Gemini 1.5 Flash (Thematic extraction & Strategy generation).
3.  **Execution Layer**: ValueChain (SSI Protocol / SoDEX L1).
4.  **Interface Layer**: Next.js 15 with Framer Motion (High-fidelity After Effects visual suite).

---

## 🔄 Project Flow (The "Forge" Loop)

The life of a narrative follows a rigorous 4-step autonomous process:

### 1. Ingestion (Sensory Phase)
The backend agent polls the **SoSoValue API** every 30 seconds. It collects:
- **Hot News**: Real-time event clusters.
- **Sector Beta**: Volume and TVL changes across 50+ crypto sectors.
- **Top Gainers**: Relative strength indicators.

### 2. Analysis (Cognitive Phase)
Raw data is fed into the **Narrative Agent (Gemini 1.5)**. The agent performs:
- **Clustering**: Grouping disparate news items into "Narratives" (e.g., "RWA Institutional Onramp").
- **Verification**: Cross-referencing news with sector volume to ensure the narrative has actual momentum.
- **Synthesis**: Generating a verdict, strategy, and composition weights.

### 3. Visualization (Interface Phase)
The frontend receives the narratives via WebSockets. It renders:
- **Momentum Sparklines**: Real-time strength visualization.
- **Portfolio Pie Charts**: Token weight distribution.
- **Agent Terminal**: A live stream of the agent's "thoughts" and research logs.

### 4. Execution (On-Chain Phase)
When a user clicks **FORGE**, the platform:
- Verifies the wallet connection via **RainbowKit**.
- Sends the composition to the **SSI Protocol** on **ValueChain**.
- Publishes a verifiable index that anyone can track or follow.

---

## 🏗️ Architecture Detail

### The Backend Agent
Powered by **FastAPI**, the backend acts as the "Nervous System". It manages the WebSocket state and orchestrates the AI reasoning loop.

### The SSI Protocol
The "Single Strategy Index" protocol on ValueChain allows for the permissionless creation of index compositions. NarrativeForge acts as a **Super-Publisher**, automating the selection process for this protocol.

---

## 💎 Why NarrativeForge?

In the modern market, attention is the most valuable commodity. NarrativeForge automates the process of "Attention Harvesting", allowing users to deploy complex thematic strategies with a single click.

*Built for the SoSoValue Buildathon 2026.*
