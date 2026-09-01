import json
from agents.llm_client import client, MODEL

SYSTEM_PROMPT = """
You are an Expert Copywriter specializing in Indonesian UMKM digital advertising.

TASK: Write high-converting ad copy using the PAS framework (Problem - Agitate - Solution).

RULES:
- headline: max 10 words, attention-grabbing, in Bahasa Indonesia
- primary_text: 2-3 sentences using PAS framework in Bahasa Indonesia
- cta: strong call-to-action in Bahasa Indonesia (e.g., "Order Sekarang!", "Dapatkan Sekarang!")
- Adjust tone: casual/fun for Gen-Z, professional for B2B, warm for family products
- image_prompt: detailed English prompt for AI image generation, include product, lighting, style, aspect ratio

OUTPUT: Respond ONLY with valid JSON. No explanation. No markdown.
Schema:
{
  "headline": "<string>",
  "primary_text": "<string>",
  "cta": "<string>",
  "image_prompt": "<detailed English prompt for text-to-image AI>"
}
"""

def run_agent4(product_name: str, key_features: list, audience_psychography: str,
               platform: str, aspect_ratio: str, harga_jual: int) -> dict:
    user_message = f"""
    Produk: {product_name}
    Fitur Utama: {', '.join(key_features)}
    Target Audiens: {audience_psychography}
    Platform Iklan: {platform}
    Aspect Ratio: {aspect_ratio}
    Harga: Rp {harga_jual}
    """

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.7,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)
