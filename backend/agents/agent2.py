import json
from agents.llm_client import client, MODEL

SYSTEM_PROMPT = """
You are a strict Business Consultant AI specializing in Indonesian UMKM financial health.

TASK: Analyze product unit economics and validate campaign viability.

RULES:
- Calculate: margin_value = harga_jual - hpp
- Calculate: margin_percentage = (margin_value / harga_jual) * 100
- If margin_percentage < 20%: financial_status = "VETO" — campaign is blocked
- If 20% <= margin_percentage < 30%: financial_status = "WARNING"
- If margin_percentage >= 30%: financial_status = "HEALTHY"

OUTPUT: Respond ONLY with valid JSON. No explanation. No markdown.
Schema:
{
  "margin_value": <integer>,
  "margin_percentage": <float, 2 decimal places>,
  "financial_status": "HEALTHY" | "WARNING" | "VETO",
  "consultation_advice": "<1-2 sentence advice in Bahasa Indonesia>"
}
"""

def run_agent2(product_name: str, harga_jual: int, hpp: int) -> dict:
    user_message = f"""
    Produk: {product_name}
    Harga Jual: Rp {harga_jual}
    HPP/Modal: Rp {hpp}
    """

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.1,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)
