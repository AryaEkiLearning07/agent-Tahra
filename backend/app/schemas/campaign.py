from typing import List, Optional, Literal, Dict, Any, Union
from pydantic import BaseModel, Field, field_validator

class CampaignCreate(BaseModel):
    product_name: str = Field(..., min_length=2, max_length=255, description="Nama lengkap produk UMKM")
    harga_jual: int = Field(..., gt=0, description="Harga jual produk ke konsumen")
    hpp: int = Field(..., gt=0, description="Harga Pokok Penjualan / Modal per unit")
    budget_harian: int = Field(..., ge=10000, description="Budget iklan harian dalam Rupiah")
    kategori: str = Field(default="Fisik", description="Kategori produk")
    platform: Optional[str] = Field(default="TikTok", description="Preferensi platform awal")

    @field_validator("hpp")
    @classmethod
    def validate_hpp_less_than_harga(cls, v, info):
        harga = info.data.get("harga_jual")
        if harga is not None and v >= harga:
            raise ValueError("HPP tidak boleh lebih besar atau sama dengan Harga Jual.")
        return v

# --- STRICT EMPIRICAL SUB-AGENT 1 SCHEMAS (DEEP MARKET INTELLIGENCE & SEO) ---

class MarketSegmentation(BaseModel):
    demographics: str = Field(default="Pria & Wanita 20-35 tahun, pekerja/mahasiswa", description="Rentang usia, pekerjaan, tingkat pengeluaran")
    geographics: str = Field(default="Kota Tier 1 & Kota Berkembang di Indonesia", description="Kesesuaian kota/wilayah")
    psychographics: str = Field(default="Gaya hidup, rutinitas harian, dan kebiasaan transaksi", description="Psikografi dan kebiasaan")

class PainPointAngle(BaseModel):
    type: str = Field(default="Functional", description="Sudut masalah: Financial, Functional, atau Emotional")
    problem: str = Field(..., description="Deskripsi spesifik masalah yang dialami")

class CompetitorTierItem(BaseModel):
    competitor_name: str = Field(..., description="Nama kompetitor / kebiasaan lama")
    tier: str = Field(default="Direct", description="Tipe kompetitor: Direct atau Indirect")
    weakness: str = Field(..., description="Kelemahan atau celah yang bisa dimanfaatkan")

# SUB-AGENT 1: Deep Market Analyst & SEO Specialist
class Agent1MarketResearchOutput(BaseModel):
    product_name: str = Field(default="Produk / Layanan")
    market_segmentation: MarketSegmentation = Field(default_factory=MarketSegmentation)
    search_intent_features: List[str] = Field(default_factory=list, description="Kata kunci dan fitur yang sering dicari")
    pain_points: List[PainPointAngle] = Field(default_factory=list, description="Masalah konsumen dari 3 sudut (Financial, Functional, Emotional)")
    competitor_analysis: List[CompetitorTierItem] = Field(default_factory=list, description="Analisis kompetitor Direct & Indirect")
    unique_selling_proposition: str = Field(default="Pernyataan keunggulan produk konkret bebas klaim kosong", description="USP terverifikasi")
    data_foundation: str = Field(default="Analisis pasar empiris mendalam berbasis data lokal Indonesia.")

    # Backward compatibility properties
    @property
    def usp(self) -> str:
        return self.unique_selling_proposition

    @property
    def target_demography(self) -> str:
        return f"{self.market_segmentation.demographics} ({self.market_segmentation.geographics})"

    @property
    def audience_psychography(self) -> str:
        return self.market_segmentation.psychographics

    @property
    def competitor_proxy(self) -> str:
        if self.competitor_analysis:
            return f"{self.competitor_analysis[0].competitor_name} ({self.competitor_analysis[0].tier})"
        return "Kompetitor Pasar Indonesia"



# --- ELITE PERFORMANCE MARKETING ARCHITECTURE (SUB-AGENT 2) ---

