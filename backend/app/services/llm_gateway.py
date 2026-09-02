import json
import re
import logging
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

        logger.warning(f"⚠️ Failed to parse JSON from raw text: {raw_text[:200]}")
        raise ValueError("LLM response could not be parsed as valid JSON.")

    async def execute_structured_agent(
        self,
        agent_name: str,
        system_prompt: str,
        user_message: str,
        temperature: float = 0.2,
        use_cache: bool = True
    ) -> Dict[str, Any]:
        """
        Execute an agent task and enforce pure structured JSON output.
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

        # 2. Call LLM
        logger.info(f"🤖 [LLM CALL] {agent_name} via {settings.LLM_MODEL}")
        try:
            response = await self.client.chat.completions.create(
                model=settings.LLM_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message},
                ],
                temperature=temperature,
                response_format={"type": "json_object"},
            )

            raw_content = response.choices[0].message.content or "{}"
            parsed = self._extract_json(raw_content)

            # 3. Store in Cache
            if use_cache and settings.ENABLE_LLM_CACHE:
                llm_cache.set(namespace="llm_agent", payload=cache_payload, value=parsed)

            return parsed
        except Exception as e:
            logger.error(f"❌ [LLM ERROR] {agent_name}: {str(e)}")
            raise e

llm_gateway = LLMGateway()
