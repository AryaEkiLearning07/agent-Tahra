import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'danger' | 'warning' | 'success' | 'info'} AlertVariant
 */

/**
 * Alert Banner Component
 * @param {Object} props
 * @param {AlertVariant} [props.variant='danger']
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClose]
 * @param {string} [props.className]
 */
export function Alert({
  variant = 'danger',
  title,
  children,
  onClose,
  className = '',
}) {
  const config = {
    danger: {
      bg: 'bg-red-950/40 border-red-500/40 text-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
      titleColor: 'text-red-400',
    },
    warning: {
      bg: 'bg-amber-950/40 border-amber-500/40 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
      titleColor: 'text-amber-400',
    },
    success: {
      bg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
      titleColor: 'text-emerald-400',
    },
    info: {
      bg: 'bg-rose-950/40 border-rose-500/40 text-rose-200',
      icon: <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
      titleColor: 'text-rose-400',
    },
  }[variant];

  return (
    <div
      role="alert"
      className={cn(
        'rounded-2xl border p-4 backdrop-blur-md flex items-start gap-3.5 relative transition-all duration-200',
        config.bg,
        className
      )}
    >
      {config.icon}
      <div className="flex-1 text-xs sm:text-sm leading-relaxed">
        {title && (
          <h4 className={cn('font-black uppercase tracking-wide mb-1', config.titleColor)}>
            {title}
          </h4>
        )}
        <div className="font-medium text-neutral-300">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
