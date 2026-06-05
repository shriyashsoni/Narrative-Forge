---
sidebar_position: 3
---

# SoDEX Trading API

The SoDEX Execution API is the final step in the autonomous loop. It enables the actual, physical spot trading of the assets defined in the forged SSI index.

## Gateway and Authentication

The platform communicates with the `testnet-gw.sodex.dev/api/v1/trade` gateway. 
Authentication is handled via the `api-key-01` header injected by the Python backend's `sodex_client.py` wrapper.

### Trade Payload Construction

When a user clicks **BUY / LONG** in the Trade Terminal, the frontend sends a request to the backend `/api/sodex/trade` route, which physically signs the payload:

```json
{
  "symbol": "BTC",
  "side": "BUY",
  "quantity": "0.1",
  "type": "MARKET"
}
```

The backend signs this with the master testnet private key and forwards it to the SoDEX matching engine, allowing for zero-slippage automated execution of the index components.
