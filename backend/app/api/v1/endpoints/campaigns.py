import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.core.database import get_db
from app.models.campaign import CampaignModel
from app.schemas.campaign import CampaignCreate, MultiAgentPipelineResult
from app.services.orchestrator import orchestrator

router = APIRouter()

@router.post("/start-agent", response_model=MultiAgentPipelineResult)
@router.post("/campaigns/simulate", response_model=MultiAgentPipelineResult)
async def start_agent_pipeline(
    payload: CampaignCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Trigger the 5-Phase Multi-Agent Pipeline.
    Evaluates unit economics, generates creatives, and calculates ROAS.
    """
    result = await orchestrator.run_pipeline(payload)

    # Persist to database
    chosen_platform = (
        result.agent2_strategy.platform
        if result.agent2_strategy
        else (payload.platform or "TikTok")
    )
    status_str = "Veto" if result.status == "VETO" else "Completed"
    roas_str = (
        f"{result.agent5_deploy.roas_report.roas_percentage}%"
        if (result.agent5_deploy and result.agent5_deploy.roas_report)
        else "-"
    )
    margin_pct = (
        result.agent2_strategy.margin_percentage
        if result.agent2_strategy
        else 0.0
    )

    campaign_entry = CampaignModel(
        product_name=payload.product_name,
        harga_jual=payload.harga_jual,
        hpp=payload.hpp,
        budget_harian=payload.budget_harian,
        kategori=payload.kategori,
        platform=chosen_platform,
        status=status_str,
        roas=roas_str,
        margin_percentage=margin_pct,
        result_json=json.dumps(result.model_dump())
    )
    db.add(campaign_entry)
    await db.commit()
    await db.refresh(campaign_entry)

    return result

@router.get("/campaigns")
async def list_campaigns(
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve all stored campaigns with pagination.
    """
    query = select(CampaignModel).order_by(desc(CampaignModel.id)).offset(offset).limit(limit)
    result = await db.execute(query)
    campaigns = result.scalars().all()
    return [c.to_dict() for c in campaigns]

@router.get("/campaigns/{campaign_id}")
async def get_campaign_by_id(
    campaign_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve specific campaign details by ID.
    """
    query = select(CampaignModel).where(CampaignModel.id == campaign_id)
    result = await db.execute(query)
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Kampanye tidak ditemukan.")
    return campaign.to_dict()

@router.delete("/campaigns/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_campaign(
    campaign_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Delete a campaign record by ID.
    """
    query = select(CampaignModel).where(CampaignModel.id == campaign_id)
    result = await db.execute(query)
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Kampanye tidak ditemukan.")
    await db.delete(campaign)
    await db.commit()
    return None
