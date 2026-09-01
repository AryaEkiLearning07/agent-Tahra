import json
from agents.llm_client import client, MODEL

SYSTEM_PROMPT = """
You are a Financial Controller and ROAS Analyst for Indonesian UMKM advertising campaigns.

TASK: Calculate predictive financial metrics and ROAS projection based on ad campaign data.

CALCULATION RULES (use these exact formulas):
- estimasi_tayangan = (budget_harian / 20) * 1000   # CPM assumption Rp 20.000
- estimasi_klik = estimasi_tayangan * 0.02           # CTR 2%
- estimasi_pembeli = estimasi_klik * 0.03            # CVR 3%
- estimasi_omzet = estimasi_pembeli * harga_jual
- estimasi_laba_bersih = estimasi_omzet - (estimasi_pembeli * hpp) - budget_harian
- roas_percentage = (estimasi_omzet / budget_harian) * 100
- roas_status: "PROFIT" if roas_percentage >= 100, else "BONCOS"

OUTPUT: Respond ONLY with valid JSON. No explanation. No markdown.
Schema:
{
  "budget_harian": <integer>,
  "estimasi_tayangan": <integer>,
  "estimasi_klik": <integer>,
  "estimasi_pembeli": <integer>,
  "estimasi_omzet": <integer>,
  "estimasi_laba_bersih": <integer>,
  "roas_percentage": <float, 2 decimal places>,
  "roas_status": "PROFIT" | "BONCOS",
  "summary": "<1-2 sentence conclusion in Bahasa Indonesia>"
}
"""

def run_agent5(product_name: str, harga_jual: int, hpp: int,
               budget_harian: int, platform: str, margin_percentage: float) -> dict:
    user_message = f"""
    Produk: {product_name}
    Harga Jual: Rp {harga_jual}
    HPP: Rp {hpp}
    Budget Harian: Rp {budget_harian}
    Platform: {platform}
    Margin: {margin_percentage}%
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
