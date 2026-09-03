import pytest
from httpx import AsyncClient, ASGITransport
from main import app
from app.core.database import init_db
from app.schemas.campaign import Agent1DeepMarketResearchOutput

@pytest.mark.asyncio
async def test_agent1_endpoint_direct():
    await init_db()
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:

        response = await client.post(
            "/api/v1/agent1/research",
            json={
                "niche": "Laundry Kiloan",
                "lokasi": "Surabaya",
                "harga_jual": 6000,
                "hpp": 2500,
                "custom_usp": "Cuci kilat 24 jam wangi parfum hotel mewah bergaransi anti-luntur"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["schema_version"] == "1.0.0"
        assert data["niche"] == "Laundry Kiloan"
        assert data["lokasi"] == "Surabaya"
        assert "market_sizing" in data
        assert data["market_sizing"]["estimasi_pesaing_radius_5km"] > 0
        assert len(data["kompetitor"]) > 0
        assert len(data["pain_points"]) >= 3
        assert data["usp"]["klaim"] != ""
        assert "Surabaya" in data["usp"]["metode_verifikasi"]
        assert len(data["audiens"]["platform_dominan"]) > 0
        assert "meta_ads_cpm_rp" in data["benchmark_iklan"]
        assert len(data["creative_inspiration"]) > 0

@pytest.mark.asyncio
async def test_full_pipeline_with_agent1():
    await init_db()
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:

        response = await client.post(
            "/api/v1/start-agent",
            json={
                "product_name": "Laundry Kiloan di Surabaya",
                "niche": "Laundry Kiloan",
                "lokasi": "Surabaya",
                "harga_jual": 6000,
                "hpp": 2500,
                "budget_harian": 100000,
                "kategori": "Jasa",
                "platform": "TikTok"
            }
        )
        assert response.status_code == 200
        result = response.json()
        assert result["status"] == "COMPLETED"
        assert "agent1_research" in result
        assert result["agent1_research"]["niche"] == "Laundry Kiloan"
        assert "agent2_strategy" in result
        assert "agent3_creative" in result
        assert "agent4_visual" in result
        assert "agent5_deploy" in result
