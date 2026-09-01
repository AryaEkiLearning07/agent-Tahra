import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Production Card component
 * @param {Object} props
 * @param {boolean} [props.isHoverable=false]
 * @param {boolean} [props.hasGlow=false]
 * @param {boolean} [props.hasRedBar=false]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({
  isHoverable = false,
  hasGlow = false,
  hasRedBar = false,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-xl transition-all duration-300 overflow-hidden',
        isHoverable &&
          'hover:border-rose-500/40 hover:shadow-xl hover:shadow-rose-950/20 hover:-translate-y-1 cursor-pointer',
        hasGlow &&
          'border-rose-500/30 shadow-[0_0_30px_-10px_rgba(244,63,94,0.15)]',
        className
      )}
      {...props}
    >
      {hasRedBar && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rose-500 via-red-600 to-rose-700 shadow-[0_0_12px_rgba(244,63,94,0.5)]" />
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
        'text-lg font-extrabold tracking-tight text-white flex items-center gap-2',
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
    <p className={cn('text-xs font-medium text-neutral-400', className)} {...props}>
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
        'p-6 pt-0 border-t border-neutral-800/60 mt-4 flex items-center justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
