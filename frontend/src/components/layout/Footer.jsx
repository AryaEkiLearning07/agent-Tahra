import React from 'react';
import { TahraLogo } from '../ui/TahraLogo';

export function Footer() {
  return (
    <footer className="w-full border-t border-emerald-200/80 dark:border-emerald-800/60 bg-white/80 dark:bg-[#08120d]/80 py-8 px-4 sm:px-8 mt-auto backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <TahraLogo size="xs" />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            <strong className="text-emerald-950 dark:text-white font-heading">TAHRA.AI</strong> — Autonomous Multi-Agent Digital Marketing & Anti-Boncos Platform
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">
          AI HackFest 2026 • Autonomous Marketing Track
        </p>
      </div>
    </footer>
  );
}
