import asyncio
import logging
from typing import Dict, Any
from app.services.llm_gateway import llm_gateway
from app.services.roas_calculator import roas_calculator
from app.services.market_intelligence import market_intelligence_engine
from app.schemas.campaign import (
    CampaignCreate,
    Agent1MarketResearchOutput,
    Agent2StrategyOutput,
    Agent3CopywriterOutput,
    Agent4VisualOutput,
    Agent5QAAndDeployOutput,
    FinancialMetrics,
    MultiAgentPipelineResult
)

logger = logging.getLogger("tahra.orchestrator")

class MultiAgentOrchestrator:
    """
    Sequential 5-Phase Multi-Agent Pipeline Orchestrator for TAHRA AI.
    Every decision is strictly backed by data foundation rationale.
    """

    async def run_pipeline(self, input_data: CampaignCreate) -> MultiAgentPipelineResult:
        logger.info(f"🚀 [PIPELINE START] Processing product: {input_data.product_name}")

        # =========================================================================
        # SUB-AGENT 1: Market & Product Researcher (The Explorer)
        # =========================================================================
        agent1_system = """
        ROLE: High-Precision Market Intelligence Specialist for Indonesian Businesses.
        TASK: Conduct empirical, zero-fluff, highly specific market & consumer intelligence for the exact product provided.

        STRICT RULES:
        1. NO FLUFF / NO AMBIGUITY: Ban generic adjectives ("terbaik", "kualitas tinggi", "profesional", "murah"). State explicit concrete features, numbers, units, and verified market realities.
        2. PURCHASE BEHAVIOR: Output "IMPULSE_BUYING" (if visual/fast decision/food/fashion/gadget <Rp 200rb), "HIGH_INTENT_SEARCH" (if urgent/repair/service/custom work), or "CONSIDERATION" (if premium/high-ticket).
        3. MARKET AWARENESS LEVEL: Output "UNAWARE" | "PROBLEM_AWARE" | "SOLUTION_AWARE" | "PRODUCT_AWARE" | "MOST_AWARE" (Eugene Schwartz Framework).
        4. TARGET DEMOGRAPHY: Narrow age bracket (e.g. "22-28 tahun"), specific job/routine, and city tier in Indonesia.
        5. AUDIENCE PSYCHOGRAPHY: State exact time of day, routine context, and monthly spending habits in IDR.
        6. COMPETITOR BENCHMARK: Name 1-2 REAL competitor brands/proxies in Indonesia, their concrete pricing in IDR, and the EXACT observed friction points/complaints of their customers.
        7. COST OF INACTION: State the exact concrete financial loss, wasted time, or severe consequence if the consumer delays purchasing today.
        8. QUANTIFIED CUSTOMER PAINS: Exactly 2-3 quantified pain points with concrete time/financial/emotional loss.
        9. EMPIRICAL PERSONAS: Exactly 2 real personas with specific name, narrow age, job, exact trigger moment, biggest hesitation before payment, and deciding proof factor.
        10. RISK REVERSAL: State the exact concrete guarantee/offer that eliminates purchase friction (e.g., garansi retur 100%, ganti baru, gratis cuci ulang).
        11. USP STATEMENT: Exactly 1 single concrete, verifiable promise sentence with numbers/specs, ZERO empty claims.
        12. DATA FOUNDATION: Concise empirical market reasoning.

        OUTPUT: JSON ONLY matching schema.
        Schema:
        {
          "product_name": str,
          "purchase_behavior": "IMPULSE_BUYING" | "HIGH_INTENT_SEARCH" | "CONSIDERATION",
          "market_awareness_level": "UNAWARE" | "PROBLEM_AWARE" | "SOLUTION_AWARE" | "PRODUCT_AWARE" | "MOST_AWARE",
          "target_demography": str,
          "audience_psychography": str,
          "competitor_benchmark": {
            "benchmark_brand_or_category": str,
            "observed_customer_friction": str,
            "price_point_gap": str
          },
          "cost_of_inaction": str,
          "quantified_customer_pains": list[str],
          "buyer_personas": [
            {
              "persona_title": str,
              "trigger_moment": str,
              "biggest_purchase_hesitation": str,
              "deciding_proof_factor": str
            }
          ],
          "risk_reversal_mechanism": str,
          "usp_statement": str,
          "data_foundation": str
        }
        """
        agent1_user = f"Nama Produk / Layanan: {input_data.product_name}\nHarga Jual: Rp {input_data.harga_jual:,}\nModal/HPP: Rp {input_data.hpp:,}\nKategori: {input_data.kategori}\nPlatform Preferensi: {input_data.platform}".replace(",", ".")

        raw_agent1 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 1 (The Explorer)",
            system_prompt=agent1_system,
            user_message=agent1_user,
            temperature=0.3
        )
        
        agent1_res = Agent1MarketResearchOutput(**raw_agent1)

        # =========================================================================
        # AGENTS 2, 3, 4, 5 TEMPORARILY STUBBED FOR DEDICATED AGENT 1 EVALUATION
        # =========================================================================
        agent2_res = Agent2StrategyOutput(
            margin_value=30000,
            margin_percentage=60.0,
            financial_status="HEALTHY",
            platform="TikTok",
            format_iklan="Video Pendek (9:16)",
            aspect_ratio="9:16",
            bidding_model="CPA",
            max_cpa_limit=12000,
            strategic_rationale="[Agent 2 dinonaktifkan sementara untuk fokus evaluasi & penyempurnaan Agent 1]",
            data_foundation="Tahap evaluasi terisolasi untuk Agent 1."
        )

        agent3_res = Agent3CopywriterOutput(
            headline="[Tahap 3 Dinonaktifkan Sementara]",
            primary_text="Fokus pada pengujian data empiris Sub-Agent 1.",
            cta="Hubungi Sekarang",
            data_foundation="Tahap evaluasi Agent 1."
        )

        agent4_res = Agent4VisualOutput(
            image_prompt="[Tahap 4 Dinonaktifkan Sementara]",
            visual_mood="Modern",
            aspect_ratio="9:16",
            recommended_composition="Centered",
            data_foundation="Tahap evaluasi Agent 1."
        )

        financial_metrics = FinancialMetrics(
            break_even_roas=1.67,
            simulated_cac=12000,
            projected_conversions=8,
            projected_gross_revenue=400000,
            projected_net_profit=140000,
            roas_percentage=400.0,
            target_conversion_rate="2.8%",
            cpc_benchmark="Rp 650",
            safety_buffer="Aman"
        )

        agent5_res = Agent5QAAndDeployOutput(
            qa_status="PASSED",
            qc_validation_notes="Sub-Agent 1 Berhasil Dieksekusi Secara Terisolasi.",
            deployment_payload={},
            roas_report=financial_metrics,
            data_foundation="Evaluasi mandiri Sub-Agent 1 selesai."
        )

        return MultiAgentPipelineResult(
            status="SUCCESS",
            agent1_research=agent1_res,
            agent2_strategy=agent2_res,
            agent3_copywriter=agent3_res,
            agent4_visual=agent4_res,
            agent5_deploy=agent5_res,
            message="Sub-Agent 1 berhasil dieksekusi secara real-time dengan data empiris."
        )

orchestrator = MultiAgentOrchestrator()
