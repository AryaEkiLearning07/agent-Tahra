from typing import List, Optional, Literal
from pydantic import BaseModel, Field, field_validator

class CampaignCreate(BaseModel):
    product_name: str = Field(..., min_length=2, max_length=255, description="Nama lengkap produk UMKM")
    harga_jual: int = Field(..., gt=0, description="Harga jual produk ke konsumen")
    hpp: int = Field(..., gt=0, description="Harga Pokok Penjualan / Modal per unit")
    budget_harian: int = Field(..., ge=10000, description="Budget iklan harian dalam Rupiah")
    kategori: Literal["Fisik", "Jasa", "Digital"] = Field(default="Fisik", description="Kategori produk")
    platform: Optional[Literal["TikTok", "Instagram", "Facebook", "Google"]] = Field(default="TikTok")

    @field_validator("hpp")
    @classmethod
    def validate_hpp_less_than_harga(cls, v, info):
        harga = info.data.get("harga_jual")
        if harga is not None and v >= harga:
            raise ValueError("HPP tidak boleh lebih besar atau sama dengan Harga Jual.")
        return v

# --- Sub-Agent Schemas ---

class ProductDecoderOutput(BaseModel):
    product_name: str
    key_features: List[str]
    product_class: Literal["Murah", "Menengah", "Premium"]
    audience_psychography: str

class BusinessConsultantOutput(BaseModel):
    margin_value: int
    margin_percentage: float
    financial_status: Literal["HEALTHY", "WARNING", "VETO"]
    consultation_advice: str

class MediaPlannerOutput(BaseModel):
    target_demography: str
    platform: str
    aspect_ratio: Literal["9:16", "1:1", "16:9"]
    bidding_model: Literal["CPM", "CPC", "CPA"]
    max_cpa_limit: int

class CopywriterOutput(BaseModel):
    headline: str
    primary_text: str
    cta: str
    image_prompt: str

class FinancialReporterOutput(BaseModel):
    budget_harian: int
    estimasi_tayangan: int
    estimasi_klik: int
    estimasi_pembeli: int
    estimasi_omzet: int
    estimasi_laba_bersih: int
    roas_percentage: float
    roas_status: Literal["PROFIT", "BONCOS"]
    summary: str

class MultiAgentPipelineResult(BaseModel):
    status: Literal["COMPLETED", "VETO"]
    product: ProductDecoderOutput
    financial_report: BusinessConsultantOutput
    strategy: Optional[MediaPlannerOutput] = None
    creative: Optional[CopywriterOutput] = None
    roas_report: Optional[FinancialReporterOutput] = None
    message: Optional[str] = None
