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
const AGENT_COLORS = {
  '1': {
    active: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-600 shadow-cyan-600/30',
    done: 'bg-cyan-100 dark:bg-cyan-950/80 border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300',
    codeText: 'text-cyan-800 dark:text-cyan-300',
    ring: 'ring-cyan-500/30',
  },
  '2': {
    active: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-600 shadow-amber-600/30',
    done: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300',
    codeText: 'text-amber-800 dark:text-amber-300',
    ring: 'ring-amber-500/30',
  },
  '3': {
    active: 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-indigo-600 shadow-indigo-600/30',
    done: 'bg-indigo-100 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300',
    codeText: 'text-indigo-800 dark:text-indigo-300',
    ring: 'ring-indigo-500/30',
  },
  '4': {
    active: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-600 shadow-rose-600/30',
    done: 'bg-rose-100 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300',
    codeText: 'text-rose-800 dark:text-rose-300',
    ring: 'ring-rose-500/30',
  },
  '5': {
    active: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-600 shadow-emerald-600/30',
    done: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300',
    codeText: 'text-emerald-800 dark:text-emerald-300',
    ring: 'ring-emerald-500/30',
  },
};

export function Stepper({ steps = [], layout = 'vertical', className = '' }) {
  if (layout === 'horizontal') {
    return (
      <div className={cn('w-full flex items-center justify-between gap-2', className)}>
        {steps.map((step, idx) => {
          const isDone = step.status === 'done';
          const isActive = step.status === 'active';
          const isError = step.status === 'error';
          const agentKey = String(step.code || idx + 1);
          const colorTheme = AGENT_COLORS[agentKey] || AGENT_COLORS['5'];

          return (
            <React.Fragment key={step.id || idx}>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 shadow-sm',
                    isDone && colorTheme.done,
                    isActive && cn('animate-pulse shadow-md', colorTheme.active),
                    isError && 'bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800 text-red-600 dark:text-red-300',
                    !isDone && !isActive && !isError && 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                  )}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : isError ? (
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  ) : (
                    <span>{step.code || idx + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[11px] font-bold tracking-tight line-clamp-1 max-w-[100px] font-heading',
                    isActive
                      ? colorTheme.codeText
                      : isDone
                      ? 'text-slate-800 dark:text-slate-200'
                      : 'text-slate-400 dark:text-slate-500'
                  )}
                >
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'h-[2px] flex-1 -mt-5 transition-colors duration-300',
                    isDone ? 'bg-emerald-400 dark:bg-emerald-600' : 'bg-slate-200 dark:bg-slate-800'
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
        const agentKey = String(step.code || idx + 1);
        const colorTheme = AGENT_COLORS[agentKey] || AGENT_COLORS['5'];

        return (
          <div
            key={step.id || idx}
            className={cn(
              'flex items-center gap-4 p-3.5 rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0d221a] shadow-sm',
              isActive
                ? cn('bg-slate-50/70 dark:bg-slate-900/50 shadow-md ring-1', colorTheme.ring)
                : isDone
                ? 'bg-slate-50/30 dark:bg-[#0a1b14] border-slate-200/80 dark:border-emerald-800/80 opacity-95'
                : 'bg-slate-50/50 dark:bg-[#071510] border-slate-200 dark:border-slate-800/60 opacity-50'
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 transition-all duration-300 shadow-sm',
                isDone && colorTheme.done,
                isActive && colorTheme.active,
                isError && 'bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800 text-red-600 dark:text-red-300',
                !isDone && !isActive && !isError && 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
              )}
            >
              {isDone ? (
                <Check className="w-5 h-5 stroke-[2.5]" />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              ) : (
                <span>{step.code || idx + 1}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn('text-xs font-black uppercase tracking-wider font-mono', colorTheme.codeText)}>
                  Agent {step.code}
                </span>
                <span className="text-slate-300 dark:text-slate-600 text-xs">•</span>
                <h4
                  className={cn(
                    'text-sm font-bold truncate font-heading',
                    isActive ? 'text-slate-900 dark:text-white font-extrabold' : isDone ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'
                  )}
                >
                  {step.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                {step.subtitle}
              </p>
            </div>

            <div className="shrink-0 text-right font-mono text-xs">
              {isDone && <span className="text-emerald-700 dark:text-emerald-400 font-bold">READY</span>}
              {isActive && <span className={cn('font-bold animate-pulse', colorTheme.codeText)}>RUNNING...</span>}
              {isError && <span className="text-red-600 dark:text-red-400 font-bold">VETO / ERROR</span>}
              {!isDone && !isActive && !isError && (
                <span className="text-slate-400 dark:text-slate-600">QUEUED</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
