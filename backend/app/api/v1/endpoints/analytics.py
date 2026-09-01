import datetime
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.campaign import CampaignModel, TrackingModel

router = APIRouter()

@router.get("/track/{campaign_id}")
async def track_campaign_click(
    campaign_id: int,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """
    Tracking Link Receiver:
    Records ad click and simulates conversion attribution for TAHRA AI Dashboard.
    """
    query = select(CampaignModel).where(CampaignModel.id == campaign_id)
    result = await db.execute(query)
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Tracking ID invalid")

    # Record or update tracking
    track_query = select(TrackingModel).where(TrackingModel.campaign_id == campaign_id)
    track_res = await db.execute(track_query)
    tracking = track_res.scalar_one_or_none()

    if not tracking:
        tracking = TrackingModel(campaign_id=campaign_id, click_count=1)
        db.add(tracking)
    else:
        tracking.click_count += 1
        tracking.last_clicked_at = datetime.datetime.utcnow()

    await db.commit()

    return {
        "status": "tracked",
        "campaign_id": campaign_id,
        "product_name": campaign.product_name,
        "clicks": tracking.click_count,
        "redirect_url": f"https://marketplace.tahra.ai/product/{campaign_id}"
    }
