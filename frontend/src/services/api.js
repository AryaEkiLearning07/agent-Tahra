import axios from 'axios';

const FASTAPI_URL = import.meta.env.VITE_AI_BACKEND_URL || 'http://127.0.0.1:8000';
const EXPRESS_URL = import.meta.env.VITE_DB_BACKEND_URL || 'http://localhost:5000';

// Mock initial data if MySQL is not yet seeded
const SEED_CAMPAIGNS = [
  {
    id: 1,
    product_name: 'Sambal TAHRA Pedas Manis',
    platform: 'TikTok',
    target_audience: 'Pecinta Kuliner Pedas, 18-35th',
    budget: 150000,
    status: 'Completed',
    roas: '240%',
    created_at: '2026-09-01T08:30:00Z',
    result: {
      status: 'COMPLETED',
      product: {
        product_name: 'Sambal TAHRA Pedas Manis',
        key_features: ['Cabai segar alami', 'Kemasan pouch higienis', 'Tanpa pengawet sintesis'],
        product_class: 'Menengah',
        audience_psychography: 'Gen-Z & Milenial penyuka kuliner cepat saji, sering order via marketplace.',
      },
      financial_report: {
        margin_value: 17500,
        margin_percentage: 58.3,
        financial_status: 'HEALTHY',
        consultation_advice: 'Margin sangat sehat! Ideal untuk kampanye TikTok Ads dengan CPA agresif.',
      },
      strategy: {
        target_demography: 'Wanita & Pria 18-35 tahun, Urban Jawa-Bali',
        platform: 'TikTok',
        aspect_ratio: '9:16',
        bidding_model: 'CPM',
        max_cpa_limit: 7000,
      },
      creative: {
        headline: 'Pedasnya Nendang, Bikin Nasi Hangat Langsung Ludes!',
        primary_text: 'Sering kecewa sama sambal botolan yang cuma asin doang? Sambal TAHRA diracik dari cabai segar pilihan dengan resep warisan khas Nusantara.',
        cta: 'Beli Sekarang Diskon 20% 🔥',
        image_prompt: 'High-end commercial food photography of artisan Indonesian chili sambal in a modern minimalist jar, steam rising, rich crimson red lighting, macro shot, 9:16 aspect ratio.',
      },
      roas_report: {
        budget_harian: 150000,
        estimasi_tayangan: 7500,
        estimasi_klik: 180,
        estimasi_pembeli: 6,
        estimasi_omzet: 180000,
        estimasi_laba_bersih: 35000,
        roas_percentage: 120.0,
        roas_status: 'PROFIT',
        summary: 'Proyeksi ROAS berada di 120% dengan potensi laba bersih positif sejak hari pertama beriklan.',
      },
    },
  },
  {
    id: 2,
    product_name: 'Kopi Susu Aren Botolan 1L',
    platform: 'Instagram',
    target_audience: 'Pekerja WFH, Mahasiswa 20-30th',
    budget: 100000,
    status: 'Completed',
    roas: '185%',
    created_at: '2026-09-01T10:15:00Z',
    result: {
      status: 'COMPLETED',
      product: {
        product_name: 'Kopi Susu Aren Botolan 1L',
        key_features: ['Biji kopi robusta-arabika blend', 'Gula aren organik murni', 'Tahan 7 hari chiller'],
        product_class: 'Menengah',
        audience_psychography: 'Komuter kantor dan pekerja kreatif yang butuh asupan kafein harian.',
      },
      financial_report: {
        margin_value: 38000,
        margin_percentage: 54.2,
        financial_status: 'HEALTHY',
        consultation_advice: 'Unit economics kuat. Format 1L memberikan margin nominal yang cukup tebal untuk biaya ad acquisition.',
      },
      strategy: {
        target_demography: 'Pria & Wanita 20-35th, Pekerja Kantoran Jabodetabek',
        platform: 'Instagram',
        aspect_ratio: '1:1',
        bidding_model: 'CPC',
        max_cpa_limit: 15000,
      },
      creative: {
        headline: 'Stok Kafein Mingguan Siap Antar Dingin!',
        primary_text: 'Capek bolak-balik pesen ojol buat kopi harian? Kopi Susu Aren TAHRA 1 Liter siap menemani produktivitasmu seharian.',
        cta: 'Pesan Sekarang Gratis Ongkir 🛵',
        image_prompt: 'Minimalist frosted glass 1-liter bottle filled with iced creamy milk coffee, condensation droplets, aesthetic dark oak table background, studio lighting.',
      },
      roas_report: {
        budget_harian: 100000,
        estimasi_tayangan: 5000,
        estimasi_klik: 120,
        estimasi_pembeli: 4,
        estimasi_omzet: 280000,
        estimasi_laba_bersih: 52000,
        roas_percentage: 280.0,
        roas_status: 'PROFIT',
        summary: 'ROAS sangat tinggi (280%) berkat nilai pesanan (AOV) Rp 70.000 yang mengompensasi biaya iklan harian.',
      },
    },
  },
];

/**
 * Fetch all campaigns from MySQL or Local Storage fallback
 */
export async function getCampaigns() {
  try {
    const res = await axios.get(`${EXPRESS_URL}/api/campaigns`, { timeout: 3000 });
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn('Express/MySQL backend unreachable, falling back to local state:', err.message);
  }

  // Fallback to localStorage + initial seeds
  const local = JSON.parse(localStorage.getItem('tahra_campaigns') || 'null');
  if (!local) {
    localStorage.setItem('tahra_campaigns', JSON.stringify(SEED_CAMPAIGNS));
    return SEED_CAMPAIGNS;
  }
  return local;
}

