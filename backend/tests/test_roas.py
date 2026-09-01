from app.services.roas_calculator import roas_calculator

def test_unit_economics_healthy():
    # Selling 50.000, Modal 20.000 -> Margin 60% -> Healthy
    res = roas_calculator.calculate_unit_economics(50000, 20000)
    assert res["financial_status"] == "HEALTHY"
    assert res["margin_value"] == 30000
    assert res["margin_percentage"] == 60.0

def test_unit_economics_veto():
    # Selling 20.000, Modal 18.000 -> Margin 10% -> VETO
    res = roas_calculator.calculate_unit_economics(20000, 18000)
    assert res["financial_status"] == "VETO"
    assert res["margin_percentage"] == 10.0

def test_roas_simulation():
    # Budget 100.000 -> 5.000 impressions -> 100 clicks -> 3 buyers -> 3 * 50.000 = 150.000 omzet -> ROAS 150%
    res = roas_calculator.simulate_roas(50000, 20000, 100000)
    assert res["estimasi_tayangan"] == 5000
    assert res["estimasi_klik"] == 100
    assert res["estimasi_pembeli"] == 3
    assert res["estimasi_omzet"] == 150000
    assert res["roas_percentage"] == 150.0
    assert res["roas_status"] == "PROFIT"
