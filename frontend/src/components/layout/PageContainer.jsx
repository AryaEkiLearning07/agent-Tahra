import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

/**
 * Standardized Page Container with Hero and Breadcrumbs
 * @param {Object} props
 * @param {string} [props.badge]
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.backUrl]
 * @param {string} [props.backLabel='Kembali']
 * @param {React.ReactNode} [props.actions]
 * @param {string} [props.maxWidth='max-w-7xl']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function PageContainer({
  badge,
  title,
  description,
  backUrl,
  backLabel = 'Kembali',
  actions,
  maxWidth = 'max-w-7xl',
  className = '',
  children,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <main className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10', maxWidth, className)}>
        {/* Top Header / Hero */}
        {(title || backUrl || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-emerald-200/80 dark:border-emerald-800/60">
            <div className="flex flex-col gap-2">
              {backUrl && (
                <button
                  onClick={() => navigate(backUrl)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mb-1 w-fit cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{backLabel}</span>
                </button>
              )}

              {badge && (
                <span className="w-fit text-[11px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 font-mono shadow-sm">
                  {badge}
                </span>
              )}

              {title && (
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-emerald-950 dark:text-white font-heading">
                  {title}
                </h1>
              )}

              {description && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
