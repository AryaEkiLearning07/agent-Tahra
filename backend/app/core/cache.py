import hashlib
import json
import time
from typing import Any, Optional

class LLMCache:
    """
    In-memory thread-safe TTL Cache for LLM responses and campaign calculations.
    Easily replaceable with a Redis client in distributed clusters.
    """
    def __init__(self, default_ttl: int = 3600):
        self._store: dict[str, dict[str, Any]] = {}
        self.default_ttl = default_ttl

    def _generate_key(self, namespace: str, payload: dict | str) -> str:
        serialized = json.dumps(payload, sort_keys=True) if isinstance(payload, dict) else str(payload)
        hash_digest = hashlib.sha256(serialized.encode('utf-8')).hexdigest()
        return f"{namespace}:{hash_digest}"

    def get(self, namespace: str, payload: dict | str) -> Optional[Any]:
        key = self._generate_key(namespace, payload)
        entry = self._store.get(key)
        if not entry:
            return None
        
        # Check TTL
        if time.time() > entry["expires_at"]:
            del self._store[key]
            return None
            
        return entry["value"]

    def set(self, namespace: str, payload: dict | str, value: Any, ttl: Optional[int] = None) -> None:
        key = self._generate_key(namespace, payload)
        expires_at = time.time() + (ttl or self.default_ttl)
        self._store[key] = {
            "value": value,
            "expires_at": expires_at
        }

    def clear(self) -> None:
        self._store.clear()

    @property
    def size(self) -> int:
        return len(self._store)

# Global singleton cache instance
llm_cache = LLMCache()
