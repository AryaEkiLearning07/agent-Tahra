import asyncio
from app.services.llm_gateway import llm_gateway

SYSTEM_PROMPT = """
You are a Media Planning Expert specializing in Indonesian digital advertising.
TASK: Determine the best advertising platform, target demographics, and bidding strategy.
RULES:
- Platform selection: TikTok/IG Reels for visual Gen-Z, Google/LinkedIn for B2B, FB/IG Feed for general.
- aspect_ratio: "9:16" for TikTok/Reels, "1:1" for Feed, "16:9" for YouTube
- bidding_model: "CPM" | "CPC" | "CPA"
- max_cpa_limit: maximum 40% of margin_value (integer in Rupiah)
OUTPUT: JSON ONLY matching schema.
Schema: {"target_demography": str, "platform": str, "aspect_ratio": str, "bidding_model": str, "max_cpa_limit": int}
"""

async def run_agent3_async(product_name: str, product_class: str, audience_psychography: str,
                     kategori: str, margin_value: int) -> dict:
    user_message = (
        f"Produk: {product_name}\nKelas: {product_class}\nKategori: {kategori}\n"
        f"Target: {audience_psychography}\nMargin: Rp {margin_value}"
    )
    return await llm_gateway.execute_structured_agent(
        agent_name="Sub-Agent 3 (Media Planner)",
        system_prompt=SYSTEM_PROMPT,
        user_message=user_message,
        temperature=0.2
    )

def run_agent3(product_name: str, product_class: str, audience_psychography: str,
               kategori: str, margin_value: int) -> dict:
    try:
        return asyncio.run(run_agent3_async(product_name, product_class, audience_psychography, kategori, margin_value))
    except Exception:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(run_agent3_async(product_name, product_class, audience_psychography, kategori, margin_value))
