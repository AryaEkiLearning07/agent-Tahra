from app.services.roas_calculator import roas_calculator

def run_agent5(product_name: str, harga_jual: int, hpp: int,
               budget_harian: int, platform: str, margin_percentage: float) -> dict:
    """
    Sub-Agent 5B (Financial Controller & ROAS Reporter).
    Executes deterministic mathematical simulation based on CPM/CTR/CVR funnel.
    """
    return roas_calculator.simulate_roas(
        harga_jual=harga_jual,
        hpp=hpp,
        budget_harian=budget_harian
    )
