import datetime
import json
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.core.database import Base

class CampaignModel(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_name = Column(String(255), nullable=False, index=True)
    harga_jual = Column(Integer, nullable=False, default=0)
    hpp = Column(Integer, nullable=False, default=0)
    budget_harian = Column(Integer, nullable=False, default=0)
    kategori = Column(String(100), nullable=False, default="Fisik", index=True)
    platform = Column(String(100), nullable=False, default="TikTok", index=True)
    status = Column(String(50), nullable=False, default="Completed", index=True)
    roas = Column(String(50), nullable=False, default="210%")
    margin_percentage = Column(Float, nullable=False, default=0.0)
    
    # Serialized full agent pipeline output
    result_json = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    trackings = relationship("TrackingModel", back_populates="campaign", cascade="all, delete-orphan")

    def to_dict(self):
        result_parsed = None
        if self.result_json:
            try:
                result_parsed = json.loads(self.result_json)
            except Exception:
                result_parsed = None

        return {
            "id": self.id,
            "product_name": self.product_name,
            "harga_jual": self.harga_jual,
            "hpp": self.hpp,
            "budget": self.budget_harian,
            "budget_harian": self.budget_harian,
            "kategori": self.kategori,
            "platform": self.platform,
            "status": self.status,
            "roas": self.roas,
            "margin_percentage": self.margin_percentage,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "result": result_parsed,
        }

class TrackingModel(Base):
    __tablename__ = "campaign_trackings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id", ondelete="CASCADE"), nullable=False, index=True)
    click_count = Column(Integer, default=0)
    conversion_count = Column(Integer, default=0)
    revenue_generated = Column(Integer, default=0)
    last_clicked_at = Column(DateTime, default=datetime.datetime.utcnow)

    campaign = relationship("CampaignModel", back_populates="trackings")
