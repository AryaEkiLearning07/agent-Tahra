import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Wand2,
  MapPin,
  Tag,
  DollarSign,
  TrendingUp,
  Globe,
  Share2,
  Camera,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Layers,
  Radio,
  Sliders,
  Store,
  Compass
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import { formatRp } from '../utils/formatters';

// 2-Level Category Taxonomy
const CATEGORY_TAXONOMY = {
  'Makanan & Minuman (F&B)': [
    'F&B Siap Saji (Ready-to-Eat)',
    'Frozen Food',
    'Minuman Kemasan & Kopi',
    'Kue & Bakery',
    'Snack & Camilan Kering',
    'Resto & Cafe Lokal',
    'Bumbu & Bahan Masak',
  ],
  'Fashion & Aksesoris': [
    'Pakaian Pria & Wanita',
    'Sepatu & Sandal',
    'Tas & Dompet',
    'Hijab & Muslim Wear',
    'Perhiasan & Jam Tangan',
    'Aksesoris Fashion',
  ],
  'Kecantikan & Perawatan': [
    'Skincare Wajah',
    'Bodycare & Sabun',
    'Makeup & Kosmetik',
    'Haircare & Rambut',
    'Parfum & Wewangian',
    'Klinik / Salon Kecantikan',
  ],
  'Kesehatan & Wellness': [
    'Suplemen & Vitamin',
    'Herbal Alami & Jamu',
    'Alat Kesehatan Rumah',
    'Nutrisi Diet & Fitness',
  ],
  'Jasa & Layanan': [
    'Jasa Laundry & Cuci',
    'Servis AC & Elektronik',
    'Cuci & Salon Sepatu/Tas',
    'Studio Foto & Video',
    'Jasa Kebersihan / Cleaning',
    'Bengkel & Cuci Mobil/Motor',
    'Kursus & Pelatihan',
    'Konsultasi Profesional',
  ],
  'Rumah Tangga & Dekorasi': [
    'Furnitur & Mebel',
    'Dekorasi Rumah & Kamar',
    'Peralatan Dapur & Masak',
    'Pembersih Rumah Tangga',
  ],
  'Elektronik & Gadget': [
    'Aksesoris HP & Laptop',
    'Audio, TWS & Speaker',
    'Elektronik Rumah Tangga',
    'Smart Home & IoT',
  ],
  'Digital Product & SaaS': [
    'Software & SaaS Tool',
    'E-Book & Panduan PDF',
    'Template Desain & Koding',
    'Kursus Online & Membership',
  ],
  'Otomotif': [
    'Aksesoris Mobil & Motor',
    'Sparepart & Oli',
    'Helm & Riding Gear',
  ],
  'Ibu & Anak': [
    'Perlengkapan Bayi & Balita',
    'Pakaian Bayi & Anak',
    'Mainan Edukatif',
    'Perlengkapan Ibu Menyusui',
  ],
  'Lainnya': [
    'Lainnya (Ketik Manual)',
  ],
};

// Diagnostic Funnel Stages
const BUSINESS_CONDITIONS = [
  {
    id: 'awareness',
    icon: '🆕',
    label: 'Produk saya baru, orang belum banyak tahu',
    goalName: 'Brand Awareness & Jangkauan Luas',
    funnel: 'Top of Funnel (Discovery)',
    desc: 'Fokus memperkenalkan brand, video hook edukatif, dan memicu rasa penasaran audiens lokal/nasional.',
  },
  {
    id: 'consideration',
    icon: '👀',
    label: 'Sudah ada yang lihat/follow, tapi jarang tanya atau beli',
    goalName: 'Engagement & Pertimbangan',
    funnel: 'Middle of Funnel (Trust Building)',
    desc: 'Fokus menampilkan review, perbandingan manfaat, social proof, dan diferensiasi keunggulan dari kompetitor.',
  },
  {
    id: 'leads',
    icon: '💬',
    label: 'Sering ada yang tanya-tanya tapi belum closing',
    goalName: 'Leads & Intent Closing',
    funnel: 'Bottom of Funnel (Direct Response)',
    desc: 'Fokus CTA WhatsApp langsung, penawaran promo terbatas, jaminan garansi, dan menghilangkan keraguan pembeli.',
  },
  {
    id: 'sales',
    icon: '🛒',
    label: 'Sudah sering ada yang beli, saya mau scale up lebih banyak',
    goalName: 'Sales Scaling & ROAS Booster',
    funnel: 'Scale & Conversion Max',
    desc: 'Fokus targeting lookalike audiens, optimasi checkout marketplace, bundle hemat, dan menekan CPA.',
  },
  {
    id: 'retargeting',
    icon: '🔄',
    label: 'Saya mau pelanggan lama balik beli lagi (Repeat Order)',
    goalName: 'Customer Retention & Loyalty',
    funnel: 'Retargeting & LTV',
    desc: 'Fokus pesan loyalty, diskon khusus pelanggan setia, varian produk baru, dan reaktivasi database kontak.',
  },
  {
    id: 'auto',
    icon: '🤖',
    label: 'Saya tidak yakin, tolong Agent AI yang tentukan',
    goalName: 'AI Autonomous Funnel Diagnosis',
    funnel: 'Auto-Selected by Agent 1 & 2',
    desc: '5 Sub-Agent AI akan otomatis mendiagnosis funnel terbaik berdasarkan analisis data pasar dan deskripsi produk.',
  },
];

