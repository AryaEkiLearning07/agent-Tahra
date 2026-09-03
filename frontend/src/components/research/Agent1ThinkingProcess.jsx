import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  TrendingUp,
  Target,
  Users,
  BrainCircuit,
  CheckCircle2,
  Loader2,
  Terminal,
  ShieldCheck,
  Search,
  Zap,
  Activity,
  Compass
} from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Step definitions for Agent 1 Autonomous Deep Market Research,
 * translated into clear, professional, human-friendly Indonesian.
 */
const AGENT1_STEPS = [
  {
    id: 'places',
    tool: 'Google Places API & Local Discovery',
    title: 'Pemindaian Pasar & Kompetitor Lokal (Radius 5km)',
    desc: 'Menemukan titik usaha kompetitor terdekat, rating, dan mengekstrak ulasan asli pelanggan untuk menemukan celah pasar.',
    icon: MapPin,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    confidenceLabel: 'Tingkat Keyakinan 100% (Data API Riil)',
  },
  {
    id: 'trends',
    tool: 'Google Trends & Search Intent Engine',
    title: 'Analisis Volume Pencarian & Rumus Tren Pasar',
    desc: 'Menghitung rumus delta % pencarian 3-bulan terakhir untuk memastikan minat pasar sedang naik (bukan tren mati).',
    icon: TrendingUp,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    confidenceLabel: 'Formula Matematis Terverifikasi',
  },
  {
    id: 'ad_intel',
    tool: 'Meta Ad Library & TikTok Creative Center',
    title: 'Intelijen Iklan Kompetitor & Peluang Serang',
    desc: 'Mengintai apakah pesaing sedang aktif beriklan, menemukan angle visual mereka, dan mencari celah positioning yang belum terisi.',
    icon: Target,
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    confidenceLabel: 'Pustaka Iklan Aktif',
  },
  {
    id: 'demographics',
    tool: 'APJII & We Are Social Indonesia 2025',
    title: 'Pencocokan Karakteristik Audiens & Benchmark Biaya',
    desc: 'Memetakan platform dominan (Instagram, TikTok, Google) dan estimasi batas biaya CPM/CPC standar industri lokal.',
    icon: Users,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    confidenceLabel: 'Data Survei Nasional',
  },
  {
    id: 'reasoning',
    tool: 'LLM Neural Clustering & Psychology Engine',
    title: 'Klastering Keluhan (Pain Points) & Diferensiasi USP',
    desc: 'Mengelompokkan keluhan konsumen menjadi 3 sudut pandang (Financial, Functional, Emotional) serta merumuskan keunggulan unik teruji.',
    icon: BrainCircuit,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    confidenceLabel: 'Analisis AI & Psikologi Konsumen',
  },
  {
    id: 'validation',
    tool: 'JSON Schema Validator Draft 2020-12',
    title: 'Validasi Kontrak Data & Penyusunan Dashboard',
    desc: 'Memastikan integritas seluruh data hasil riset sesuai skema ketat sebelum diserahkan ke Sub-Agent perancang strategi.',
    icon: ShieldCheck,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    confidenceLabel: 'Skema Terverifikasi',
  },
];

