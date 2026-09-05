import uuid
from datetime import datetime, timezone
from typing import List, Optional, Literal, Dict, Any, Union
from pydantic import BaseModel, Field, field_validator

class CampaignCreate(BaseModel):
    product_name: str = Field(..., min_length=2, max_length=500, description="Nama lengkap produk / deskripsi usaha")
    niche: Optional[str] = Field(default=None, description="Spesifikasi niche/kategori usaha")
    lokasi: Optional[str] = Field(default="Indonesia", description="Kota atau target wilayah pemasaran")
    harga_jual: int = Field(..., gt=0, description="Harga jual produk ke konsumen")
    hpp: int = Field(..., gt=0, description="Harga Pokok Penjualan / Modal per unit")
    budget_harian: int = Field(default=100000, ge=10000, description="Budget iklan harian dalam Rupiah")
    kategori: str = Field(default="Fisik", description="Kategori produk utama")
    sub_kategori: Optional[str] = Field(default=None, description="Sub-kategori produk 2-level taxonomy")
    target_lokasi_type: Optional[str] = Field(default="nasional", description="Tipe jangkauan: 'nasional', 'radius', 'kota', 'internasional'")
    target_lokasi_radius_km: Optional[int] = Field(default=None, description="Radius jangkauan lokal dalam KM jika tipe radius")
    target_provinces: Optional[List[str]] = Field(default=None, description="Daftar provinsi target spesifik")
    target_cities: Optional[List[str]] = Field(default=None, description="Daftar kota target spesifik")
    kondisi_bisnis: Optional[str] = Field(default=None, description="Kondisi bisnis riil saat ini (bahasa manusiawi)")
    funnel_goal: Optional[str] = Field(default="awareness", description="Tahap funnel: 'awareness', 'consideration', 'leads', 'sales', 'retargeting', 'auto'")
    budget_period: Optional[str] = Field(default="daily", description="'daily' atau 'monthly'")
    link_produk: Optional[str] = Field(default=None, description="Link marketplace atau website produk")
    social_media_handles: Optional[Dict[str, str]] = Field(default=None, description="Akun Instagram, TikTok, WhatsApp bisnis")
    previous_platforms: Optional[List[str]] = Field(default=None, description="Platform iklan yang sudah pernah dicoba")
    platform: Optional[str] = Field(default="TikTok", description="Preferensi platform awal")
    custom_usp: Optional[str] = Field(default=None, description="Input manual klaim keunggulan/USP dari pemilik bisnis")

    @field_validator("hpp")
    @classmethod
    def validate_hpp_less_than_harga(cls, v, info):
        harga = info.data.get("harga_jual")
        if harga is not None and v >= harga:
            raise ValueError("HPP tidak boleh lebih besar atau sama dengan Harga Jual.")
        return v

    def get_effective_niche(self) -> str:
        if self.sub_kategori and self.sub_kategori.strip():
            return f"{self.niche or self.product_name} ({self.sub_kategori})"
        if self.niche and self.niche.strip():
            return self.niche.strip()
        return self.product_name.strip()

    def get_effective_lokasi(self) -> str:
        if self.target_lokasi_type == "radius" and self.target_lokasi_radius_km:
            return f"{self.lokasi} (Radius {self.target_lokasi_radius_km} km)"
        if self.target_cities and len(self.target_cities) > 0:
            return ", ".join(self.target_cities[:3])
        if self.lokasi and self.lokasi.strip():
            return self.lokasi.strip()
        return "Indonesia"

class Agent1ResearchRequest(BaseModel):
    niche: str = Field(..., min_length=1, max_length=200, description="Niche produk/usaha")
    lokasi: str = Field(default="Indonesia", min_length=1, max_length=150, description="Lokasi/kota")
    harga_jual: Optional[int] = Field(default=None, gt=0, description="Estimasi harga jual jika sudah ditentukan")
    hpp: Optional[int] = Field(default=None, gt=0, description="Estimasi modal / HPP jika sudah ditentukan")
    kategori: Optional[str] = Field(default=None, description="Kategori produk")
    sub_kategori: Optional[str] = Field(default=None, description="Sub-kategori produk")
    kondisi_bisnis: Optional[str] = Field(default=None, description="Kondisi bisnis riil saat ini")
    funnel_goal: Optional[str] = Field(default=None, description="Goal tahapan funnel")
    link_produk: Optional[str] = Field(default=None, description="Link marketplace atau website")
    social_media_handles: Optional[Dict[str, str]] = Field(default=None, description="Akun sosmed / WA bisnis")
    custom_usp: Optional[str] = Field(default=None, description="Klaim keunggulan dari pemilik bisnis jika ada")

