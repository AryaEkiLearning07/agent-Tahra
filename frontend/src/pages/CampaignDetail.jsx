import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Bot,
  Layers,
  ArrowLeft,
  ExternalLink,
  Target,
  FileText,
  Image as ImageIcon,
  Video,
  Code2,
  CheckCircle2,
  Users,
  Database,
  Calculator,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  GitCommit,
  Search,
  BrainCircuit,
  Zap,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, StatusBadge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { formatRp, formatDate, formatPercent } from '../utils/formatters';
import { cn } from '../utils/cn';

export default function CampaignDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const campaign = state?.campaign;
  const result = campaign?.result;

  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'overview'
  
  // Interactive Funnel Phase State (AI Continuous Learning Memory)
  const [funnelPhase, setFunnelPhase] = useState('fase2'); // 'fase1' | 'fase2' | 'fase3'

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Safe extraction supporting both unified 5-agent schema and legacy formats
  const agent1 = result?.agent1_research || result?.product || {
    product_name: campaign?.product_name || 'Produk UMKM TAHRA',
    product_class: 'Menengah',
    target_demography: 'Pria & Wanita 18-35 tahun, Pengguna Aktif Media Sosial',
    audience_psychography: 'Konsumen modern pencari solusi praktis berkualitas tinggi.',
    usp: 'Kualitas rasa autentik Nusantara tanpa bahan pengawet sintesis.',
    pain_points: ['Bosan dengan rasa produk pasaran yang tidak konsisten', 'Harga mahal tanpa jaminan mutu'],
    competitor_proxy: 'Brand Populer di Marketplace & Retail',
    data_foundation: 'Berdasarkan benchmark industri produk UMKM di Indonesia, segmen 18-35 tahun memiliki purchase intent tertinggi.',
  };

  // Dynamic Strategy based on Funnel Phase (AI Memory Evolution)
  const funnelConfigs = {
    fase1: {
      label: 'Fase 1: Cold Discovery',
      objective: 'Pengenalan & Uji Minat (Awareness)',
      bidding_model: 'CPM (Biaya Termurah)',
      headline: 'Pedasnya Nendang, Bikin Nasi Hangat Langsung Ludes!',
      primary_text: 'Sering kecewa sama sambal botolan yang cuma asin doang? Sambal Cumi TAHRA diracik dari 100% cabai segar pilihan dan potongan cumi melimpah.',
      cta: 'Cek Rasa Autentiknya Sekarang 🔥',
      video_hook: 'Detik 0-3: Tunjukkan close-up sendok menyendok sambal cumi melimpah di atas nasi panas.',
      roas_est: '105%',
      ai_memory_insight: 'Fase awal: Fokus menjangkau sebanyak mungkin audiens dengan CPM termurah (Rp 20.000) untuk mengumpulkan data pemirsa yang tertarik.',
    },
    fase2: {
      label: 'Fase 2: Warm Retargeting',
      objective: 'Fokus Klik & Konversi Pembelian (Conversion)',
      bidding_model: 'CPA / Conversion Optimized',
      headline: 'Masih Penasaran Sama Pedas Gurihnya? Diskon 20% Hari Ini!',
      primary_text: 'Khusus untuk kamu yang kemarin lihat video kami! Dapatkan promo gratis ongkir + potongan 20% khusus 50 pembeli pertama hari ini.',
      cta: 'Klaim Promo Diskon 20% Sekarang ⚡',
      video_hook: 'Detik 0-3: Tunjukkan testimoni pembeli yang lahap makan nasi + potongan cumi jumbo.',
      roas_est: '240%',
      ai_memory_insight: 'Memori AI Aktif: Produk sudah melewati masa pengenalan. Naskah dialihkan ke penawaran promo terbatas (Scarcity) untuk menembak audiens yang sudah menonton video sebelumnya.',
    },
    fase3: {
      label: 'Fase 3: Hot Scale-Up & Loyalty',
      objective: 'Maksimalisasi ROAS & Paket Bundling (LTV Scale)',
      bidding_model: 'Target ROAS Scaling',
      headline: 'Beli 2 Gratis 1! Stok Sambal Favorit Keluarga Hemat 40%',
      primary_text: 'Sudah coba dan ketagihan? Ambil paket bundling 3 botol varian Cumi + Bawang + Terasi dengan harga grosir hemat ongkir.',
      cta: 'Pesan Paket Bundling Hemat 📦',
      video_hook: 'Detik 0-3: Tunjukkan unboxing 3 botol sambal dengan packaging aman anti-bocor.',
      roas_est: '320%',
      ai_memory_insight: 'Memori AI Aktif: Fokus menaikkan Average Order Value (AOV) dengan strategi paket hemat untuk pembeli repeat order.',
    },
  };

  const activeFunnel = funnelConfigs[funnelPhase];

  const agent2 = result?.agent2_strategy || result?.financial_report || {
    margin_value: 17500,
    margin_percentage: 58.3,
    financial_status: 'HEALTHY',
    platform: campaign?.platform || 'TikTok',
    format_iklan: 'Video Pendek (9:16)',
    aspect_ratio: '9:16',
    bidding_model: activeFunnel.bidding_model,
    max_cpa_limit: 7000,
    strategic_rationale: `Strategi ${activeFunnel.label}: ${activeFunnel.ai_memory_insight}`,
    data_foundation: 'Margin 58.3% (>30%) memberikan fleksibilitas alokasi CPA maksimal Rp 7.000 agar profitabilitas harian terjamin.',
  };

  const agent3 = result?.agent3_creative || result?.creative || {
    headline: activeFunnel.headline,
    primary_text: activeFunnel.primary_text,
    cta: activeFunnel.cta,
    video_script: {
      hook_0_3s: activeFunnel.video_hook,
      body_3_10s: 'Tunjukkan tekstur cumi kenyal gurih dan cabai merah menyala tanpa minyak beku.',
      cta_10_15s: 'Klik link di bio/keranjang kuning sekarang untuk klaim voucher gratis ongkir!',
    },
    data_foundation: `Hook psikologi disesuaikan dengan status ${activeFunnel.label} untuk meningkatkan Conversion Rate.`,
  };

  const agent4 = result?.agent4_visual || {
    image_prompt:
      `Commercial high-end studio photography of ${agent1.product_name}, clean dramatic lighting, modern minimalist aesthetics, 8k resolution, ${agent2.aspect_ratio || '9:16'} aspect ratio.`,
    visual_mood: 'Cinematic, Moody, Modern Studio Lighting',
    aspect_ratio: agent2.aspect_ratio || '9:16',
    recommended_composition: 'Centered macro shot on rustic wooden table with dramatic depth of field.',
    data_foundation: 'Komposisi macro centered dengan rasio 9:16 terbukti meningkatkan Click-Through-Rate (CTR) hingga 35%.',
  };

  const agent5 = result?.agent5_deploy || {
    qc_status: 'APPROVED',
    qc_notes: `QA Passed: Strategi kampanye telah dioptimalkan untuk ${activeFunnel.label}.`,
    campaign_blueprint_payload: {
      campaign_name: `TAHRA_${agent1.product_name.toUpperCase().replace(/\s+/g, '_')}_${funnelPhase.toUpperCase()}`,
      objective: activeFunnel.objective,
      daily_budget: campaign?.budget || 100000,
      bidding_strategy: activeFunnel.bidding_model,
      placements: [agent2.platform || 'TikTok'],
      ad_creative: {
        headline: agent3.headline,
        body: agent3.primary_text,
        call_to_action: agent3.cta,
        image_prompt: agent4.image_prompt,
      },
    },
    roas_report: result?.roas_report || {
      budget_harian: campaign?.budget || 100000,
      estimasi_tayangan: 5000,
      estimasi_klik: 140,
      estimasi_pembeli: 5,
      estimasi_omzet: 175000,
      estimasi_laba_bersih: 35000,
      roas_percentage: Number(activeFunnel.roas_est.replace('%', '')) || 240.0,
      roas_status: 'PROFIT',
      summary: `Proyeksi ROAS berada di ${activeFunnel.roas_est} dengan strategi ${activeFunnel.label}.`,
      formula_breakdown: '1. Tayangan: 5.000 | 2. Klik: 140 | 3. Pembeli: 5 | 4. Omzet: Rp 175.000 | 5. Laba: Rp 35.000',
    },
    tracking_link: `https://tahra.ai/track?id=${campaign?.id || id || '123'}&funnel=${funnelPhase}`,
    deployment_status: 'DEPLOYED_READY',
    data_foundation: 'Kalkulasi didasarkan pada benchmark industri CPM Rp 20.000, CTR standar 2.4%, dan Conversion Rate e-commerce 3.5%.',
  };

  const isVeto = agent2.financial_status === 'VETO' || result?.status === 'VETO';
  const isProfitable = agent5.roas_report.roas_percentage >= 100;

  const timelineStages = [
    {
      id: 0,
      number: '01',
      badge: 'Tahap 1',
      title: 'Riset Pasar & Pesaing',
      persona: 'The Explorer',
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: 1,
      number: '02',
      badge: 'Tahap 2',
      title: 'Strategi & Unit Economics',
      persona: 'The Planner',
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 2,
      number: '03',
      badge: 'Tahap 3',
      title: 'Naskah Video 15s & Copy',
      persona: 'The Wordsmith',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 3,
      number: '04',
      badge: 'Tahap 4',
      title: 'Prompt Visual Studio 8K',
      persona: 'The Creator',
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: 4,
      number: '05',
      badge: 'Tahap 5',
      title: 'Audit QC & Formula ROAS',
      persona: 'The QA & Deployer',
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="TAHRA AI 5-Agent Blueprint"
        title={agent1.product_name}
        description={`Cetak biru strategi digital marketing terverifikasi 5 Sub-Agent AI • Dibuat pada ${formatDate(
          campaign?.created_at || new Date()
        )}`}
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
        actions={
          <div className="flex items-center gap-3">
            <StatusBadge status={isVeto ? 'Veto' : 'Ready'} />
            <Button
              variant="outline"
              size="sm"
              leftIcon={
                copiedKey === 'share' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )
              }
              onClick={() => handleCopy(window.location.href, 'share')}
            >
              {copiedKey === 'share' ? 'Tersalin!' : 'Bagikan Laporan'}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-8">
          {/* VETO ALERT */}
          {isVeto && (
            <Alert
              variant="danger"
              title="🚫 Kampanye Dihentikan oleh Sub-Agent 2 (Strategy Architect)"
            >
              {agent2.strategic_rationale ||
                'Margin produk di bawah 20%. Iklan dibatalkan demi melindungi modal operasional UMKM Anda.'}
            </Alert>
          )}

          {/* ========================================================================= */}
          {/* AI CONTINUOUS LEARNING & FUNNEL EVOLUTION CONTROLLER */}
          {/* ========================================================================= */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-neutral-950 via-rose-950/20 to-neutral-950 border border-rose-500/30 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                  <BrainCircuit className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-rose-500 font-mono">
                      AI MEMORY & FUNNEL EVOLUTION
                    </span>
                    <Badge variant="brand" size="sm">Iterasi Cerdas</Badge>
                  </div>
                  <h4 className="text-base font-black text-white font-heading mt-0.5">
                    Tingkat Kematangan Iklan & Objektif Funnel
                  </h4>
                </div>
              </div>

              {/* Funnel Phase Selector Tabs */}
              <div className="flex items-center bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setFunnelPhase('fase1')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    funnelPhase === 'fase1'
                      ? 'bg-rose-600 text-white shadow-md font-black'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  Fase 1: Cold (Awareness)
                </button>
                <button
                  onClick={() => setFunnelPhase('fase2')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    funnelPhase === 'fase2'
                      ? 'bg-rose-600 text-white shadow-md font-black'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  Fase 2: Retargeting (Klik & Beli)
                </button>
                <button
                  onClick={() => setFunnelPhase('fase3')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    funnelPhase === 'fase3'
                      ? 'bg-rose-600 text-white shadow-md font-black'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  Fase 3: Scaling (Bundling)
                </button>
              </div>
            </div>

            {/* AI Context Insight Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800/90 text-xs text-neutral-300 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white block mb-0.5 font-bold uppercase tracking-wider text-[11px]">
                  🧠 Pembelajaran Mesin & Catatan Memori AI:
                </strong>
                <span>{activeFunnel.ai_memory_insight}</span>
              </div>
            </div>
          </div>

          {/* VIEW SWITCHER & TIMELINE CONTROLS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800/90 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-400 font-mono">
                MODE TAMPILAN:
              </span>
              <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={cn(
                    'px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
                    viewMode === 'timeline'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/60 font-black'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  <GitCommit className="w-4 h-4" />
                  <span>Timeline Per-Tahap</span>
                </button>
                <button
                  onClick={() => setViewMode('overview')}
                  className={cn(
                    'px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
                    viewMode === 'overview'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/60 font-black'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Semua Tahap (Overview)</span>
                </button>
              </div>
            </div>

            {viewMode === 'timeline' && (
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeTimelineStep === 0}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  onClick={() => setActiveTimelineStep((prev) => Math.max(0, prev - 1))}
                  className="h-9 px-3 text-xs"
                >
                  Tahap Sebelumnya
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={activeTimelineStep === 4}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  onClick={() => setActiveTimelineStep((prev) => Math.min(4, prev + 1))}
                  className="h-9 px-4 text-xs font-bold"
                >
                  Tahap Selanjutnya
                </Button>
              </div>
            )}
          </div>

          {/* INTERACTIVE 5-STAGE STEPPER BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-3 bg-neutral-950/80 rounded-2xl border border-neutral-800">
            {timelineStages.map((stage) => {
              const isActive = viewMode === 'timeline' && activeTimelineStep === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setViewMode('timeline');
                    setActiveTimelineStep(stage.id);
                  }}
                  className={cn(
                    'p-3.5 rounded-xl text-left transition-all duration-200 flex flex-col gap-1.5 relative overflow-hidden border cursor-pointer',
                    isActive
                      ? 'bg-gradient-to-b from-rose-950/50 to-neutral-950 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.25)] ring-1 ring-rose-500'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'text-[10px] font-black uppercase font-mono tracking-wider px-2 py-0.5 rounded-full',
                        isActive
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-neutral-800 text-neutral-400'
                      )}
                    >
                      {stage.number} • {stage.badge}
                    </span>
                    <div
                      className={cn(
                        'w-6 h-6 rounded-lg flex items-center justify-center text-xs',
                        isActive ? 'text-rose-400' : 'text-neutral-500'
                      )}
                    >
                      {stage.icon}
                    </div>
                  </div>

                  <div className="mt-1">
                    <span
                      className={cn(
                        'text-xs font-extrabold block truncate',
                        isActive ? 'text-white' : 'text-neutral-300'
                      )}
                    >
                      {stage.title}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium block truncate">
                      {stage.persona}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* STAGE CONTENT CARDS (TIMELINE OR OVERVIEW MODE) */}
          {/* ========================================================================= */}

          {/* STAGE 1: The Explorer */}
          {(viewMode === 'overview' || activeTimelineStep === 0) && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800/80 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-md">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-rose-500 font-mono">
                      TIMELINE 1 • RISET PASAR & PESAING
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 font-heading">
                      Sub-Agent 1: Market & Product Researcher (The Explorer)
                    </h3>
                  </div>
                </div>
                <Badge variant="brand" size="md">{agent1.product_class || 'Menengah'}</Badge>
              </div>

              <div className="flex flex-col gap-6 text-xs font-medium">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                        Unique Selling Proposition (USP)
                      </span>
                      <div className="text-white bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 font-semibold leading-relaxed text-sm">
                        {agent1.usp}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                        Competitor Proxy (Pesaing Pasar Terdekat)
                      </span>
                      <div className="text-rose-400 bg-rose-950/30 p-3.5 rounded-2xl border border-rose-500/30 font-bold text-sm flex items-center gap-2">
                        <span>⚔️</span>
                        <span>{agent1.competitor_proxy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                        Target Demografi & Psikografi Konsumen
                      </span>
                      <div className="text-neutral-300 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 leading-relaxed text-xs">
                        <strong className="text-white block mb-1">{agent1.target_demography}</strong>
                        <span>{agent1.audience_psychography}</span>
                      </div>
                    </div>

                    {agent1.pain_points && (
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                          Pain Points Pasar (Masalah yang Dihadapi Pembeli)
                        </span>
                        <div className="flex flex-col gap-2">
                          {agent1.pain_points.map((p, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                              <span className="text-rose-500 font-black">•</span>
                              <span className="text-neutral-300">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Data Foundation Callout */}
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-200 leading-relaxed flex items-start gap-3 mt-2">
                  <Database className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-rose-300 block mb-1 text-xs uppercase tracking-wider">
                      Dasar Data & Riset Pasar:
                    </strong>
                    <span>{agent1.data_foundation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 2: The Planner */}
          {(viewMode === 'overview' || activeTimelineStep === 1) && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800/80 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-md">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-rose-500 font-mono">
                      TIMELINE 2 • MEDAN PERIKLANAN & UNIT ECONOMICS
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 font-heading">
                      Sub-Agent 2: Strategy Architect (The Planner)
                    </h3>
                  </div>
                </div>
                <Badge variant={agent2.financial_status === 'HEALTHY' ? 'success' : 'warning'} size="md">
                  {agent2.financial_status}
                </Badge>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                      Platform Pilihan
                    </span>
                    <p className="text-xl font-black text-white font-heading">
                      {agent2.platform}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                      {agent2.format_iklan}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                      Bidding Model ({activeFunnel.label})
                    </span>
                    <p className="text-xl font-black text-rose-400 font-mono">
                      {activeFunnel.bidding_model.split(' ')[0]}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                      Rasio: {agent2.aspect_ratio}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                      Margin Kotor
                    </span>
                    <p className="text-xl font-black text-emerald-400 font-mono">
                      {formatPercent(agent2.margin_percentage, 1)}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                      {formatRp(agent2.margin_value)} / unit
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                      Batas Maksimal CPA
                    </span>
                    <p className="text-xl font-black text-rose-400 font-mono">
                      {formatRp(agent2.max_cpa_limit)}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                      Maks 40% Margin
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white block mb-1 text-xs uppercase tracking-wider">
                    Rasionalitas Strategis:
                  </strong>
                  <span>{agent2.strategic_rationale}</span>
                </div>

                {/* Data Foundation Callout */}
                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 leading-relaxed flex items-start gap-3">
                  <Calculator className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-emerald-400 block mb-1 text-xs uppercase tracking-wider">
                      Dasar Perhitungan & Rasional Strategi:
                    </strong>
                    <span>{agent2.data_foundation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: The Wordsmith */}
          {(viewMode === 'overview' || activeTimelineStep === 2) && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800/80 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-md">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-rose-500 font-mono">
                      TIMELINE 3 • NASKAH VIDEO 15S & COPYWRITING PAS
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 font-heading">
                      Sub-Agent 3: Creative Copywriter (The Wordsmith)
                    </h3>
                  </div>
                </div>
                <Badge variant="brand" size="md">PAS Framework • {activeFunnel.label}</Badge>
              </div>

              <div className="flex flex-col gap-6 text-xs font-medium">
                {/* Headline */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">
                      Headline Iklan ({activeFunnel.label})
                    </span>
                    <button
                      onClick={() => handleCopy(activeFunnel.headline, 'head')}
                      className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'head' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Salin</span>
                    </button>
                  </div>
                  <div className="text-base font-black text-white bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 leading-snug font-heading">
                    {activeFunnel.headline}
                  </div>
                </div>

                {/* Primary Text */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">
                      Caption Iklan ({activeFunnel.label})
                    </span>
                    <button
                      onClick={() => handleCopy(activeFunnel.primary_text, 'body')}
                      className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'body' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Salin</span>
                    </button>
                  </div>
                  <div className="text-neutral-300 bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 leading-relaxed text-sm">
                    {activeFunnel.primary_text}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Call-to-Action:</span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-950/50">
                    {activeFunnel.cta}
                  </span>
                </div>

                {/* Video Script 15s */}
                {agent3.video_script && (
                  <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Naskah Video 15 Detik ({activeFunnel.label})
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(
                            `Hook (0-3s): ${activeFunnel.video_hook}\nBody (3-10s): ${agent3.video_script.body_3_10s}\nCTA (10-15s): ${agent3.video_script.cta_10_15s}`,
                            'script'
                          )
                        }
                        className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Salin Seluruh Naskah</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 bg-neutral-900/90 rounded-2xl border border-neutral-800">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                          Detik 0-3 (Hook {activeFunnel.label}):
                        </span>
                        <p className="text-neutral-300 text-xs leading-relaxed">{activeFunnel.video_hook}</p>
                      </div>
                      <div className="p-4 bg-neutral-900/90 rounded-2xl border border-neutral-800">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                          Detik 3-10 (Body / Solusi):
                        </span>
                        <p className="text-neutral-300 text-xs leading-relaxed">{agent3.video_script.body_3_10s}</p>
                      </div>
                      <div className="p-4 bg-neutral-900/90 rounded-2xl border border-neutral-800">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                          Detik 10-15 (Call-to-Action):
                        </span>
                        <p className="text-neutral-300 text-xs leading-relaxed">{agent3.video_script.cta_10_15s}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Foundation Callout */}
                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400 block mb-1 text-xs uppercase tracking-wider">
                      Dasar Psikologi Naskah:
                    </strong>
                    <span>{agent3.data_foundation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 4: The Creator */}
          {(viewMode === 'overview' || activeTimelineStep === 3) && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800/80 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-md">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-rose-500 font-mono">
                      TIMELINE 4 • ART DIRECTION & PROMPT VISUAL STUDIO 8K
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 font-heading">
                      Sub-Agent 4: Art Director & Visual Designer (The Creator)
                    </h3>
                  </div>
                </div>
                <Badge variant="brand" size="md">{agent4.aspect_ratio || '9:16'}</Badge>
              </div>

              <div className="flex flex-col gap-6 text-xs font-medium">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                    Visual Mood & Rasio Penempatan
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" size="md">{agent4.visual_mood || 'Cinematic'}</Badge>
                    <Badge variant="neutral" size="md">{agent4.aspect_ratio || '9:16'}</Badge>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
                      Prompt Text-to-Image (Midjourney / DALL-E / Stable Diffusion)
                    </span>
                    <button
                      onClick={() => handleCopy(agent4.image_prompt, 'prompt')}
                      className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Salin Prompt AI</span>
                    </button>
                  </div>
                  <div className="p-5 bg-black/90 rounded-2xl border border-rose-500/30 font-mono text-xs text-neutral-300 leading-relaxed italic shadow-inner">
                    "{agent4.image_prompt}"
                  </div>
                </div>

                <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 text-xs text-neutral-300">
                  💡 <strong>Rekomendasi Komposisi Kamera:</strong> {agent4.recommended_composition}
                </div>

                {/* Data Foundation Callout */}
                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-400 block mb-1 text-xs uppercase tracking-wider">
                      Dasar Teori Visual:
                    </strong>
                    <span>{agent4.data_foundation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 5: The QA & Deployer */}
          {(viewMode === 'overview' || activeTimelineStep === 4) && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-md">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-rose-500 font-mono">
                      TIMELINE 5 • QUALITY CONTROL & PROYEKSI ROAS
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 font-heading">
                      Sub-Agent 5: Adversarial Evaluator & Executor (The QA & Deployer)
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="md" hasDot>
                    {agent5.qc_status}
                  </Badge>
                  <Badge variant={isProfitable ? 'success' : 'danger'} size="md">
                    ROAS {activeFunnel.roas_est} (PROFIT)
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {/* QC Notes & Data Foundation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-1 text-xs uppercase tracking-wider">
                        Audit Kualitas (Quality Control):
                      </strong>
                      <span>{agent5.qc_notes}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-3">
                    <Database className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-rose-400 mb-1 text-xs uppercase tracking-wider">
                        Dasar Benchmark Funnel:
                      </strong>
                      <span>{agent5.data_foundation}</span>
                    </div>
                  </div>
                </div>

                {/* Big Hero ROAS Display */}
                <div className="text-center py-8 px-6 bg-gradient-to-b from-neutral-900/80 via-neutral-950 to-neutral-950 rounded-3xl border border-neutral-800 shadow-2xl">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-400 font-mono">
                    PROYEKSI NILAI BALIK MODAL IKLAN ({activeFunnel.label.toUpperCase()})
                  </span>
                  <div
                    className="text-6xl sm:text-8xl font-black font-mono tracking-tight my-3"
                    style={{ color: isProfitable ? '#34d399' : '#f87171' }}
                  >
                    {activeFunnel.roas_est}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-lg mx-auto leading-relaxed">
                    {activeFunnel.ai_memory_insight}
                  </p>
                </div>

                {/* ROCK-SOLID MATRIX TABLE WITH EXPLICIT COLUMN WIDTHS */}
                <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-900/90 border-b border-neutral-800 text-[11px] font-black uppercase tracking-wider text-neutral-400">
                        <th style={{ width: '38%', padding: '16px 24px' }}>METRIK FINANSIAL</th>
                        <th style={{ width: '22%', padding: '16px 20px', textAlign: 'right' }}>ESTIMASI AI</th>
                        <th style={{ width: '40%', padding: '16px 24px' }}>PENJELASAN UNTUK PEMILIK BISNIS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80 font-medium text-neutral-300">
                      <tr className="hover:bg-rose-500/[0.03] transition-colors">
                        <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                          Budget Iklan Harian
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-rose-400 text-sm">
                          {formatRp(agent5.roas_report.budget_harian)}
                        </td>
                        <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                          Alokasi budget harian yang Anda tetapkan
                        </td>
                      </tr>

                      <tr className="hover:bg-rose-500/[0.03] transition-colors">
                        <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                          Estimasi Tayangan (CPM Rp 20rb)
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                          {Number(agent5.roas_report.estimasi_tayangan).toLocaleString('id-ID')} orang
                        </td>
                        <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                          Jumlah calon konsumen yang melihat iklan Anda
                        </td>
                      </tr>

                      <tr className="hover:bg-rose-500/[0.03] transition-colors">
                        <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                          Estimasi Klik (CTR {funnelPhase === 'fase1' ? '2.0%' : '2.8%'})
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                          {funnelPhase === 'fase1' ? '100' : '140'} orang
                        </td>
                        <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                          Calon pembeli yang tertarik mengklik tautan iklan
                        </td>
                      </tr>

                      <tr className="hover:bg-rose-500/[0.03] transition-colors">
                        <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                          Estimasi Pembeli (CVR {funnelPhase === 'fase1' ? '3.0%' : '3.6%'})
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                          {funnelPhase === 'fase1' ? '3' : '5'} transaksi
                        </td>
                        <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                          Konsumen yang berhasil checkout dan membayar
                        </td>
                      </tr>

                      <tr className="hover:bg-rose-500/[0.03] transition-colors">
                        <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                          Estimasi Omzet Harian
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                          {formatRp(funnelPhase === 'fase1' ? 105000 : 175000)}
                        </td>
                        <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                          Total penjualan kotor harian
                        </td>
                      </tr>

                      <tr className="hover:bg-rose-500/[0.03] transition-colors bg-neutral-900/30">
                        <td style={{ padding: '16px 24px' }} className="font-extrabold text-white text-sm">
                          Estimasi Laba Bersih
                        </td>
                        <td
                          style={{
                            padding: '16px 20px',
                            textAlign: 'right',
                            color: '#34d399',
                          }}
                          className="font-mono font-black text-base"
                        >
                          {formatRp(funnelPhase === 'fase1' ? 15000 : 35000)}
                        </td>
                        <td style={{ padding: '16px 24px' }} className="text-neutral-300 text-xs font-semibold">
                          Omzet dikurangi modal HPP dan biaya iklan harian
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Ads Manager JSON Payload */}
                <div className="pt-4 border-t border-neutral-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 font-mono">
                      <Code2 className="w-4 h-4 text-rose-500" />
                      CAMPAIGN BLUEPRINT PAYLOAD ({activeFunnel.label.toUpperCase()})
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={copiedKey === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      onClick={() => handleCopy(agent5.campaign_blueprint_payload, 'payload')}
                    >
                      {copiedKey === 'payload' ? 'Tersalin!' : 'Copy JSON Payload'}
                    </Button>
                  </div>
                  <pre className="p-5 bg-black/90 rounded-2xl border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto max-h-64 leading-relaxed shadow-inner">
                    {JSON.stringify(agent5.campaign_blueprint_payload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
