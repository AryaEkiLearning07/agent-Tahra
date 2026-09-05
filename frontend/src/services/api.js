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
 * Run Standalone Sub-Agent 1 Deep Market Research
 */
export async function runAgent1Research(input) {
  try {
    const response = await axios.post(`${API_BASE}/api/v1/agent1/research`, {
      niche: input.niche || input.product_name,
      lokasi: input.lokasi || 'Indonesia',
      harga_jual: Number(input.harga_jual || 50000),
      hpp: Number(input.hpp || 20000),
      kategori: input.kategori || 'Fisik',
      custom_usp: input.custom_usp || null,
    }, { timeout: 60000 });

    return response.data;
  } catch (err) {
    console.error('Agent 1 Research Error:', err);
    throw err;
  }
}

/**
 * Run the 5-Agent Pipeline through FastAPI (Pure Live Real AI)
 */
export async function runAgentPipeline(campaignInput) {
  try {
    const response = await axios.post(`${API_BASE}/api/start-agent`, {
      product_name: campaignInput.product_name,
      niche: campaignInput.niche || campaignInput.product_name,
      lokasi: campaignInput.lokasi || 'Indonesia',
      harga_jual: Number(campaignInput.harga_jual),
      hpp: Number(campaignInput.hpp),
      budget_harian: Number(campaignInput.budget_harian || campaignInput.budget || 100000),
      kategori: campaignInput.kategori || 'Fisik',
      sub_kategori: campaignInput.sub_kategori || null,
      target_lokasi_type: campaignInput.target_lokasi_type || 'nasional',
      target_lokasi_radius_km: campaignInput.target_lokasi_radius_km || null,
      target_provinces: campaignInput.target_provinces || null,
      target_cities: campaignInput.target_cities || null,
      kondisi_bisnis: campaignInput.kondisi_bisnis || null,
      funnel_goal: campaignInput.funnel_goal || 'awareness',
      budget_period: campaignInput.budget_period || 'daily',
      link_produk: campaignInput.link_produk || null,
      social_media_handles: campaignInput.social_media_handles || null,
      previous_platforms: campaignInput.previous_platforms || null,
      platform: campaignInput.platform || 'TikTok',
      custom_usp: campaignInput.custom_usp || null,
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
      niche: campaignData.niche || campaignData.product_name,
      lokasi: campaignData.lokasi || 'Indonesia',
      harga_jual: Number(campaignData.harga_jual || campaignData.price || 0),
      hpp: Number(campaignData.hpp || 0),
      budget_harian: Number(campaignData.budget_harian || campaignData.budget || 100000),
      kategori: campaignData.kategori || 'Fisik',
      sub_kategori: campaignData.sub_kategori || null,
      target_lokasi_type: campaignData.target_lokasi_type || 'nasional',
      target_lokasi_radius_km: campaignData.target_lokasi_radius_km || null,
      target_provinces: campaignData.target_provinces || null,
      target_cities: campaignData.target_cities || null,
      kondisi_bisnis: campaignData.kondisi_bisnis || null,
      funnel_goal: campaignData.funnel_goal || 'awareness',
      budget_period: campaignData.budget_period || 'daily',
      link_produk: campaignData.link_produk || null,
      social_media_handles: campaignData.social_media_handles || null,
      previous_platforms: campaignData.previous_platforms || null,
      platform: campaignData.platform || 'TikTok',
      custom_usp: campaignData.custom_usp || null,
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

/**
 * User Login Authentication via FastAPI Backend
 */
export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_BASE}/api/v1/auth/login`, {
      email: credentials.email,
      password: credentials.password,
    }, { timeout: 15000 });

    return response.data;
  } catch (err) {
    const detail = err.response?.data?.detail || err.message || 'Gagal masuk ke platform.';
    throw new Error(detail);
  }
}

/**
 * User Registration via FastAPI Backend
 */
export async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_BASE}/api/v1/auth/register`, {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      company: userData.company,
      whatsapp: userData.whatsapp || null,
    }, { timeout: 15000 });

    return response.data;
  } catch (err) {
    const detail = err.response?.data?.detail || err.message || 'Gagal mendaftarkan akun.';
    throw new Error(detail);
  }
}

/**
 * Fetch Current Authenticated User Profile
 */
export async function getCurrentUser(token) {
  try {
    const response = await axios.get(`${API_BASE}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.detail || 'Sesi login tidak valid.');
  }
}
