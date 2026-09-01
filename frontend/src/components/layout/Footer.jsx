import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950/80 py-8 px-4 sm:px-8 mt-auto backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-rose-500 to-red-700 flex items-center justify-center font-black text-white text-xs shadow-[0_0_10px_rgba(244,63,94,0.4)]">
            T
          </div>
          <span className="text-xs font-bold text-neutral-300">
            TAHRA AI — Multi-Agent Digital Marketing & Anti-Boncos ROAS Simulator
          </span>
        </div>

        <p className="text-xs text-neutral-500 font-medium">
          AI HackFest 2026 • Business Automation Track
        </p>
      </div>
    </footer>
  );
}
