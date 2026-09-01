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
        'rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/40 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 backdrop-blur-sm',
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-4 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
        {icon || <Layers className="w-8 h-8" />}
      </div>

      <h3 className="text-lg font-black tracking-tight text-white mb-2 uppercase">
        {title}
      </h3>

      <p className="text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
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
