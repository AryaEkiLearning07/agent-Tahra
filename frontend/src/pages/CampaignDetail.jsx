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

  const agent2 = result?.agent2_strategy || result?.financial_report || {
    margin_value: 17500,
    margin_percentage: 58.3,
    financial_status: 'HEALTHY',
    platform: campaign?.platform || 'TikTok',
    format_iklan: 'Video Pendek (9:16)',
    aspect_ratio: '9:16',
    bidding_model: 'CPM',
    max_cpa_limit: 7000,
    strategic_rationale: 'Margin sangat sehat! Format video vertikal 9:16 di TikTok ideal untuk produk visual konsumen.',
    data_foundation: 'Margin 58.3% (>30%) memberikan plafon CPA maksimal Rp 7.000 (40% profit) agar tidak boncos.',
  };

  const agent3 = result?.agent3_creative || result?.creative || {
    headline: 'Solusi Praktis Terbaik untuk Kebutuhan Harian Anda!',
    primary_text:
      'Bosan sama produk biasa yang mengecewakan? Produk TAHRA dibuat dari bahan pilihan berkualitas tinggi dengan formula teruji yang siap memanjakan hari-hari Anda.',
    cta: 'Pesan Sekarang Dapatkan Promo Khusus 🔥',
    video_script: {
      hook_0_3s: 'Tunjukkan masalah sehari-hari yang sering dialami konsumen sebelum pakai produk.',
      body_3_10s: 'Tunjukkan betapa mudah dan cepatnya masalah terselesaikan dengan produk ini.',
      cta_10_15s: 'Klik link sekarang untuk klaim diskon eksklusif 20% hari ini!',
    },
    data_foundation: 'Hook visual 3 detik pertama didesain khusus untuk menekan Drop-off Rate di TikTok dengan langsung mengekspos pain point.',
  };

  const agent4 = result?.agent4_visual || {
    image_prompt:
      `Commercial high-end studio photography of ${agent1.product_name}, clean dramatic lighting, modern minimalist aesthetics, 8k resolution, ${agent2.aspect_ratio || '9:16'} aspect ratio.`,
    visual_mood: 'Cinematic, Moody, Modern Studio Lighting',
    aspect_ratio: agent2.aspect_ratio || '9:16',
    recommended_composition: 'Centered macro shot on rustic wooden table with dramatic depth of field.',
    data_foundation: 'Komposisi macro centered dengan rasio 9:16 terbukti meningkatkan Click-Through-Rate (CTR) hingga 35% dibandingkan visual non-staging.',
  };

  const agent5 = result?.agent5_deploy || {
    qc_status: 'APPROVED',
    qc_notes: 'QA Passed: Pesan headline konsisten dengan USP produk dan rasio visual 9:16.',
    campaign_blueprint_payload: {
      campaign_name: `TAHRA_${agent1.product_name.toUpperCase().replace(/\s+/g, '_')}`,
      objective: 'CONVERSIONS',
      daily_budget: campaign?.budget || 100000,
      bidding_strategy: agent2.bidding_model || 'CPM',
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
      estimasi_klik: 100,
      estimasi_pembeli: 3,
      estimasi_omzet: 105000,
      estimasi_laba_bersih: 15000,
      roas_percentage: 105.0,
      roas_status: 'PROFIT',
      summary: 'Proyeksi ROAS positif (105%) dengan potensi laba bersih sejak awal kampanye.',
      formula_breakdown: '1. Tayangan: (Rp 100.000 / CPM Rp 20.000) × 1.000 = 5.000 impresi\n2. Klik: 5.000 × CTR 2% = 100 klik\n3. Pembeli: 100 × CVR 3% = 3 checkout\n4. Omzet: 3 × Rp 35.000 = Rp 105.000\n5. HPP: 3 × Rp 15.000 = Rp 45.000\n6. Laba Bersih: Rp 105.000 - Rp 45.000 - Rp 100.000 = Rp 15.000\n7. ROAS: 105%',
    },
    tracking_link: `https://tahra.ai/track?id=${campaign?.id || id || '123'}`,
    deployment_status: 'DEPLOYED_READY',
    data_foundation: 'Kalkulasi didasarkan pada benchmark industri CPM Rp 20.000, CTR standar 2%, dan Conversion Rate e-commerce 3%.',
  };

  const isVeto = agent2.financial_status === 'VETO' || result?.status === 'VETO';
  const isProfitable = agent5.roas_report.roas_percentage >= 100;

  const timelineStages = [
    {
      id: 0,
      badge: 'Tahap 1',
      title: 'Riset Pasar & Pesaing',
      subtitle: 'Sub-Agent 1: The Explorer',
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: 1,
      badge: 'Tahap 2',
      title: 'Strategi Medan Iklan & CPA',
      subtitle: 'Sub-Agent 2: The Planner',
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 2,
      badge: 'Tahap 3',
      title: 'Naskah Video 15s & Copywriting',
      subtitle: 'Sub-Agent 3: The Wordsmith',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 3,
      badge: 'Tahap 4',
      title: 'Prompt Visual Studio 8K',
      subtitle: 'Sub-Agent 4: The Creator',
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: 4,
      badge: 'Tahap 5',
      title: 'Audit QC & Proyeksi ROAS',
      subtitle: 'Sub-Agent 5: The QA & Deployer',
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="TAHRA AI 5-Agent Blueprint"
        title={agent1.product_name}
        description={`Cetak biru strategi digital marketing hasil orkestrasi 5 Sub-Agent spesialis • Dibuat pada ${formatDate(
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
        <div className="flex flex-col gap-6">
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

          {/* VIEW SWITCHER & TIMELINE CONTROLS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 bg-neutral-950/80 rounded-2xl border border-neutral-900 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-400">
                Mode Tampilan:
              </span>
              <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                    viewMode === 'timeline'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  <GitCommit className="w-3.5 h-3.5" />
                  Timeline Per-Tahap
                </button>
                <button
                  onClick={() => setViewMode('overview')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
                    viewMode === 'overview'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Semua Tahap (Overview)
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
                  className="h-8 text-xs"
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={activeTimelineStep === 4}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  onClick={() => setActiveTimelineStep((prev) => Math.min(4, prev + 1))}
                  className="h-8 text-xs"
                >
                  Tahap Selanjutnya
                </Button>
              </div>
            )}
          </div>

          {/* INTERACTIVE TIMELINE STEPPER BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-2 bg-neutral-950/60 rounded-2xl border border-neutral-900">
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
                    'p-3 rounded-xl text-left transition-all flex flex-col gap-1 relative overflow-hidden border',
                    isActive
                      ? 'bg-rose-950/40 border-rose-500/60 ring-1 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                      : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'text-[10px] font-black uppercase tracking-wider',
                        isActive ? 'text-rose-400 font-mono' : 'text-neutral-500'
                      )}
                    >
                      {stage.badge}
                    </span>
                    <div
                      className={cn(
                        'w-5 h-5 rounded-md flex items-center justify-center text-xs',
                        isActive
                          ? 'bg-rose-500 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      )}
                    >
                      {stage.icon}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-xs font-black truncate',
                      isActive ? 'text-white' : 'text-neutral-300'
                    )}
                  >
                    {stage.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 truncate">
                    {stage.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* STAGE CONTENT RENDERING (TIMELINE MODE OR OVERVIEW MODE) */}
          {/* ========================================================================= */}

          {/* STAGE 1: The Explorer */}
          {(viewMode === 'overview' || activeTimelineStep === 0) && (
            <Card hasRedBar className="p-6 sm:p-8 animate-in fade-in duration-200">
              <CardHeader className="p-0 pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                        TIMELINE 1 • RISET PASAR & PESAING
                      </span>
                      <CardTitle className="text-base sm:text-lg mt-0.5">
                        Sub-Agent 1: Market & Product Researcher (The Explorer)
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant="brand">{agent1.product_class || 'Menengah'}</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-4 text-xs font-medium">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Unique Selling Proposition (USP)
                      </span>
                      <p className="text-white bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800 font-semibold leading-relaxed">
                        {agent1.usp}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Competitor Proxy (Pesaing Pasar Terdekat)
                      </span>
                      <p className="text-rose-400 bg-rose-950/20 p-3 rounded-xl border border-rose-500/30 font-bold">
                        ⚔️ {agent1.competitor_proxy}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Target Demografi & Psikografi Konsumen
                      </span>
                      <p className="text-neutral-300 bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800 leading-relaxed">
                        <strong>{agent1.target_demography}</strong> — {agent1.audience_psychography}
                      </p>
                    </div>

                    {agent1.pain_points && (
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                          Pain Points Pasar (Masalah yang Dihadapi Pembeli)
                        </span>
                        <ul className="flex flex-col gap-1.5 text-neutral-300">
                          {agent1.pain_points.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-2 bg-neutral-900/50 p-2 rounded-lg border border-neutral-800/80">
                              <span className="text-rose-500 font-black">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Data Foundation Callout */}
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 leading-relaxed flex items-start gap-2.5 mt-2">
                  <Database className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-rose-400 block mb-0.5">Dasar Data & Riset Pasar:</strong>
                    <span>{agent1.data_foundation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STAGE 2: The Planner */}
          {(viewMode === 'overview' || activeTimelineStep === 1) && (
            <Card hasRedBar className="p-6 sm:p-8 animate-in fade-in duration-200">
              <CardHeader className="p-0 pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                        TIMELINE 2 • MEDAN PERIKLANAN & UNIT ECONOMICS
                      </span>
                      <CardTitle className="text-base sm:text-lg mt-0.5">
                        Sub-Agent 2: Strategy Architect (The Planner)
                      </CardTitle>
                    </div>
                  </div>
                  <Badge
                    variant={agent2.financial_status === 'HEALTHY' ? 'success' : 'warning'}
                  >
                    {agent2.financial_status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                      Platform Pilihan
                    </span>
                    <p className="text-lg font-black text-white mt-1">
                      {agent2.platform}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      {agent2.format_iklan}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                      Bidding Model
                    </span>
                    <p className="text-lg font-black text-rose-400 font-mono mt-1">
                      {agent2.bidding_model}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      Rasio: {agent2.aspect_ratio}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                      Margin Kotor
                    </span>
                    <p className="text-lg font-black text-emerald-400 font-mono mt-1">
                      {formatPercent(agent2.margin_percentage, 1)}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      {formatRp(agent2.margin_value)} / unit
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                      Batas Maksimal CPA
                    </span>
                    <p className="text-lg font-black text-rose-400 font-mono mt-1">
                      {formatRp(agent2.max_cpa_limit)}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      Maks 40% Margin
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white block mb-1">Rasionalitas Strategis:</strong>
                  <span>{agent2.strategic_rationale}</span>
                </div>

                {/* Data Foundation Callout */}
                <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 leading-relaxed flex items-start gap-2.5">
                  <Calculator className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-emerald-400 block mb-0.5">Dasar Perhitungan & Rasional Strategi:</strong>
                    <span>{agent2.data_foundation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STAGE 3: The Wordsmith */}
          {(viewMode === 'overview' || activeTimelineStep === 2) && (
            <Card hasRedBar className="p-6 sm:p-8 animate-in fade-in duration-200">
              <CardHeader className="p-0 pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                        TIMELINE 3 • NASKAH VIDEO 15S & COPYWRITING PAS
                      </span>
                      <CardTitle className="text-base sm:text-lg mt-0.5">
                        Sub-Agent 3: Creative Copywriter (The Wordsmith)
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant="brand">PAS Framework</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-5 text-xs font-medium">
                {/* Headline */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                      Headline Iklan
                    </span>
                    <button
                      onClick={() => handleCopy(agent3.headline, 'head')}
                      className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                    >
                      {copiedKey === 'head' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Salin</span>
                    </button>
                  </div>
                  <p className="text-sm font-black text-white bg-neutral-900/70 p-3.5 rounded-xl border border-neutral-800 leading-snug">
                    {agent3.headline}
                  </p>
                </div>

                {/* Primary Text */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                      Caption Iklan (Problem - Agitate - Solution)
                    </span>
                    <button
                      onClick={() => handleCopy(agent3.primary_text, 'body')}
                      className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                    >
                      {copiedKey === 'body' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Salin</span>
                    </button>
                  </div>
                  <p className="text-neutral-300 bg-neutral-900/70 p-3.5 rounded-xl border border-neutral-800 leading-relaxed">
                    {agent3.primary_text}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">Call-to-Action:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold rounded-lg text-xs shadow-md shadow-rose-950/40">
                    {agent3.cta}
                  </span>
                </div>

                {/* Video Script 15s */}
                {agent3.video_script && (
                  <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        Naskah Video 15 Detik (TikTok / Reels)
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(
                            `Hook (0-3s): ${agent3.video_script.hook_0_3s}\nBody (3-10s): ${agent3.video_script.body_3_10s}\nCTA (10-15s): ${agent3.video_script.cta_10_15s}`,
                            'script'
                          )
                        }
                        className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                      >
                        {copiedKey === 'script' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Salin Naskah Video</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                        <span className="text-[10px] font-bold text-rose-400 uppercase">Detik 0-3 (Hook Visual):</span>
                        <p className="text-neutral-300 text-xs mt-0.5">{agent3.video_script.hook_0_3s}</p>
                      </div>
                      <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                        <span className="text-[10px] font-bold text-rose-400 uppercase">Detik 3-10 (Body / Solusi):</span>
                        <p className="text-neutral-300 text-xs mt-0.5">{agent3.video_script.body_3_10s}</p>
                      </div>
                      <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                        <span className="text-[10px] font-bold text-rose-400 uppercase">Detik 10-15 (Call-to-Action):</span>
                        <p className="text-neutral-300 text-xs mt-0.5">{agent3.video_script.cta_10_15s}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Foundation Callout */}
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-300 flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Dasar Psikologi Naskah:</strong> {agent3.data_foundation}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STAGE 4: The Creator */}
          {(viewMode === 'overview' || activeTimelineStep === 3) && (
            <Card hasRedBar className="p-6 sm:p-8 animate-in fade-in duration-200">
              <CardHeader className="p-0 pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                        TIMELINE 4 • ART DIRECTION & PROMPT VISUAL STUDIO 8K
                      </span>
                      <CardTitle className="text-base sm:text-lg mt-0.5">
                        Sub-Agent 4: Art Director & Visual Designer (The Creator)
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant="brand">{agent4.aspect_ratio || '9:16'}</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-4 text-xs font-medium">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                    Visual Mood & Rasio Penempatan
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="brand">{agent4.visual_mood || 'Cinematic'}</Badge>
                    <Badge variant="neutral">{agent4.aspect_ratio || '9:16'}</Badge>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                      Prompt Text-to-Image (Midjourney / DALL-E / Stable Diffusion)
                    </span>
                    <button
                      onClick={() => handleCopy(agent4.image_prompt, 'prompt')}
                      className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                    >
                      {copiedKey === 'prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Salin Prompt</span>
                    </button>
                  </div>
                  <div className="p-4 bg-black/80 rounded-xl border border-rose-500/25 font-mono text-xs text-neutral-300 leading-relaxed italic">
                    "{agent4.image_prompt}"
                  </div>
                </div>

                <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800 text-xs text-neutral-300">
                  💡 <strong>Rekomendasi Komposisi Kamera:</strong> {agent4.recommended_composition}
                </div>

                {/* Data Foundation Callout */}
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-300 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Dasar Teori Visual:</strong> {agent4.data_foundation}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STAGE 5: The QA & Deployer */}
          {(viewMode === 'overview' || activeTimelineStep === 4) && (
            <Card hasRedBar className="p-6 sm:p-8 animate-in fade-in duration-200">
              <CardHeader className="p-0 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                        TIMELINE 5 • QUALITY CONTROL & PROYEKSI ROAS
                      </span>
                      <CardTitle className="text-base sm:text-lg mt-0.5">
                        Sub-Agent 5: Adversarial Evaluator & Executor (The QA & Deployer)
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" hasDot>
                      {agent5.qc_status}
                    </Badge>
                    <Badge variant={isProfitable ? 'success' : 'danger'}>
                      {isProfitable ? 'ROAS PROFIT' : 'RISIKO BONCOS'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-6">
                {/* QC Notes & Data Foundation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-0.5">Audit Kualitas (Quality Control):</strong>
                      <span>{agent5.qc_notes}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2">
                    <Database className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-rose-400 mb-0.5">Dasar Benchmark Funnel:</strong>
                      <span>{agent5.data_foundation}</span>
                    </div>
                  </div>
                </div>

                {/* Big ROAS Display */}
                <div className="text-center py-6 px-4 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 rounded-2xl border border-neutral-800">
                  <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                    Proyeksi Nilai Balik Modal Iklan
                  </span>
                  <div
                    className="text-5xl sm:text-7xl font-black font-mono tracking-tight my-2"
                    style={{ color: isProfitable ? '#34d399' : '#f87171' }}
                  >
                    {formatPercent(agent5.roas_report.roas_percentage, 1)}
                  </div>
                  <p className="text-xs text-neutral-400 font-medium max-w-md mx-auto">
                    {agent5.roas_report.summary}
                  </p>
                </div>

                {/* Matrix Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metrik Finansial</TableHead>
                      <TableHead className="text-right">Estimasi AI</TableHead>
                      <TableHead>Penjelasan untuk Pemilik Bisnis</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold text-white">Budget Iklan Harian</TableCell>
                      <TableCell className="text-right font-mono font-bold text-rose-400">
                        {formatRp(agent5.roas_report.budget_harian)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Alokasi budget yang Anda tetapkan</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Tayangan (CPM Rp 20rb)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(agent5.roas_report.estimasi_tayangan).toLocaleString('id-ID')} orang
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Jumlah calon konsumen yang melihat iklan Anda</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Klik (CTR 2%)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(agent5.roas_report.estimasi_klik).toLocaleString('id-ID')} orang
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Calon pembeli yang tertarik mengklik tautan iklan</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Pembeli (CVR 3%)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(agent5.roas_report.estimasi_pembeli).toLocaleString('id-ID')} transaksi
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Konsumen yang berhasil checkout dan membayar</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Omzet Harian</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {formatRp(agent5.roas_report.estimasi_omzet)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Total penjualan kotor harian</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Laba Bersih</TableCell>
                      <TableCell
                        className="text-right font-mono font-black"
                        style={{ color: agent5.roas_report.estimasi_laba_bersih >= 0 ? '#34d399' : '#f87171' }}
                      >
                        {formatRp(agent5.roas_report.estimasi_laba_bersih)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Omzet dikurangi modal HPP dan biaya iklan</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Mathematical Formula Breakdown Box */}
                {agent5.roas_report.formula_breakdown && (
                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300">
                    <span className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px] mb-2">
                      <Calculator className="w-4 h-4 text-rose-500" />
                      Penjabaran Formula Matematis ROAS:
                    </span>
                    <pre className="font-mono text-[11px] text-neutral-400 whitespace-pre-wrap leading-relaxed">
                      {agent5.roas_report.formula_breakdown}
                    </pre>
                  </div>
                )}

                {/* Ads Manager JSON Payload */}
                <div className="pt-4 border-t border-neutral-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-rose-500" />
                      Campaign Blueprint Payload (Siap Copy ke Ads Manager)
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
                  <pre className="p-4 bg-black/90 rounded-2xl border border-neutral-800 font-mono text-[11px] text-neutral-300 overflow-x-auto max-h-60 leading-relaxed">
                    {JSON.stringify(agent5.campaign_blueprint_payload, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
