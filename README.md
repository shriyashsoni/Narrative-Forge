# NarrativeForge

An institutional-grade, fully autonomous trading agent and on-chain index publisher. 

NarrativeForge is designed to act as a **"one-person fund management"** protocol. It autonomously scrapes financial news, identifies emerging market narratives, constructs optimized token baskets via Google Gemini 1.5 Pro, and immutably publishes the index compositions to the Ethereum Sepolia Testnet.

---

## 🛠 Platform Architecture (A-Z)

The system is decoupled into three robust layers:

### 1. Intelligence Layer (Python Backend)
- **SoSoValue API Integrations:** Real-time WebSocket and REST data scraping of global macro events, breaking regulatory news, and Web3 sector movements.
- **Gemini 1.5 Pro LLM:** We utilize an off-chain Google Gemini agent powered by extreme Prompt Engineering (no fine-tuning required) to parse unstructured data into actionable `JSON` structures containing Momentum Scores, Narrative Themes, and Token Correlations.

### 2. Execution Layer (React Frontend & Solidity Contracts)
- **NexaCore Terminal:** A React (Vite/Tailwind) application mirroring institutional terminals (like Bloomberg), equipped with Web3 Authentication (RainbowKit/Wagmi) and live TradingView oracles.
- **SSI Protocol (Smart Contract):** A custom Solidity smart contract (`SSIProtocol.sol`) deployed on the **Ethereum Sepolia Testnet**. The AI passes a 10,000 basis-point weighting array to the frontend, forcing the user to cryptographically sign and verify the index formation on-chain.

### 3. Trading Layer (SoDEX)
- **Zero-Slippage Matching:** Once an index is verified on-chain, the backend communicates with the `testnet-gw.sodex.dev/api/v1/trade` gateway, signing payloads with a master private key to autonomously execute the spot trades necessary to acquire the index components.

---

<img width="1919" height="1063" alt="image" src="https://github.com/user-attachments/assets/90318a78-cbc4-484a-a5f2-cd6d6494d238" />

## 📚 Technical Documentation

NarrativeForge comes with an extensive, highly-detailed Docusaurus documentation portal covering all API references, mathematical proofs, and deployment strategies.

To view the documentation locally:
```bash
cd docs
npm install
npm run start
```
This will launch the documentation server at `http://localhost:3000`.

---

## 🚀 Quick Start (Running Locally)

### 1. Environment Configuration
Create a `.env` file in the `/backend` directory containing your keys:
```env
GEMINI_API_KEY=your_gemini_key
SOSO_API_KEY=your_soso_key
VALUECHAIN_RPC_URL=https://testnet-rpc.valuechain.xyz
PRIVATE_KEY=your_wallet_private_key
WALLET_ADDRESS=your_wallet_address
SSI_PROTOCOL_ADDRESS=0xCE2979887785d415b407727CDd8f6Ed752AAE335
SODEX_API_KEY_NAME=api-key-01
SODEX_BASE_URL=https://testnet-gw.sodex.dev/api/v1
SODEX_CHAIN_ID=138565
SODEX_IS_TESTNET=true
```

### 2. Start the AI Python Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*The backend will run on `http://localhost:8000`.*

### 3. Start the Trading Terminal Frontend
```bash
cd NexaCore  # (or frontend folder)
npm install
npm run dev
```
*The terminal will run on `http://localhost:5173`.*