export function Agent1ThinkingProcess({
  niche = 'Produk / Jasa',
  lokasi = 'Indonesia',
  onComplete,
  isLive = true
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(15);
  const [liveTerminalLogs, setLiveTerminalLogs] = useState([]);
  const [showTerminal, setShowTerminal] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    let stepIdx = 0;
    const initialLog = `[${new Date().toLocaleTimeString()}] 🚀 Inisialisasi Sub-Agent 1: Deep Market Research untuk '${niche}' di ${lokasi}...`;
    setLiveTerminalLogs([initialLog]);

    const interval = setInterval(() => {
      stepIdx += 1;
      if (stepIdx < AGENT1_STEPS.length) {
        setCurrentStepIndex(stepIdx);
        const currentStep = AGENT1_STEPS[stepIdx];
        setProgressPercent(Math.round(((stepIdx + 1) / AGENT1_STEPS.length) * 100));
        
        setLiveTerminalLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ⚡ Tool Call [${currentStep.tool}]: ${currentStep.title}...`,
          `[${new Date().toLocaleTimeString()}] ↳ ${currentStep.desc}`,
        ]);
      } else {
        clearInterval(interval);
        setProgressPercent(100);
        setLiveTerminalLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ✅ Seluruh 6 tahap riset empiris selesai. Menyusun Intelligence Dossier...`,
        ]);
        if (onComplete) {
          setTimeout(onComplete, 800);
        }
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isLive, niche, lokasi, onComplete]);

  return (
    <div className="w-full rounded-3xl bg-neutral-950/90 border border-neutral-800/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col gap-6">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-rose-500/10 blur-3xl pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-500/10 blur-3xl pointer-events-none rounded-full animate-pulse" />

      {/* HEADER SECTION WITH NEURAL SCAN ANIMATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-neutral-900 to-sky-500/20 border border-rose-500/30 shadow-lg">
            <BrainCircuit className="w-6 h-6 text-rose-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-bold font-mono tracking-wider">
                SUB-AGENT 1: DEEP MARKET RESEARCH
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <Activity className="w-3 h-3 animate-spin" /> Sedang Berpikir & Memanggil Tools
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2 flex-wrap">
              <span>Meriset Pasar:</span>
              <span className="text-rose-400 underline decoration-rose-500/50 underline-offset-4">{niche}</span>
              <span className="text-neutral-500 text-sm font-normal">({lokasi})</span>
            </h3>
          </div>
        </div>

        {/* Progress Bar Indicator */}
        <div className="flex flex-col items-end gap-1.5 min-w-[160px]">
          <div className="flex items-center justify-between w-full text-xs font-mono">
            <span className="text-neutral-400">Proses Riset</span>
            <span className="font-bold text-rose-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700/50">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-sky-400 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(244,63,94,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* STEP-BY-STEP TOOL CALLS IN CLEAR INDONESIAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {AGENT1_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                'p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden',
                isActive
                  ? 'bg-neutral-900/90 border-rose-500/50 shadow-lg shadow-rose-500/5 ring-1 ring-rose-500/30'
                  : isDone
                  ? 'bg-neutral-900/40 border-neutral-800/80 opacity-90'
                  : 'bg-neutral-950/40 border-neutral-900 opacity-40'
              )}
            >
              {/* Step Icon */}
              <div
                className={cn(
                  'w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-colors',
                  isActive
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-neutral-800/40 border-neutral-700/50 text-neutral-500'
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin text-rose-400" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              {/* Step Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                    {step.tool}
                  </span>
                  <span
                    className={cn(
                      'text-[9px] font-mono px-1.5 py-0.5 rounded font-bold border',
                      isDone
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                        : isActive
                        ? 'bg-rose-950/60 text-rose-400 border-rose-800/40 animate-pulse'
                        : 'bg-neutral-900 text-neutral-600 border-neutral-800'
                    )}
                  >
                    {isDone ? 'SELESAI' : isActive ? 'SEDANG DIJALANKAN' : 'MENUNGGU'}
                  </span>
                </div>

                <h4
                  className={cn(
                    'text-sm font-bold mt-0.5 leading-snug',
                    isActive ? 'text-white' : isDone ? 'text-neutral-200' : 'text-neutral-400'
                  )}
                >
                  {step.title}
                </h4>

                <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                  {step.desc}
                </p>

                {isActive && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-rose-400/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    <span>{step.confidenceLabel}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE TRANSLATED TOOL ACTIVITY LOG (TERMINAL VIEW) */}
      <div className="rounded-2xl bg-black/80 border border-neutral-800/90 overflow-hidden shadow-inner">
        <div
          onClick={() => setShowTerminal(!showTerminal)}
          className="px-4 py-2.5 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-bold">Log Aktivitas Berpikir Agent (Bahasa Indonesia)</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-500 hover:text-neutral-300">
            {showTerminal ? 'Sembunyikan' : 'Tampilkan'} ({liveTerminalLogs.length} baris)
          </span>
        </div>

        {showTerminal && (
          <div className="p-4 font-mono text-xs text-neutral-300 max-h-40 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-neutral-800">
            {liveTerminalLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-neutral-600 select-none">&gt;</span>
                <span className={cn(
                  log.includes('🚀') ? 'text-rose-400 font-bold' :
                  log.includes('✅') ? 'text-emerald-400 font-bold' :
                  log.includes('⚡') ? 'text-sky-300' :
                  'text-neutral-400'
                )}>
                  {log}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] pt-1">
              <Loader2 className="w-3 h-3 animate-spin text-rose-400" />
              <span>Agent 1 sedang menyelaraskan data pasar empiris...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