// Presets with complete structured mappings
const QUICK_PRESETS = [
  {
    label: '🧺 Laundry Kiloan Kilat',
    text: 'Laundry Kiloan di Surabaya. Layanan cuci setrika kilat wangi 24 jam dengan parfum premium dan garansi anti-luntur. Tarif Rp 6.000 per kg.',
    kategori: 'Jasa & Layanan',
    sub_kategori: 'Jasa Laundry & Cuci',
    lokasiType: 'radius',
    lokasiRadius: 10,
    lokasiText: 'Surabaya',
    budgetPeriod: 'daily',
    budgetAmount: 50000,
    hargaJual: 6000,
    hpp: 2500,
    kondisiId: 'awareness',
    hasSocial: true,
    social: { ig: '@laundrysurabaya.express', wa: '081234567890', link: '' },
    triedPlatforms: ['TikTok Ads'],
  },
  {
    label: '🛠️ Jasa Service AC Panggilan',
    text: 'Jasa Service AC di Mojokerto. Melayani cuci AC, perbaikan bocor, dan tambah freon bergaransi 30 hari. Tarif mulai Rp 75.000, respon cepat 24 jam.',
    kategori: 'Jasa & Layanan',
    sub_kategori: 'Servis AC & Elektronik',
    lokasiType: 'radius',
    lokasiRadius: 15,
    lokasiText: 'Mojokerto',
    budgetPeriod: 'daily',
    budgetAmount: 50000,
    hargaJual: 75000,
    hpp: 30000,
    kondisiId: 'leads',
    hasSocial: true,
    social: { ig: '', wa: '081298765432', link: '' },
    triedPlatforms: ['Meta Ads (IG/FB)'],
  },
  {
    label: '👟 Cuci Sepatu Sneakers Deep Clean',
    text: 'Jasa Cuci Sepatu Sneakers di Yogyakarta. Paket Deep Clean Express 24 Jam selesai tanpa bau apek, harga Rp 35.000 per pasang. Target mahasiswa dan pekerja kantor.',
    kategori: 'Jasa & Layanan',
    sub_kategori: 'Cuci & Salon Sepatu/Tas',
    lokasiType: 'radius',
    lokasiRadius: 10,
    lokasiText: 'Yogyakarta',
    budgetPeriod: 'daily',
    budgetAmount: 75000,
    hargaJual: 35000,
    hpp: 12000,
    kondisiId: 'consideration',
    hasSocial: true,
    social: { ig: '@sneakerswash.yk', wa: '087812345678', link: '' },
    triedPlatforms: ['TikTok Ads', 'Meta Ads (IG/FB)'],
  },
  {
    label: '🌶️ Sambal Cumi Asin Kemasan Pouch',
    text: 'Sambal Cumi Asin Pedas Kemasan Pouch 150g di Jakarta. Menggunakan cumi segar tanpa pengawet kimia, tahan 3 bulan, harga Rp 28.000 per pouch. Siap kirim ke seluruh Indonesia.',
    kategori: 'Makanan & Minuman (F&B)',
    sub_kategori: 'Snack & Camilan Kering',
    lokasiType: 'nasional',
    lokasiRadius: 50,
    lokasiText: 'Indonesia',
    budgetPeriod: 'monthly',
    budgetAmount: 1500000,
    hargaJual: 28000,
    hpp: 11000,
    kondisiId: 'sales',
    hasSocial: true,
    social: { ig: '@sambalcumi.juara', wa: '082199887766', link: 'https://shopee.co.id/sambalcumijuara' },
    triedPlatforms: ['Shopee Ads', 'TikTok Ads'],
  },
  {
    label: '📸 Jasa Foto Produk Cafe & Menu',
    text: 'Jasa Foto Produk Makanan & Minuman Cafe di Bandung. Paket Foto Menu & Video Reels estetik Rp 350.000 per sesi.',
    kategori: 'Jasa & Layanan',
    sub_kategori: 'Studio Foto & Video',
    lokasiType: 'radius',
    lokasiRadius: 20,
    lokasiText: 'Bandung',
    budgetPeriod: 'daily',
    budgetAmount: 100000,
    hargaJual: 350000,
    hpp: 90000,
    kondisiId: 'leads',
    hasSocial: true,
    social: { ig: '@foodphoto.bdg', wa: '085712344321', link: '' },
    triedPlatforms: ['Meta Ads (IG/FB)'],
  },
];

