import os
import json
import pytest
import jsonschema
from app.schemas.campaign import Agent1DeepMarketResearchOutput
from app.services.agent1_service import agent1_service
from app.services.market_research_tools import KeywordTrendsTool, detect_industry_category

# Path to schema
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "..", "app", "schemas", "agent1_output_schema.json")

def test_schema_json_file_validity():
    assert os.path.exists(SCHEMA_PATH), f"Schema file not found at {SCHEMA_PATH}"
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema = json.load(f)
    assert schema.get("$schema") == "https://json-schema.org/draft/2020-12/schema"
    assert schema.get("title") == "Agent1DeepMarketResearchOutput"
    assert "market_sizing" in schema.get("required", [])
    assert "kompetitor" in schema.get("required", [])
    assert "pain_points" in schema.get("required", [])
    assert "usp" in schema.get("required", [])
    assert "audiens" in schema.get("required", [])
    assert "benchmark_iklan" in schema.get("required", [])
    assert "creative_inspiration" in schema.get("required", [])

def test_keyword_trend_math():
    tool = KeywordTrendsTool()
    # Case 1: > 5% should be "naik"
    delta, arah = tool.calculate_trend_metrics(last_4_weeks=[100, 110, 115, 120], prev_4_weeks=[80, 85, 90, 85])
    assert delta > 5.0
    assert arah == "naik"

    # Case 2: < -5% should be "turun"
    delta_down, arah_down = tool.calculate_trend_metrics(last_4_weeks=[60, 65, 55, 60], prev_4_weeks=[90, 95, 85, 90])
    assert delta_down < -5.0
    assert arah_down == "turun"

    # Case 3: between -5% and 5% should be "stabil"
    delta_stable, arah_stable = tool.calculate_trend_metrics(last_4_weeks=[100, 101, 99, 100], prev_4_weeks=[100, 100, 100, 100])
    assert -5.0 <= delta_stable <= 5.0
    assert arah_stable == "stabil"

def test_deterministic_contract_validates_against_jsonschema():
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema = json.load(f)

    keywords = KeywordTrendsTool().get_keywords_and_trends("Laundry Kiloan", "Surabaya")
    raw_data = agent1_service._build_deterministic_agent1_contract(
        niche="Laundry Kiloan",
        lokasi="Surabaya",
        total_competitors=24,
        min_price=6000.0,
        max_price=9000.0,
        keywords=keywords,
        competitors_raw=[
            {
                "name": "Super Wash Express",
                "rating": 4.6,
                "user_ratings_total": 142,
                "price_rp": 7000.0,
                "active_ads": ["meta"],
                "weakness": "Antrean saat musim hujan bisa 3 hari"
            }
        ],
        custom_usp="Laundry kiloan wangi parfum mewah 24 jam siap",
        audience={
            "platform_dominan": [
                {"platform": "google_search", "persen_estimasi": 52.0, "sumber": "Google Search Index 2024"},
                {"platform": "instagram", "persen_estimasi": 26.0, "sumber": "We Are Social 2025"}
            ],
            "funnel_stage_dominan": "decision"
        },
        ad_benchmark={
            "meta_ads_cpm_rp": {"min": 14000.0, "max": 24000.0},
            "google_ads_cpc_rp": {"min": 950.0, "max": 2400.0}
        },
        creative_inspirations=[
            {
                "platform": "tiktok",
                "format": "video_ugc",
                "pola_hook": "Jangan kaget kalau baju numpuk rapi wangi dalam 24 jam!",
                "sumber": "tiktok_creative_center"
            }
        ]
    )

    # Validate against JSON Schema Draft 2020-12
    jsonschema.validate(instance=raw_data, schema=schema)

    # Validate against Pydantic v2
    model = Agent1DeepMarketResearchOutput(**raw_data)
    assert model.niche == "Laundry Kiloan"
    assert model.lokasi == "Surabaya"
    assert model.market_sizing.estimasi_pesaing_radius_5km == 24
    assert len(model.kompetitor) >= 1
    assert model.kompetitor[0].confidence_score == 1.0
    assert "24 kompetitor" in model.usp.metode_verifikasi
    assert model.pain_points[0].frekuensi_skor <= 1.0

@pytest.mark.asyncio
async def test_agent1_async_run():
    result = await agent1_service.run_market_research(
        niche="Jasa Service AC",
        lokasi="Mojokerto",
        harga_jual=75000,
        hpp=30000,
        custom_usp="Garansi dingin 30 hari tanpa ribet"
    )

    assert isinstance(result, Agent1DeepMarketResearchOutput)
    assert result.niche == "Jasa Service AC"
    assert result.lokasi == "Mojokerto"
    assert result.market_sizing.estimasi_pesaing_radius_5km > 0
    assert len(result.kompetitor) > 0
    assert len(result.pain_points) >= 3
    assert len(result.creative_inspiration) >= 1
    assert "Mojokerto" in result.usp.metode_verifikasi
    assert result.usp.klaim == "Garansi dingin 30 hari tanpa ribet"

