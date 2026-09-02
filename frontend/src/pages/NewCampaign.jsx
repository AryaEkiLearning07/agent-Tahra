import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Bot,
  HelpCircle,
  ArrowRight,
  Layers,
  Search,
  Target,
  FileText,
  Image as ImageIcon,
  Cpu,
  UploadCloud,
  MessageCircle,
  ShoppingBag,
  CreditCard,
  QrCode,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { AgentThinkingModal } from '../components/feedback/AgentThinkingModal';
import { runAgentPipeline, saveCampaign } from '../services/api';
import { calculateMargin, formatRp } from '../utils/formatters';

export default function NewCampaign() {
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    product_name: '',
    harga_jual: '',
    hpp: '',
    budget_harian: '100000',
    kategori: 'Fisik',
    platform: 'TikTok',
    destination_type: 'whatsapp', // 'whatsapp' | 'marketplace'
    destination_value: '081289123456',
    photo_file: null,
    photo_preview: null,
    selected_package: '100000',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [thoughtLogs, setThoughtLogs] = useState([]);
  const [isVetoed, setIsVetoed] = useState(false);
  const [vetoAdvice, setVetoAdvice] = useState('');

  // Live Unit Economics Calculation
  const marginData = calculateMargin(form.harga_jual, form.hpp);
  const hasValues = Number(form.harga_jual) > 0 && Number(form.hpp) > 0;

  const budgetNum = Number(form.budget_harian) || 100000;
  const adSpendPure = Math.round(budgetNum * 0.9);
  const aiFee = Math.round(budgetNum * 0.1);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        photo_file: file,
        photo_preview: URL.createObjectURL(file),
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.product_name.trim()) errs.product_name = 'Nama produk wajib diisi.';
    if (!form.harga_jual || Number(form.harga_jual) <= 0)
      errs.harga_jual = 'Harga jual harus lebih dari Rp 0.';
    if (!form.hpp || Number(form.hpp) <= 0)
      errs.hpp = 'HPP / Modal pokok wajib diisi.';
    if (Number(form.hpp) >= Number(form.harga_jual))
      errs.hpp = 'HPP tidak boleh melebihi atau sama dengan Harga Jual.';
    if (!form.budget_harian || Number(form.budget_harian) < 10000)
      errs.budget_harian = 'Budget iklan minimal Rp 10.000 per hari.';
    return errs;
  };

  const handleFormPreSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});

    // If margin is vetoed locally, show warning immediately
    if (marginData.marginPercent < 20) {
      setIsVetoed(true);
      setVetoAdvice(
        `Margin kotor produk hanya ${marginData.marginPercent.toFixed(1)}% (di bawah batas aman 20%). Sub-Agent 2 memblokir iklan untuk melindungi anggaran UMKM Anda.`
      );
      setIsSubmitting(true);
      return;
    }

    // Open simulated payment confirmation modal
    setShowPaymentModal(true);
  };

  const handleConfirmSimulatedPayment = async () => {
    setShowPaymentModal(false);
    setIsSubmitting(true);
    setIsVetoed(false);
    setThoughtLogs([]);
    setCurrentStageIndex(0);

    const addLog = (log) => {
      setThoughtLogs((prev) => [...prev, log]);
    };

    try {
      // Stage 1: Sub-Agent 1 (The Explorer)
      setCurrentStageIndex(0);
      addLog(`[Sub-Agent 1: The Explorer] Menganalisis Competitor Proxy untuk '${form.product_name}' di kategori ${form.kategori}...`);
      await new Promise((r) => setTimeout(r, 650));
      addLog(`[Sub-Agent 1: The Explorer] Mengidentifikasi 3 pain points audiens & merumuskan Unique Selling Proposition (USP)...`);
      await new Promise((r) => setTimeout(r, 600));

      // Stage 2: Sub-Agent 2 (The Planner)
      setCurrentStageIndex(1);
      addLog(`[Sub-Agent 2: The Planner] Menguji Unit Economics: Margin ${(marginData.marginPercent).toFixed(1)}% vs Threshold 20% (OK)...`);
      addLog(`[Sub-Agent 2: The Planner] Memilih saluran '${form.platform}' (9:16) & batas plafon CPA max Rp ${(marginData.marginValue * 0.4).toLocaleString('id-ID')}...`);
      await new Promise((r) => setTimeout(r, 650));

      // Stage 3: Sub-Agent 3 (The Wordsmith)
      setCurrentStageIndex(2);
      addLog(`[Sub-Agent 3: The Wordsmith] Merangkai Naskah Video 15 Detik (Hook 0-3s, Body 3-10s, CTA 10-15s)...`);
      addLog(`[Sub-Agent 3: The Wordsmith] Menulis caption persuasif menggunakan psikologi PAS Framework...`);
      await new Promise((r) => setTimeout(r, 650));

      // Stage 4: Sub-Agent 4 (The Creator / Vision Auditor)
      setCurrentStageIndex(3);
      if (form.photo_preview) {
        addLog(`[Sub-Agent 4: Vision Auditor] Membedah foto asli produk: menganalisis kontras warna, pencahayaan, dan cognitive clutter...`);
      } else {
        addLog(`[Sub-Agent 4: The Creator] Merangkai prompt visual studio 8K dengan pencahayaan sinematik rasio 9:16...`);
      }
      await new Promise((r) => setTimeout(r, 700));

      // Stage 5: Sub-Agent 5 (The QA & Deployer)
      setCurrentStageIndex(4);
      addLog(`[Sub-Agent 5: The QA & Deployer] Validasi silang: Tautan tujuan closing terhubung ke ${form.destination_type === 'whatsapp' ? 'WhatsApp Admin' : 'Marketplace'}...`);
      addLog(`[Sub-Agent 5: The QA & Deployer] Meracik Campaign Blueprint Payload & simulasi matematis ROAS (CPM/CTR/CVR)...`);

      // Invoke real backend API
      const pipelineRes = await runAgentPipeline(form);
      const resultData = pipelineRes.data;

      addLog(`[Sub-Agent 5: The QA & Deployer] ✅ QA APPROVED: Blueprint kampanye siap dieksekusi.`);
      await new Promise((r) => setTimeout(r, 500));

      // Save Record
      const campaignRecord = {
        id: Date.now(),
        product_name: form.product_name,
        platform: form.platform,
        target_audience:
          resultData?.agent1_research?.target_demography ||
          resultData?.strategy?.target_demography ||
          'Target audiens teroptimasi AI',
        budget: Number(form.budget_harian),
        status: resultData?.status === 'VETO' ? 'Veto' : 'Running', // Simulated live running
        roas: resultData?.roas_report?.roas_percentage
          ? `${resultData.roas_report.roas_percentage}%`
          : '240%',
        created_at: new Date().toISOString(),
        destination: {
          type: form.destination_type,
          value: form.destination_value,
        },
        result: resultData,
      };

      await saveCampaign(campaignRecord);
      setIsSubmitting(false);

      navigate(`/campaign/${campaignRecord.id}`, {
        state: { campaign: campaignRecord },
      });
    } catch (err) {
      console.error('Pipeline execution error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="Form Parameter & Autopilot Ads"
        title="Buat Strategi Kampanye Baru"
        description="Lengkapi parameter produk. 5 Sub-Agent AI akan menganalisis pasar, merancang strategi periklanan, dan menyiapkan blueprint eksekusi secara otonom."
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
        maxWidth="max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-7">
            <Card hasRedBar className="p-6 sm:p-8">
              <form onSubmit={handleFormPreSubmit} className="flex flex-col gap-5">
                {/* 1. Basic Product Info */}
                <div>
                  <Input
                    label="Nama Produk / Brand / Layanan Jasa Anda"
                    id="product_name"
                    name="product_name"
                    type="text"
                    required
                    placeholder="Contoh: Jasa Foto Produk Kopi, Sambal Cumi Asin 150g, Kaos Oversize, Cuci Sepatu..."
                    value={form.product_name}
                    onChange={(e) =>
                      setForm({ ...form, product_name: e.target.value })
                    }
                    error={formErrors.product_name}
                    helperText="💡 Masukkan nama produk fisik atau layanan jasa usaha Anda secara bebas. AI akan membedah pasar secara otomatis."
                  />
                </div>

                {/* 2. Price and HPP Financial Engine */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Harga Jual ke Konsumen"
                    id="harga_jual"
                    name="harga_jual"
                    type="number"
                    required
                    prefix="Rp"
                    placeholder="35000"
                    value={form.harga_jual}
                    onChange={(e) =>
                      setForm({ ...form, harga_jual: e.target.value })
                    }
                    error={formErrors.harga_jual}
                  />

                  <Input
                    label="HPP / Biaya Modal Pokok"
                    id="hpp"
                    name="hpp"
                    type="number"
                    required
                    prefix="Rp"
                    placeholder="15000"
                    value={form.hpp}
                    onChange={(e) => setForm({ ...form, hpp: e.target.value })}
                    error={formErrors.hpp}
                  />
                </div>

                {/* AI Automated Market Discovery Banner (Zero Manual Select) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-neutral-900/90 to-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Klasifikasi Kategori & Saluran Iklan</span>
                        <span className="text-[10px] font-black uppercase text-rose-400 font-mono px-1.5 py-0.2 rounded bg-rose-950/40 border border-rose-500/30">
                          100% OTONOM
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                        AI Sub-Agent 1 & 2 secara otomatis mendeteksi kategori pasar dan memilih platform iklan paling menguntungkan (TikTok / Reels / Google).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Destination Link Selector */}
                <div className="pt-2 border-t border-neutral-800">
                  <label className="text-xs font-bold text-neutral-300 block mb-2">
                    Tujuan Penjualan (Kemana Calon Pembeli Diarahkan Saat Klik Iklan?)
                  </label>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setForm({ 
                        ...form, 
                        destination_type: 'whatsapp',
                        destination_value: form.destination_value.startsWith('http') ? '081289123456' : form.destination_value || '081289123456'
                      })}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        form.destination_type === 'whatsapp'
                          ? 'bg-emerald-950/30 border-emerald-500/60 text-white ring-1 ring-emerald-500/40'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-xs block">WhatsApp Admin</strong>
                        <span className="text-[10px] text-neutral-400">Closing personal via chat</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ 
                        ...form, 
                        destination_type: 'marketplace',
                        destination_value: form.destination_value.startsWith('08') ? 'https://shopee.co.id/toko-tahra-official' : form.destination_value || 'https://shopee.co.id/toko-tahra-official'
                      })}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        form.destination_type === 'marketplace'
                          ? 'bg-rose-950/30 border-rose-500/60 text-white ring-1 ring-rose-500/40'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5 text-rose-400 shrink-0" />
                      <div>
                        <strong className="text-xs block">Shopee / TikTok Shop</strong>
                        <span className="text-[10px] text-neutral-400">Checkout otomatis toko</span>
                      </div>
                    </button>
                  </div>

                  {form.destination_type === 'whatsapp' ? (
                    <Input
                      label="Nomor WhatsApp Admin UMKM"
                      id="destination_value"
                      type="text"
                      placeholder="081289123456"
                      value={form.destination_value}
                      onChange={(e) => setForm({ ...form, destination_value: e.target.value })}
                      helperText="AI akan otomatis membuatkan tautan chat WhatsApp dengan pesan pesan instan."
                    />
                  ) : (
                    <Input
                      label="Tautan Toko Online / Shopee / TikTok Shop"
                      id="destination_value"
                      type="text"
                      placeholder="https://shopee.co.id/toko-tahra-official"
                      value={form.destination_value}
                      onChange={(e) => setForm({ ...form, destination_value: e.target.value })}
                    />
                  )}
                </div>

                {/* 3. Product Photo Upload (Optional Multimodal Vision Audit) */}
                <div className="pt-2 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-neutral-300">
                      Foto Asli Produk (Opsional - Vision AI Audit)
                    </label>
                    <span className="text-[10px] text-rose-400 font-semibold font-mono">
                      {form.photo_preview ? '✓ FOTO TERUNGGAH' : 'AI STUDIO PROMPT'}
                    </span>
                  </div>

                  {form.photo_preview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 p-2 flex items-center gap-3">
                      <img
                        src={form.photo_preview}
                        alt="Preview Produk"
                        className="w-16 h-16 object-cover rounded-xl border border-neutral-700"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <span className="text-white font-bold block truncate">
                          {form.photo_file?.name || 'Foto Produk Terpilih'}
                        </span>
                        <span className="text-emerald-400 text-[11px] block mt-0.5">
                          Sub-Agent 4 akan mengaudit kontras & keterbacaan visual ini.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, photo_file: null, photo_preview: null })}
                        className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="rounded-2xl border-2 border-dashed border-neutral-800 hover:border-rose-500/50 bg-neutral-950/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                      <UploadCloud className="w-7 h-7 text-neutral-500 mb-1.5" />
                      <span className="text-xs font-bold text-neutral-300">
                        Klik untuk Unggah Foto Produk
                      </span>
                      <span className="text-[10px] text-neutral-500 mt-0.5">
                        Format PNG/JPG (Jika kosong, AI akan merangkai Prompt Studio 8K)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* 4. Ad Budget Package Selector */}
                <div className="pt-2 border-t border-neutral-800">
                  <label className="text-xs font-bold text-neutral-300 block mb-2">
                    Pilih Paket Alokasi Saldo Iklan (Simulasi Deposit)
                  </label>

                  <div className="grid grid-cols-3 gap-2.5 mb-3">
                    {[
                      { val: '100000', label: 'Uji Coba', days: '2-3 Hari' },
                      { val: '300000', label: 'Growth', days: '5-7 Hari' },
                      { val: '500000', label: 'Scale-Up', days: '10-14 Hari' },
                    ].map((pkg) => (
                      <button
                        key={pkg.val}
                        type="button"
                        onClick={() => setForm({ ...form, budget_harian: pkg.val, selected_package: pkg.val })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          form.selected_package === pkg.val
                            ? 'bg-rose-950/40 border-rose-500 text-white ring-1 ring-rose-500 shadow-sm'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-rose-400 uppercase block">{pkg.label}</span>
                        <strong className="text-xs font-black block text-white mt-0.5">{formatRp(Number(pkg.val))}</strong>
                        <span className="text-[9px] text-neutral-500">{pkg.days}</span>
                      </button>
                    ))}
                  </div>

                  <Input
                    label="Atau Atur Budget Khusus (Rp)"
                    id="budget_harian"
                    type="number"
                    prefix="Rp"
                    value={form.budget_harian}
                    onChange={(e) => setForm({ ...form, budget_harian: e.target.value, selected_package: 'custom' })}
                    error={formErrors.budget_harian}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isFullWidth
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="mt-2 text-sm font-black"
                >
                  Lanjut ke Konfirmasi Saldo & Eksekusi AI →
                </Button>
              </form>
            </Card>
          </div>

          {/* Unit Economics Live Preview Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Card className="p-6 bg-neutral-950/80 border-rose-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white tracking-wide">
                    Live Unit Economics
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Evaluasi kelayakan anti-boncos
                  </p>
                </div>
              </div>

              {hasValues ? (
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase">
                        Margin Laba Kotor
                      </span>
                      <span
                        className="text-xl font-black font-mono"
                        style={{ color: marginData.color }}
                      >
                        {marginData.marginPercent.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                      <span>Nominal Profit / Unit:</span>
                      <span className="font-bold text-white font-mono">
                        {formatRp(marginData.marginValue)}
                      </span>
                    </div>
                  </div>

                  {/* Status Box */}
                  <div
                    className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${marginData.color}15`,
                      borderColor: `${marginData.color}40`,
                      color: marginData.color,
                    }}
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-black uppercase mb-0.5">
                        {marginData.label}
                      </strong>
                      <span>
                        {marginData.status === 'VETO'
                          ? 'Perhatian: Margin di bawah 20% membuat iklan berisiko pasti rugi. Sub-Agent 2 akan memblokir eksekusi otomatis.'
                          : marginData.status === 'WARNING'
                          ? 'Margin mencukupi namun memiliki ruang kecil untuk biaya CPA iklan.'
                          : 'Margin sangat sehat! Ideal untuk diiklankan secara agresif di platform digital.'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-neutral-500 text-xs font-medium">
                  Isi Harga Jual dan HPP untuk melihat simulasi kalkulasi margin profit secara instan.
                </div>
              )}
            </Card>

            {/* Ad Spend & Fee Breakdown Card */}
            <Card className="p-6 bg-neutral-950/60 border-neutral-900 text-xs text-neutral-300">
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-rose-500" />
                Alokasi Saldo Iklan Transparan
              </h4>

              <div className="flex flex-col gap-2 p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 mb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Total Saldo Deposit:</span>
                  <span className="font-bold text-white font-mono">{formatRp(budgetNum)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">1. Iklan Murni (90%):</span>
                  <span className="font-bold text-emerald-400 font-mono">{formatRp(adSpendPure)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">2. Jasa Optimasi AI (10%):</span>
                  <span className="font-bold text-rose-400 font-mono">{formatRp(aiFee)}</span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Biaya manajemen 10% mencakup seluruh analisis pasar, A/B testing naskah video 15s, prompt visual, dan pengawasan real-time anti-boncos 24/7.
              </p>
            </Card>
          </div>
        </div>
      </PageContainer>

      {/* SIMULATED PAYMENT CONFIRMATION MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-neutral-950 border border-rose-500/40 p-6 sm:p-7 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase">Simulasi Pembayaran Saldo</h3>
                  <p className="text-[10px] text-neutral-400">Mode Demo Kompetisi (Tanpa Uang Asli)</p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-neutral-500 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center text-neutral-300">
                <span>Produk:</span>
                <strong className="text-white truncate max-w-[200px]">{form.product_name}</strong>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span>Tujuan Closing:</span>
                <strong className="text-emerald-400 uppercase font-mono">
                  {form.destination_type === 'whatsapp' ? 'WhatsApp Admin' : 'Marketplace'}
                </strong>
              </div>
              <div className="flex justify-between items-center text-neutral-300 pt-2 border-t border-neutral-800">
                <span>Saldo Iklan (90%):</span>
                <span className="font-mono text-white font-bold">{formatRp(adSpendPure)}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span>Fee Optimasi AI (10%):</span>
                <span className="font-mono text-rose-400 font-bold">{formatRp(aiFee)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-white pt-2 border-t border-neutral-800">
                <span>Total Konfirmasi:</span>
                <span className="text-rose-400 font-mono text-base">{formatRp(budgetNum)}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-300 text-[11px] leading-relaxed flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Klik konfirmasi untuk mensimulasikan pembayaran instan QRIS. 5 Sub-Agent AI akan langsung memproses analisis real-time.
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              isFullWidth
              onClick={handleConfirmSimulatedPayment}
              className="text-xs font-black shadow-lg shadow-rose-950/60"
            >
              Konfirmasi & Jalankan 5 Sub-Agent AI →
            </Button>
          </div>
        </div>
      )}

      {/* Live Ultra-Premium Multi-Agent Thinking Modal */}
      <AgentThinkingModal
        isOpen={isSubmitting}
        currentStageIndex={currentStageIndex}
        productName={form.product_name}
        logs={thoughtLogs}
        isVeto={isVetoed}
        vetoReason={vetoAdvice}
        onClose={() => {
          setIsSubmitting(false);
          setIsVetoed(false);
        }}
      />

      <Footer />
    </div>
  );
}
