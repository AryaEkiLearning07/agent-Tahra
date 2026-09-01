from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents.agent1 import run_agent1
from agents.agent2 import run_agent2
from agents.agent3 import run_agent3
from agents.agent4 import run_agent4
from agents.agent5 import run_agent5

app = FastAPI(title="TAHRA AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CampaignInput(BaseModel):
    product_name: str
    harga_jual: int
    hpp: int
    budget_harian: int
    kategori: str  # "Fisik" | "Jasa" | "Digital"

@app.post("/api/start-agent")
async def start_agent(data: CampaignInput):
    # FASE 1 — Product Decoder
    result_agent1 = run_agent1(data.product_name, data.harga_jual, data.kategori)

    # FASE 2 — Business Consultant
    result_agent2 = run_agent2(data.product_name, data.harga_jual, data.hpp)

    # Jika VETO, hentikan pipeline
    if result_agent2["financial_status"] == "VETO":
        return {
            "status": "VETO",
            "product": result_agent1,
            "financial_report": result_agent2,
            "message": "Kampanye dihentikan. Margin terlalu rendah."
        }

    # FASE 3 — Media Planner
    result_agent3 = run_agent3(
        product_name=data.product_name,
        product_class=result_agent1["product_class"],
        audience_psychography=result_agent1["audience_psychography"],
        kategori=data.kategori,
        margin_value=result_agent2["margin_value"],
    )

    # FASE 4 — Copywriter
    result_agent4 = run_agent4(
        product_name=data.product_name,
        key_features=result_agent1["key_features"],
        audience_psychography=result_agent1["audience_psychography"],
        platform=result_agent3["platform"],
        aspect_ratio=result_agent3["aspect_ratio"],
        harga_jual=data.harga_jual,
    )

    # FASE 5 — Financial Reporter
    result_agent5 = run_agent5(
        product_name=data.product_name,
        harga_jual=data.harga_jual,
        hpp=data.hpp,
        budget_harian=data.budget_harian,
        platform=result_agent3["platform"],
        margin_percentage=result_agent2["margin_percentage"],
    )

    return {
        "status": "COMPLETED",
        "product": result_agent1,
        "financial_report": result_agent2,
        "strategy": result_agent3,
        "creative": result_agent4,
        "roas_report": result_agent5,
    }

@app.get("/")
def health_check():
    return {"status": "TAHRA AI Backend running"}
