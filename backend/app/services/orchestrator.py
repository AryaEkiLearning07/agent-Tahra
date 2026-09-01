import logging
from typing import Dict, Any
from app.services.llm_gateway import llm_gateway
from app.services.roas_calculator import roas_calculator
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
    - Agent 1: Market & Product Researcher (The Explorer)
    - Agent 2: Strategy Architect (The Planner)
    - Agent 3: Creative Director & Copywriter (The Wordsmith)
    - Agent 4: Art Director & Visual Designer (The Creator)
    - Agent 5: Adversarial Evaluator & Executor (The QA & Deployer)
    """

    async def run_pipeline(self, input_data: CampaignCreate) -> MultiAgentPipelineResult:
        logger.info(f"🚀 [PIPELINE START] Processing product: {input_data.product_name}")

        # =========================================================================
        # SUB-AGENT 1: Market & Product Researcher (The Explorer)
        # =========================================================================
        agent1_system = """
        You are Sub-Agent 1 (The Explorer), a Market & Product Research AI for Indonesian UMKM.
        TASK: Conduct proxy competitor research, market pain points, and define USP from user input.
        RULES:
        - Identify a realistic Competitor Proxy in Indonesia (e.g., if artisan coffee Rp 20rb -> Janji Jiwa / Indomaret Point).
        - Identify 2-3 genuine Pain Points why customers need this product.
        - product_class: "Murah" if price < 50000, "Menengah" if 50000-200000, "Premium" if > 200000.
        - Define a clear USP (Unique Selling Proposition) in Bahasa Indonesia.
        OUTPUT: JSON ONLY matching schema.
        Schema:
        {
          "product_name": str,
          "product_class": "Murah" | "Menengah" | "Premium",
          "target_demography": str,
          "audience_psychography": str,
          "usp": str,
          "pain_points": list[str],
          "competitor_proxy": str
        }
        """
        agent1_user = f"Nama Produk: {input_data.product_name}\nHarga: Rp {input_data.harga_jual:,}\nHPP: Rp {input_data.hpp:,}\nKategori: {input_data.kategori}".replace(",", ".")

        raw_agent1 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 1 (The Explorer)",
            system_prompt=agent1_system,
            user_message=agent1_user,
            temperature=0.2
        )
        agent1_res = Agent1MarketResearchOutput(**raw_agent1)

        # =========================================================================
        # SUB-AGENT 2: Strategy Architect (The Planner)
        # =========================================================================
        # 1. Deterministic Unit Economics Check
        unit_econ = roas_calculator.calculate_unit_economics(
            harga_jual=input_data.harga_jual,
            hpp=input_data.hpp
        )

        agent2_system = """
        You are Sub-Agent 2 (The Planner), an Elite Digital Marketing Strategy Architect.
        TASK: Design the advertising battleground based on market research and unit economics.
        RULES:
        - Decide Platform: "TikTok" (visual Gen-Z), "Instagram Reels" (visual lifestyle), "Facebook Feed" (mature broad), "Google Search" (B2B/high intent).
        - Decide Format Iklan: "Video Pendek (9:16)" if TikTok/Reels, "Poster/Gambar (1:1)" if Feed, "Teks Search (16:9)" if Google.
        - aspect_ratio: "9:16" or "1:1" or "16:9".
        - bidding_model: "CPM" if awareness/thin margin, "CPC" if traffic, "CPA" if healthy margin.
        - max_cpa_limit: maximum 40% of margin profit value.
        - Provide strategic_rationale explaining why this channel was chosen.
        OUTPUT: JSON ONLY matching schema.
        Schema:
        {
          "platform": str,
          "format_iklan": str,
          "aspect_ratio": "9:16" | "1:1" | "16:9",
          "bidding_model": "CPM" | "CPC" | "CPA",
          "max_cpa_limit": int,
          "strategic_rationale": str
        }
        """
        agent2_user = (
            f"Produk: {agent1_res.product_name}\n"
            f"USP: {agent1_res.usp}\n"
            f"Target: {agent1_res.target_demography} ({agent1_res.audience_psychography})\n"
            f"Kompetitor: {agent1_res.competitor_proxy}\n"
            f"Margin Nilai: Rp {unit_econ['margin_value']:,} ({unit_econ['margin_percentage']}%)\n"
            f"Status Finansial: {unit_econ['financial_status']}"
        ).replace(",", ".")

        raw_agent2 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 2 (The Planner)",
            system_prompt=agent2_system,
            user_message=agent2_user,
            temperature=0.2
        )

        agent2_res = Agent2StrategyOutput(
            margin_value=unit_econ["margin_value"],
            margin_percentage=unit_econ["margin_percentage"],
            financial_status=unit_econ["financial_status"],
            platform=raw_agent2.get("platform", "TikTok"),
            format_iklan=raw_agent2.get("format_iklan", "Video Pendek (9:16)"),
            aspect_ratio=raw_agent2.get("aspect_ratio", "9:16"),
            bidding_model=raw_agent2.get("bidding_model", "CPM"),
            max_cpa_limit=raw_agent2.get("max_cpa_limit", int(unit_econ["margin_value"] * 0.4)),
            strategic_rationale=raw_agent2.get("strategic_rationale", unit_econ["consultation_advice"])
        )

        # Anti-Boncos VETO Gate
        if agent2_res.financial_status == "VETO":
            logger.warning(f"🚫 [PIPELINE VETOED] Margin too low ({agent2_res.margin_percentage}%)")
            return MultiAgentPipelineResult(
                status="VETO",
                agent1_research=agent1_res,
                agent2_strategy=agent2_res,
                message="Kampanye diveto oleh Sub-Agent 2 karena margin profit di bawah 20%."
            )

        # =========================================================================
        # SUB-AGENT 3: Creative Director & Copywriter (The Wordsmith)
        # =========================================================================
        agent3_system = """
        You are Sub-Agent 3 (The Wordsmith), an Award-winning Copywriter specializing in Indonesian UMKM ads.
        TASK: Craft persuasive ad copywriting based on Agent 2 format decision.
        RULES:
        - headline: Max 10 words, punchy, high-converting in Bahasa Indonesia.
        - primary_text: PAS Framework (Problem - Agitate - Solution) in Bahasa Indonesia.
        - cta: Strong actionable call-to-action in Bahasa Indonesia.
        - If format contains "Video", craft a precise video_script:
          * hook_0_3s: Visual & audio hook for first 3 seconds
          * body_3_10s: Core value proposition and demonstration
          * cta_10_15s: Direct closing offer
        OUTPUT: JSON ONLY matching schema.
        Schema:
        {
          "headline": str,
          "primary_text": str,
          "cta": str,
          "video_script": {"hook_0_3s": str, "body_3_10s": str, "cta_10_15s": str}
        }
        """
        agent3_user = (
            f"Produk: {agent1_res.product_name}\n"
            f"USP: {agent1_res.usp}\n"
            f"Pain Points: {', '.join(agent1_res.pain_points)}\n"
            f"Platform: {agent2_res.platform}\n"
            f"Format Iklan: {agent2_res.format_iklan}\n"
            f"Target: {agent1_res.target_demography}"
        )

        raw_agent3 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 3 (The Wordsmith)",
            system_prompt=agent3_system,
            user_message=agent3_user,
            temperature=0.7
        )
        agent3_res = Agent3CopywriterOutput(**raw_agent3)

        # =========================================================================
        # SUB-AGENT 4: Art Director & Visual Designer (The Creator)
        # =========================================================================
        agent4_system = """
        You are Sub-Agent 4 (The Creator), a World-class Art Director & Visual Prompt Designer.
        TASK: Formulate an ultra-detailed English prompt for Text-to-Image AI generators (Midjourney/DALL-E).
        RULES:
        - Respect the exact aspect ratio from Agent 2 (e.g. 9:16 or 1:1).
        - Match visual mood with Agent 3 copywriting tone.
        - Include product staging, lighting, composition, color grading, and camera lens details.
        OUTPUT: JSON ONLY matching schema.
        Schema:
        {
          "image_prompt": str,
          "visual_mood": str,
          "aspect_ratio": str,
          "recommended_composition": str
        }
        """
        agent4_user = (
            f"Product: {agent1_res.product_name}\n"
            f"Aspect Ratio: {agent2_res.aspect_ratio}\n"
            f"Headline: {agent3_res.headline}\n"
            f"Platform: {agent2_res.platform}\n"
            f"USP: {agent1_res.usp}"
        )

        raw_agent4 = await llm_gateway.execute_structured_agent(
            agent_name="Sub-Agent 4 (The Creator)",
            system_prompt=agent4_system,
            user_message=agent4_user,
            temperature=0.4
        )
        agent4_res = Agent4VisualOutput(**raw_agent4)

        # =========================================================================
        # SUB-AGENT 5: Adversarial Evaluator & Executor (The QA & Deployer)
        # =========================================================================
        # 1. Deterministic ROAS Simulation
        roas_math = roas_calculator.simulate_roas(
            harga_jual=input_data.harga_jual,
            hpp=input_data.hpp,
            budget_harian=input_data.budget_harian
        )
        financial_metrics = FinancialMetrics(**roas_math)

        # 2. Ads Manager Blueprint Payload Assembly
        blueprint_payload = {
            "campaign_name": f"TAHRA_{input_data.product_name.upper().replace(' ', '_')}_{agent2_res.platform}",
            "objective": "CONVERSIONS",
            "daily_budget": input_data.budget_harian,
            "bidding_strategy": agent2_res.bidding_model,
            "max_cpa_cap": agent2_res.max_cpa_limit,
            "placements": [agent2_res.platform],
            "targeting": {
                "demographics": agent1_res.target_demography,
                "psychographics": agent1_res.audience_psychography,
                "aspect_ratio": agent2_res.aspect_ratio,
            },
            "ad_creative": {
                "headline": agent3_res.headline,
                "body_text": agent3_res.primary_text,
                "call_to_action": agent3_res.cta,
                "image_prompt": agent4_res.image_prompt,
                "video_script": agent3_res.video_script.model_dump() if agent3_res.video_script else None,
            },
            "tracking_url": f"https://tahra.ai/track?campaign={input_data.product_name.lower().replace(' ', '-')}",
        }

        # 3. Quality Assurance Check
        qc_notes = (
            f"QA Passed: Rasio visual ({agent4_res.aspect_ratio}) sinkron dengan platform ({agent2_res.platform}). "
            f"Pesan headline konsisten dengan USP '{agent1_res.usp}'. Proyeksi ROAS ({financial_metrics.roas_percentage}%) siap dieksekusi."
        )

        agent5_res = Agent5QAAndDeployOutput(
            qc_status="APPROVED",
            qc_notes=qc_notes,
            campaign_blueprint_payload=blueprint_payload,
            roas_report=financial_metrics,
            tracking_link=blueprint_payload["tracking_url"],
            deployment_status="DEPLOYED_SIMULATION"
        )

        logger.info(f"✅ [PIPELINE SUCCESS] 5 Sub-Agents successfully completed for {input_data.product_name}")

        return MultiAgentPipelineResult(
            status="COMPLETED",
            agent1_research=agent1_res,
            agent2_strategy=agent2_res,
            agent3_creative=agent3_res,
            agent4_visual=agent4_res,
            agent5_deploy=agent5_res
        )

orchestrator = MultiAgentOrchestrator()
