import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Wand2,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

export default function NewCampaign() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to Login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          redirect: '/new',
          message: 'Silakan masuk atau daftar akun terlebih dahulu untuk mulai membuat kampanye iklan AI.',
        },
      });
    }
  }, [isAuthenticated, navigate]);

  // Clean, Single Natural Language Input State
  const [productDescription, setProductDescription] = useState('');
  const [error, setError] = useState('');

  // Quick Preset Examples for Instant Testing
  // Quick Preset Examples for Instant Testing
  const presets = [
    {
      label: '🧺 Laundry Kiloan',
      text: 'Laundry Kiloan di Surabaya. Layanan cuci setrika kilat wangi 24 jam dengan parfum premium dan garansi anti-luntur. Tarif Rp 6.000 per kg.',
    },
    {
      label: '🛠️ Jasa Service AC',
      text: 'Jasa Service AC di Mojokerto. Melayani cuci AC, perbaikan bocor, dan tambah freon bergaransi 30 hari. Tarif mulai Rp 75.000, respon cepat 24 jam.',
    },
    {
      label: '👟 Cuci Sepatu Sneakers',
      text: 'Jasa Cuci Sepatu Sneakers di Yogyakarta. Paket Deep Clean Express 24 Jam selesai tanpa bau apek, harga Rp 35.000 per pasang. Target mahasiswa dan pekerja kantor.',
    },
    {
      label: '🌶️ Sambal Kemasan UMKM',
      text: 'Sambal Cumi Asin Pedas Kemasan Pouch 150g di Jakarta. Menggunakan cumi segar tanpa pengawet kimia, tahan 3 bulan, harga Rp 28.000 per pouch.',
    },
    {
      label: '📸 Jasa Foto Produk',
      text: 'Jasa Foto Produk Makanan & Minuman Cafe di Bandung. Paket Foto Menu & Video Reels Rp 350.000 per sesi.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productDescription.trim() || productDescription.trim().length < 5) {
      setError('Mohon tuliskan deskripsi produk atau jasa yang ingin Anda iklankan minimal 5 karakter.');
      return;
    }

    setError('');

    // Extract basic title & prices if available or set standard defaults
    const rawText = productDescription.trim();
    const cleanTitle = rawText.split(/[,.\n]/)[0].slice(0, 50).trim() || 'Kampanye Usaha';
    
    // Auto-detect price if mentioned (e.g. 75.000 or 75rb or 35000)
    const priceMatch = rawText.match(/(?:rp\s*|\b)(\d{1,3}(?:\.\d{3})+|\d{4,8})\b/i);
    const rbMatch = rawText.match(/(\d+)\s*(?:rb|k|ribu)/i);
    
    let detectedPrice = 50000;
    if (priceMatch) {
      detectedPrice = parseInt(priceMatch[1].replace(/\./g, ''), 10);
    } else if (rbMatch) {
      detectedPrice = parseInt(rbMatch[1], 10) * 1000;
    }
    const detectedHpp = Math.max(10000, Math.round(detectedPrice * 0.4));

    // Auto-detect location if mentioned (e.g., "di Surabaya", "di Mojokerto", "Jakarta", etc.)
    const locMatch = rawText.match(/\b(?:di|kota|kabupaten|area|wilayah)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)\b/i);
    const detectedLokasi = locMatch ? locMatch[1].trim() : 'Surabaya';
    const detectedNiche = rawText.split(/(?:\s+di\s+|Rp|\b\d+\s*rb|[,.])/i)[0].trim() || cleanTitle;

    const newId = Date.now();
    const initialCampaign = {
      id: newId,
      product_name: rawText,
      niche: detectedNiche,
      lokasi: detectedLokasi,
      platform: 'TikTok',
      budget: 100000,
      harga_jual: detectedPrice,
      hpp: detectedHpp,
      kategori: rawText.toLowerCase().includes('jasa') || rawText.toLowerCase().includes('service') ? 'Jasa' : 'Fisik',
      status: 'Running',
      created_at: new Date().toISOString(),
    };

    navigate(`/campaign/${newId}`, {
      state: {
        campaign: initialCampaign,
        campaignInput: {
          product_name: rawText,
          niche: detectedNiche,
          lokasi: detectedLokasi,
          harga_jual: detectedPrice,
          hpp: detectedHpp,
          budget_harian: 100000,
          kategori: rawText.toLowerCase().includes('jasa') || rawText.toLowerCase().includes('service') ? 'Jasa' : 'Fisik',
          platform: 'TikTok',
          custom_usp: rawText.length > 50 ? rawText.slice(0, 150) : null
        },
        isLiveGenerating: true,
      },
    });
  };


  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="TAHRA AI Auto-Strategist"
        title="Apa yang Ingin Anda Iklankan?"
        description="Tuliskan produk fisik, jasa, atau usaha Anda secara bebas. 5 Sub-Agent AI akan langsung membedah pasar dan merancang strateginya secara otonom."
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
      >
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-neutral-950/90 border border-neutral-800/90 shadow-2xl backdrop-blur-2xl flex flex-col gap-6">
            
            {/* PRESET CHIPS */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Contoh Cepat Siap Pakai (Klik untuk Mencoba):
              </span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setProductDescription(preset.text);
                      setError('');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-rose-500 hover:bg-neutral-800/80 text-neutral-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN NATURAL PROMPT INPUT */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase tracking-wider text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-rose-500" />
                  Ceritakan Produk / Jasa / Usaha Anda:
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  Bebas Format & Tanpa Rumus
                </span>
              </label>

              <textarea
                rows={5}
                placeholder="Contoh: Jasa Service AC di Mojokerto, melayani cuci AC, isi freon, dan perbaikan bocor bergaransi. Tarif mulai Rp 75.000, bisa panggilan ke rumah..."
                value={productDescription}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                  if (error) setError('');
                }}
                className={cn(
                  'w-full bg-neutral-900 text-white text-sm rounded-2xl p-4 border focus:outline-none transition-colors leading-relaxed placeholder:text-neutral-600 font-medium resize-none',
                  error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-neutral-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                )}
              />

              {error && (
                <span className="text-xs text-red-400 flex items-center gap-1.5 mt-1 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </span>
              )}
            </div>

            {/* SIMPLE GUIDE / PROMISE */}
            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 flex items-start gap-3 text-xs text-neutral-400">
              <Wand2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-neutral-200">5 Sub-Agent AI Bekerja Otomatis:</strong> Anda tidak perlu pusing menghitung HPP atau memilih saluran iklan. AI akan langsung membedah keluhan kompetitor, target audiens, naskah video, dan kalkulasi profitnya.
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isFullWidth
              rightIcon={<ArrowRight className="w-4 h-4 stroke-[3]" />}
              className="py-4 text-sm font-black shadow-xl shadow-rose-950/80"
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
