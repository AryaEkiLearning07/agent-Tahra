import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Production Card component with Glossy Green Glassmorphism
 * @param {Object} props
 * @param {boolean} [props.isHoverable=false]
 * @param {boolean} [props.hasGlow=false]
 * @param {boolean} [props.hasRedBar=false]
 * @param {boolean} [props.hasBrandBar=false]
 * @param {boolean} [props.hasAccentBar=false]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({
  isHoverable = false,
  hasGlow = false,
  hasRedBar = false,
  hasBrandBar = false,
  hasAccentBar = false,
  className = '',
  children,
  ...props
}) {
  const showTopBar = hasRedBar || hasBrandBar || hasAccentBar;

  return (
    <div
      className={cn(
        'relative rounded-3xl bg-white/90 dark:bg-[#0c1f17]/90 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-2xl transition-all duration-300 overflow-hidden shadow-lg shadow-emerald-950/5 dark:shadow-black/40',
        isHoverable &&
          'hover:border-emerald-400 dark:hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-600/15 dark:hover:shadow-emerald-500/15 hover:-translate-y-1 cursor-pointer',
        hasGlow &&
          'border-emerald-400/50 shadow-[0_0_35px_-5px_rgba(16,185,129,0.2)] dark:shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)]',
        className
      )}
      {...props}
    >
      {showTopBar && (
        <div
          className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
        />
      )}
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={cn('p-6 pb-3 flex flex-col gap-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h3
      className={cn(
        'text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 font-heading',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children, ...props }) {
  return (
    <p className={cn('text-xs font-medium text-slate-500 dark:text-slate-400', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={cn('p-6 pt-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }) {
  return (
    <div
      className={cn(
        'p-6 pt-0 border-t border-emerald-100 dark:border-emerald-900/60 mt-4 flex items-center justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
