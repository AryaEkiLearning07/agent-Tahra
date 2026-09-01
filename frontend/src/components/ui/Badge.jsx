import React from 'react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'success' | 'warning' | 'danger' | 'neutral' | 'brand' | 'info'} BadgeVariant
 * @typedef {'sm' | 'md'} BadgeSize
 */

/**
 * Production-ready Badge component
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
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-semibold uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold tracking-wide',
  };

  const variantStyles = {
    brand: 'bg-rose-500/10 text-rose-400 border border-rose-500/25',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/25',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/25',
    neutral: 'bg-neutral-800 text-neutral-300 border border-neutral-700/60',
    info: 'bg-sky-500/10 text-sky-400 border border-sky-500/25',
  };

  const dotColors = {
    brand: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]',
    success: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
    warning: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
    danger: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
    neutral: 'bg-neutral-400',
    info: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border select-none transition-colors backdrop-blur-sm',
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
 * Status Badge for Campaign Statuses
 * @param {{ status: 'Running' | 'Completed' | 'Thinking' | 'Draft' | 'Veto' | string }} props
 */
export function StatusBadge({ status }) {
  const norm = status?.toLowerCase() || '';

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
        Blueprint Siap
      </Badge>
    );
  }

  if (norm === 'thinking' || norm === 'proses') {
    return (
      <Badge variant="warning" hasDot isPulse>
        AI Berpikir...
      </Badge>
    );
  }

  if (norm === 'veto' || norm === 'rejected' || norm === 'protected') {
    return (
      <Badge variant="danger" hasDot>
        🛡️ Terproteksi
      </Badge>
    );
  }

  return (
    <Badge variant="neutral">
      {status || 'Draft'}
    </Badge>
  );
}
