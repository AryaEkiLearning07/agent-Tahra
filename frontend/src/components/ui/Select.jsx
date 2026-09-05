import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Production-ready Select component with Glossy Green Theme
 */
export const Select = forwardRef(function Select(
  {
    label,
    id,
    name,
    options = [],
    error,
    helperText,
    required = false,
    className = '',
    disabled = false,
    children,
    ...props
  },
  ref
) {
  const selectId = id || name || `select-${Math.random().toString(36).substring(2, 9)}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center justify-between font-heading"
        >
          <span>
            {label}
            {required && <span className="text-emerald-600 ml-1 font-black">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          id={selectId}
          name={name}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full bg-white text-slate-900 text-sm font-medium rounded-2xl border appearance-none px-4 py-2.5 h-11 pr-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed cursor-pointer shadow-sm',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
              : 'border-emerald-200 hover:border-emerald-300',
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white text-slate-900 py-2"
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <div className="absolute right-3.5 flex items-center pointer-events-none text-emerald-700/60">
          <ChevronDown className="w-4 h-4" />
        </div>
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
