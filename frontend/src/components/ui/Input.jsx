import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Production-ready Accessible Form Input
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
          className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-rose-500 ml-1 font-black">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center w-full">
        {prefix && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-neutral-500 font-semibold text-sm">
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
            'w-full bg-neutral-900/90 text-white text-sm font-medium rounded-xl border transition-all duration-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 disabled:opacity-50 disabled:bg-neutral-950 disabled:cursor-not-allowed',
            prefix ? 'pl-11 pr-4 py-2.5 h-11' : 'px-4 py-2.5 h-11',
            suffix ? 'pr-11' : '',
            error
              ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/30'
              : 'border-neutral-800 hover:border-neutral-700',
            className
          )}
          {...props}
        />

        {suffix && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-neutral-500">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p
          id={errorId}
          className="text-xs font-semibold text-red-400 flex items-center gap-1.5 mt-0.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-neutral-500 font-medium">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
