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
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
      >
        <defs>
          {/* Glossy Green Card Background */}
          <linearGradient id="tahraBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#d1fae5" />
          </linearGradient>

          {/* Glossy Emerald T Wings */}
          <linearGradient id="tahraWingLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="tahraWingRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="60%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="tahraStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="tahraBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Outer Glossy Frame */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="24"
          fill="url(#tahraBgGrad)"
          stroke="url(#tahraBorderGrad)"
          strokeWidth="2.5"
        />

        {/* Inner Specular Highlight */}
        <rect
          x="7"
          y="7"
          width="86"
          height="86"
          rx="21"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.9"
          strokeWidth="1.5"
        />

        {/* Soft Ambient Radial Circle */}
        <circle cx="50" cy="50" r="30" fill="#10b981" opacity="0.12" />

        {/* Left T Wing */}
        <path
          d="M 22 30 C 22 26 25 23 29 23 L 48 23 L 48 39 L 26 39 C 23.8 39 22 37.2 22 35 Z"
          fill="url(#tahraWingLeft)"
        />

        {/* Right T Wing */}
        <path
          d="M 52 23 L 71 23 C 75 23 78 26 78 30 L 78 35 C 78 37.2 76.2 39 74 39 L 52 39 Z"
          fill="url(#tahraWingRight)"
        />

        {/* Vertical T Stem */}
        <path
          d="M 43 36 L 57 36 L 57 71 C 57 74.3 54.3 77 51 77 L 49 77 C 45.7 77 43 74.3 43 71 Z"
          fill="url(#tahraStemGrad)"
        />

        {/* Diamond Centerpiece */}
        <polygon
          points="50,29 55,36 50,43 45,36"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* Top Gloss Highlight Line */}
        <path
          d="M 28 25 L 72 25 C 74 25 76 26.5 76 28 C 76 27 74 26 72 26 L 28 26 C 26 26 24 27 24 28 C 24 26.5 26 25 28 25 Z"
          fill="#ffffff"
          opacity="0.8"
        />

        {/* Glossy Sparkle */}
        <path
          d="M 76 18 Q 76 12 70 12 Q 76 12 76 6 Q 76 12 82 12 Q 76 12 76 18 Z"
          fill="#10b981"
        />
        <circle cx="76" cy="12" r="2" fill="#34d399" />
      </svg>
    </div>
  );
}
