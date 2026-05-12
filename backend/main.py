import os
import asyncio
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from datetime import datetime

from sosovalue_client import SoSoValueClient
from narrative_agent import NarrativeAgent
from blockchain_client import BlockchainClient

# Load environment variables
load_dotenv()

app = FastAPI(title="NarrativeForge API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- State Management ---
class LogEntry(BaseModel):
    time: str
    msg: str
    type: str

class ForgeRequest(BaseModel):
    composition: List[Dict[str, Any]]

class AppState:
    def __init__(self):
        self.logs: List[LogEntry] = []
        self.connected_websockets: List[WebSocket] = []
        self.current_narratives: List[Dict[str, Any]] = []

state = AppState()

# --- Initialize Clients ---
soso_client = SoSoValueClient(os.getenv("SOSO_API_KEY", ""))
narrative_agent = NarrativeAgent(os.getenv("GEMINI_API_KEY", ""))
blockchain_client = BlockchainClient(
    os.getenv("VALUECHAIN_RPC_URL", "https://testnet-rpc.valuechain.dev"),
    os.getenv("PRIVATE_KEY", "0" * 64)
)

# --- Helpers ---
def add_log(msg: str, log_type: str = "info"):
    now = datetime.now().strftime("%H:%M:%S")
    entry = LogEntry(time=now, msg=msg, type=log_type)
    state.logs.append(entry)
    if len(state.logs) > 50: state.logs.pop(0)
    return entry

async def broadcast_log(msg: str, log_type: str = "info"):
    entry = add_log(msg, log_type)
    for ws in state.connected_websockets:
        try:
            await ws.send_json(entry.model_dump())
        except:
            pass

# --- Core Agentic Loop ---
async def narrative_engine_task():
    """Background task that runs the research-to-execution cycle."""
    while True:
        try:
            print("Engine: Starting Research Cycle...")
            await broadcast_log("Initiating Research Cycle...", "info")
            
            # 1. Fetch Intelligence
            print("Engine: Fetching news...")
            news = await soso_client.get_hot_news(20)
            print(f"Engine: Fetched {len(news)} news items.")
            
            print("Engine: Fetching sectors...")
            sectors = await soso_client.get_sector_spotlight()
            print(f"Engine: Fetched {len(sectors)} sectors.")
            
            if not news:
                await broadcast_log("Intelligence gap: No fresh news from SoSoValue. Retrying in 1m...", "warning")
                await asyncio.sleep(60)
                continue

            # 2. Analyze Narratives (AI)
            await broadcast_log(f"Processing {len(news)} news signals via Gemini Flash...", "process")
            print("Engine: Analyzing narratives with Gemini...")
            narratives = await narrative_agent.analyze_narratives(news, sectors)
            print(f"Engine: Analysis complete. Found {len(narratives)} narratives.")
            state.current_narratives = narratives
            
            for n in narratives:
                await broadcast_log(f"Detected Narrative: {n['theme']} (Score: {n['momentum']})", "success")

            # 3. Decision & Monitoring
            # (In Wave 2/3, we add automated rebalancing logic here)
            
        except Exception as e:
            await broadcast_log(f"Engine Loop Error: {str(e)}", "warning")
            
        await asyncio.sleep(300) # Run every 5 minutes

# --- Endpoints ---

@app.on_event("startup")
async def startup_event():
    add_log("NarrativeForge Backend Online.", "success")
    asyncio.create_task(narrative_engine_task())

@app.get("/narratives")
async def get_narratives():
    return state.current_narratives if state.current_narratives else [
        {
            "id": "mock-ai",
            "theme": "Awaiting Live Signals...",
            "momentum": 0,
            "tokens": [],
            "description": "Configure API keys in .env to start live narrative extraction."
        }
    ]

@app.get("/logs")
async def get_logs():
    return state.logs

@app.websocket("/ws/logs")
async def websocket_logs(websocket: WebSocket):
    await websocket.accept()
    state.connected_websockets.append(websocket)
    try:
        # Send initial logs
        for log in state.logs:
            await websocket.send_json(log.model_dump())
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        state.connected_websockets.remove(websocket)

@app.post("/forge/{index_name}")
async def forge_index(index_name: str, request: ForgeRequest):
    """Trigger on-chain publishing of an index."""
    composition = request.composition
    await broadcast_log(f"Forging Index: {index_name}...", "process")
    
    result = blockchain_client.publish_ssi_index(index_name, composition)
    
    if result["status"] == "success":
        await broadcast_log(f"SUCCESS: Index {index_name} published to SSI Protocol. TX: {result['tx_hash']}", "success")
    else:
        await broadcast_log(f"MOCK: Index {index_name} forge triggered (No Contract).", "info")
        
    return result

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
