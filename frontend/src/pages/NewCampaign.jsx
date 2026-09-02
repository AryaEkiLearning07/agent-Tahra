import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Target,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Globe,
  CheckCircle2,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatRp } from '../utils/formatters';
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

  // Clean, Direct Form State
  const [productName, setProductName] = useState('');
  const [kategori, setKategori] = useState('Fisik');
  const [hargaJual, setHargaJual] = useState('');
  const [hpp, setHpp] = useState('');
  const [budgetHarian, setBudgetHarian] = useState(100000);
  const [destinationType, setDestinationType] = useState('whatsapp'); // 'whatsapp' | 'website'
  const [destinationValue, setDestinationValue] = useState('');
  const [errors, setErrors] = useState({});

  // Dynamic Margin Calculation
  const hargaNum = Number(hargaJual) || 0;
  const hppNum = Number(hpp) || 0;
  const marginVal = Math.max(0, hargaNum - hppNum);
  const marginPct = hargaNum > 0 ? ((marginVal / hargaNum) * 100).toFixed(1) : 0;
  const isHealthyMargin = Number(marginPct) >= 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!productName.trim()) {
      newErrors.product_name = 'Nama produk / jasa wajib diisi.';
    }
    if (!hargaJual || hargaNum <= 0) {
      newErrors.harga_jual = 'Harga jual wajib diisi dan lebih dari 0.';
    }
    if (!hpp || hppNum <= 0) {
      newErrors.hpp = 'Modal / HPP wajib diisi.';
    } else if (hppNum >= hargaNum) {
      newErrors.hpp = 'Modal (HPP) tidak boleh lebih besar atau sama dengan harga jual.';
    }
    if (!budgetHarian || budgetHarian < 20000) {
      newErrors.budget_harian = 'Minimal budget iklan harian adalah Rp 20.000.';
    }
    if (!destinationValue.trim()) {
      newErrors.destination_value = destinationType === 'whatsapp' ? 'Nomor WhatsApp admin wajib diisi.' : 'Link website / marketplace wajib diisi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newId = Date.now();
    const initialCampaign = {
      id: newId,
      product_name: productName.trim(),
      platform: 'TikTok',
      budget: Number(budgetHarian),
      harga_jual: hargaNum,
      hpp: hppNum,
      kategori: kategori,
      destination_type: destinationType,
      destination_value: destinationValue.trim(),
      status: 'Running',
      created_at: new Date().toISOString(),
    };

    navigate(`/campaign/${newId}`, {
      state: {
        campaign: initialCampaign,
        campaignInput: {
          product_name: productName.trim(),
          harga_jual: hargaNum,
          hpp: hppNum,
          budget_harian: Number(budgetHarian),
          kategori: kategori,
          platform: 'TikTok',
        },
        isLiveGenerating: true,
      },
    });
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="Formulir Kampanye Baru"
        title="Buat Strategi Iklan AI"
        description="Masukkan informasi produk usaha Anda. 5 Sub-Agent AI akan membedah pasar secara empiris dan menyusun strategi siap pakai."
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
      >
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-neutral-950/90 border border-neutral-800/90 shadow-2xl backdrop-blur-2xl flex flex-col gap-7">
            
            {/* 1. NAMA PRODUK */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-rose-500" />
                1. Nama Produk atau Layanan Usaha:
              </label>
              <input
                type="text"
                placeholder="Contoh: Jasa Cuci Sepatu di Yogyakarta / Sambal Cumi Asin 150g"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className={cn(
                  'w-full bg-neutral-900 text-white text-sm rounded-2xl px-4 py-3.5 border focus:outline-none transition-colors',
                  errors.product_name ? 'border-red-500' : 'border-neutral-800 focus:border-rose-500'
                )}
              />
              {errors.product_name && (
                <span className="text-[11px] text-red-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.product_name}
                </span>
              )}
            </div>

            {/* 2. KATEGORI USAHA */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-500" />
                2. Kategori Produk:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'Fisik', label: '📦 Produk Fisik / F&B' },
                  { id: 'Jasa', label: '🛠️ Jasa / Layanan' },
                  { id: 'Digital', label: '💻 Digital / Edukasi' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setKategori(item.id)}
                    className={cn(
                      'p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center',
                      kategori === item.id
                        ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/50'
                        : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. HARGA JUAL & MODAL (HPP) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-rose-500" />
                3. Harga Jual & Modal Pokok (HPP):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-neutral-400 font-medium">Harga Jual ke Pembeli (Rp):</span>
                  <input
                    type="number"
                    placeholder="Contoh: 35000"
                    value={hargaJual}
                    onChange={(e) => setHargaJual(e.target.value)}
                    className={cn(
                      'w-full bg-neutral-900 text-white font-mono text-sm rounded-2xl px-4 py-3 border focus:outline-none transition-colors',
                      errors.harga_jual ? 'border-red-500' : 'border-neutral-800 focus:border-rose-500'
                    )}
                  />
                  {errors.harga_jual && (
                    <span className="text-[11px] text-red-400">{errors.harga_jual}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-neutral-400 font-medium">Modal / HPP per Produk (Rp):</span>
                  <input
                    type="number"
                    placeholder="Contoh: 15000"
                    value={hpp}
                    onChange={(e) => setHpp(e.target.value)}
                    className={cn(
                      'w-full bg-neutral-900 text-white font-mono text-sm rounded-2xl px-4 py-3 border focus:outline-none transition-colors',
                      errors.hpp ? 'border-red-500' : 'border-neutral-800 focus:border-rose-500'
                    )}
                  />
                  {errors.hpp && (
                    <span className="text-[11px] text-red-400">{errors.hpp}</span>
                  )}
                </div>
              </div>

              {/* Real-time Margin Info Card */}
              {hargaNum > 0 && hppNum > 0 && hppNum < hargaNum && (
                <div className="mt-2 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">
                    Laba Bersih: <strong className="text-white font-bold">{formatRp(marginVal)}</strong> per transaksi
                  </span>
                  <span className={cn('px-2.5 py-0.5 rounded-lg font-black', isHealthyMargin ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950 text-rose-400 border border-rose-500/40')}>
                    Margin: {marginPct}% {isHealthyMargin ? '✅ SEHAT' : '⚠️ TIPIS'}
                  </span>
                </div>
              )}
            </div>

            {/* 4. BUDGET IKLAN HARIAN */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rose-500" />
                4. Rencana Budget Iklan Harian:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 50000, label: 'Rp 50.000 / hari', note: 'Uji Coba Awal' },
                  { value: 100000, label: 'Rp 100.000 / hari', note: 'Standar Optimal' },
                  { value: 200000, label: 'Rp 200.000 / hari', note: 'Skala Cepat' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setBudgetHarian(item.value)}
                    className={cn(
                      'p-3.5 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer',
                      budgetHarian === item.value
                        ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/50'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:text-white hover:border-neutral-700'
                    )}
                  >
                    <span className="font-mono font-black text-xs sm:text-sm">{formatRp(item.value)}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">{item.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. TUJUAN KONTAK / CLOSING */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-500" />
                5. Tujuan Pembeli Menghubungi / Membeli:
              </label>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setDestinationType('whatsapp');
                    setDestinationValue('');
                  }}
                  className={cn(
                    'p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2',
                    destinationType === 'whatsapp'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950/50'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  )}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Admin
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDestinationType('website');
                    setDestinationValue('');
                  }}
                  className={cn(
                    'p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2',
                    destinationType === 'website'
                      ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/50'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  )}
                >
                  <Globe className="w-4 h-4" />
                  Website / Marketplace
                </button>
              </div>

              <input
                type="text"
                placeholder={destinationType === 'whatsapp' ? 'Contoh: 081234567890 (Nomor WA Admin)' : 'Contoh: https://shopee.co.id/tokosaya'}
                value={destinationValue}
                onChange={(e) => setDestinationValue(e.target.value)}
                className={cn(
                  'w-full bg-neutral-900 text-white text-sm rounded-2xl px-4 py-3 border focus:outline-none transition-colors font-mono',
                  errors.destination_value ? 'border-red-500' : 'border-neutral-800 focus:border-rose-500'
                )}
              />
              {errors.destination_value && (
                <span className="text-[11px] text-red-400">{errors.destination_value}</span>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isFullWidth
              rightIcon={<ArrowRight className="w-4 h-4 stroke-[3]" />}
              className="mt-3 text-sm font-black shadow-xl shadow-rose-950/70 py-4"
            >
              Jalankan 5 Sub-Agent AI Sekarang →
            </Button>
          </form>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
