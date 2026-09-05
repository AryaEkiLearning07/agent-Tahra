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
    color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
    confidenceLabel: 'Tingkat Keyakinan 100% (Data API Riil)',
  },
  {
    id: 'trends',
    tool: 'Google Trends & Search Intent Engine',
    title: 'Analisis Volume Pencarian & Rumus Tren Pasar',
    desc: 'Menghitung rumus delta % pencarian 3-bulan terakhir untuk memastikan minat pasar sedang naik (bukan tren mati).',
    icon: TrendingUp,
    color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
    confidenceLabel: 'Formula Matematis Terverifikasi',
  },
  {
    id: 'ad_intel',
    tool: 'Meta Ad Library & TikTok Creative Center',
    title: 'Intelijen Iklan Kompetitor & Peluang Serang',
    desc: 'Mengintai apakah pesaing sedang aktif beriklan, menemukan angle visual mereka, dan mencari celah positioning yang belum terisi.',
    icon: Target,
    color: 'text-teal-700 bg-teal-100 border-teal-300',
    confidenceLabel: 'Pustaka Iklan Aktif',
  },
  {
    id: 'demographics',
    tool: 'APJII & We Are Social Indonesia 2025',
    title: 'Pencocokan Karakteristik Audiens & Benchmark Biaya',
    desc: 'Memetakan platform dominan (Instagram, TikTok, Google) dan estimasi batas biaya CPM/CPC standar industri lokal.',
    icon: Users,
    color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
    confidenceLabel: 'Data Survei Nasional',
  },
  {
    id: 'reasoning',
    tool: 'LLM Neural Clustering & Psychology Engine',
    title: 'Klastering Keluhan (Pain Points) & Diferensiasi USP',
    desc: 'Mengelompokkan keluhan konsumen menjadi 3 sudut pandang (Financial, Functional, Emotional) serta merumuskan keunggulan unik teruji.',
    icon: BrainCircuit,
    color: 'text-amber-700 bg-amber-100 border-amber-300',
    confidenceLabel: 'Analisis AI & Psikologi Konsumen',
  },
  {
    id: 'validation',
    tool: 'JSON Schema Validator Draft 2020-12',
    title: 'Validasi Kontrak Data & Penyusunan Dashboard',
    desc: 'Memastikan integritas seluruh data hasil riset sesuai skema ketat sebelum diserahkan ke Sub-Agent perancang strategi.',
    icon: ShieldCheck,
    color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
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
    <div className="w-full rounded-3xl bg-white/95 border border-emerald-400/30 p-6 sm:p-8 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl relative overflow-hidden flex flex-col gap-6">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-200/25 blur-3xl pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-200/25 blur-3xl pointer-events-none rounded-full animate-pulse" />

      {/* HEADER SECTION WITH NEURAL SCAN ANIMATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-100">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-lg shadow-emerald-700/30">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold font-mono tracking-wider">
                SUB-AGENT 1: DEEP MARKET RESEARCH
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Sedang Mengeksekusi Tools
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950 mt-1 flex items-center gap-2 flex-wrap font-heading">
              <span>Meriset Pasar:</span>
              <span className="text-emerald-700 underline decoration-emerald-500/50 underline-offset-4">{niche}</span>
              <span className="text-slate-500 text-sm font-normal">({lokasi})</span>
            </h3>
          </div>
        </div>

        {/* Progress Bar Indicator */}
        <div className="flex flex-col items-end gap-1.5 min-w-[160px]">
          <div className="flex items-center justify-between w-full text-xs font-mono">
            <span className="text-slate-500">Proses Riset</span>
            <span className="font-bold text-emerald-700">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-emerald-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"
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
                'p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden bg-white shadow-sm',
                isActive
                  ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : isDone
                  ? 'bg-emerald-50/20 border-emerald-200 opacity-95'
                  : 'bg-slate-50/50 border-slate-200 opacity-50'
              )}
            >
              {/* Step Icon */}
              <div
                className={cn(
                  'w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-colors',
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm animate-pulse'
                    : isDone
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                    : 'bg-slate-100 border-slate-200 text-slate-400'
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              {/* Step Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    {step.tool}
                  </span>
                  <span
                    className={cn(
                      'text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border',
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : isActive
                        ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    )}
                  >
                    {isDone ? 'SELESAI' : isActive ? 'SEDANG DIJALANKAN' : 'MENUNGGU'}
                  </span>
                </div>

                <h4
                  className={cn(
                    'text-sm font-bold mt-0.5 leading-snug font-heading',
                    isActive ? 'text-emerald-950' : isDone ? 'text-slate-800' : 'text-slate-400'
                  )}
                >
                  {step.title}
                </h4>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  {step.desc}
                </p>

                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {step.confidenceLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-Time Neural Terminal Logs */}
      {showTerminal && (
        <div className="w-full rounded-2xl bg-slate-900 border border-emerald-800/40 p-4 font-mono text-xs overflow-hidden shadow-inner text-slate-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-slate-200">Live Agent Execution Stream</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold animate-pulse">● LIVE</span>
          </div>
          <div className="flex flex-col gap-1 max-h-36 overflow-y-auto text-emerald-300">
            {liveTerminalLogs.map((log, i) => (
              <div key={i} className="leading-relaxed break-words font-mono text-[11px]">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
