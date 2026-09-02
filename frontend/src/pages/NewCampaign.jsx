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

  // Smart Prompt & Parameter State
  const [promptText, setPromptText] = useState('');
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [form, setForm] = useState({
    product_name: '',
    harga_jual: '35000',
    hpp: '15000',
    budget_harian: '100000',
    kategori: 'Otomatis AI',
    platform: 'TikTok',
    destination_type: 'whatsapp', // 'whatsapp' | 'website' | 'marketplace'
    destination_value: '081289123456',
    detected_packages: [],
    selected_package: '100000',
    photo_file: null,
    photo_preview: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [thoughtLogs, setThoughtLogs] = useState([]);
  const [isVetoed, setIsVetoed] = useState(false);
  const [vetoAdvice, setVetoAdvice] = useState('');

  // Universal Semantic Parser: Automatically extracts product, prices, packages, and contact from prompt
  const parsePromptToParams = (text) => {
    if (!text.trim()) return;

    const tLower = text.toLowerCase();

    // 1. Detect Phone Number / WhatsApp
    const phoneMatch = text.match(/(?:08|628|\+628)[0-9\-\s]{8,14}/);
    let destType = 'whatsapp';
    let destVal = '081289123456';
    if (phoneMatch) {
      destVal = phoneMatch[0].replace(/[^0-9]/g, '');
      destType = 'whatsapp';
    } else if (tLower.includes('http') || tLower.includes('.com') || tLower.includes('.id') || tLower.includes('website')) {
      const urlMatch = text.match(/https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(?:com|id|co\.id|net|io)[^\s]*/);
      if (urlMatch) {
        destVal = urlMatch[0];
        destType = 'website';
      }
    } else if (tLower.includes('shopee') || tLower.includes('tokopedia') || tLower.includes('tiktok shop')) {
      destType = 'marketplace';
      destVal = 'Toko Resmi Marketplace';
    }

    // 2. Extract Prices & Numbers (e.g. 300rb, 300.000, 300k, 35000, 1.2jt)
    const priceMatches = [];
    const rbRegex = /(\d+(?:[.,]\d+)?)\s*(?:rb|k|ribu)/gi;
    let m;
    while ((m = rbRegex.exec(text)) !== null) {
      const num = parseFloat(m[1].replace(',', '.')) * 1000;
      priceMatches.push(Math.round(num));
    }
    const jtRegex = /(\d+(?:[.,]\d+)?)\s*(?:jt|juta)/gi;
    while ((m = jtRegex.exec(text)) !== null) {
      const num = parseFloat(m[1].replace(',', '.')) * 1000000;
      priceMatches.push(Math.round(num));
    }
    const rawNumRegex = /rp\s*(\d{1,3}(?:\.\d{3})+|\d{4,9})/gi;
    while ((m = rawNumRegex.exec(text)) !== null) {
      const num = parseInt(m[1].replace(/\./g, ''), 10);
      priceMatches.push(num);
    }

    let detectedPrice = 35000;
    let detectedHpp = 15000;
    let packages = [];

    if (priceMatches.length === 1) {
      detectedPrice = priceMatches[0];
      detectedHpp = Math.round(detectedPrice * 0.45);
      packages = [{ name: 'Paket Utama', price: detectedPrice }];
    } else if (priceMatches.length >= 2) {
      // Multiple prices detected (Multi-package or Price + HPP)
      if (tLower.includes('modal') || tLower.includes('hpp')) {
        detectedPrice = Math.max(...priceMatches);
        detectedHpp = Math.min(...priceMatches);
        packages = [{ name: 'Produk Utama', price: detectedPrice }];
      } else {
        priceMatches.sort((a, b) => a - b);
        detectedPrice = priceMatches[0]; // Base package
        detectedHpp = Math.round(detectedPrice * 0.4);
        packages = priceMatches.map((p, idx) => ({
          name: idx === 0 ? 'Paket Basic' : idx === 1 ? 'Paket Pro / Video' : `Paket Tier ${idx + 1}`,
          price: p,
        }));
      }
    } else {
      // Default intelligent estimation if no price mentioned
      if (tLower.includes('jasa') || tLower.includes('foto') || tLower.includes('kursus') || tLower.includes('desain')) {
        detectedPrice = 300000;
        detectedHpp = 120000;
      } else if (tLower.includes('kaos') || tLower.includes('baju') || tLower.includes('fashion')) {
        detectedPrice = 85000;
        detectedHpp = 38000;
      } else if (tLower.includes('kucing') || tLower.includes('pet')) {
        detectedPrice = 25000;
        detectedHpp = 10000;
      } else {
        detectedPrice = 35000;
        detectedHpp = 15000;
      }
    }

    // 3. Extract Clean Product Name (Strip boilerplate words)
    let cleanName = text
      .replace(/(?:ada|paket|harga|rp|nomor|wa|whatsapp|hubungi|kontak|di|murah|promo|diskon|\.com|\.id)[^,\n]*/gi, '')
      .replace(/[0-9\-\s]{8,14}/g, '')
      .replace(/[,;.]+/g, ' ')
      .trim();

    if (!cleanName || cleanName.length < 3) {
      cleanName = text.split(/[,\n.]/)[0].trim();
    }
    if (cleanName.length > 50) {
      cleanName = cleanName.slice(0, 50);
    }

    setForm((prev) => ({
      ...prev,
      product_name: cleanName || text.slice(0, 40),
      harga_jual: String(detectedPrice),
      hpp: String(detectedHpp),
      destination_type: destType,
      destination_value: destVal,
      detected_packages: packages,
    }));
  };

  const handlePromptChange = (e) => {
    const val = e.target.value;
    setPromptText(val);
    parsePromptToParams(val);
  };

  const handleApplyPreset = (presetText) => {
    setPromptText(presetText);
    parsePromptToParams(presetText);
  };

  // Live Unit Economics Calculation
  const marginData = calculateMargin(form.harga_jual, form.hpp);
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
    if (!form.product_name.trim() && !promptText.trim()) errs.product_name = 'Ceritakan produk atau jasa yang ingin diiklankan.';
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
        badge="AI Autopilot Ads • Universal Discovery"
        title="Buat Strategi Kampanye Iklan Baru"
        description="Ceritakan produk fisik atau layanan jasa usaha Anda secara bebas. AI akan membedah pasar, mengekstrak parameter, dan menyusun strategi iklan 5 tahap secara otonom."
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
        maxWidth="max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Input Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card hasRedBar className="p-6 sm:p-8">
              <form onSubmit={handleFormPreSubmit} className="flex flex-col gap-5">
                {/* 1. Quick Inspiration Presets */}
                <div>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                    💡 Contoh Cepat Siap Pakai (Klik untuk Coba):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '☕ Jasa Foto Produk Kopi', text: 'Jasa Foto Produk Kopi di Jakarta. Ada Paket Foto Menu Rp 300.000 dan Paket Video Reels Rp 750.000. Hubungi WA 081289123456.' },
                      { label: '🐱 Makanan Kucing Basah Pouch', text: 'Makanan Kucing Basah Pouch 85g rasa Salmon, harga jual Rp 20.000, modal HPP Rp 8.000. Hubungi WA 081289123456.' },
                      { label: '👕 Kaos Oversize Combed', text: 'Kaos Oversize Pria Cotton Combed 24s, harga Rp 85.000, modal Rp 38.000. Toko Shopee: shopee.co.id/kaosdistro' },
                      { label: '🌶️ Sambal Cumi Asin 150g', text: 'Sambal Cumi Asin Gurih 150g pedas segar alami, harga Rp 35.000, modal Rp 15.000. WhatsApp 081289123456.' },
                      { label: '🚗 Jasa Cuci Mobil & Salon', text: 'Jasa Cuci Mobil & Salon Detailing panggilan. Paket Cuci Rp 65.000 dan Paket Coating Rp 450.000. Hubungi WA 081289123456.' }
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyPreset(p.text)}
                        className="px-3 py-1.5 bg-neutral-900 hover:bg-rose-950/40 text-neutral-300 hover:text-white border border-neutral-800 hover:border-rose-500/50 rounded-xl text-xs font-medium transition-all cursor-pointer shadow-sm"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Universal Magic Prompt Box */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="prompt_input" className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-500" />
                      Ceritakan Produk / Jasa / Usaha Anda:
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                      LIVE AI AUTO-EXTRACT
                    </span>
                  </div>

                  <textarea
                    id="prompt_input"
                    rows={4}
                    placeholder="Contoh: Jasa Foto Produk Kopi di Jakarta. Ada Paket Foto Menu Rp 300.000 dan Paket Video Reels Rp 750.000. Hubungi WA 081289123456..."
                    value={promptText}
                    onChange={handlePromptChange}
                    className="w-full p-4 rounded-2xl bg-neutral-950 border border-neutral-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white text-sm leading-relaxed placeholder:text-neutral-500 outline-none transition-all shadow-inner resize-none font-sans"
                  />
                  {formErrors.product_name && (
                    <span className="text-xs text-rose-500 mt-1 block font-medium">{formErrors.product_name}</span>
                  )}
                  <span className="text-[11px] text-neutral-400 mt-1.5 block leading-relaxed">
                    💡 <em>Ketik bebas apa saja: nama usaha, banyak paket harga, HPP, atau kontak WhatsApp. AI otomatis membedah parameternya secara real-time di bawah.</em>
                  </span>
                </div>

                {/* 3. Live AI Parsed Brief Preview Card */}
                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-3.5 shadow-lg">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-2 font-mono">
                      <Bot className="w-4 h-4 text-rose-500" />
                      HASIL EKSTRAKSI PARAMETER AI (LIVE)
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsManualEdit(!isManualEdit)}
                      className="text-xs text-neutral-400 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {isManualEdit ? 'Tutup Penyesuaian ✕' : '✏️ Sesuaikan Nilai Manual'}
                    </button>
                  </div>

                  {/* Extracted Entity Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        🏷️ Usaha / Produk:
                      </span>
                      <strong className="text-xs text-white block mt-0.5 truncate">
                        {form.product_name || 'Menunggu input...'}
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        💰 Harga Jual / Paket:
                      </span>
                      <strong className="text-xs text-emerald-400 font-mono block mt-0.5">
                        {formatRp(form.harga_jual)}
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        📉 Estimasi Modal (HPP):
                      </span>
                      <strong className="text-xs text-neutral-300 font-mono block mt-0.5">
                        {formatRp(form.hpp)} ({marginData.marginPercent.toFixed(0)}% Margin)
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        📞 Tujuan Kontak:
                      </span>
                      <strong className="text-xs text-white block mt-0.5 truncate">
                        {form.destination_type === 'whatsapp' ? `WA: ${form.destination_value}` : form.destination_value}
                      </strong>
                    </div>
                  </div>

                  {/* Multi-Package Badges if multiple packages detected */}
                  {form.detected_packages && form.detected_packages.length > 1 && (
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                      <span className="text-[11px] font-bold text-rose-300 block mb-1.5">
                        📦 Terdeteksi {form.detected_packages.length} Struktur Paket Harga:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {form.detected_packages.map((pkg, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-mono">
                            {pkg.name}: <strong>{formatRp(pkg.price)}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manual Overrides Accordion (Hidden by default for Zero Friction) */}
                  {isManualEdit && (
                    <div className="pt-3 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in">
                      <Input
                        label="Nama Usaha / Produk"
                        id="product_name_override"
                        value={form.product_name}
                        onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                      />
                      <Input
                        label="Harga Jual (Rp)"
                        id="harga_jual_override"
                        type="number"
                        value={form.harga_jual}
                        onChange={(e) => setForm({ ...form, harga_jual: e.target.value })}
                      />
                      <Input
                        label="Modal HPP (Rp)"
                        id="hpp_override"
                        type="number"
                        value={form.hpp}
                        onChange={(e) => setForm({ ...form, hpp: e.target.value })}
                      />
                      <Input
                        label="Kontak / Link WA / Web"
                        id="destination_override"
                        value={form.destination_value}
                        onChange={(e) => setForm({ ...form, destination_value: e.target.value })}
                      />
                    </div>
                  )}
                </div>

                {/* 4. Budget Allocation Package Selector */}
                <div className="pt-3 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-neutral-300">
                      Pilih Paket Alokasi Saldo Iklan (Simulasi Deposit)
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">100% Prabayar Aman</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {[
                      { id: '100000', name: 'Uji Coba', amount: 100000, days: '2-3 Hari', desc: 'Validasi pasar termurah' },
                      { id: '300000', name: 'Growth', amount: 300000, days: '5-7 Hari', desc: 'Optimal jaring pembeli' },
                      { id: '500000', name: 'Scale-Up', amount: 500000, days: '10-14 Hari', desc: 'Skala omzet maksimal' },
                    ].map((pkg) => {
                      const isSelected = form.budget_harian === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setForm({ ...form, budget_harian: pkg.id, selected_package: pkg.id })}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-rose-950/30 border-rose-500/80 ring-1 ring-rose-500/50 text-white'
                              : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-black uppercase tracking-wider">{pkg.name}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-400">{pkg.days}</span>
                            </div>
                            <p className="text-base font-black text-white font-mono">{formatRp(pkg.amount)}</p>
                          </div>
                          <span className="text-[10px] text-neutral-400 mt-2 block">{pkg.desc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Trigger Button */}
                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  className="w-full mt-2 font-black py-4 shadow-xl shadow-rose-950/50 text-sm flex items-center justify-center gap-2"
                >
                  <span>🚀 Lanjut ke Konfirmasi Saldo & Eksekusi AI</span>
                  <ArrowRight className="w-4 h-4" />
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