/**
 * Run the 5-Agent Pipeline through FastAPI
 * @param {Object} campaignInput
 */
export async function runAgentPipeline(campaignInput) {
  try {
    const response = await axios.post(`${FASTAPI_URL}/api/start-agent`, {
      product_name: campaignInput.product_name,
      harga_jual: Number(campaignInput.harga_jual),
      hpp: Number(campaignInput.hpp),
      budget_harian: Number(campaignInput.budget_harian),
      kategori: campaignInput.kategori || 'Fisik',
    }, { timeout: 60000 });

    return { success: true, data: response.data };
  } catch (err) {
    console.warn('FastAPI AI backend error, generating local fallback result:', err.message);
    
    // Simulate intelligent fallback if local AI server is down
    const hargaJual = Number(campaignInput.harga_jual) || 50000;
    const hpp = Number(campaignInput.hpp) || 20000;
    const budget = Number(campaignInput.budget_harian) || 100000;
    const marginVal = hargaJual - hpp;
    const marginPct = (marginVal / hargaJual) * 100;
    const isVeto = marginPct < 20;

    const fallbackResult = {
      status: isVeto ? 'VETO' : 'COMPLETED',
      product: {
        product_name: campaignInput.product_name,
        key_features: ['Kualitas premium terjamin', 'Packaging eksklusif', 'Garansi kepuasan pelanggan'],
        product_class: hargaJual < 50000 ? 'Murah' : hargaJual < 200000 ? 'Menengah' : 'Premium',
        audience_psychography: `Konsumen modern pengguna aktif ${campaignInput.platform || 'TikTok'} yang mencari value-for-money terbaik.`,
      },
      financial_report: {
        margin_value: marginVal,
        margin_percentage: marginPct,
        financial_status: isVeto ? 'VETO' : marginPct >= 30 ? 'HEALTHY' : 'WARNING',
        consultation_advice: isVeto
          ? 'Margin produk di bawah 20%! Iklan ditolak untuk melindungi modal usaha kamu dari risiko boncos.'
          : 'Margin sehat dan unit economics terbukti aman untuk alokasi campaign ads.',
      },
      strategy: {
        target_demography: `Pria & Wanita 18-35th, Target Pasar ${campaignInput.kategori || 'Fisik'}`,
        platform: campaignInput.platform || 'TikTok',
        aspect_ratio: campaignInput.platform === 'TikTok' ? '9:16' : '1:1',
        bidding_model: 'CPM',
        max_cpa_limit: Math.floor(marginVal * 0.4),
      },
      creative: {
        headline: `${campaignInput.product_name} — Solusi Tepat Kebutuhan Harianmu!`,
        primary_text: `Ingin hasil terbaik tanpa ribet? ${campaignInput.product_name} dirancang khusus untuk memberikan pengalaman terbaik dengan harga yang bersahabat.`,
        cta: 'Beli Sekarang & Klaim Diskon Terbatas 🔥',
        image_prompt: `High-definition commercial studio shot of ${campaignInput.product_name}, professional cinematic lighting, dark luxury background, crimson accent glows, 8k resolution.`,
      },
      roas_report: {
        budget_harian: budget,
        estimasi_tayangan: Math.floor((budget / 20) * 1000),
        estimasi_klik: Math.floor(((budget / 20) * 1000) * 0.02),
        estimasi_pembeli: Math.max(1, Math.floor((((budget / 20) * 1000) * 0.02) * 0.03)),
        estimasi_omzet: Math.max(1, Math.floor((((budget / 20) * 1000) * 0.02) * 0.03)) * hargaJual,
        estimasi_laba_bersih: (Math.max(1, Math.floor((((budget / 20) * 1000) * 0.02) * 0.03)) * hargaJual) - (Math.max(1, Math.floor((((budget / 20) * 1000) * 0.02) * 0.03)) * hpp) - budget,
        roas_percentage: Number((((Math.max(1, Math.floor((((budget / 20) * 1000) * 0.02) * 0.03)) * hargaJual) / budget) * 100).toFixed(1)),
        roas_status: ((Math.max(1, Math.floor((((budget / 20) * 1000) * 0.02) * 0.03)) * hargaJual) / budget) >= 1 ? 'PROFIT' : 'BONCOS',
        summary: `Estimasi performa iklan berdasarkan benchmark CPM pasar industri ${campaignInput.kategori || 'Fisik'}.`,
      },
    };

    return { success: true, data: fallbackResult, isFallback: true };
  }
}

/**
 * Save new campaign to database or localStorage
 * @param {Object} campaign
 */
export async function saveCampaign(campaign) {
  try {
    const res = await axios.post(`${EXPRESS_URL}/api/campaigns`, {
      product_name: campaign.product_name,
      platform: campaign.platform,
      target_audience: campaign.target_audience,
      budget: campaign.budget,
    }, { timeout: 3000 });
    return res.data;
  } catch {
    // Save to local storage
    const list = JSON.parse(localStorage.getItem('tahra_campaigns') || '[]');
    const updated = [campaign, ...list];
    localStorage.setItem('tahra_campaigns', JSON.stringify(updated));
    return campaign;
  }
}
