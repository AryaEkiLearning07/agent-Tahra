import React from 'react';
import { TahraLogo } from '../ui/TahraLogo';

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950/80 py-8 px-4 sm:px-8 mt-auto backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <TahraLogo size="xs" />
          <span className="text-xs font-bold text-neutral-300">
            <strong className="text-white">AHRA.AI</strong> — Autonomous Multi-Agent Digital Marketing & Anti-Boncos Platform
          </span>
        </div>

        <p className="text-xs text-neutral-500 font-medium">
          AI HackFest 2026 • Business Automation Track
        </p>
      </div>
    </footer>
  );
}
