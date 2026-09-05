import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';
import { Skeleton } from './Skeleton';
import { cn } from '../../utils/cn';

/**
 * Metric Stat Card Component with Multi-Color Theme Support
 * @param {Object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.suffix]
 * @param {string} [props.trend]
 * @param {'up'|'down'|'neutral'} [props.trendDirection]
 * @param {'emerald'|'indigo'|'cyan'|'amber'|'rose'} [props.variant='emerald']
 * @param {boolean} [props.isLoading=false]
 * @param {string} [props.className]
 */
export function StatCard({
  title,
  value,
  subtitle,
  icon,
  suffix = '',
  trend,
  trendDirection = 'neutral',
  variant = 'emerald',
  isLoading = false,
  className = '',
}) {
  const variantConfig = {
    emerald: {
      bar: 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 shadow-[0_0_12px_rgba(16,185,129,0.4)]',
      title: 'text-emerald-800 dark:text-emerald-300',
      iconBox: 'bg-gradient-to-br from-emerald-50 to-teal-100/60 dark:from-emerald-950/80 dark:to-teal-950/60 border-emerald-200 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/20 dark:border-emerald-500/30',
      valGlow: 'text-emerald-600 dark:text-emerald-400',
    },
    indigo: {
      bar: 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 shadow-[0_0_12px_rgba(99,102,241,0.4)]',
      title: 'text-indigo-800 dark:text-indigo-300',
      iconBox: 'bg-gradient-to-br from-indigo-50 to-violet-100/60 dark:from-indigo-950/80 dark:to-violet-950/60 border-indigo-200 dark:border-indigo-700/60 text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/20 dark:border-indigo-500/30',
      valGlow: 'text-indigo-600 dark:text-indigo-400',
    },
    cyan: {
      bar: 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.4)]',
      title: 'text-cyan-800 dark:text-cyan-300',
      iconBox: 'bg-gradient-to-br from-cyan-50 to-blue-100/60 dark:from-cyan-950/80 dark:to-blue-950/60 border-cyan-200 dark:border-cyan-700/60 text-cyan-700 dark:text-cyan-300',
      border: 'border-cyan-500/20 dark:border-cyan-500/30',
      valGlow: 'text-cyan-600 dark:text-cyan-400',
    },
    amber: {
      bar: 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
      title: 'text-amber-800 dark:text-amber-300',
      iconBox: 'bg-gradient-to-br from-amber-50 to-orange-100/60 dark:from-amber-950/80 dark:to-orange-950/60 border-amber-200 dark:border-amber-700/60 text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/20 dark:border-amber-500/30',
      valGlow: 'text-amber-600 dark:text-amber-400',
    },
    rose: {
      bar: 'bg-gradient-to-r from-rose-400 via-rose-500 to-pink-600 shadow-[0_0_12px_rgba(244,63,94,0.4)]',
      title: 'text-rose-800 dark:text-rose-300',
      iconBox: 'bg-gradient-to-br from-rose-50 to-pink-100/60 dark:from-rose-950/80 dark:to-pink-950/60 border-rose-200 dark:border-rose-700/60 text-rose-700 dark:text-rose-300',
      border: 'border-rose-500/20 dark:border-rose-500/30',
      valGlow: 'text-rose-600 dark:text-rose-400',
    },
  }[variant] || {};

  return (
    <div className={cn('relative rounded-3xl p-6 bg-white/95 dark:bg-[#0c1f17]/95 border overflow-hidden shadow-md shadow-emerald-900/5 dark:shadow-black/40 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5', variantConfig.border, className)}>
      <div className={cn('absolute top-0 left-0 right-0 h-[3.5px]', variantConfig.bar)} />
      
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1 w-full">
          <span className={cn('text-xs font-bold uppercase tracking-widest font-heading', variantConfig.title)}>
            {title}
          </span>

          {isLoading ? (
            <Skeleton className="h-9 w-28 my-1" />
          ) : (
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
                {value}
              </span>
              {suffix && (
                <span className={cn('text-xl font-bold font-heading', variantConfig.valGlow)}>
                  {suffix}
                </span>
              )}
            </div>
          )}

          {subtitle && (
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {subtitle}
            </span>
          )}

          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trendDirection === 'up' && (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              )}
              {trendDirection === 'down' && (
                <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
              )}
              <span
                className={cn(
                  'text-xs font-bold',
                  trendDirection === 'up'
                    ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                    : trendDirection === 'down'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-slate-500 dark:text-slate-400'
                )}
              >
                {trend}
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className={cn('w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm', variantConfig.iconBox)}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
