import json
from agents.llm_client import client, MODEL

SYSTEM_PROMPT = """
You are a Media Planning Expert specializing in Indonesian digital advertising.

TASK: Determine the best advertising platform, target demographics, and bidding strategy.

RULES:
- Platform selection logic:
  * Visual product + Gen-Z/Millennial target → "TikTok" or "Instagram Reels"
  * B2B/Jasa + professional adult target → "Google Search" or "LinkedIn"
  * General consumer product → "Facebook/Instagram Feed"
- aspect_ratio: "9:16" for TikTok/Reels, "1:1" for Feed, "16:9" for YouTube
- bidding_model: "CPM" for awareness, "CPC" for traffic, "CPA" for conversion
- max_cpa_limit: maximum 40% of margin_value (integer, in Rupiah)

OUTPUT: Respond ONLY with valid JSON. No explanation. No markdown.
Schema:
{
  "target_demography": "<string, e.g. 'Wanita 18-35 tahun, urban'>",
  "platform": "<string>",
  "aspect_ratio": "9:16" | "1:1" | "16:9",
  "bidding_model": "CPM" | "CPC" | "CPA",
  "max_cpa_limit": <integer>
}
"""

def run_agent3(product_name: str, product_class: str, audience_psychography: str,
               kategori: str, margin_value: int) -> dict:
    user_message = f"""
    Produk: {product_name}
    Kelas Produk: {product_class}
    Kategori: {kategori}
    Target Audiens: {audience_psychography}
    Margin per unit: Rp {margin_value}
    """

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)
