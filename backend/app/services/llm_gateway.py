import json
import logging
from typing import Any, Dict, List, Optional
from openai import AsyncOpenAI
from app.core.config import settings
from app.core.cache import llm_cache

logger = logging.getLogger("tahra.llm_gateway")

class LLMGateway:
    """
    Production-grade LLM Gateway with:
    - Automatic caching of identical system/user prompts
    - Exponential backoff & retry
    - Strict JSON output parsing
    - Provider compatibility (Groq, Hermes, Ollama, OpenAI)
    """
    def __init__(self):
        self._client: Optional[AsyncOpenAI] = None

    @property
    def client(self) -> AsyncOpenAI:
        if not self._client:
            self._client = AsyncOpenAI(
                api_key=settings.LLM_API_KEY or "dummy_key",
                base_url=settings.LLM_BASE_URL,
                timeout=settings.LLM_TIMEOUT,
                max_retries=settings.LLM_MAX_RETRIES,
            )
        return self._client

    async def execute_structured_agent(
        self,
        agent_name: str,
        system_prompt: str,
        user_message: str,
        temperature: float = 0.2,
        use_cache: bool = True
    ) -> Dict[str, Any]:
        """
        Execute an agent task and enforce pure JSON output.
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
            parsed = json.loads(raw_content)

            # 3. Store in Cache
            if use_cache and settings.ENABLE_LLM_CACHE:
                llm_cache.set(namespace="llm_agent", payload=cache_payload, value=parsed)

            return parsed
        except Exception as e:
            logger.error(f"❌ [LLM ERROR] {agent_name}: {str(e)}")
            raise e

llm_gateway = LLMGateway()
