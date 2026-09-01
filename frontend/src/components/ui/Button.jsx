import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * Production-grade Accessible Button component
 * @param {Object} props
 * @param {ButtonVariant} [props.variant='primary']
 * @param {ButtonSize} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {string} [props.loadingText]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.isFullWidth=false]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  isFullWidth = false,
  className = '',
  disabled,
  children,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2.5 gap-2 h-10',
    lg: 'text-base px-6 py-3.5 gap-2.5 h-12',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-600 text-white shadow-lg shadow-rose-900/30 hover:shadow-rose-600/40 border border-rose-500/30',
    secondary:
      'bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 shadow-sm',
    outline:
      'bg-transparent hover:bg-rose-500/10 text-rose-400 border border-rose-500/40 hover:border-rose-500',
    ghost:
      'bg-transparent hover:bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 border border-transparent',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-950/50 border border-red-500/30',
    success:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 border border-emerald-500/30',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        isFullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0 text-current">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0 text-current">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
