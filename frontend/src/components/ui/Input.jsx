import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Production-ready Accessible Form Input with Glossy Green Theme
 */
export const Input = forwardRef(function Input(
  {
    label,
    id,
    name,
    type = 'text',
    error,
    helperText,
    prefix,
    suffix,
    required = false,
    className = '',
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || name || `input-${Math.random().toString(36).substring(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center justify-between font-heading"
        >
          <span>
            {label}
            {required && <span className="text-emerald-600 dark:text-emerald-400 ml-1 font-black">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center w-full">
        {prefix && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-emerald-700/60 dark:text-emerald-400/70 font-semibold text-sm">
            {prefix}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full bg-white dark:bg-[#081811] text-slate-900 dark:text-white text-sm font-medium rounded-2xl border transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:cursor-not-allowed shadow-sm',
            prefix ? 'pl-11 pr-4 py-2.5 h-11' : 'px-4 py-2.5 h-11',
            suffix ? 'pr-11' : '',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
              : 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600',
            className
          )}
          {...props}
        />

        {suffix && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p
          id={errorId}
          className="text-xs font-semibold text-red-500 flex items-center gap-1.5 mt-0.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500 font-medium">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
