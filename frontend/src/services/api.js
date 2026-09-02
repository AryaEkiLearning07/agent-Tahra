import axios from 'axios';

// Use relative API routing in production so Nginx proxies /api/ internally without Chrome Private Network warnings
const API_BASE = import.meta.env.VITE_API_URL || '';

const SEED_CAMPAIGNS = [];

/**
 * Fetch all campaigns from MySQL or Local Storage fallback
 */
export async function getCampaigns() {
  try {
    const local = JSON.parse(localStorage.getItem('tahra_campaigns') || 'null');
    if (local && Array.isArray(local)) {
      return local;
    }
  } catch (err) {
    console.warn('LocalStorage parse warning:', err);
  }

  try {
    const res = await axios.get(`${API_BASE}/api/campaigns`, { timeout: 2000 });
    if (res.data && Array.isArray(res.data)) {
      localStorage.setItem('tahra_campaigns', JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {
    // Graceful offline fallback
  }

  return [];
}

/**
 * Run the 5-Agent Pipeline through FastAPI (Pure Live Real AI)
 */
export async function runAgentPipeline(campaignInput) {
  try {
    const response = await axios.post(`${API_BASE}/api/start-agent`, {
      product_name: campaignInput.product_name,
      harga_jual: Number(campaignInput.harga_jual),
      hpp: Number(campaignInput.hpp),
      budget_harian: Number(campaignInput.budget_harian),
      kategori: campaignInput.kategori || 'Fisik',
      platform: campaignInput.platform || 'TikTok',
    }, { timeout: 60000 });

    return { success: true, data: response.data };
  } catch (err) {
    console.error('FastAPI AI Backend Error:', err);
    const detailMsg = err.response?.data?.detail || err.message || 'Gagal menghubungi AI Engine di backend.';
    throw new Error(`Koneksi AI Gagal: ${detailMsg}`);
  }
}

/**
 * Save new campaign to database
 */
export async function saveCampaign(campaignData) {
  try {
    const res = await axios.post(`${API_BASE}/api/campaigns/simulate`, {
      product_name: campaignData.product_name,
      harga_jual: Number(campaignData.harga_jual || campaignData.price || 0),
      hpp: Number(campaignData.hpp || 0),
      budget_harian: Number(campaignData.budget_harian || campaignData.budget || 100000),
      kategori: campaignData.kategori || 'Fisik',
      platform: campaignData.platform || 'TikTok',
    }, { timeout: 10000 });
    return res.data;
  } catch (err) {
    console.warn('Backend save notice, saving locally:', err.message);
    const existing = JSON.parse(localStorage.getItem('tahra_campaigns') || '[]');
    const updated = [campaignData, ...existing];
    localStorage.setItem('tahra_campaigns', JSON.stringify(updated));
    return campaignData;
  }
}

