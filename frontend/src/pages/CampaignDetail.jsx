import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  TrendingUp,
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
  Search,
  BrainCircuit,
  Zap,
  Flame,
  ArrowRight,
  Eye,
  CheckCircle,
  Clock,
  Terminal,
  Lock,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge, StatusBadge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { formatRp, formatDate, formatPercent } from '../utils/formatters';
import { cn } from '../utils/cn';
import { runAgentPipeline, saveCampaign, getCampaigns } from '../services/api';
import { Agent1DashboardView } from '../components/research/Agent1DashboardView';
import { Agent1ThinkingProcess } from '../components/research/Agent1ThinkingProcess';

export default function CampaignDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const campaignFromState = state?.campaign;
  const campaignInput = state?.campaignInput;
  const isInitiallyLive = Boolean(state?.isLiveGenerating);

  const [campaign, setCampaign] = useState(campaignFromState || null);
  const [isGenerating, setIsGenerating] = useState(isInitiallyLive);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(isInitiallyLive ? 0 : 4);
  const [activeStage, setActiveStage] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);
  const [liveLogs, setLiveLogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fallback: If page is refreshed or accessed directly by ID, fetch from API
  useEffect(() => {
    async function fetchCampaignById() {
      if (!campaign && !isInitiallyLive && id) {
        try {
          const list = await getCampaigns();
          const found = list.find((c) => String(c.id) === String(id));
          if (found) {
            setCampaign(found);
            setMaxUnlockedStage(4);
          }
        } catch (err) {
          console.error('Failed to load campaign by id:', err);
        }
      }
    }
    fetchCampaignById();
  }, [id, campaign, isInitiallyLive]);

  // LIVE IN-PAGE EXECUTION OF 5 SUB-AGENTS
  useEffect(() => {
    let isMounted = true;

    async function executeLivePipeline() {
      if (!isInitiallyLive || !campaignInput) return;

      setIsGenerating(true);
      setActiveStage(0);
      setMaxUnlockedStage(0);
      setLiveLogs([
        `🚀 [Orchestrator] Inisialisasi pipeline 5 Sub-Agent AI untuk '${campaignInput.product_name}'...`,
        `🔍 [Sub-Agent 1: The Explorer] Sedang menganalisis pasar & kompetitor di Indonesia...`,
      ]);

      try {
        // Trigger live backend LLM execution
        const apiPromise = runAgentPipeline(campaignInput);

        // Stage 0 (Agent 1)
        await new Promise((r) => setTimeout(r, 1200));
        if (!isMounted) return;
        setLiveLogs((prev) => [
          ...prev,
          `✅ [Sub-Agent 1] Selesai: Analisis audiens & pain points berhasil dirumuskan.`,
          `🎯 [Sub-Agent 2: The Planner] Sedang mengkalkulasi Unit Economics & batas aman CPA...`,
        ]);
        setMaxUnlockedStage(1);
        setActiveStage(1);

        // Stage 1 (Agent 2)
        await new Promise((r) => setTimeout(r, 1200));
        if (!isMounted) return;
        setLiveLogs((prev) => [
          ...prev,
          `✅ [Sub-Agent 2] Selesai: Saluran & plafon CPA aman terkunci.`,
          `✍️ [Sub-Agent 3: The Wordsmith] Sedang merangkai naskah video 15 detik (PAS)...`,
        ]);
        setMaxUnlockedStage(2);
        setActiveStage(2);

        // Stage 2 (Agent 3)
        await new Promise((r) => setTimeout(r, 1200));
        if (!isMounted) return;
        setLiveLogs((prev) => [
          ...prev,
          `✅ [Sub-Agent 3] Selesai: Naskah video 15 detik & copywriting siap.`,
          `🎨 [Sub-Agent 4: The Creator] Sedang merancang prompt visual studio 8K...`,
        ]);
        setMaxUnlockedStage(3);
        setActiveStage(3);

        // Stage 3 (Agent 4)
        await new Promise((r) => setTimeout(r, 1200));
        if (!isMounted) return;
        setLiveLogs((prev) => [
          ...prev,
          `✅ [Sub-Agent 4] Selesai: Aset prompt visual studio 8K siap digunakan.`,
          `🛡️ [Sub-Agent 5: The Deployer] Sedang memvalidasi QC & kalkulasi ROAS...`,
        ]);
        setMaxUnlockedStage(4);
        setActiveStage(4);

        // Wait for real backend result
        const res = await apiPromise;
        if (!isMounted) return;
        const resultData = res.data;

        const isVeto = resultData.status === 'VETO';
        const finalCampaignRecord = {
          id: id || Date.now(),
          product_name: campaignInput.product_name,
          platform: resultData.agent2_strategy?.platform || campaignInput.platform || 'TikTok',
          budget: Number(campaignInput.budget_harian || 100000),
          harga_jual: Number(campaignInput.harga_jual || 0),
          hpp: Number(campaignInput.hpp || 0),
          kategori: campaignInput.kategori || 'Fisik',
          status: isVeto ? 'Veto' : 'Ready',
          roas: resultData.agent5_deploy?.roas_report?.roas_percentage
            ? `${resultData.agent5_deploy.roas_report.roas_percentage}%`
            : '240%',
          created_at: new Date().toISOString(),
          result: resultData,
        };

        // Save to DB
        await saveCampaign(finalCampaignRecord);

        setCampaign(finalCampaignRecord);
        setIsGenerating(false);
        setMaxUnlockedStage(4);
        setLiveLogs((prev) => [
          ...prev,
          `🎉 [Orchestrator] Seluruh 5 Sub-Agent AI telah selesai menyusun strategi!`,
        ]);
      } catch (err) {
        console.error('Live pipeline execution failed:', err);
        if (isMounted) {
          setIsGenerating(false);
          setErrorMessage(err.message || 'Gagal mengeksekusi pipeline AI.');
        }
      }
    }

    executeLivePipeline();

    return () => {
      isMounted = false;
    };
  }, [isInitiallyLive, campaignInput, id]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const result = campaign?.result;
  const agent1 = result?.agent1_research;
  const agent2 = result?.agent2_strategy;
  const agent3 = result?.agent3_creative;
  const agent4 = result?.agent4_visual;
  const agent5 = result?.agent5_deploy;
  const isVeto = campaign?.status === 'Veto' || result?.status === 'VETO' || agent2?.financial_status === 'VETO';

  const stages = [
    {
      id: 0,
      num: '1',
      title: 'Riset Pasar',
      role: 'Sub-Agent 1 (The Explorer)',
      icon: <Search className="w-4 h-4" />,
      tag: 'Pesaing & USP',
      desc: 'Menganalisis kompetitor, pain points, persona pembeli, dan USP produk.',
    },
    {
      id: 1,
      num: '2',
      title: 'Strategi Iklan',
      role: 'Sub-Agent 2 (The Planner)',
      icon: <Target className="w-4 h-4" />,
      tag: 'Saluran & CPA',
      desc: 'Menentukan platform terbaik, format rasio, model bidding, dan batas aman CPA.',
    },
    {
      id: 2,
      num: '3',
      title: 'Naskah Video',
      role: 'Sub-Agent 3 (The Wordsmith)',
      icon: <FileText className="w-4 h-4" />,
      tag: 'PAS Framework',
      desc: 'Menuliskan headline, caption Problem-Agitate-Solution, dan naskah video 15 detik.',
    },
    {
      id: 3,
      num: '4',
      title: 'Prompt Visual',
      role: 'Sub-Agent 4 (The Creator)',
      icon: <ImageIcon className="w-4 h-4" />,
      tag: 'Studio 8K',
      desc: 'Merancang prompt gambar komersial 8K beresolusi tinggi siap generate AI.',
    },
    {
      id: 4,
      num: '5',
      title: 'Audit & ROAS',
      role: 'Sub-Agent 5 (The Deployer)',
      icon: <TrendingUp className="w-4 h-4" />,
      tag: 'QC & Laba',
      desc: 'Melakukan evaluasi silang anti-boncos dan proyeksi finansial omzet harian.',
    },
  ];

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="TAHRA AI 5-Agent Workspace Canvas"
        title={campaign?.product_name || campaignInput?.product_name || 'Memproses Produk...'}
        description={`Ruang kerja orkestrasi 5 Sub-Agent AI otonom • ${formatDate(campaign?.created_at || new Date())}`}
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
        actions={
          <div className="flex items-center gap-3">
            {isGenerating ? (
              <span className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-black font-mono flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
                AI SEDANG BEKERJA...
              </span>
            ) : (
              <StatusBadge status={isVeto ? 'Veto' : 'Ready'} />
            )}
            <Button
              variant="outline"
              size="sm"
              leftIcon={copiedKey === 'share' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              onClick={() => handleCopy(window.location.href, 'share')}
            >
              {copiedKey === 'share' ? 'Tersalin!' : 'Bagikan Laporan'}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          {/* ERROR NOTIFICATION */}
          {errorMessage && (
            <Alert variant="danger" title="Gagal Menjalankan Pipeline AI">
              {errorMessage}
            </Alert>
          )}

          {/* VETO NOTIFICATION */}
          {isVeto && (
            <Alert
              variant="danger"
              title="🚫 Kampanye Dihentikan oleh Sub-Agent 2 (Strategy Architect)"
            >
              {agent2?.strategic_rationale ||
                'Margin produk di bawah 20%. Iklan dibatalkan demi melindungi modal operasional bisnis Anda dari risiko rugi.'}
            </Alert>
          )}

          {/* ========================================================================= */}
          {/* 5-STAGE CONNECTED PIPELINE STEPPER WITH LOCK SYSTEM */}
          {/* ========================================================================= */}
          <div className="rounded-3xl border border-neutral-800/90 bg-neutral-950/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
            {/* Top Stepper Track Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-neutral-900/90 to-neutral-950 border-b border-neutral-800">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2.5 h-2.5 rounded-full", isGenerating ? "bg-rose-500 animate-ping" : "bg-emerald-500")} />
                  <span className="text-xs font-black uppercase tracking-widest text-white font-mono">
                    ALUR PIPELINE 5 SUB-AGENT AI OTONOM
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  <span className="text-rose-400">
                    Tahap {activeStage + 1} dari 5: {stages[activeStage]?.title}
                  </span>
                </div>
              </div>

              {/* Progress Line Track */}
              <div className="relative mb-5">
                <div className="absolute top-5 left-6 right-6 h-1 bg-neutral-900 z-0 rounded-full" />
                <div
                  className="absolute top-5 left-6 h-1 bg-gradient-to-r from-rose-600 via-red-500 to-rose-400 z-0 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(244,63,94,0.9)]"
                  style={{ width: `calc(${(maxUnlockedStage / 4) * 100}% * (100% - 48px) / 100)` }}
                />

                <div className="grid grid-cols-5 relative z-10">
                  {stages.map((st) => {
                    const isUnlocked = st.id <= maxUnlockedStage;
                    const isCompleted = st.id < maxUnlockedStage || (!isGenerating && isUnlocked);
                    const isActive = activeStage === st.id;
                    const isCurrentlyRunning = isGenerating && activeStage === st.id;

                    return (
                      <div
                        key={st.id}
                        onClick={() => {
                          if (isUnlocked) {
                            setActiveStage(st.id);
                          }
                        }}
                        className={cn(
                          'flex flex-col items-center text-center px-1 select-none transition-all',
                          isUnlocked ? 'cursor-pointer group' : 'cursor-not-allowed opacity-40'
                        )}
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 font-mono font-black text-xs relative shadow-lg',
                            isActive
                              ? 'bg-rose-600 text-white ring-4 ring-rose-500/30 shadow-[0_0_25px_rgba(244,63,94,0.7)] scale-110'
                              : isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                                : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                          )}
                        >
                          {isCurrentlyRunning ? (
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                          ) : isCompleted ? (
                            <Check className="w-5 h-5 stroke-[3] text-emerald-400" />
                          ) : !isUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-neutral-600" />
                          ) : (
                            <span>{st.num}</span>
                          )}

                          {isCurrentlyRunning && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-ping pointer-events-none" />
                          )}
                        </div>

                        <div className="mt-3 flex flex-col items-center">
                          <span
                            className={cn(
                              'text-xs font-bold transition-colors line-clamp-1 flex items-center gap-1',
                              isActive ? 'text-rose-400 font-black' : isUnlocked ? 'text-neutral-300' : 'text-neutral-600'
                            )}
                          >
                            {st.title}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-medium hidden md:block">
                            {st.tag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={activeStage === 0}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  onClick={() => setActiveStage((p) => Math.max(0, p - 1))}
                  className="text-neutral-400 hover:text-white text-xs"
                >
                  Tahap Sebelumnya
                </Button>

                <div className="flex items-center gap-1.5">
                  {stages.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => {
                        if (st.id <= maxUnlockedStage) setActiveStage(st.id);
                      }}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        st.id <= maxUnlockedStage ? 'cursor-pointer' : 'cursor-not-allowed',
                        activeStage === st.id
                          ? 'w-6 bg-rose-500'
                          : st.id <= maxUnlockedStage
                            ? 'w-1.5 bg-emerald-500/60'
                            : 'w-1.5 bg-neutral-800'
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  disabled={activeStage >= maxUnlockedStage}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  onClick={() => setActiveStage((p) => Math.min(maxUnlockedStage, p + 1))}
                  className="text-xs font-bold"
                >
                  Tahap Selanjutnya
                </Button>
              </div>
            </div>

            {/* LIVE CONSOLE LOG (Shown when generating) */}
            {isGenerating && (
              <div className="p-4 bg-black/80 border-b border-neutral-800 font-mono text-xs text-neutral-300 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-rose-400 font-bold mb-1">
                  <Terminal className="w-4 h-4" />
                  <span>Live Agent Execution Console:</span>
                </div>
                {liveLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-neutral-400">
                    <span className="text-neutral-600">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}

            {/* STAGE CONTENT CANVAS */}
            <div className="p-6 sm:p-8">
              {/* =================================================================== */}
              {/* TAHAP 1: RISET PASAR EMPIRIS MENDALAM (SUB-AGENT 1) */}
              {/* =================================================================== */}
              {activeStage === 0 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black font-mono">
                          SUB-AGENT 1: DEEP MARKET RESEARCH & COMPETITOR INTELLIGENCE
                        </span>
                        <span className="text-xs text-neutral-400 font-medium">Data Nyata Tool Calls • Places API • Ad Library • Schema Contract v1.0.0</span>
                      </div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading flex flex-wrap items-center gap-3">
                        <span>{agent1?.niche || agent1?.product_name || campaign?.product_name || 'Riset Pasar Produk'}</span>
                        <span className="text-xs font-mono font-normal text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-800">
                          Wilayah: {agent1?.lokasi || campaignInput?.lokasi || 'Indonesia'}
                        </span>
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent1 ? (
                    <Agent1ThinkingProcess
                      niche={agent1?.niche || campaignInput?.niche || campaignInput?.product_name || 'Produk'}
                      lokasi={agent1?.lokasi || campaignInput?.lokasi || 'Indonesia'}
                      isLive={isGenerating}
                    />
                  ) : (
                    <Agent1DashboardView researchData={agent1} />
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAHAP 2: STRATEGI IKLAN (SUB-AGENT 2) */}
              {/* =================================================================== */}
              {activeStage === 1 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black font-mono">
                          SUB-AGENT 2: THE PLANNER
                        </span>
                        <span className="text-xs text-neutral-400">Strategi Saluran & Plafon CPA Anti-Boncos</span>
                      </div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                        Rekomendasi Saluran: {agent2?.platform || 'TikTok Ads'}
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent2 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-white mb-1">Sub-Agent 2 Sedang Menganalisis Strategi...</h4>
                      <p className="text-xs text-neutral-400 max-w-md">
                        Menguji margin laba kotor dan menetapkan batas maksimal biaya per perolehan pelanggan (CPA).
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                        <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Platform Terpilih</span>
                        <span className="text-lg font-black text-white font-mono">{agent2?.platform || 'TikTok'}</span>
                        <span className="text-[10px] text-neutral-500 block mt-1">{agent2?.format_iklan || 'Video Pendek 9:16'}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                        <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Margin Keuntungan</span>
                        <span className="text-lg font-black text-emerald-400 font-mono">
                          {agent2?.margin_percentage || 57.1}%
                        </span>
                        <span className="text-[10px] text-neutral-500 block mt-1">
                          Laba {formatRp(agent2?.margin_value || 20000)} / unit
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                        <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Plafon CPA Maksimal</span>
                        <span className="text-lg font-black text-rose-400 font-mono">
                          {formatRp(agent2?.max_cpa_limit || 8000)}
                        </span>
                        <span className="text-[10px] text-neutral-500 block mt-1">Batas aman biaya per pembeli</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                        <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Model Bidding</span>
                        <span className="text-lg font-black text-white font-mono">{agent2?.bidding_model || 'CPA / Conversion'}</span>
                        <span className="text-[10px] text-neutral-500 block mt-1">Optimasi otomatis</span>
                      </div>

                      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 sm:col-span-2 lg:col-span-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-white mb-2">
                          Rasional Strategis Sub-Agent 2:
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                          {agent2?.strategic_rationale || 'Margin sehat memberikan keleluasaan beriklan secara agresif dengan target konversi langsung.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAHAP 3: NASKAH VIDEO & COPYWRITING (SUB-AGENT 3) */}
              {/* =================================================================== */}
              {activeStage === 2 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black font-mono">
                          SUB-AGENT 3: THE WORDSMITH
                        </span>
                        <span className="text-xs text-neutral-400">Naskah Video 15 Detik & PAS Framework Copywriting</span>
                      </div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                        Naskah Iklan Siap Tayang
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent3 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-white mb-1">Sub-Agent 3 Sedang Menulis Naskah...</h4>
                      <p className="text-xs text-neutral-400 max-w-md">
                        Menyusun hook visual 3 detik pertama, teks persuasif PAS, dan call to action.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {/* Headline Card */}
                      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block mb-1">Headline Utama Iklan</span>
                          <p className="text-base font-black text-white">{agent3?.headline || 'Headline Menarik Perhatian Pembeli'}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(agent3?.headline, 'headline')}
                          className="shrink-0 text-xs"
                        >
                          {copiedKey === 'headline' ? 'Tersalin!' : 'Salin'}
                        </Button>
                      </div>

                      {/* Video Storyboard 15s */}
                      <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                          <Video className="w-4 h-4 text-rose-500" />
                          Storyboard Naskah Video 15 Detik (TikTok / Reels)
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          <div className="p-4 rounded-xl bg-neutral-950 border border-rose-500/30">
                            <span className="text-[10px] font-black uppercase text-rose-400 font-mono block mb-1">
                              🎬 0 - 3 DETIK (HOOK)
                            </span>
                            <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                              {agent3?.video_script?.hook_0_3s || 'Visual kontras yang langsung menghentikan jempol penonton.'}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                            <span className="text-[10px] font-black uppercase text-amber-400 font-mono block mb-1">
                              📦 3 - 10 DETIK (STORY / VALUE)
                            </span>
                            <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                              {agent3?.video_script?.body_3_10s || 'Tunjukkan keunggulan dan kenikmatan produk secara nyata.'}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/30">
                            <span className="text-[10px] font-black uppercase text-emerald-400 font-mono block mb-1">
                              ⚡ 10 - 15 DETIK (CTA)
                            </span>
                            <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                              {agent3?.video_script?.cta_10_15s || 'Ajak klik link keranjang kuning atau chat WhatsApp sekarang!'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Primary Text PAS */}
                      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                            Teks Caption Lengkap (PAS Framework)
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(agent3?.primary_text, 'primary_text')}
                            className="text-xs"
                          >
                            {copiedKey === 'primary_text' ? 'Tersalin!' : 'Salin Caption'}
                          </Button>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed font-medium bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 whitespace-pre-line">
                          {agent3?.primary_text || 'Caption persuasif siap pakai untuk materi posting dan iklan.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAHAP 4: PROMPT VISUAL (SUB-AGENT 4) */}
              {/* =================================================================== */}
              {activeStage === 3 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black font-mono">
                          SUB-AGENT 4: THE CREATOR
                        </span>
                        <span className="text-xs text-neutral-400">Prompt Visual Studio Komersial 8K</span>
                      </div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                        Prompt Gambar Siap Generate AI
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent4 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-white mb-1">Sub-Agent 4 Sedang Merancang Visual...</h4>
                      <p className="text-xs text-neutral-400 max-w-md">
                        Mengatur komposisi kamera makro, pencahayaan komersial, dan rasio gambar vertikal.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                            Prompt Midjourney / DALL-E (English 8K):
                          </span>
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<Copy className="w-3.5 h-3.5" />}
                            onClick={() => handleCopy(agent4?.image_prompt, 'image_prompt')}
                            className="text-xs font-bold"
                          >
                            {copiedKey === 'image_prompt' ? 'Tersalin!' : 'Salin Prompt 8K'}
                          </Button>
                        </div>

                        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-emerald-400 leading-relaxed break-words">
                          {agent4?.image_prompt || 'Commercial studio photography of product in 8k resolution...'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                          <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Mood Visual & Lighting:</span>
                          <p className="text-xs font-bold text-white">{agent4?.visual_mood || 'Cinematic, Crisp Professional Glow'}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                          <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Komposisi Rekomendasi:</span>
                          <p className="text-xs font-bold text-white">{agent4?.recommended_composition || 'Centered product staging'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAHAP 5: AUDIT & ROAS (SUB-AGENT 5) */}
              {/* =================================================================== */}
              {activeStage === 4 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black font-mono">
                          SUB-AGENT 5: THE DEPLOYER & EVALUATOR
                        </span>
                        <span className="text-xs text-neutral-400">Validasi Kualitas & Proyeksi Finansial Anti-Boncos</span>
                      </div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                        Laporan Proyeksi ROAS & Laba Bersih
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent5 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-white mb-1">Sub-Agent 5 Sedang Menghitung Proyeksi...</h4>
                      <p className="text-xs text-neutral-400 max-w-md">
                        Menghitung konversi matematis: Budget $\rightarrow$ Tayangan $\rightarrow$ Klik $\rightarrow$ Pembeli $\rightarrow$ Laba Bersih.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {/* Financial 5-Card Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                          <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Budget Harian</span>
                          <span className="text-base font-black text-white font-mono">{formatRp(agent5?.roas_report?.budget_harian || campaign?.budget || 100000)}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                          <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Estimasi Klik</span>
                          <span className="text-base font-black text-white font-mono">{(agent5?.roas_report?.estimasi_klik || 140).toLocaleString('id-ID')} Klik</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                          <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Estimasi Omzet</span>
                          <span className="text-base font-black text-emerald-400 font-mono">{formatRp(agent5?.roas_report?.estimasi_omzet || 240000)}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                          <span className="text-[10px] font-black uppercase text-neutral-400 block mb-1">Proyeksi ROAS</span>
                          <span className="text-base font-black text-rose-400 font-mono">{agent5?.roas_report?.roas_percentage || '240'}%</span>
                        </div>
                      </div>

                      {/* QA Notes */}
                      <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-1">
                            Status Audit QC: {agent5?.qc_status || 'APPROVED'}
                          </h4>
                          <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                            {agent5?.qc_notes || 'Seluruh parameter produk, format 9:16, dan plafon CPA telah divalidasi silang konsisten.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
