import logging
from typing import Dict, Any
from app.services.llm_gateway import llm_gateway
from app.services.roas_calculator import roas_calculator
from app.schemas.campaign import (
    CampaignCreate,
    ProductDecoderOutput,
    BusinessConsultantOutput,
    MediaPlannerOutput,
    CopywriterOutput,
    FinancialReporterOutput,
    MultiAgentPipelineResult
)

logger = logging.getLogger("tahra.orchestrator")

class MultiAgentOrchestrator:
    """
    Sequential Multi-Agent Pipeline Orchestrator.
    Manages state passing between Sub-Agents 1A through 5B.
    """

    async def run_pipeline(self, input_data: CampaignCreate) -> MultiAgentPipelineResult:
        logger.info(f"🚀 [PIPELINE START] Processing product: {input_data.product_name}")

        # -------------------------------------------------------------
        # FASE 1: Sub-Agent 1A (The Decoder)
        # -------------------------------------------------------------
        agent1_system = """
        You are a Product Analysis Expert specializing in Indonesian UMKM products.
        TASK: Extract features, consumer psychography, and purchase power tier.
        RULES:
        - product_class: "Murah" if price < 50000, "Menengah" if 50000-200000, "Premium" if > 200000
        - audience_psychography: 1 compelling sentence in Bahasa Indonesia
        - key_features: array of 3-5 distinct product benefits
        OUTPUT: JSON ONLY matching schema.
        Schema: {"product_name": str, "key_features": list[str], "product_class": str, "audience_psychography": str}
        """
        agent1_user = f"Nama Produk: {input_data.product_name}\nHarga: Rp {input_data.harga_jual}\nKategori: {input_data.kategori}"

        raw_agent1 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 1A (Decoder)",
            system_prompt=agent1_system,
            user_message=agent1_user,
            temperature=0.2
        )
        product_res = ProductDecoderOutput(**raw_agent1)

        # -------------------------------------------------------------
        # FASE 2: Sub-Agent 2 (The Business Consultant & Anti-Boncos)
        # -------------------------------------------------------------
        # Deterministic calculation first to ensure 100% mathematical accuracy
        unit_econ = roas_calculator.calculate_unit_economics(
            harga_jual=input_data.harga_jual,
            hpp=input_data.hpp
        )
        financial_res = BusinessConsultantOutput(**unit_econ)

        # VETO Gate: If margin < 20%, reject immediately to protect UMKM funds
        if financial_res.financial_status == "VETO":
            logger.warning(f"🚫 [PIPELINE VETOED] Margin too low: {financial_res.margin_percentage}%")
            return MultiAgentPipelineResult(
                status="VETO",
                product=product_res,
                financial_report=financial_res,
                message="Kampanye dihentikan oleh AI Advisor karena margin profit di bawah 20%."
            )

        # -------------------------------------------------------------
        # FASE 3: Sub-Agent 3 (The Media Planner)
        # -------------------------------------------------------------
        agent3_system = """
        You are a Digital Media Planner specializing in Indonesian social media ads.
        TASK: Determine optimal advertising platform, aspect ratio, and bidding model.
        RULES:
        - aspect_ratio: "9:16" for TikTok/Reels, "1:1" for Feed, "16:9" for Landscape
        - bidding_model: "CPM" or "CPC" or "CPA"
        - max_cpa_limit: integer max CPA in Rupiah (max 40% of margin)
        OUTPUT: JSON ONLY matching schema.
        Schema: {"target_demography": str, "platform": str, "aspect_ratio": str, "bidding_model": str, "max_cpa_limit": int}
        """
        agent3_user = (
            f"Produk: {product_res.product_name}\n"
            f"Kelas: {product_res.product_class}\n"
            f"Target: {product_res.audience_psychography}\n"
            f"Preferensi: {input_data.platform}\n"
            f"Margin Bersih: Rp {financial_res.margin_value}"
        )

        raw_agent3 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 3 (Media Planner)",
            system_prompt=agent3_system,
            user_message=agent3_user,
            temperature=0.2
        )
        strategy_res = MediaPlannerOutput(**raw_agent3)

        # -------------------------------------------------------------
        # FASE 4: Sub-Agent 4A (The Creative Copywriter)
        # -------------------------------------------------------------
        agent4_system = """
        You are an Elite Copywriter specializing in Indonesian UMKM high-converting ads.
        TASK: Write ad copy using PAS (Problem - Agitate - Solution) framework and generate image prompt.
        RULES:
        - headline: max 10 words, catchy, high-converting in Bahasa Indonesia
        - primary_text: 2-3 sentences using PAS framework in Bahasa Indonesia
        - cta: compelling action in Bahasa Indonesia
        - image_prompt: rich English prompt for Midjourney/DALL-E with lighting and composition
        OUTPUT: JSON ONLY matching schema.
        Schema: {"headline": str, "primary_text": str, "cta": str, "image_prompt": str}
        """
        agent4_user = (
            f"Produk: {product_res.product_name}\n"
            f"Fitur: {', '.join(product_res.key_features)}\n"
            f"Audiens: {strategy_res.target_demography}\n"
            f"Platform: {strategy_res.platform} ({strategy_res.aspect_ratio})"
        )

        raw_agent4 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 4A (Copywriter)",
            system_prompt=agent4_system,
            user_message=agent4_user,
            temperature=0.7
        )
        creative_res = CopywriterOutput(**raw_agent4)

        # -------------------------------------------------------------
        # FASE 5: Sub-Agent 5B (Financial Controller & ROAS Reporter)
        # -------------------------------------------------------------
        roas_math = roas_calculator.simulate_roas(
            harga_jual=input_data.harga_jual,
            hpp=input_data.hpp,
            budget_harian=input_data.budget_harian
        )
        roas_res = FinancialReporterOutput(**roas_math)

        logger.info(f"✅ [PIPELINE SUCCESS] ROAS: {roas_res.roas_percentage}% for {input_data.product_name}")

        return MultiAgentPipelineResult(
            status="COMPLETED",
            product=product_res,
            financial_report=financial_res,
            strategy=strategy_res,
            creative=creative_res,
            roas_report=roas_res,
        )

orchestrator = MultiAgentOrchestrator()
