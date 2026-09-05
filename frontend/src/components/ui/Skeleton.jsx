import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Skeleton Loader Component with Shimmer Animation
 * @param {Object} props
 * @param {string} [props.className]
 */
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-emerald-100/60 border border-emerald-200/50 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton Card for Campaigns
 */
export function CampaignCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white border border-emerald-200/80 p-6 flex flex-col justify-between h-56 shadow-sm">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="w-10 h-10 rounded-2xl" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
        <Skeleton className="w-8 h-1 rounded-sm mb-3" />
        <Skeleton className="w-3/4 h-5 rounded-md mb-2" />
        <Skeleton className="w-1/2 h-4 rounded-md" />
      </div>
      <div className="pt-4 border-t border-emerald-100 flex justify-between items-center">
        <Skeleton className="w-20 h-3 rounded-md" />
        <Skeleton className="w-16 h-5 rounded-md" />
      </div>
    </div>
  );
}
