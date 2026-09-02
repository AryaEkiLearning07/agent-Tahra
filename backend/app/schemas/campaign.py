from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field, field_validator

class CampaignCreate(BaseModel):
    product_name: str = Field(..., min_length=2, max_length=255, description="Nama lengkap produk UMKM")
    harga_jual: int = Field(..., gt=0, description="Harga jual produk ke konsumen")
    hpp: int = Field(..., gt=0, description="Harga Pokok Penjualan / Modal per unit")
    budget_harian: int = Field(..., ge=10000, description="Budget iklan harian dalam Rupiah")
    kategori: Literal["Fisik", "Jasa", "Digital"] = Field(default="Fisik", description="Kategori produk")
    platform: Optional[str] = Field(default="TikTok", description="Preferensi platform awal")

    @field_validator("hpp")
    @classmethod
    def validate_hpp_less_than_harga(cls, v, info):
        harga = info.data.get("harga_jual")
        if harga is not None and v >= harga:
            raise ValueError("HPP tidak boleh lebih besar atau sama dengan Harga Jual.")
        return v

# --- DEEP MULTI-DIMENSIONAL SUB-AGENT 1 SCHEMAS (RAG & MARKET INTELLIGENCE) ---

class CompetitorMatrixItem(BaseModel):
    brand_name: str
    price: str
    grammage: str
    pros_cons: str

class BuyerPersonaItem(BaseModel):
    name: str
    age_range: str
    profile_description: str
    purchase_trigger: str

class VoiceOfCustomer(BaseModel):
    sample_size: str = "1.200+ Ulasan Scraped"
    positive_triggers: List[str]
    competitor_friction_points: List[str]

class MarketDemandMetrics(BaseModel):
    trending_views: str
    monthly_search_volume: str
    purchase_intent_score: str

# SUB-AGENT 1: Market & Product Researcher (The Explorer)
class Agent1MarketResearchOutput(BaseModel):
    product_name: str
    product_class: Literal["Murah", "Menengah", "Premium"]
    target_demography: str
    audience_psychography: str
    usp: str
    pain_points: List[str]
    competitor_proxy: str
    market_demand: Optional[MarketDemandMetrics] = None
    voice_of_customer: Optional[VoiceOfCustomer] = None
    competitor_matrix: Optional[List[CompetitorMatrixItem]] = None
    buyer_personas: Optional[List[BuyerPersonaItem]] = None
    data_foundation: str

# --- ELITE PERFORMANCE MARKETING ARCHITECTURE (SUB-AGENT 2) ---

class ChannelSuitabilityItem(BaseModel):
    channel_name: str
    suitability_score: int
    verdict: Literal["PRIMARY_RECOMMENDED", "SECONDARY_SUPPORT", "NOT_RECOMMENDED"]
    cost_benchmark: str
    data_rationale: str

class MultiChannelBudgetSplit(BaseModel):
    primary_channel: str
    primary_percentage: int
    secondary_channel: str
    secondary_percentage: int

# SUB-AGENT 2: Strategy Architect (The Planner)
class Agent2StrategyOutput(BaseModel):
    margin_value: int
    margin_percentage: float
    financial_status: Literal["HEALTHY", "WARNING", "VETO"]
    platform: str
    format_iklan: str
    aspect_ratio: Literal["9:16", "1:1", "16:9"]
    bidding_model: str
    max_cpa_limit: int
    channel_suitability_matrix: Optional[List[ChannelSuitabilityItem]] = None
    budget_allocation_split: Optional[MultiChannelBudgetSplit] = None
    competitive_attack_angle: Optional[str] = None
    strategic_rationale: str
    data_foundation: str

# --- SPECIALIZED CREATIVE SUB-AGENTS (SUB-AGENT 3) ---

class SpecializedSubAgentsCreative(BaseModel):
    sub_agent_3a_hook: str  # 0-3s Pattern Interrupt & Visual Hook
    sub_agent_3b_pas_body: str  # Problem - Agitate - Solution Framework
    sub_agent_3c_keywords_hashtags: List[str]  # High Intent & Trending FYP Tags
    sub_agent_3d_urgency_cta: str  # Scarcity & Frictionless Call to Action

class VideoScriptSchema(BaseModel):
    hook_0_3s: str
    body_3_10s: str
    cta_10_15s: str

class Agent3CopywriterOutput(BaseModel):
    headline: str
    primary_text: str
    cta: str
    video_script: Optional[VideoScriptSchema] = None
    sub_specialists: Optional[SpecializedSubAgentsCreative] = None
    keywords_and_hashtags: Optional[List[str]] = None
    data_foundation: str

# SUB-AGENT 4: Art Director & Visual Designer (The Creator)
class Agent4VisualOutput(BaseModel):
    image_prompt: str
    visual_mood: str
    aspect_ratio: str
    recommended_composition: str
    data_foundation: str

# SUB-AGENT 5: Adversarial Evaluator & Executor (The QA & Deployer)
class FinancialMetrics(BaseModel):
    budget_harian: int
    estimasi_tayangan: int
    estimasi_klik: int
    estimasi_pembeli: int
    estimasi_omzet: int
    estimasi_laba_bersih: int
    roas_percentage: float
    roas_status: Literal["PROFIT", "BONCOS"]
    summary: str
    formula_breakdown: str

class Agent5QAAndDeployOutput(BaseModel):
    qc_status: Literal["APPROVED", "REVISED", "VETO"]
    qc_notes: str
    campaign_blueprint_payload: Dict[str, Any]
    roas_report: FinancialMetrics
    tracking_link: str
    deployment_status: str
    data_foundation: str

# COMPREHENSIVE PIPELINE RESULT
class MultiAgentPipelineResult(BaseModel):
    status: Literal["COMPLETED", "VETO"]
    agent1_research: Agent1MarketResearchOutput
    agent2_strategy: Agent2StrategyOutput
    agent3_creative: Optional[Agent3CopywriterOutput] = None
    agent4_visual: Optional[Agent4VisualOutput] = None
    agent5_deploy: Optional[Agent5QAAndDeployOutput] = None
    message: Optional[str] = None

    @property
    def financial_report(self):
        return self.agent2_strategy

    @property
    def creative(self):
        return self.agent3_creative

    @property
    def roas_report(self):
        return self.agent5_deploy.roas_report if self.agent5_deploy else None
