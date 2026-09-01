import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Enterprise Production Data Table Component
 */
export function Table({ className = '', children, ...props }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
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
        'bg-neutral-900/90 border-b border-neutral-800 text-[11px] font-black uppercase tracking-wider text-neutral-400 select-none',
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
    <tbody className={cn('divide-y divide-neutral-800/80 font-medium text-neutral-300', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className = '', isHoverable = true, children, ...props }) {
  return (
    <tr
      className={cn(
        'transition-colors duration-150',
        isHoverable && 'hover:bg-rose-500/[0.04]',
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
