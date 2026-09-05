import React from 'react';
import { Layers, Plus } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

/**
 * Production Empty State Component
 * @param {Object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.actionLabel]
 * @param {() => void} [props.onAction]
 * @param {string} [props.className]
 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-dashed border-emerald-300 dark:border-emerald-700/80 bg-white/90 dark:bg-[#0c1f17]/90 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 backdrop-blur-md shadow-sm',
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-4 shadow-sm">
        {icon || <Layers className="w-8 h-8" />}
      </div>

      <h3 className="text-lg font-black tracking-tight text-emerald-950 dark:text-white mb-2 uppercase font-heading">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-6 leading-relaxed font-medium">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
