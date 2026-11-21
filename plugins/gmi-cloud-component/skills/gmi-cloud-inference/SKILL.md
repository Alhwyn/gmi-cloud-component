---
name: gmi-cloud-inference
description: Add or review a GMI Cloud inference integration in application code.
---

# GMI Cloud inference

1. Identify whether the application uses a serverless or dedicated endpoint. See the [inference overview](https://docs.gmicloud.ai/inference-engine/ie-intro).
2. Use the request format documented for that endpoint and model. For supported serverless models, see the [OpenAI-compatible API guidance](https://docs.gmicloud.ai/inference-engine/marketplace/serverless).
3. Read credentials from server-side configuration. Handle timeouts, rate limits, and API errors without logging credentials or prompt content.
4. Use a mocked client to test a successful response and an API failure.
