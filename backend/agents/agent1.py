import asyncio
from app.services.llm_gateway import llm_gateway

SYSTEM_PROMPT = """
You are a Product Analysis Expert specializing in Indonesian UMKM products.
TASK: Extract and analyze product information from user description.
RULES:
- product_class: "Murah" if harga < 50000, "Menengah" if 50000-200000, "Premium" if > 200000
- audience_psychography: brief target audience description in Bahasa Indonesia
- key_features: list of 3-5 main product features/benefits
OUTPUT: Respond ONLY with valid JSON. No explanation. No markdown.
Schema: {"product_name": str, "key_features": list[str], "product_class": str, "audience_psychography": str}
"""

async def run_agent1_async(product_name: str, harga_jual: int, kategori: str) -> dict:
    user_message = f"Nama Produk: {product_name}\nHarga Jual: Rp {harga_jual}\nKategori: {kategori}"
    return await llm_gateway.execute_structured_agent(
        agent_name="Sub-Agent 1A (The Decoder)",
        system_prompt=SYSTEM_PROMPT,
        user_message=user_message,
        temperature=0.2
    )

def run_agent1(product_name: str, harga_jual: int, kategori: str) -> dict:
    """Synchronous compatibility wrapper"""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            import nest_asyncio
            nest_asyncio.apply()
        return loop.run_until_complete(run_agent1_async(product_name, harga_jual, kategori))
    except Exception:
        return asyncio.run(run_agent1_async(product_name, harga_jual, kategori))
