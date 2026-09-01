import React from 'react';
import { Bot, Sparkles, Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { Stepper } from '../ui/Stepper';
import { Button } from '../ui/Button';

/**
 * High-Impact Modal for Multi-Agent Execution Visualization
 */
export function AgentThinkingModal({
  isOpen,
  currentStage,
  steps,
  productName,
  isVeto = false,
  vetoReason = '',
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-neutral-950 border border-rose-500/30 p-6 sm:p-8 shadow-[0_0_80px_rgba(244,63,94,0.25)] overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-rose-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

        {/* Header with animated icon */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-600 to-rose-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(244,63,94,0.6)]">
              {isVeto ? (
                <XCircle className="w-8 h-8 text-white" />
              ) : (
                <Bot className="w-8 h-8 text-white animate-pulse" />
              )}
            </div>
            {!isVeto && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
              </span>
            )}
          </div>

          <h3 id="agent-modal-title" className="text-xl font-black tracking-tight text-white uppercase">
            {isVeto ? 'Kampanye Diveto oleh AI Advisor' : 'Orkestrasi Multi-Agent Berjalan'}
          </h3>

          <p className="text-xs text-neutral-400 mt-1 font-medium">
            Produk: <span className="text-white font-bold">{productName}</span>
          </p>
        </div>

        {isVeto ? (
          <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-5 mb-6 text-center">
            <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wide">
              🚫 Perlindungan Modal UMKM
            </h4>
            <p className="text-xs text-red-200 leading-relaxed">
              {vetoReason ||
                'Margin produk di bawah batas aman 20%. Menjalankan iklan berisiko membakar modal usaha Anda tanpa hasil yang menguntungkan.'}
            </p>
            <Button
              variant="danger"
              isFullWidth
              className="mt-4"
              onClick={onClose}
            >
              Ubah Parameter Harga / HPP
            </Button>
          </div>
        ) : (
          <>
            {/* Live Step Tracker */}
            <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-4 mb-6">
              <Stepper steps={steps} layout="vertical" />
            </div>

            {/* Live Agent Terminal Log */}
            <div className="bg-black/90 rounded-xl border border-neutral-800 p-3 font-mono text-[11px] text-neutral-400 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <Loader2 className="w-3.5 h-3.5 text-rose-500 animate-spin shrink-0" />
                <span className="truncate text-neutral-300 font-medium">
                  {currentStage || 'Menginisialisasi pipeline...'}
                </span>
              </div>
              <span className="text-[10px] text-rose-500/80 font-bold shrink-0 ml-2">
                FASTAPI
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
