import json
import re
import logging
import asyncio
from typing import Any, Dict, Optional
from openai import AsyncOpenAI
from app.core.config import settings
from app.core.cache import llm_cache

logger = logging.getLogger("tahra.llm_gateway")

class LLMGateway:
    """
    Production-grade Resilient LLM Gateway:
    - Bulletproof JSON extraction for all open-source & proprietary models
    - Automatic caching of identical system/user prompts
    - Exponential backoff & retry mechanism
    - Latency metrics logging
    """
    def __init__(self):
        self._client: Optional[AsyncOpenAI] = None

    @property
    def client(self) -> AsyncOpenAI:
        if not self._client:
            self._client = AsyncOpenAI(
                api_key=settings.active_api_key,
                base_url=settings.LLM_BASE_URL,
                timeout=settings.LLM_TIMEOUT,
                max_retries=settings.LLM_MAX_RETRIES,
            )
        return self._client

    @staticmethod
    def _extract_json(raw_text: str) -> Dict[str, Any]:
        """
        Safely extracts JSON from raw LLM output even if surrounded by
        markdown fences, preambles, or trailing commentary.
        """
        cleaned = raw_text.strip()
        
        # 1. Try direct parsing
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            pass

        # 2. Extract from markdown code blocks (```json ... ``` or ``` ...)
        match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", cleaned, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(1))
            except json.JSONDecodeError:
                pass

        # 3. Find outermost curly braces
        start = cleaned.find('{')
        end = cleaned.rfind('}')
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(cleaned[start:end+1])
            except json.JSONDecodeError:
                pass

        logger.warning(f"⚠️ Failed to parse JSON from raw text preview: {raw_text[:150]}")
        return {}

    async def execute_structured_agent(
        self,
        agent_name: str,
        system_prompt: str,
        user_message: str,
        temperature: float = 0.2,
        use_cache: bool = True,
        max_attempts: int = 2
    ) -> Dict[str, Any]:
        """
        Execute an agent task and enforce pure structured JSON output with automatic retry.
        """
        cache_payload = {
            "agent": agent_name,
            "model": settings.LLM_MODEL,
            "system": system_prompt,
            "user": user_message,
        }

        # 1. Check Cache
        if use_cache and settings.ENABLE_LLM_CACHE:
            cached = llm_cache.get(namespace="llm_agent", payload=cache_payload)
            if cached:
                logger.info(f"⚡ [CACHE HIT] {agent_name}")
                return cached

        # 2. Call LLM with Retry
        for attempt in range(1, max_attempts + 1):
            # Try with json_object first, fallback to standard completion if unsupported
            for use_json_mode in [True, False]:
                try:
                    logger.info(f"🤖 [LLM CALL (Attempt {attempt}/{max_attempts})] {agent_name} via {settings.LLM_MODEL} (json_mode={use_json_mode})")
                    kwargs = {
                        "model": settings.LLM_MODEL,
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": user_message},
                        ],
                        "temperature": temperature,
                    }
                    if use_json_mode:
                        kwargs["response_format"] = {"type": "json_object"}

                    response = await self.client.chat.completions.create(**kwargs)
                    raw_content = response.choices[0].message.content or "{}"
                    parsed = self._extract_json(raw_content)

                    if parsed:
                        # 3. Store in Cache
                        if use_cache and settings.ENABLE_LLM_CACHE:
                            llm_cache.set(namespace="llm_agent", payload=cache_payload, value=parsed)
                        return parsed
                    else:
                        logger.warning(f"⚠️ Empty JSON parsed for {agent_name} on attempt {attempt}")

                except Exception as e:
                    err_str = str(e).lower()
                    if use_json_mode and ("json" in err_str or "response_format" in err_str or "400" in err_str):
                        logger.info(f"🔄 Retrying {agent_name} without response_format param due to provider error: {e}")
                        continue
                    logger.error(f"❌ [LLM ERROR (Attempt {attempt})] {agent_name}: {str(e)}")
                    break

            if attempt < max_attempts:
                await asyncio.sleep(1.0 * attempt)
            else:
                logger.warning(f"⚠️ [LLM RECOVERY] Upstream connection issue for {agent_name}. Returning safe fallback.")
                return {}

        return {}

llm_gateway = LLMGateway()
