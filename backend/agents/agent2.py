from app.services.roas_calculator import roas_calculator

def run_agent2(product_name: str, harga_jual: int, hpp: int) -> dict:
    """
    Sub-Agent 2 (Business Consultant & Anti-Boncos Unit Economics).
    Utilizes deterministic math engine to guarantee 100% calculation precision.
    """
    return roas_calculator.calculate_unit_economics(harga_jual=harga_jual, hpp=hpp)