const PROVINCE_PRESETS = [
  'Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)',
  'Surabaya & Jawa Timur',
  'Bandung Raya & Jawa Barat',
  'Semarang, Solo & Jawa Tengah',
  'DI Yogyakarta',
  'Bali & Nusa Tenggara',
  'Medan & Sumatera Utara',
  'Makassar & Sulawesi Selatan',
];

const PLATFORM_OPTIONS = [
  'Belum pernah iklan',
  'TikTok Ads',
  'Meta Ads (IG/FB)',
  'Google Ads / Maps',
  'Shopee / Marketplace Ads',
];

export default function NewCampaign() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to Login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          redirect: '/new',
          message: 'Silakan masuk atau daftar akun terlebih dahulu untuk mulai membuat kampanye iklan AI.',
        },
      });
    }
  }, [isAuthenticated, navigate]);

  // Form State
  const [productDescription, setProductDescription] = useState('');
  const [kategoriUtama, setKategoriUtama] = useState('Makanan & Minuman (F&B)');
  const [subKategori, setSubKategori] = useState('F&B Siap Saji (Ready-to-Eat)');
  const [customSubKategori, setCustomSubKategori] = useState('');
  
  // Location
  const [lokasiType, setLokasiType] = useState('nasional'); // 'nasional', 'radius', 'provinsi', 'internasional'
  const [lokasiText, setLokasiText] = useState('Indonesia');
  const [lokasiRadius, setLokasiRadius] = useState(10);
  const [selectedProvinces, setSelectedProvinces] = useState(['Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)']);

  // Budget
  const [budgetPeriod, setBudgetPeriod] = useState('daily'); // 'daily' | 'monthly'
  const [budgetAmount, setBudgetAmount] = useState(100000);
  const [hargaJual, setHargaJual] = useState(50000);
  const [hpp, setHpp] = useState(20000);

  // Business Condition / Diagnostic Funnel
  const [selectedConditionId, setSelectedConditionId] = useState('awareness');

  // Social & Marketplace Links
  const [hasSocialOrStore, setHasSocialOrStore] = useState(false);
  const [igHandle, setIgHandle] = useState('');
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [storeLink, setStoreLink] = useState('');
  const [waNumber, setWaNumber] = useState('');

  // Previous Platforms tried
  const [triedPlatforms, setTriedPlatforms] = useState(['Belum pernah iklan']);

  const [error, setError] = useState('');

  // Auto-detect location & pricing from free-text NLP description
  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setProductDescription(text);
    if (error) setError('');

    // Auto-detect location
    const locMatch = text.match(/\b(?:di|kota|kabupaten|area|wilayah)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)\b/i);
    if (locMatch && locMatch[1]) {
      const detected = locMatch[1].trim();
      setLokasiText(detected);
      if (lokasiType === 'nasional') {
        setLokasiType('radius');
      }
    }

    // Auto-detect pricing if stated
    const priceMatch = text.match(/(?:rp\s*|\b)(\d{1,3}(?:\.\d{3})+|\d{4,8})\b/i);
    const rbMatch = text.match(/(\d+)\s*(?:rb|k|ribu)/i);
    if (priceMatch) {
      const p = parseInt(priceMatch[1].replace(/\./g, ''), 10);
      setHargaJual(p);
      setHpp(Math.max(5000, Math.round(p * 0.4)));
    } else if (rbMatch) {
      const p = parseInt(rbMatch[1], 10) * 1000;
      setHargaJual(p);
      setHpp(Math.max(5000, Math.round(p * 0.4)));
    }
  };

  // Quick Preset Click Handler
  const applyPreset = (preset) => {
    setProductDescription(preset.text);
    setKategoriUtama(preset.kategori);
    setSubKategori(preset.sub_kategori);
    setLokasiType(preset.lokasiType);
    setLokasiRadius(preset.lokasiRadius);
    setLokasiText(preset.lokasiText);
    setBudgetPeriod(preset.budgetPeriod);
    setBudgetAmount(preset.budgetAmount);
    setHargaJual(preset.hargaJual);
    setHpp(preset.hpp);
    setSelectedConditionId(preset.kondisiId);
    setHasSocialOrStore(preset.hasSocial);
    if (preset.social) {
      setIgHandle(preset.social.ig || '');
      setWaNumber(preset.social.wa || '');
      setStoreLink(preset.social.link || '');
    }
    setTriedPlatforms(preset.triedPlatforms || ['Belum pernah iklan']);
    setError('');
  };

  // Calculate Daily Budget equivalent
  const dailyBudgetEquivalent = budgetPeriod === 'monthly' ? Math.round(budgetAmount / 30) : budgetAmount;

  // Estimated Market Reach & Impressions
  const estimatedDailyReachMin = Math.round((dailyBudgetEquivalent / 25000) * 1200);
  const estimatedDailyReachMax = Math.round((dailyBudgetEquivalent / 25000) * 3500);
  const estimatedMonthlyReach = Math.round(estimatedDailyReachMax * 25);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productDescription.trim() || productDescription.trim().length < 5) {
      setError('Mohon tuliskan deskripsi produk atau jasa yang ingin Anda iklankan minimal 5 karakter.');
      return;
    }

    if (hpp >= hargaJual) {
      setError('Modal / HPP tidak boleh lebih tinggi atau sama dengan Harga Jual.');
      return;
    }

    setError('');

    const rawText = productDescription.trim();

    // Construct Effective Location String
    let effectiveLokasi = lokasiText || 'Indonesia';
    if (lokasiType === 'radius') {
      effectiveLokasi = `${lokasiText} (Radius ${lokasiRadius} km)`;
    } else if (lokasiType === 'provinsi') {
      effectiveLokasi = selectedProvinces.join(', ');
    } else if (lokasiType === 'internasional') {
      effectiveLokasi = 'Internasional (ASEAN / Global)';
    }

    const effectiveSubKategori = subKategori === 'Lainnya (Ketik Manual)' ? (customSubKategori || 'Kustom') : subKategori;
    const selectedCondition = BUSINESS_CONDITIONS.find((c) => c.id === selectedConditionId) || BUSINESS_CONDITIONS[0];

    const socialHandles = hasSocialOrStore ? {
      instagram: igHandle,
      tiktok: tiktokHandle,
      store_url: storeLink,
      whatsapp: waNumber,
    } : null;

    const newId = Date.now();
    const campaignInputPayload = {
      product_name: rawText,
      niche: `${kategoriUtama} - ${effectiveSubKategori}`,
      kategori: kategoriUtama,
      sub_kategori: effectiveSubKategori,
      lokasi: effectiveLokasi,
      target_lokasi_type: lokasiType,
      target_lokasi_radius_km: lokasiType === 'radius' ? lokasiRadius : null,
      target_provinces: lokasiType === 'provinsi' ? selectedProvinces : null,
      target_cities: [lokasiText],
      kondisi_bisnis: selectedCondition.label,
      funnel_goal: selectedCondition.id,
      budget_period: budgetPeriod,
      budget_harian: dailyBudgetEquivalent,
      harga_jual: Number(hargaJual),
      hpp: Number(hpp),
      link_produk: storeLink || null,
      social_media_handles: socialHandles,
      previous_platforms: triedPlatforms,
      platform: triedPlatforms.includes('TikTok Ads') ? 'TikTok' : 'Meta',
      custom_usp: rawText.length > 50 ? rawText.slice(0, 180) : null,
    };

    const initialCampaign = {
      id: newId,
      product_name: rawText,
      niche: campaignInputPayload.niche,
      lokasi: effectiveLokasi,
      platform: campaignInputPayload.platform,
      budget: dailyBudgetEquivalent,
      harga_jual: Number(hargaJual),
      hpp: Number(hpp),
      kategori: kategoriUtama,
      status: 'Running',
      created_at: new Date().toISOString(),
    };

    navigate(`/campaign/${newId}`, {
      state: {
        campaign: initialCampaign,
        campaignInput: campaignInputPayload,
        isLiveGenerating: true,
      },
    });
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between transition-colors">
      <Navbar />

      <PageContainer
        badge="TAHRA AI Auto-Strategist"
        title="Buat Kampanye Iklan AI Terpandu"
        description="Gabungan Input Alami NLP + Parameter Terpandu untuk mengeliminasi ambiguitas riset pasar Agent 1 dan menjamin strategi anti-boncos."
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
      >
        <div className="max-w-4xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#0c1f17]/95 border border-emerald-500/20 dark:border-emerald-500/30 shadow-2xl shadow-emerald-950/5 dark:shadow-black/40 backdrop-blur-2xl flex flex-col gap-8">
            
            {/* QUICK PRESETS CHIPS */}
            <div className="flex flex-col gap-2.5 pb-6 border-b border-emerald-100 dark:border-emerald-800/60">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2 font-heading">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Preset Contoh Cepat (1-Klik Lengkapi Seluruh Form):
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="px-3.5 py-2 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 1: NATURAL LANGUAGE INPUT */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold uppercase tracking-wider text-emerald-950 dark:text-white flex items-center justify-between font-heading">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  1. Ceritakan Produk / Jasa Anda (Input Utama NLP): <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-700 font-bold">
                  Bebas Format & Tanpa Rumus
                </span>
              </label>

              <textarea
                rows={4}
                placeholder="Tuliskan produk fisik, jasa, atau bisnis Anda. Contoh: Jasa Service AC di Mojokerto, melayani cuci AC, isi freon, dan perbaikan bocor bergaransi 30 hari. Tarif mulai Rp 75.000..."
                value={productDescription}
                onChange={handleDescriptionChange}
                required
                className={cn(
                  'w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm rounded-2xl p-4 border focus:outline-none transition-colors leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium resize-none shadow-sm',
                  error ? 'border-red-400 ring-2 ring-red-400/20' : 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                )}
              />

              <p className="text-xs text-slate-500 dark:text-slate-400">
                💡 <em>Sistem NLP akan otomatis mendeteksi lokasi, harga, dan keunggulan dari cerita Anda di atas.</em>
              </p>
            </div>

            {/* SECTION 2: 2-LEVEL TAXONOMY (CATEGORY & SUB-CATEGORY) */}
            <div className="flex flex-col gap-3 pt-4 border-t border-emerald-100 dark:border-emerald-800/60">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-emerald-950 dark:text-white flex items-center gap-2 font-heading">
                  <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  2. Kategori Produk (2-Level Taxonomy):
                </label>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono">
                  Konteks Presisi Agent 1 & Agent 5
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Level 1: Kategori Utama */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">Kategori Utama</span>
                  <div className="relative">
                    <select
                      value={kategoriUtama}
                      onChange={(e) => {
                        const newCat = e.target.value;
                        setKategoriUtama(newCat);
                        setSubKategori(CATEGORY_TAXONOMY[newCat]?.[0] || 'Lainnya');
                      }}
                      className="w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm font-medium rounded-2xl border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 appearance-none focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm"
                    >
                      {Object.keys(CATEGORY_TAXONOMY).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Level 2: Sub-Kategori */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">Sub-Kategori Spesifik</span>
                  <div className="relative">
                    <select
                      value={subKategori}
                      onChange={(e) => setSubKategori(e.target.value)}
                      className="w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm font-medium rounded-2xl border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 appearance-none focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm"
                    >
                      {(CATEGORY_TAXONOMY[kategoriUtama] || []).map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Free-text for "Lainnya" */}
              {subKategori === 'Lainnya (Ketik Manual)' && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Tuliskan spesifikasi kategori usaha Anda..."
                    value={customSubKategori}
                    onChange={(e) => setCustomSubKategori(e.target.value)}
                    className="w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm rounded-2xl p-3 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* SECTION 3: TARGET LOKASI (GRANULAR & UX BERTINGKAT) */}
            <div className="flex flex-col gap-3.5 pt-4 border-t border-emerald-100 dark:border-emerald-800/60">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-emerald-950 dark:text-white flex items-center gap-2 font-heading">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  3. Target Jangkauan Wilayah & Lokasi:
                </label>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono">
                  Mapping Meta & TikTok Geotag
                </span>
              </div>

              {/* Lokasi Type Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'nasional', label: '🌐 Se-Indonesia', sub: 'Nasional' },
                  { id: 'radius', label: '📍 Radius Lokal', sub: 'Toko / Jasa' },
                  { id: 'provinsi', label: '🏙️ Provinsi Pilihan', sub: 'Multi-Region' },
                  { id: 'internasional', label: '✈️ Internasional', sub: 'Ekspor / Global' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setLokasiType(type.id)}
                    className={cn(
                      'p-3.5 rounded-2xl border text-left flex flex-col gap-0.5 transition-all cursor-pointer shadow-sm',
                      lokasiType === type.id
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-700/20'
                        : 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/60'
                    )}
                  >
                    <span className={cn('text-xs font-bold font-heading', lokasiType === type.id ? 'text-white' : 'text-emerald-950 dark:text-emerald-200')}>{type.label}</span>
                    <span className={cn('text-[10px]', lokasiType === type.id ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400')}>{type.sub}</span>
                  </button>
                ))}
              </div>

              {/* Conditional Location Details */}
              {lokasiType === 'radius' && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-[#091a12] border border-emerald-200 dark:border-emerald-800 flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-semibold text-emerald-950 dark:text-white">Kota / Titik Usaha</span>
                      <input
                        type="text"
                        placeholder="Contoh: Surabaya / Mojokerto / Bandung"
                        value={lokasiText}
                        onChange={(e) => setLokasiText(e.target.value)}
                        className="w-full mt-1 bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-xs rounded-xl p-2.5 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs text-emerald-950 dark:text-white font-semibold">
                        <span>Radius Jangkauan Iklan:</span>
                        <span className="text-emerald-700 dark:text-emerald-300 font-bold font-mono">{lokasiRadius} km</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {[5, 10, 15, 25, 50].map((km) => (
                          <button
                            key={km}
                            type="button"
                            onClick={() => setLokasiRadius(km)}
                            className={cn(
                              'flex-1 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer',
                              lokasiRadius === km
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-white dark:bg-[#081811] border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                            )}
                          >
                            {km}km
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {lokasiType === 'provinsi' && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-[#091a12] border border-emerald-200 dark:border-emerald-800 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-emerald-950 dark:text-white">Pilih Wilayah Target Strategis:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROVINCE_PRESETS.map((prov) => {
                      const isSelected = selectedProvinces.includes(prov);
                      return (
                        <button
                          key={prov}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedProvinces(selectedProvinces.filter((p) => p !== prov));
                            } else {
                              setSelectedProvinces([...selectedProvinces, prov]);
                            }
                          }}
                          className={cn(
                            'p-2.5 rounded-xl text-xs font-medium text-left border flex items-center gap-2 transition-all cursor-pointer',
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-white dark:bg-[#081811] border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                          )}
                        >
                          <div className={cn('w-4 h-4 rounded-md flex items-center justify-center border', isSelected ? 'bg-white text-emerald-600 border-white' : 'border-slate-300 dark:border-slate-600')}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span>{prov}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 4: BUDGET & PRICING (HYBRID PRESET + MANUAL + REACH ESTIMATOR) */}
            <div className="flex flex-col gap-4 pt-4 border-t border-emerald-100 dark:border-emerald-800/60">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-emerald-950 dark:text-white flex items-center gap-2 font-heading">
                  <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  4. Anggaran Iklan & Unit Economics (Anti-Boncos):
                </label>
                {/* Period Toggle */}
                <div className="flex items-center gap-1 bg-emerald-50 dark:bg-[#081811] p-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <button
                    type="button"
                    onClick={() => setBudgetPeriod('daily')}
                    className={cn(
                      'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                      budgetPeriod === 'daily'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white'
                    )}
                  >
                    Harian
                  </button>
                  <button
                    type="button"
                    onClick={() => setBudgetPeriod('monthly')}
                    className={cn(
                      'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                      budgetPeriod === 'monthly'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white'
                    )}
                  >
                    Bulanan
                  </button>
                </div>
              </div>

              {/* Budget Preset Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {budgetPeriod === 'daily'
                  ? [25000, 50000, 100000, 250000, 500000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setBudgetAmount(amt)}
                        className={cn(
                          'py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer text-center shadow-sm',
                          budgetAmount === amt
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white dark:bg-[#081811] border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                        )}
                      >
                        {formatRp(amt)}/hr
                      </button>
                    ))
                  : [500000, 1500000, 3000000, 7500000, 15000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setBudgetAmount(amt)}
                        className={cn(
                          'py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer text-center shadow-sm',
                          budgetAmount === amt
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white dark:bg-[#081811] border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                        )}
                      >
                        {formatRp(amt)}/bln
                      </button>
                    ))}
              </div>

              {/* Manual Input Grid: Budget, Harga Jual, HPP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-emerald-950 dark:text-white">
                    Budget {budgetPeriod === 'daily' ? 'Harian' : 'Bulanan'} (Rp)
                  </span>
                  <input
                    type="number"
                    min={10000}
                    step={5000}
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(Number(e.target.value))}
                    className="w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm font-mono font-bold rounded-2xl p-2.5 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-emerald-950 dark:text-white">
                    Harga Jual per Unit/Jasa (Rp)
                  </span>
                  <input
                    type="number"
                    min={1000}
                    value={hargaJual}
                    onChange={(e) => setHargaJual(Number(e.target.value))}
                    className="w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm font-mono font-bold rounded-2xl p-2.5 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-emerald-950 dark:text-white">
                    Modal / HPP Pokok (Rp)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={hpp}
                    onChange={(e) => setHpp(Number(e.target.value))}
                    className="w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm font-mono font-bold rounded-2xl p-2.5 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              {/* Live Estimation Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/80 dark:to-teal-950/60 border border-emerald-200 dark:border-emerald-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
                <div className="flex items-center gap-2.5 text-emerald-950 dark:text-emerald-100 font-semibold">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Estimasi Jangkauan Pasar: <strong className="text-emerald-800 dark:text-emerald-300 font-mono font-black">{estimatedDailyReachMin.toLocaleString()} – {estimatedDailyReachMax.toLocaleString()}</strong> orang/hari (~{estimatedMonthlyReach.toLocaleString()} impresi/bulan)
                  </span>
                </div>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono">
                  Margin Laba: <strong className="text-emerald-700 dark:text-emerald-400 font-black">{Math.round(((hargaJual - hpp) / hargaJual) * 100)}%</strong>
                </span>
              </div>
            </div>

            {/* SECTION 5: KONDISI BISNIS / DIAGNOSTIC FUNNEL */}
            <div className="flex flex-col gap-3 pt-4 border-t border-emerald-100 dark:border-emerald-800/60">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-emerald-950 dark:text-white flex items-center gap-2 font-heading">
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  5. Kondisi Bisnis Anda Saat Ini (Diagnostik Funnel):
                </label>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono">
                  Bahasa Manusiawi $\rightarrow$ Funnel AI
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BUSINESS_CONDITIONS.map((cond) => {
                  const isSelected = selectedConditionId === cond.id;
                  return (
                    <div
                      key={cond.id}
                      onClick={() => setSelectedConditionId(cond.id)}
                      className={cn(
                        'p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 relative overflow-hidden shadow-sm',
                        isSelected
                          ? 'bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white dark:from-[#0f2c1f] dark:via-[#0c2219] dark:to-[#081811] border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                          : 'bg-white dark:bg-[#081811] border-emerald-200/80 dark:border-emerald-800/80 hover:border-emerald-300 dark:hover:border-emerald-600'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{cond.icon}</span>
                        <span className={cn(
                          'text-[10px] font-mono px-2 py-0.5 rounded-full font-bold',
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        )}>
                          {cond.funnel}
                        </span>
                      </div>

                      <h4 className={cn('text-xs font-bold mt-1.5 leading-snug font-heading', isSelected ? 'text-emerald-950 dark:text-white' : 'text-slate-800 dark:text-slate-200')}>
                        "{cond.label}"
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {cond.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 6: SOCIAL MEDIA & STORE LINKS (CHECKBOX TOGGLE) */}
            <div className="flex flex-col gap-3 pt-4 border-t border-emerald-100 dark:border-emerald-800/60">
              <div
                onClick={() => setHasSocialOrStore(!hasSocialOrStore)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-[#091a12] border border-emerald-200 dark:border-emerald-800 cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasSocialOrStore}
                    onChange={(e) => setHasSocialOrStore(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-emerald-950 dark:text-white flex items-center gap-1.5 font-heading">
                      <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Punya Akun Media Sosial / Link Toko Online / WhatsApp? (Opsional)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Otomatis disisipkan sebagai tombol CTA di pamflet dan dianalisis oleh pipeline Agent 1 & 4.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                  {hasSocialOrStore ? 'Tampilkan' : '+ Tambah'}
                </span>
              </div>

              {hasSocialOrStore && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#081811] border border-emerald-200 dark:border-emerald-800 grid grid-cols-1 sm:grid-cols-2 gap-3.5 shadow-sm animate-fadeIn">
                  <div>
                    <span className="text-xs font-semibold text-emerald-950 dark:text-white flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-pink-500" /> Username Instagram / TikTok
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. @tokosaya.official"
                      value={igHandle}
                      onChange={(e) => setIgHandle(e.target.value)}
                      className="w-full mt-1 bg-white dark:bg-[#0c1f17] text-slate-900 dark:text-white text-xs rounded-xl p-2.5 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-emerald-950 dark:text-white flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Nomor WhatsApp Bisnis
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. 081289123456"
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      className="w-full mt-1 bg-white dark:bg-[#0c1f17] text-slate-900 dark:text-white text-xs rounded-xl p-2.5 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-xs font-semibold text-emerald-950 dark:text-white flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Link Shopee / Tokopedia / TikTok Shop / Website
                    </span>
                    <input
                      type="url"
                      placeholder="https://shopee.co.id/namatoko atau website resmi"
                      value={storeLink}
                      onChange={(e) => setStoreLink(e.target.value)}
                      className="w-full mt-1 bg-white dark:bg-[#0c1f17] text-slate-900 dark:text-white text-xs rounded-xl p-2.5 border border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 focus:outline-none shadow-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 7: PLATFORM PERNAH DICOBA */}
            <div className="flex flex-col gap-2.5 pt-4 border-t border-emerald-100 dark:border-emerald-800/60">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 dark:text-white flex items-center gap-1.5 font-heading">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                6. Platform Iklan yang Sudah Pernah Dicoba (Opsional):
              </span>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((plat) => {
                  const isChecked = triedPlatforms.includes(plat);
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => {
                        if (plat === 'Belum pernah iklan') {
                          setTriedPlatforms(['Belum pernah iklan']);
                        } else {
                          const withoutNone = triedPlatforms.filter((p) => p !== 'Belum pernah iklan');
                          if (isChecked) {
                            const filtered = withoutNone.filter((p) => p !== plat);
                            setTriedPlatforms(filtered.length ? filtered : ['Belum pernah iklan']);
                          } else {
                            setTriedPlatforms([...withoutNone, plat]);
                          }
                        }
                      }}
                      className={cn(
                        'px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-sm',
                        isChecked
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white dark:bg-[#081811] border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                      )}
                    >
                      {plat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ERROR ALERT */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2 shadow-sm">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isFullWidth
              rightIcon={<ArrowRight className="w-4 h-4 stroke-[3]" />}
              className="py-4 text-sm font-black shadow-xl shadow-emerald-700/30 hover:shadow-emerald-600/40"
            >
              🚀 Analisis Pasar & Rancang Iklan (5 Sub-Agent AI) →
            </Button>
          </form>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
