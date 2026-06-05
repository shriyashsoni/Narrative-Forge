---
sidebar_position: 3
---

# The Trading Engine Interface

The trading frontend (`NexaCore`) is built using React, Vite, and TailwindCSS. It is designed to mirror institutional qualitative trading desks (such as Binance, TradingView, or the Bloomberg Terminal).

## Native TradingView Oracle

The dashboard completely strips away static data placeholders and replaces them with a live, embedded TradingView iframe.

Whenever the AI identifies an asset (e.g., `BTC`), the dashboard dynamically passes that symbol into the TradingView widget:
`symbol=\`BINANCE:\${symbol}USDT\``

This provides the user with 100% genuine market data, real-time candlesticks, depth charts, and technical drawing tools.

## Web3 Authentication Barrier

Security is paramount. The entire trading terminal is locked behind a strict Web3 authentication barrier.
If the `useAccount()` hook from Wagmi detects that a wallet is not connected, it throws up a "TERMINAL LOCKED" screen. This ensures that no backend API queries or WebSocket connections can be initiated by unauthenticated scraping bots.
