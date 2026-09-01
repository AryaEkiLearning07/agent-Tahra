import React from 'react';
import { Check, Loader2, Circle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'done' | 'active' | 'pending' | 'error'} StepStatus
 * @typedef {{ id: string|number, code: string, title: string, subtitle: string, status: StepStatus }} StepItem
 */

/**
 * Multi-Agent Pipeline Stepper
 * @param {Object} props
 * @param {StepItem[]} props.steps
 * @param {'horizontal' | 'vertical'} [props.layout='vertical']
 * @param {string} [props.className]
 */
export function Stepper({ steps = [], layout = 'vertical', className = '' }) {
  if (layout === 'horizontal') {
    return (
      <div className={cn('w-full flex items-center justify-between gap-2', className)}>
        {steps.map((step, idx) => {
          const isDone = step.status === 'done';
          const isActive = step.status === 'active';
          const isError = step.status === 'error';

          return (
            <React.Fragment key={step.id || idx}>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300',
                    isDone &&
                      'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]',
                    isActive &&
                      'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse',
                    isError &&
                      'bg-red-500/20 border-red-500 text-red-400',
                    !isDone &&
                      !isActive &&
                      !isError &&
                      'bg-neutral-900 border-neutral-800 text-neutral-500'
                  )}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                  ) : isError ? (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  ) : (
                    <span>{step.code || idx + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[11px] font-bold tracking-tight line-clamp-1 max-w-[100px]',
                    isActive
                      ? 'text-rose-400'
                      : isDone
                      ? 'text-neutral-200'
                      : 'text-neutral-500'
                  )}
                >
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'h-[2px] flex-1 -mt-5 transition-colors duration-300',
                    isDone ? 'bg-emerald-500/50' : 'bg-neutral-800'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {steps.map((step, idx) => {
        const isDone = step.status === 'done';
        const isActive = step.status === 'active';
        const isError = step.status === 'error';

        return (
          <div
            key={step.id || idx}
            className={cn(
              'flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300',
              isActive
                ? 'bg-rose-950/20 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                : isDone
                ? 'bg-neutral-950/50 border-neutral-800/60'
                : 'bg-neutral-950/20 border-transparent opacity-60'
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 transition-all duration-300',
                isDone &&
                  'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.2)]',
                isActive &&
                  'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]',
                isError &&
                  'bg-red-500/20 border-red-500 text-red-400',
                !isDone &&
                  !isActive &&
                  !isError &&
                  'bg-neutral-900 border-neutral-800 text-neutral-600'
              )}
            >
              {isDone ? (
                <Check className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 animate-spin text-rose-400" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <span>{step.code || idx + 1}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-500 font-mono">
                  Agent {step.code}
                </span>
                <span className="text-neutral-500 text-xs">•</span>
                <h4
                  className={cn(
                    'text-sm font-bold truncate',
                    isActive ? 'text-white' : isDone ? 'text-neutral-200' : 'text-neutral-500'
                  )}
                >
                  {step.title}
                </h4>
              </div>
              <p className="text-xs text-neutral-400 truncate mt-0.5 font-medium">
                {step.subtitle}
              </p>
            </div>

            <div className="shrink-0 text-right font-mono text-xs">
              {isDone && <span className="text-emerald-400 font-bold">READY</span>}
              {isActive && <span className="text-rose-400 font-bold animate-pulse">RUNNING...</span>}
              {isError && <span className="text-red-400 font-bold">VETO / ERROR</span>}
              {!isDone && !isActive && !isError && (
                <span className="text-neutral-600">QUEUED</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
