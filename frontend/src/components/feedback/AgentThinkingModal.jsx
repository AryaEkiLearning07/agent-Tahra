import React, { useEffect, useState } from 'react';
import {
  Bot,
  Sparkles,
  Loader2,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Search,
  Target,
  FileText,
  Image as ImageIcon,
  TrendingUp,
  Cpu,
  Terminal,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

/**
 * Ultra-Premium, Highly Informative Multi-Agent Thinking Visualizer with Clickable Timeline Inspection
 */
export function AgentThinkingModal({
  isOpen,
  currentStageIndex = 0,
  productName,
  logs = [],
  interimData = {},
  isVeto = false,
  vetoReason = '',
  onClose,
}) {
  const [inspectedStage, setInspectedStage] = useState(null);

  if (!isOpen) return null;

  const agentDefinitions = [
    {
      code: '1',
      name: 'Sub-Agent 1: The Explorer',
      role: 'Market & Product Researcher',
      icon: <Search className="w-4 h-4" />,
      liveAction: 'Menganalisis Competitor Proxy & memetakan 3 Pain Points konsumen...',
      focus: 'Proxy Pesaing & USP',
      quickSummary: 'Menemukan kompetitor terdekat, memetakan segmentasi audiens, dan merumuskan Unique Selling Proposition (USP).',
    },
    {
      code: '2',
      name: 'Sub-Agent 2: The Planner',
      role: 'Strategy & Anti-Boncos Architect',
      icon: <Target className="w-4 h-4" />,
      liveAction: 'Mengkalkulasi Unit Economics, memilih format (9:16) & batas plafon CPA...',
      focus: 'Margin Check & Medan Iklan',
      quickSummary: 'Memvalidasi margin laba (>20%), memilih platform channel, dan menetapkan batas maksimal CPA per konversi.',
    },
    {
      code: '3',
      name: 'Sub-Agent 3: The Wordsmith',
      role: 'Creative Director & Copywriter',
      icon: <FileText className="w-4 h-4" />,
      liveAction: 'Merangkai Naskah Video 15s (Hook-Body-CTA) & caption psikologi PAS...',
      focus: 'Naskah PAS & Video 15s',
      quickSummary: 'Menyusun naskah video 15 detik (Hook 0-3s, Body 3-10s, CTA) dan caption psikologi konversi PAS.',
    },
    {
      code: '4',
      name: 'Sub-Agent 4: The Creator',
      role: 'Art Director & Visual Designer',
      icon: <ImageIcon className="w-4 h-4" />,
      liveAction: 'Merancang prompt Text-to-Image 8K & menyelaraskan komposisi pencahayaan...',
      focus: 'Prompt Studio & Lighting',
      quickSummary: 'Merangkai prompt visual studio 8K dengan pencahayaan sinematik dan rasio yang sesuai algoritma placement.',
    },
    {
      code: '5',
      name: 'Sub-Agent 5: The QA & Deployer',
      role: 'Adversarial QA & ROAS Controller',
      icon: <TrendingUp className="w-4 h-4" />,
      liveAction: 'Validasi silang konsistensi data, meracik Payload Ads Manager & simulasi ROAS...',
      focus: 'QC & Formula ROAS',
      quickSummary: 'Melakukan Quality Control silang, menyusun JSON Ads Manager siap pakai, dan memproyeksikan ROAS secara matematis.',
    },
  ];

  const progressPercent = Math.min(100, Math.round(((currentStageIndex + 1) / 5) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white/95 border border-emerald-400/40 p-6 sm:p-8 shadow-2xl shadow-emerald-950/20 overflow-hidden flex flex-col gap-6 backdrop-blur-2xl">
        {/* Ambient Neural Glows */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-emerald-300/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-teal-300/20 blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-emerald-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-700/30">
                {isVeto ? <XCircle className="w-6 h-6" /> : <Cpu className="w-6 h-6 animate-pulse" />}
              </div>
              {!isVeto && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-800 font-mono">
                  TAHRA AI MULTI-AGENT ENGINE
                </span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  {progressPercent}% Selesai
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-emerald-950 uppercase tracking-tight font-heading">
                {isVeto ? 'Kampanye Diveto oleh AI Advisor' : 'Orkestrasi 5 Sub-Agent Sedang Bekerja'}
              </h2>
            </div>
          </div>

          <Badge variant={isVeto ? 'danger' : 'brand'} size="sm" hasDot isPulse={!isVeto}>
            {isVeto ? 'VETO TRIGGERED' : 'LIVE INFERENCE'}
          </Badge>
        </div>

        {isVeto ? (
          /* VETO BANNER */
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-red-950 uppercase tracking-wide font-heading">
              Perlindungan Modal Anti-Boncos
            </h3>
            <p className="text-xs text-red-800 leading-relaxed max-w-md">
              {vetoReason ||
                'Margin profit produk di bawah 20%. Sub-Agent 2 memblokir eksekusi iklan untuk menyelamatkan anggaran operasional UMKM Anda.'}
            </p>
            <Button variant="danger" size="md" onClick={onClose} className="mt-2">
              Sesuaikan Harga Jual / HPP
            </Button>
          </div>
        ) : (
          <>
            {/* Progress Bar with glowing indicator */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden p-0.5 border border-emerald-200">
              <div
                className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 5-Agent Interactive Stage Timeline */}
            <div className="grid grid-cols-1 gap-2.5">
              {agentDefinitions.map((agent, idx) => {
                const isDone = idx < currentStageIndex;
                const isActive = idx === currentStageIndex;
                const isPending = idx > currentStageIndex;
                const isSelected = inspectedStage === idx;

                return (
                  <div
                    key={agent.code}
                    onClick={() => {
                      if (isDone || isActive) {
                        setInspectedStage(isSelected ? null : idx);
                      }
                    }}
                    className={cn(
                      'p-3.5 rounded-2xl border transition-all duration-300 flex flex-col gap-2.5 bg-white shadow-sm',
                      (isDone || isActive) && 'cursor-pointer hover:border-emerald-400',
                      isActive
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                        : isDone
                        ? 'bg-emerald-50/20 border-emerald-200 opacity-95'
                        : 'bg-slate-50/50 border-slate-200 opacity-45'
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors',
                            isDone
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                              : isActive
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30 animate-pulse'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          )}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : agent.icon}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-emerald-950 truncate font-heading">
                              {agent.name}
                            </span>
                            <span className="text-[10px] text-slate-600 font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 shrink-0">
                              {agent.focus}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                            {isActive ? agent.liveAction : agent.role}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 font-mono text-[10px] font-black uppercase flex items-center gap-2">
                        {isDone && (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <span>SELESAI ✓</span>
                            <Eye className="w-3 h-3 text-slate-400" />
                          </span>
                        )}
                        {isActive && (
                          <span className="text-emerald-700 flex items-center gap-1 animate-pulse">
                            <Loader2 className="w-3 h-3 animate-spin text-emerald-600" /> PROSES...
                          </span>
                        )}
                        {isPending && <span className="text-slate-400">MENUNGGU</span>}
                      </div>
                    </div>

                    {/* Expandable Live Inspection Details */}
                    {isSelected && (
                      <div className="pt-2 border-t border-emerald-100 text-[11px] text-slate-700 animate-in fade-in duration-200">
                        <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 leading-relaxed font-sans">
                          <strong className="text-emerald-800 block mb-1 font-heading">
                            {isDone ? '✅ Ringkasan Hasil Analisis:' : '⚡ Fokus Proses Saat Ini:'}
                          </strong>
                          <span>{agent.quickSummary}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Real-time Thought Stream Terminal */}
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-emerald-800/40 flex flex-col gap-2 font-mono text-[11px] text-slate-200">
              <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-800 pb-1.5">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Live AI Rationale & Telemetry
                </span>
                <span className="text-emerald-400">GROQ LPU / HERMES-3</span>
              </div>

              <div className="flex flex-col gap-1 max-h-24 overflow-y-auto pr-1 text-emerald-300 leading-relaxed">
                {logs.length > 0 ? (
                  logs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">›</span>
                      <span className="text-slate-200">{log}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 italic">
                    <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                    <span>Menghubungkan ke cluster LLM dan menginisialisasi parameter pasar...</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