class ChannelSuitabilityItem(BaseModel):
    channel_name: str = "TikTok"
    suitability_score: int = 85
    verdict: str = "PRIMARY_RECOMMENDED"
    cost_benchmark: str = "CPM Rp 15.000 - Rp 25.000"
    data_rationale: Optional[str] = "Format video pendek sangat efektif untuk visual produk"

class MultiChannelBudgetSplit(BaseModel):
    primary_channel: str = "TikTok"
    primary_percentage: int = 70
    secondary_channel: str = "Instagram Reels"
    secondary_percentage: int = 30

# SUB-AGENT 2: Strategy Architect (The Planner)
class Agent2StrategyOutput(BaseModel):
    margin_value: int
    margin_percentage: float
    financial_status: str = "HEALTHY"
    platform: str = "TikTok"
    format_iklan: str = "Video Pendek (9:16)"
    aspect_ratio: str = "9:16"
    bidding_model: str = "CPA"
    max_cpa_limit: int
    channel_suitability_matrix: Optional[List[ChannelSuitabilityItem]] = None
    budget_allocation_split: Optional[MultiChannelBudgetSplit] = None
    competitive_attack_angle: Optional[str] = None
    strategic_rationale: str
    data_foundation: str

# --- SPECIALIZED CREATIVE SUB-AGENTS (SUB-AGENT 3) ---

class SpecializedSubAgentsCreative(BaseModel):
    sub_agent_3a_hook: str = ""
    sub_agent_3b_pas_body: str = ""
    sub_agent_3c_keywords_hashtags: List[str] = Field(default_factory=list)
    sub_agent_3d_urgency_cta: str = ""

class VideoScriptSchema(BaseModel):
    hook_0_3s: str = "Visual hook 0-3 detik yang menghentikan scroll penonton"
    body_3_10s: str = "Penjelasan solusi dan keunggulan utama produk"
    cta_10_15s: str = "Panggilan aksi jelas untuk membeli sekarang"

class Agent3CopywriterOutput(BaseModel):
    headline: str = "Solusi Terbaik untuk Kebutuhan Anda"
    primary_text: str = "Deskripsi persuasif menggunakan formula Problem-Agitate-Solution"
    cta: str = "Pesan Sekarang"
    video_script: Optional[VideoScriptSchema] = Field(default_factory=VideoScriptSchema)
    sub_specialists: Optional[SpecializedSubAgentsCreative] = None
    keywords_and_hashtags: Optional[List[str]] = None
    data_foundation: str = "Formula PAS teruji meningkatkan rasio konversi"

# SUB-AGENT 4: Art Director & Visual Designer (The Creator)
class Agent4VisualOutput(BaseModel):
    image_prompt: str = "Commercial studio photography of product, crisp 8k resolution, cinematic lighting"
    visual_mood: str = "Cinematic, Crisp Professional Glow"
    aspect_ratio: str = "9:16"
    recommended_composition: str = "Centered product focus"
    data_foundation: str = "Staging visual terpusat terbukti meningkatkan CTR"

# SUB-AGENT 5: Adversarial Evaluator & Executor (The QA & Deployer)
class FinancialMetrics(BaseModel):
    budget_harian: int
    estimasi_tayangan: int
    estimasi_klik: int
    estimasi_pembeli: int
    estimasi_omzet: int
    estimasi_laba_bersih: int
    roas_percentage: float
    roas_status: str
    summary: str
    formula_breakdown: str

class Agent5QAAndDeployOutput(BaseModel):
    qc_status: str = "APPROVED"
    qc_notes: str = "Semua parameter produk dan kreatif telah divalidasi konsisten."
    campaign_blueprint_payload: Dict[str, Any]
    roas_report: FinancialMetrics
    tracking_link: str
    deployment_status: str = "DEPLOYED_SIMULATION"
    data_foundation: str = "Kalkulasi didasarkan pada benchmark industri CPM Rp 20.000, CTR 2%, dan CVR 3%."

# COMPREHENSIVE PIPELINE RESULT
class MultiAgentPipelineResult(BaseModel):
    status: str = "COMPLETED"
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
