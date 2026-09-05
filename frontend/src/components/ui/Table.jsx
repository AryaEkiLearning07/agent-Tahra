import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Enterprise Production Data Table Component
 */
export function Table({ className = '', children, ...props }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-white/95 dark:bg-[#0d221a]/95 backdrop-blur-xl shadow-sm">
      <div className="overflow-x-auto w-full">
        <table className={cn('w-full text-left text-xs border-collapse', className)} {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHeader({ className = '', children, ...props }) {
  return (
    <thead
      className={cn(
        'bg-emerald-50/80 dark:bg-[#071610] border-b border-emerald-200 dark:border-emerald-800 text-[11px] font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300 select-none font-heading',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ className = '', children, ...props }) {
  return (
    <tbody className={cn('divide-y divide-emerald-100 dark:divide-emerald-900/40 font-medium text-slate-700 dark:text-slate-300', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className = '', isHoverable = true, children, ...props }) {
  return (
    <tr
      className={cn(
        'transition-colors duration-150',
        isHoverable && 'hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ className = '', children, ...props }) {
  return (
    <th
      scope="col"
      className={cn('px-5 py-3.5 font-bold tracking-wider', className)}
      style={{ padding: '14px 20px' }}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ className = '', children, ...props }) {
  return (
    <td
      className={cn('px-5 py-4 align-middle', className)}
      style={{ padding: '16px 20px' }}
      {...props}
    >
      {children}
    </td>
  );
}
