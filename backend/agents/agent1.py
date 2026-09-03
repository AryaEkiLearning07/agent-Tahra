import asyncio
from typing import Dict, Any, Optional
from app.services.agent1_service import agent1_service
from app.schemas.campaign import Agent1DeepMarketResearchOutput

async def run_agent1_async(
    niche: str,
    lokasi: Optional[str] = None,
    harga_jual: Optional[int] = None,
    hpp: Optional[int] = None,
    kategori: Optional[str] = None,
    custom_usp: Optional[str] = None
) -> Agent1DeepMarketResearchOutput:
    """
    Sub-Agent 1: Deep Market Research.
    Gathers real data via tools, extracts pain points, calculates trends & competitive gap,
    and returns a verified JSON schema model.
    """
    return await agent1_service.run_market_research(
        niche=niche,
        lokasi=lokasi,
        harga_jual=harga_jual,
        hpp=hpp,
        custom_usp=custom_usp,
        kategori=kategori
    )

def run_agent1(
    niche: str,
    lokasi: Optional[str] = None,
    harga_jual: Optional[int] = None,
    hpp: Optional[int] = None,
    kategori: Optional[str] = None,
    custom_usp: Optional[str] = None
) -> dict:
    """Synchronous wrapper for agent 1 execution."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            import nest_asyncio
            nest_asyncio.apply()
        result = loop.run_until_complete(run_agent1_async(niche, lokasi, harga_jual, hpp, kategori, custom_usp))
        return result.model_dump()
    except Exception:
        result = asyncio.run(run_agent1_async(niche, lokasi, harga_jual, hpp, kategori, custom_usp))
        return result.model_dump()