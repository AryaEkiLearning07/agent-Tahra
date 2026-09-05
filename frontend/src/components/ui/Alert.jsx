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
      bg: 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/60 text-red-900 dark:text-red-200 shadow-sm',
      icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />,
      titleColor: 'text-red-950 dark:text-red-200 font-heading',
      textColor: 'text-red-800 dark:text-red-300',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 shadow-sm',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      titleColor: 'text-amber-950 dark:text-amber-200 font-heading',
      textColor: 'text-amber-800 dark:text-amber-300',
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200 shadow-sm',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
      titleColor: 'text-emerald-950 dark:text-emerald-200 font-heading',
      textColor: 'text-emerald-800 dark:text-emerald-300',
    },
    info: {
      bg: 'bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800/60 text-teal-900 dark:text-teal-200 shadow-sm',
      icon: <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />,
      titleColor: 'text-teal-950 dark:text-teal-200 font-heading',
      textColor: 'text-teal-800 dark:text-teal-300',
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
        <div className={cn('font-medium', config.textColor)}>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-800 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