# --- STRICT SCHEMA DRAFT 2020-12 AGENT 1: DEEP MARKET RESEARCH ---

class HargaPasarRange(BaseModel):
    min: float = Field(..., ge=0, description="Harga pasar minimum")
    max: float = Field(..., ge=0, description="Harga pasar maksimum")

class KeywordVolumeItem(BaseModel):
    keyword: str = Field(..., min_length=1, description="Kata kunci pencarian")
    volume_bulanan: int = Field(..., ge=0, description="Volume pencarian bulanan")
    arah_tren: Literal["naik", "turun", "stabil"] = Field(..., description="Arah tren pencarian")
    delta_persen_3bulan: float = Field(..., description="Persentase pertumbuhan tren 3 bulan terakhir")
    sumber: Literal["google_trends", "google_keyword_planner"] = Field(..., description="Sumber data keyword")

class MarketSizing(BaseModel):
    estimasi_pesaing_radius_5km: int = Field(..., ge=0, description="Jumlah estimasi pesaing dalam radius 5km")
    harga_pasar_rp_per_kg: HargaPasarRange = Field(..., description="Rentang harga pasar per kg atau per unit")
    keyword_volume: List[KeywordVolumeItem] = Field(..., min_length=1, description="Daftar volume keyword utama")

class CompetitorItem(BaseModel):
    nama: str = Field(..., min_length=1, description="Nama kompetitor")
    tipe: Literal["direct", "indirect"] = Field(..., description="Tipe kompetitor")
    rating: float = Field(..., ge=0, le=5, description="Rating bintang 0-5")
    jumlah_review: int = Field(..., ge=0, description="Jumlah total ulasan konsumen")
    harga_rp_per_kg: float = Field(..., ge=0, description="Harga produk per kg / unit")
    aktif_iklan_di: List[Literal["meta", "tiktok", "google"]] = Field(default_factory=list, description="Platform tempat kompetitor beriklan aktif")
    celah_kelemahan: str = Field(..., max_length=200, description="Celah kelemahan kompetitor")
    confidence_score: float = Field(..., ge=0, le=1, description="Tingkat kepercayaan data 0-1")
    sumber: Literal["google_maps", "meta_ad_library", "tiktok_creative_center", "website_kompetitor"] = Field(..., description="Sumber data kompetitor")

class PainPointItem(BaseModel):
    angle: Literal["financial", "functional", "emotional"] = Field(..., description="Sudut pandang masalah")
    insight: str = Field(..., max_length=200, description="Deskripsi keluhan/masalah konsumen")
    frekuensi_skor: float = Field(..., ge=0, le=1, description="Skor frekuensi kemunculan topik dalam review")
    sumber: Literal["google_maps_reviews", "instagram_komentar", "tiktok_komentar", "forum_lokal"] = Field(..., description="Sumber keluhan")

class USPItem(BaseModel):
    klaim: str = Field(..., max_length=150, description="Klaim USP keunggulan utama")
    metode_verifikasi: str = Field(..., max_length=200, description="Bukti verifikasi terhadap jumlah kompetitor")
    confidence_score: float = Field(..., ge=0, le=1, description="Skor kepercayaan verifikasi USP")

class PlatformDominanItem(BaseModel):
    platform: Literal["instagram", "tiktok", "facebook", "google_search"] = Field(..., description="Nama platform")
    persen_estimasi: float = Field(..., ge=0, le=100, description="Estimasi persentase penetrasi pengguna")
    sumber: str = Field(..., min_length=1, description="Sumber riset (APJII / We Are Social)")

