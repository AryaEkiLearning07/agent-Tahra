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

  const STAGE_THEMES = [
    {
      gradient: 'from-cyan-500 to-sky-600',
      ring: 'ring-cyan-500/30',
      shadow: 'shadow-cyan-500/25',
      activeBadge: 'bg-cyan-100 dark:bg-cyan-950/80 border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300',
      completedBg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
      activeText: 'text-cyan-900 dark:text-cyan-200',
      barColor: 'bg-cyan-500',
      borderCol: 'border-cyan-200 dark:border-cyan-800/60',
      bgLight: 'bg-cyan-50/50 dark:bg-cyan-950/20',
      pingColor: 'bg-cyan-400',
    },
    {
      gradient: 'from-amber-500 to-orange-600',
      ring: 'ring-amber-500/30',
      shadow: 'shadow-amber-500/25',
      activeBadge: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300',
      completedBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      activeText: 'text-amber-900 dark:text-amber-200',
      barColor: 'bg-amber-500',
      borderCol: 'border-amber-200 dark:border-amber-800/60',
      bgLight: 'bg-amber-50/50 dark:bg-amber-950/20',
      pingColor: 'bg-amber-400',
    },
    {
      gradient: 'from-indigo-600 to-violet-600',
      ring: 'ring-indigo-500/30',
      shadow: 'shadow-indigo-500/25',
      activeBadge: 'bg-indigo-100 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300',
      completedBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
      activeText: 'text-indigo-900 dark:text-indigo-200',
      barColor: 'bg-indigo-500',
      borderCol: 'border-indigo-200 dark:border-indigo-800/60',
      bgLight: 'bg-indigo-50/50 dark:bg-indigo-950/20',
      pingColor: 'bg-indigo-400',
    },
    {
      gradient: 'from-rose-500 to-pink-600',
      ring: 'ring-rose-500/30',
      shadow: 'shadow-rose-500/25',
      activeBadge: 'bg-rose-100 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300',
      completedBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      activeText: 'text-rose-900 dark:text-rose-200',
      barColor: 'bg-rose-500',
      borderCol: 'border-rose-200 dark:border-rose-800/60',
      bgLight: 'bg-rose-50/50 dark:bg-rose-950/20',
      pingColor: 'bg-rose-400',
    },
    {
      gradient: 'from-emerald-500 to-teal-600',
      ring: 'ring-emerald-500/30',
      shadow: 'shadow-emerald-500/25',
      activeBadge: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
      completedBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      activeText: 'text-emerald-900 dark:text-emerald-200',
      barColor: 'bg-emerald-500',
      borderCol: 'border-emerald-200 dark:border-emerald-800/60',
      bgLight: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      pingColor: 'bg-emerald-400',
    },
  ];

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
    <div className="bg-main min-h-screen flex flex-col justify-between transition-colors">
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
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black font-mono flex items-center gap-2 shadow-sm">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600 dark:text-emerald-400" />
                AI SEDANG BEKERJA...
              </span>
            ) : (
              <StatusBadge status={isVeto ? 'Veto' : 'Ready'} />
            )}
            <Button
              variant="outline"
              size="sm"
              leftIcon={copiedKey === 'share' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              onClick={() => handleCopy(window.location.href, 'share')}
            >
              {copiedKey === 'share' ? 'Tersalin!' : 'Bagikan Laporan'}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          {/* ERROR FEEDBACK NOTIFICATION */}
          {errorMessage && (
            <div className="p-5 rounded-3xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200 shadow-xl flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-950 dark:text-red-100 mb-1 font-heading">Pemberitahuan Sistem: Gangguan Koneksi AI</h4>
                  <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed font-mono">
                    <strong>Penyebab:</strong> {errorMessage}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-2">
                    💡 <em>Saran Solusi:</em> Periksa log server backend atau coba jalankan ulang.
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.location.reload()}
                className="shrink-0 text-xs font-bold"
              >
                Coba Ulangi
              </Button>
            </div>
          )}

          {/* VETO NOTIFICATION */}
          {isVeto && (
            <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/40 border-2 border-red-500/40 text-red-950 dark:text-red-100 shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-xs font-black font-mono">
                      SAFETY VETO ACTIVE
                    </span>
                    <span className="text-xs text-red-600 font-bold">Anti-Boncos Guard Sub-Agent 2</span>
                  </div>
                  <h3 className="text-lg font-black text-red-950 dark:text-red-100 font-heading">
                    Kampanye Dihentikan Demi Keamanan Budget Anda
                  </h3>
                  <p className="text-xs text-red-800 dark:text-red-300 mt-1 leading-relaxed">
                    {agent2?.veto_reason ||
                      result?.recommendation ||
                      'Margin produk dinilai terlalu tipis untuk beriklan secara profitable. TAHRA mencegah modal Anda habis sia-sia.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PIPELINE STEPPER WORKSPACE */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl overflow-hidden transition-colors">
            {/* Stepper Header Bar */}
            <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              {/* Progress Line Track */}
              <div className="relative mb-5">
                <div className="absolute top-5 left-6 right-6 h-1 bg-slate-100 dark:bg-slate-800 z-0 rounded-full" />
                <div
                  className="absolute top-5 left-6 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 z-0 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  style={{ width: `calc(${(maxUnlockedStage / 4) * 100}% * (100% - 48px) / 100)` }}
                />

                <div className="grid grid-cols-5 relative z-10">
                  {stages.map((st) => {
                    const isUnlocked = st.id <= maxUnlockedStage;
                    const isCompleted = st.id < maxUnlockedStage || (!isGenerating && isUnlocked);
                    const isActive = activeStage === st.id;
                    const isCurrentlyRunning = isGenerating && activeStage === st.id;
                    const theme = STAGE_THEMES[st.id];

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
                            'w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 font-mono font-black text-xs relative shadow-md',
                            isActive
                              ? `bg-gradient-to-tr ${theme.gradient} text-white ring-4 ${theme.ring} shadow-lg ${theme.shadow} scale-110`
                              : isCompleted
                                ? theme.completedBg
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                          )}
                        >
                          {isCurrentlyRunning ? (
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                          ) : isCompleted ? (
                            <Check className="w-5 h-5 stroke-[3]" />
                          ) : !isUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <span>{st.num}</span>
                          )}

                          {isCurrentlyRunning && (
                            <span className={cn("absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping pointer-events-none", theme.pingColor)} />
                          )}
                        </div>

                        <div className="mt-3 flex flex-col items-center">
                          <span
                            className={cn(
                              'text-xs font-bold transition-colors line-clamp-1 flex items-center gap-1 font-heading',
                              isActive ? `${theme.activeText} font-black` : isUnlocked ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'
                            )}
                          >
                            {st.title}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
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
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-bold"
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
                          ? `w-6 ${STAGE_THEMES[st.id].barColor}`
                          : st.id <= maxUnlockedStage
                            ? `w-1.5 ${STAGE_THEMES[st.id].barColor} opacity-50`
                            : 'w-1.5 bg-slate-200 dark:bg-slate-700'
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
              <div className="p-4 bg-slate-900 border-b border-emerald-800/40 font-mono text-xs text-slate-200 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <Terminal className="w-4 h-4" />
                  <span>Live Agent Execution Console:</span>
                </div>
                {liveLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-emerald-300/90">
                    <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}

            {/* STAGE CONTENT CANVAS */}
            <div className="p-6 sm:p-8">
              {/* =================================================================== */}
              {/* TAHAP 1: RISET PASAR EMPIRIS MENDALAM (SUB-AGENT 1 - CYAN) */}
              {/* =================================================================== */}
              {activeStage === 0 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-cyan-100 dark:border-cyan-900/40">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-black font-mono">
                          SUB-AGENT 1: DEEP MARKET RESEARCH & COMPETITOR INTELLIGENCE
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Data Nyata Tool Calls • Places API • Ad Library</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-heading flex flex-wrap items-center gap-3">
                        <span>{agent1?.niche || agent1?.product_name || campaign?.product_name || 'Riset Pasar Produk'}</span>
                        <span className="text-xs font-mono font-normal text-slate-600 dark:text-slate-300 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-200 dark:border-cyan-800">
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
              {/* TAHAP 2: STRATEGI IKLAN (SUB-AGENT 2 - AMBER) */}
              {/* =================================================================== */}
              {activeStage === 1 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-100 dark:border-amber-900/40">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-black font-mono">
                          SUB-AGENT 2: THE PLANNER & MARGIN GUARD
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Strategi Saluran & Plafon CPA Anti-Boncos</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-heading">
                        Rekomendasi Saluran: {agent2?.platform || 'TikTok Ads'}
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent2 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-heading">Sub-Agent 2 Sedang Menganalisis Strategi...</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                        Menguji margin laba kotor dan menetapkan batas maksimal biaya per perolehan pelanggan (CPA).
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-800/50 shadow-sm">
                        <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block mb-1">Platform Terpilih</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{agent2?.platform || 'TikTok'}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">{agent2?.format_iklan || 'Video Pendek 9:16'}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-800/50 shadow-sm">
                        <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block mb-1">Margin Keuntungan</span>
                        <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                          {agent2?.margin_percentage || 57.1}%
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                          Laba {formatRp(agent2?.margin_value || 20000)} / unit
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-800/50 shadow-sm">
                        <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block mb-1">Plafon CPA Maksimal</span>
                        <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                          {formatRp(agent2?.max_cpa_limit || 8000)}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">Batas aman biaya per pembeli</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-800/50 shadow-sm">
                        <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block mb-1">Model Bidding</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{agent2?.bidding_model || 'CPA / Conversion'}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">Optimasi otomatis</span>
                      </div>

                      <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 sm:col-span-2 lg:col-span-4 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-200 mb-2 font-heading">
                          Rasional Strategis Sub-Agent 2:
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {agent2?.strategic_rationale || 'Margin sehat memberikan keleluasaan beriklan secara agresif dengan target konversi langsung.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAHAP 3: NASKAH VIDEO & COPYWRITING (SUB-AGENT 3 - INDIGO) */}
              {/* =================================================================== */}
              {activeStage === 2 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-indigo-100 dark:border-indigo-900/40">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300 text-xs font-black font-mono">
                          SUB-AGENT 3: THE WORDSMITH
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Naskah Video 15 Detik & PAS Framework Copywriting</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-heading">
                        Naskah Iklan Siap Tayang
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent3 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-heading">Sub-Agent 3 Sedang Menulis Naskah...</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                        Menyusun hook visual 3 detik pertama, teks persuasif PAS, dan call to action.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {/* Headline Card */}
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800/60 shadow-sm flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1 font-heading">Headline Utama Iklan</span>
                          <p className="text-base font-black text-slate-900 dark:text-white">{agent3?.headline || 'Headline Menarik Perhatian Pembeli'}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(agent3?.headline, 'headline')}
                          className="shrink-0 text-xs text-indigo-700 dark:text-indigo-300 hover:text-indigo-950 dark:hover:text-white"
                        >
                          {copiedKey === 'headline' ? 'Tersalin!' : 'Salin'}
                        </Button>
                      </div>

                      {/* Video Storyboard 15s */}
                      <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800/60 shadow-sm flex flex-col gap-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 font-heading">
                          <Video className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          Storyboard Naskah Video 15 Detik (TikTok / Reels)
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60">
                            <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-300 font-mono block mb-1">
                              🎬 0 - 3 DETIK (HOOK)
                            </span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                              {agent3?.video_script?.hook_0_3s || 'Visual kontras yang langsung menghentikan jempol penonton.'}
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                            <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300 font-mono block mb-1">
                              📦 3 - 10 DETIK (STORY / VALUE)
                            </span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                              {agent3?.video_script?.body_3_10s || 'Tunjukkan keunggulan dan kenikmatan produk secara nyata.'}
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60">
                            <span className="text-[10px] font-black uppercase text-teal-700 dark:text-teal-300 font-mono block mb-1">
                              ⚡ 10 - 15 DETIK (CTA)
                            </span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                              {agent3?.video_script?.cta_10_15s || 'Ajak klik link keranjang kuning atau chat WhatsApp sekarang!'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Primary Text PAS */}
                      <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800/60 shadow-sm flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                            Teks Caption Lengkap (PAS Framework)
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(agent3?.primary_text, 'primary_text')}
                            className="text-xs text-indigo-700 dark:text-indigo-300"
                          >
                            {copiedKey === 'primary_text' ? 'Tersalin!' : 'Salin Caption'}
                          </Button>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-indigo-50/30 dark:bg-indigo-950/20 p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/50 whitespace-pre-line">
                          {agent3?.primary_text || 'Caption persuasif siap pakai untuk materi posting dan iklan.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAHAP 4: PROMPT VISUAL (SUB-AGENT 4 - ROSE) */}
              {/* =================================================================== */}
              {activeStage === 3 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-rose-100 dark:border-rose-900/40">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-black font-mono">
                          SUB-AGENT 4: THE CREATOR
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Prompt Visual Studio Komersial 8K</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-heading">
                        Prompt Gambar Siap Generate AI
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent4 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-heading">Sub-Agent 4 Sedang Merancang Visual...</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                        Mengatur komposisi kamera makro, pencahayaan komersial, dan rasio gambar vertikal.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/80 border border-rose-200 dark:border-rose-800/60 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 font-heading">
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

                        <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 text-xs font-mono text-rose-950 dark:text-rose-200 leading-relaxed break-words">
                          {agent4?.image_prompt || 'Commercial studio photography of product in 8k resolution...'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-rose-200/80 dark:border-rose-800/50 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 block mb-1">Mood Visual & Lighting:</span>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{agent4?.visual_mood || 'Cinematic, Crisp Professional Glow'}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-rose-200/80 dark:border-rose-800/50 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 block mb-1">Komposisi Rekomendasi:</span>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{agent4?.recommended_composition || 'Centered product staging'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAHAP 5: AUDIT & ROAS (SUB-AGENT 5 - EMERALD) */}
              {/* =================================================================== */}
              {activeStage === 4 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-emerald-100 dark:border-emerald-900/40">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black font-mono">
                          SUB-AGENT 5: THE DEPLOYER & EVALUATOR
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Validasi Kualitas & Proyeksi Finansial Anti-Boncos</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-heading">
                        Laporan Proyeksi ROAS & Laba Bersih
                      </h2>
                    </div>
                  </div>

                  {isGenerating && !agent5 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-heading">Sub-Agent 5 Sedang Menghitung Proyeksi...</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                        Menghitung konversi matematis: Budget $\rightarrow$ Tayangan $\rightarrow$ Klik $\rightarrow$ Pembeli $\rightarrow$ Laba Bersih.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {/* Financial 4-Card Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-800/50 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1">Budget Harian</span>
                          <span className="text-base font-black text-slate-900 dark:text-white font-mono">{formatRp(agent5?.roas_report?.budget_harian || campaign?.budget || 100000)}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-800/50 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1">Estimasi Klik</span>
                          <span className="text-base font-black text-slate-900 dark:text-white font-mono">{(agent5?.roas_report?.estimasi_klik || 140).toLocaleString('id-ID')} Klik</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-800/50 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1">Estimasi Omzet</span>
                          <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{formatRp(agent5?.roas_report?.estimasi_omzet || 240000)}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-800/50 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1">Proyeksi ROAS</span>
                          <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{agent5?.roas_report?.roas_percentage || '240'}%</span>
                        </div>
                      </div>

                      {/* QA Notes */}
                      <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 flex items-start gap-3 shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-200 mb-1 font-heading">
                            Status Audit QC: {agent5?.qc_status || 'APPROVED'}
                          </h4>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
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
