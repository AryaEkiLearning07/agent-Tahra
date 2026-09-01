import json
from agents.llm_client import client, MODEL

SYSTEM_PROMPT = """
You are a Product Analysis Expert specializing in Indonesian UMKM products.

TASK: Extract and analyze product information from user description.

RULES:
- product_class: "Murah" if harga < 50000, "Menengah" if 50000-200000, "Premium" if > 200000
- audience_psychography: brief target audience description in Bahasa Indonesia
- key_features: list of 3-5 main product features/benefits

OUTPUT: Respond ONLY with valid JSON. No explanation. No markdown.
Schema:
{
  "product_name": "<string>",
  "key_features": ["<feature1>", "<feature2>", "<feature3>"],
  "product_class": "Murah" | "Menengah" | "Premium",
  "audience_psychography": "<string, 1 sentence in Bahasa Indonesia>"
}
"""

def run_agent1(product_name: str, harga_jual: int, kategori: str) -> dict:
    user_message = f"""
    Nama Produk: {product_name}
    Harga Jual: Rp {harga_jual}
    Kategori: {kategori}
    """

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)