class AudienceItem(BaseModel):
    platform_dominan: List[PlatformDominanItem] = Field(..., min_length=1, description="Distribusi platform pengguna")
    funnel_stage_dominan: Literal["awareness", "consideration", "decision"] = Field(..., description="Tahapan funnel paling dominan")

class CostRange(BaseModel):
    min: float = Field(..., ge=0, description="Batas bawah biaya")
    max: float = Field(..., ge=0, description="Batas atas biaya")

class BenchmarkIklan(BaseModel):
    meta_ads_cpm_rp: CostRange = Field(..., description="Benchmark CPM Meta Ads (Rp)")
    google_ads_cpc_rp: CostRange = Field(..., description="Benchmark CPC Google Ads (Rp)")

class CreativeInspirationItem(BaseModel):
    platform: Literal["meta", "tiktok"] = Field(..., description="Platform iklan inspirasi")
    format: Literal["video_ugc", "video_studio", "gambar_before_after", "gambar_testimoni"] = Field(..., description="Format konten iklan")
    pola_hook: str = Field(..., max_length=500, description="Pola hook pembuka iklan")
    sumber: Literal["meta_ad_library", "tiktok_creative_center"] = Field(..., description="Sumber inspirasi iklan")

# COMPLETE SUB-AGENT 1 DEEP MARKET RESEARCH MODEL (Complies with agent1_output_schema.json)
class Agent1DeepMarketResearchOutput(BaseModel):
    schema_version: Literal["1.0.0"] = "1.0.0"
    run_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    generated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    niche: str = Field(..., min_length=1, max_length=80)
    lokasi: str = Field(..., min_length=1, max_length=120)
    market_sizing: MarketSizing
    kompetitor: List[CompetitorItem] = Field(..., min_length=1)
    pain_points: List[PainPointItem] = Field(..., min_length=1)
    usp: USPItem
    audiens: AudienceItem
    benchmark_iklan: BenchmarkIklan
    creative_inspiration: List[CreativeInspirationItem] = Field(..., min_length=1)

    # Backward compatibility properties for downstream agents & legacy views
    @property
    def product_name(self) -> str:
        return self.niche

    @property
    def unique_selling_proposition(self) -> str:
        return self.usp.klaim

    @property
    def target_demography(self) -> str:
        top_platform = self.audiens.platform_dominan[0].platform if self.audiens.platform_dominan else "Digital"
        return f"Pengguna Aktif {top_platform.title()} di wilayah {self.lokasi}"

    @property
    def audience_psychography(self) -> str:
        return f"Konsumen {self.niche} pada funnel {self.audiens.funnel_stage_dominan} yang mengutamakan bukti kualitas dan kecepatan respon."

    @property
    def competitor_proxy(self) -> str:
        if self.kompetitor:
            return f"{self.kompetitor[0].nama} ({self.kompetitor[0].tipe})"
        return "Kompetitor Pasar Indonesia"

    @property
    def search_intent_features(self) -> List[str]:
        return [item.keyword for item in self.market_sizing.keyword_volume]

    @property
    def competitor_analysis(self) -> List[Dict[str, Any]]:
        return [
            {
                "competitor_name": c.nama,
                "tier": "Direct" if c.tipe == "direct" else "Indirect",
                "weakness": c.celah_kelemahan,
                "rating": c.rating,
                "review_count": c.jumlah_review,
                "confidence_score": c.confidence_score,
                "is_advertising": len(c.aktif_iklan_di) > 0,
                "active_platforms": c.aktif_iklan_di
            }
            for c in self.kompetitor
        ]

    @property
    def data_foundation(self) -> str:
        return (
            f"Riset pasar empiris di {self.lokasi}: dianalisis terhadap {self.market_sizing.estimasi_pesaing_radius_5km} "
            f"pesaing radius 5km dan {len(self.kompetitor)} kompetitor utama dengan verifikasi ulasan Google Maps, Meta & TikTok."
        )

# Alias for Agent 1 Output
Agent1MarketResearchOutput = Agent1DeepMarketResearchOutput


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
    agent1_research: Agent1DeepMarketResearchOutput
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

