---
sidebar_position: 1
---

# Google Gemini 1.5 Pro

NarrativeForge relies on the `gemini-1.5-flash` model provided by Google Generative AI to parse vast unstructured JSON datasets. 

## Integration Details

The backend utilizes the `google-generativeai` Python SDK. The API key is securely loaded via the `.env` file as `GEMINI_API_KEY`.

### Prompt Engineering
Instead of fine-tuning a model (which becomes rapidly outdated in crypto), we use extreme prompt engineering. We pass the scraped SoSoValue news and sector data directly into the Gemini context window and strictly mandate a JSON list response.

### Fallback Mechanisms
Because LLMs can occasionally hallucinate or fail to return valid JSON, the agent is wrapped in a `try/except` block. If the Gemini API times out or fails parsing, the system immediately falls back to a "Core Accumulation Phase" technical narrative to ensure the frontend React UI never crashes.
