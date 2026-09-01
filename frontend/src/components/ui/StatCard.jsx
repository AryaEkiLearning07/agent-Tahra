import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';
import { Skeleton } from './Skeleton';
import { cn } from '../../utils/cn';

/**
 * Metric Stat Card Component
 * @param {Object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.suffix]
 * @param {string} [props.trend]
 * @param {'up'|'down'|'neutral'} [props.trendDirection]
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
  isLoading = false,
  className = '',
}) {
  return (
    <Card hasRedBar className={cn('p-6 bg-neutral-950/70 relative', className)}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1 w-full">
          <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
            {title}
          </span>

          {isLoading ? (
            <Skeleton className="h-9 w-28 my-1" />
          ) : (
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl lg:text-4xl font-black tracking-tight text-white font-mono">
                {value}
              </span>
              {suffix && (
                <span className="text-xl font-bold text-rose-500 font-mono">
                  {suffix}
                </span>
              )}
            </div>
          )}

          {subtitle && (
            <span className="text-xs text-neutral-400 mt-1 font-medium">
              {subtitle}
            </span>
          )}

          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trendDirection === 'up' && (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              )}
              {trendDirection === 'down' && (
                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span
                className={cn(
                  'text-xs font-bold',
                  trendDirection === 'up'
                    ? 'text-emerald-400'
                    : trendDirection === 'down'
                    ? 'text-rose-400'
                    : 'text-neutral-400'
                )}
              >
                {trend}
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
