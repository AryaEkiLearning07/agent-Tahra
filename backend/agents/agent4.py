import asyncio
from app.services.llm_gateway import llm_gateway

SYSTEM_PROMPT = """
You are an Expert Copywriter specializing in Indonesian UMKM digital advertising.
TASK: Write high-converting ad copy using the PAS framework (Problem - Agitate - Solution).
RULES:
- headline: max 10 words, attention-grabbing in Bahasa Indonesia
- primary_text: 2-3 sentences using PAS framework in Bahasa Indonesia
- cta: strong call-to-action in Bahasa Indonesia
- image_prompt: detailed English prompt for text-to-image AI
OUTPUT: JSON ONLY matching schema.
Schema: {"headline": str, "primary_text": str, "cta": str, "image_prompt": str}
"""

async def run_agent4_async(product_name: str, key_features: list, audience_psychography: str,
                     platform: str, aspect_ratio: str, harga_jual: int) -> dict:
    user_message = (
        f"Produk: {product_name}\nFitur: {', '.join(key_features)}\n"
        f"Target: {audience_psychography}\nPlatform: {platform} ({aspect_ratio})\nHarga: Rp {harga_jual}"
    )
    return await llm_gateway.execute_structured_agent(
        agent_name="Sub-Agent 4A (The Copywriter)",
        system_prompt=SYSTEM_PROMPT,
        user_message=user_message,
        temperature=0.7
    )

def run_agent4(product_name: str, key_features: list, audience_psychography: str,
               platform: str, aspect_ratio: str, harga_jual: int) -> dict:
    try:
        return asyncio.run(run_agent4_async(product_name, key_features, audience_psychography, platform, aspect_ratio, harga_jual))
    except Exception:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(run_agent4_async(product_name, key_features, audience_psychography, platform, aspect_ratio, harga_jual))
