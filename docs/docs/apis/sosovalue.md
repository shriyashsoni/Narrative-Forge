---
sidebar_position: 2
---

# SoSoValue API

The SoSoValue API serves as the raw data ingestion pipeline. It provides the institutional-grade market data that the AI Oracle relies upon.

## Data Endpoints

The `sosovalue_client.py` uses the `/api/v1/news/market` and `/api/v1/sectors` endpoints.

The payload returned from SoSoValue is often massive and deeply nested. The python client explicitly filters this data, truncating articles and selecting only high-impact sector movements before passing it into the Gemini context window to prevent token-limit crashes.
