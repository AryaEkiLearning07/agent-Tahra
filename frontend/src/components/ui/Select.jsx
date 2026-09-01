import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Production-ready Select component
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
          className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-rose-500 ml-1 font-black">*</span>}
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
            'w-full bg-neutral-900/90 text-white text-sm font-medium rounded-xl border appearance-none px-4 py-2.5 h-11 pr-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 disabled:opacity-50 disabled:bg-neutral-950 disabled:cursor-not-allowed cursor-pointer',
            error
              ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/30'
              : 'border-neutral-800 hover:border-neutral-700',
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-neutral-900 text-white py-2"
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <div className="absolute right-3.5 flex items-center pointer-events-none text-neutral-400">
          <ChevronDown className="w-4 h-4" />
        </div>
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
