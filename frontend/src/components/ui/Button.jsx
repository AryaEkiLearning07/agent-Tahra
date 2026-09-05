import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * Production-grade Accessible Button component with Glossy Green Theme
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
    'inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-9',
    md: 'text-sm px-5 py-2.5 gap-2 h-11',
    lg: 'text-base px-7 py-3.5 gap-2.5 h-13',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-700/25 hover:shadow-emerald-600/40 border-t border-white/40 border-b border-emerald-700/40',
    accent:
      'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 hover:from-emerald-400 hover:to-teal-600 text-white shadow-xl shadow-emerald-800/30 hover:shadow-emerald-500/45 border-t border-white/50 border-b border-emerald-800/50',
    secondary:
      'bg-white/95 dark:bg-[#0f271d] hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-emerald-950 dark:text-emerald-100 border border-emerald-200/90 dark:border-emerald-700/60 hover:border-emerald-300 dark:hover:border-emerald-500 shadow-sm',
    outline:
      'bg-emerald-50/50 dark:bg-emerald-950/40 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 hover:border-emerald-400',
    ghost:
      'bg-transparent hover:bg-emerald-50/80 dark:hover:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 border border-transparent',
    danger:
      'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-md shadow-red-700/20 border-t border-white/30',
    success:
      'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-md shadow-emerald-700/25 border-t border-white/30',
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
