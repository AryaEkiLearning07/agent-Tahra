import React from 'react';

export function TahraLogo({ size = 'md', className = '' }) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${currentSize} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(244,63,94,0.45)]"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f1f23" />
            <stop offset="50%" stopColor="#0f0f12" />
            <stop offset="100%" stopColor="#050507" />
          </linearGradient>

          <linearGradient id="wingLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          <linearGradient id="wingRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff758f" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>

          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff2a55" />
            <stop offset="70%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>

          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#27272a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="24"
          fill="url(#bgGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="2.5"
        />

        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="20"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.05"
          strokeWidth="1"
        />

        <circle cx="50" cy="50" r="28" fill="#f43f5e" opacity="0.15" />

        <path
          d="M 22 30 C 22 26 25 23 29 23 L 48 23 L 48 39 L 26 39 C 23.8 39 22 37.2 22 35 Z"
          fill="url(#wingLeft)"
        />

        <path
          d="M 52 23 L 71 23 C 75 23 78 26 78 30 L 78 35 C 78 37.2 76.2 39 74 39 L 52 39 Z"
          fill="url(#wingRight)"
        />

        <path
          d="M 43 36 L 57 36 L 57 71 C 57 74.3 54.3 77 51 77 L 49 77 C 45.7 77 43 74.3 43 71 Z"
          fill="url(#stemGrad)"
        />

        <polygon
          points="50,29 55,36 50,43 45,36"
          fill="#ffffff"
          opacity="0.95"
        />

        <path
          d="M 28 25 L 72 25 C 74 25 76 26.5 76 28 C 76 27 74 26 72 26 L 28 26 C 26 26 24 27 24 28 C 24 26.5 26 25 28 25 Z"
          fill="#ffffff"
          opacity="0.7"
        />

        <path
          d="M 76 18 Q 76 12 70 12 Q 76 12 76 6 Q 76 12 82 12 Q 76 12 76 18 Z"
          fill="#ffffff"
        />
        <circle cx="76" cy="12" r="1.5" fill="#f43f5e" />
      </svg>
    </div>
  );
}
