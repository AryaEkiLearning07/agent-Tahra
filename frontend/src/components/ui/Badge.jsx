import React from 'react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'success' | 'warning' | 'danger' | 'neutral' | 'brand' | 'accent' | 'info'} BadgeVariant
 * @typedef {'sm' | 'md'} BadgeSize
 */

/**
 * Production-ready Badge component with Glossy Green Theme
 */
export function Badge({
  variant = 'brand',
  size = 'md',
  hasDot = false,
  isPulse = false,
  icon,
  className = '',
  children,
  ...props
}) {
  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1 font-bold uppercase tracking-wider',
    md: 'text-xs px-3 py-1 gap-1.5 font-bold tracking-wide',
  };

  const variantStyles = {
    brand: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 shadow-sm shadow-emerald-500/5',
    accent: 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-300/80 dark:border-teal-700/60 shadow-sm',
    success: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-400/80 dark:border-emerald-600/60 shadow-sm',
    warning: 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700/60 shadow-sm',
    danger: 'bg-rose-50 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300/80 dark:border-rose-700/60 shadow-sm',
    neutral: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700',
    info: 'bg-sky-50 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border border-sky-300/80 dark:border-sky-700/60',
  };

  const dotColors = {
    brand: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]',
    accent: 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.9)]',
    success: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]',
    warning: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)]',
    danger: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]',
    neutral: 'bg-slate-400',
    info: 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.9)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border select-none transition-colors backdrop-blur-md',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {hasDot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            dotColors[variant],
            isPulse && 'animate-pulse'
          )}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

/**
 * Status Badge for Campaign & Agent Statuses
 * @param {{ status: 'Running' | 'Completed' | 'Thinking' | 'Executing' | 'Draft' | 'Veto' | string }} props
 */
export function StatusBadge({ status }) {
  const norm = status?.toLowerCase() || '';

  if (norm === 'executing' || norm === 'eksekusi' || norm === 'working') {
    return (
      <Badge variant="brand" hasDot isPulse>
        ⚡ Agent Sedang Mengeksekusi
      </Badge>
    );
  }

  if (norm === 'running' || norm === 'aktif' || norm === 'live') {
    return (
      <Badge variant="success" hasDot isPulse>
        🟢 Iklan Aktif
      </Badge>
    );
  }

  if (norm === 'completed' || norm === 'sukses' || norm === 'ready') {
    return (
      <Badge variant="brand" hasDot>
        ✨ Blueprint AI Siap
      </Badge>
    );
  }

  if (norm === 'thinking' || norm === 'proses') {
    return (
      <Badge variant="warning" hasDot isPulse>
        🧠 Agent Menganalisis...
      </Badge>
    );
  }

  if (norm === 'veto' || norm === 'rejected' || norm === 'protected') {
    return (
      <Badge variant="danger" hasDot>
        🛡️ Terproteksi Anti-Boncos
      </Badge>
    );
  }

  return (
    <Badge variant="neutral">
      {status || 'Draft'}
    </Badge>
  );
}
