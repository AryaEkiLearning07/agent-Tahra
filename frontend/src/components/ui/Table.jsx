import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Production Data Table Component
 */
export function Table({ className = '', children, ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md">
      <table className={cn('w-full text-left text-sm text-neutral-300 border-collapse', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className = '', children, ...props }) {
  return (
    <thead
      className={cn(
        'bg-neutral-900/80 border-b border-neutral-800 text-[11px] font-black uppercase tracking-widest text-neutral-400',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ className = '', children, ...props }) {
  return <tbody className={cn('divide-y divide-neutral-800/60', className)} {...props}>{children}</tbody>;
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
    <th className={cn('px-4 py-3.5 font-bold', className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ className = '', children, ...props }) {
  return (
    <td className={cn('px-4 py-3.5 align-middle', className)} {...props}>
      {children}
    </td>
  );
}
