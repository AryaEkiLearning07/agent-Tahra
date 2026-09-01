import math
from typing import Dict, Any

class ROASCalculator:
    """
    Deterministic Mathematical Engine for Unit Economics & Digital Ads Projections.
    Follows Section 2 & 3 of TAHRA AI System Architecture Blueprint.
    """

    @staticmethod
    def calculate_unit_economics(harga_jual: int, hpp: int) -> Dict[str, Any]:
        margin_value = harga_jual - hpp
        margin_percentage = round((margin_value / harga_jual) * 100, 2) if harga_jual > 0 else 0.0

        if margin_percentage < 20.0:
            status = "VETO"
            advice = f"Margin kotor hanya {margin_percentage}%. Terlalu rendah untuk menutupi biaya iklan (CPA). Tingkatkan harga jual atau efisiensi HPP sebelum beriklan."
        elif margin_percentage < 30.0:
            status = "WARNING"
            advice = f"Margin {margin_percentage}% cukup, namun membutuhkan strategi bidding ketat dan CPA rendah agar tetap menghasilkan laba bersih."
        else:
            status = "HEALTHY"
            advice = f"Margin {margin_percentage}% sangat sehat! Anda memiliki ruang fleksibel untuk beriklan secara agresif di platform digital."

        return {
            "margin_value": margin_value,
            "margin_percentage": margin_percentage,
            "financial_status": status,
            "consultation_advice": advice,
        }

    @staticmethod
    def simulate_roas(
        harga_jual: int,
        hpp: int,
        budget_harian: int,
        cpm_benchmark: int = 20000,
        ctr_rate: float = 0.02,
        cvr_rate: float = 0.03
    ) -> Dict[str, Any]:
        """
        Simulate advertising funnel:
        - Impressions = (Budget / CPM) * 1000
        - Clicks = Impressions * CTR (2%)
        - Buyers = Clicks * CVR (3%)
        - Revenue = Buyers * Selling Price
        - Net Profit = Revenue - (Buyers * HPP) - Daily Ad Spend
        - ROAS % = (Revenue / Daily Ad Spend) * 100
        """
        tayangan = max(100, int((budget_harian / cpm_benchmark) * 1000))
        klik = max(1, int(tayangan * ctr_rate))
        pembeli = max(1, int(klik * cvr_rate))
        
        omzet = pembeli * harga_jual
        total_hpp_cost = pembeli * hpp
        laba_bersih = omzet - total_hpp_cost - budget_harian
        roas_percentage = round((omzet / budget_harian) * 100, 2) if budget_harian > 0 else 0.0
        roas_status = "PROFIT" if roas_percentage >= 100.0 else "BONCOS"

        summary = (
            f"Dengan alokasi budget Rp {budget_harian:,}/hari, proyeksi ROAS mencapai {roas_percentage}% "
            f"({roas_status}) dengan estimasi laba bersih Rp {laba_bersih:,}/hari."
        ).replace(",", ".")

        formula_breakdown = (
            f"1. Tayangan: (Rp {budget_harian:,} / CPM Rp {cpm_benchmark:,}) × 1.000 = {tayangan:,} impresi\n"
            f"2. Klik: {tayangan:,} × CTR 2% = {klik:,} pengunjung\n"
            f"3. Pembeli: {klik:,} × CVR 3% = {pembeli:,} transaksi checkout\n"
            f"4. Omzet Kotor: {pembeli:,} × Rp {harga_jual:,} = Rp {omzet:,}\n"
            f"5. Modal Pokok (HPP): {pembeli:,} × Rp {hpp:,} = Rp {total_hpp_cost:,}\n"
            f"6. Laba Bersih: Rp {omzet:,} - Rp {total_hpp_cost:,} - Rp {budget_harian:,} = Rp {laba_bersih:,}\n"
            f"7. ROAS: (Rp {omzet:,} / Rp {budget_harian:,}) × 100% = {roas_percentage}%"
        ).replace(",", ".")

        return {
            "budget_harian": budget_harian,
            "estimasi_tayangan": tayangan,
            "estimasi_klik": klik,
            "estimasi_pembeli": pembeli,
            "estimasi_omzet": omzet,
            "estimasi_laba_bersih": laba_bersih,
            "roas_percentage": roas_percentage,
            "roas_status": roas_status,
            "summary": summary,
            "formula_breakdown": formula_breakdown,
        }

roas_calculator = ROASCalculator()
