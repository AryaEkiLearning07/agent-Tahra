import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, LogOut, User, Menu, X, Sparkles, LayoutDashboard, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

import { TahraLogo } from '../ui/TahraLogo';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/85 backdrop-blur-2xl border-b border-rose-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Integrated Wordmark: [T-Icon] + AHRA + .AI */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center cursor-pointer group select-none"
        >
          {/* Iconic Glowing T Mark */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-rose-500/50 p-1 flex items-center justify-center shadow-[0_0_16px_rgba(244,63,94,0.35)] group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="tHead" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff4d6d" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <linearGradient id="tBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff2a55" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
              <path
                d="M 6 12 C 6 8.5 9 6 12.5 6 L 47.5 6 C 51 6 54 8.5 54 12 L 54 17 C 54 20 51.5 22 48.5 22 L 36 22 L 36 49 C 36 52 33.5 54 30.5 54 L 29.5 54 C 26.5 54 24 52 24 49 L 24 22 L 11.5 22 C 8.5 22 6 20 6 17 Z"
                fill="url(#tHead)"
              />
              <polygon points="30,10 35,16 30,22 25,16" fill="#ffffff" />
              <path d="M 12 8 L 48 8 C 50 8 51.5 9 51.5 10 L 10.5 10 C 10.5 9 11 8 12 8 Z" fill="#ffffff" opacity="0.6" />
              <circle cx="50" cy="5" r="2.5" fill="#ffffff" />
            </svg>
          </div>

          {/* Connected AHRA Typography */}
          <div className="flex items-center pl-1.5">
            <span className="font-black text-[22px] tracking-[-0.03em] text-white leading-none font-sans">
              AHRA
            </span>
            <span className="text-rose-500 font-extrabold text-[10px] px-1.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 font-mono tracking-wider ml-1.5">
              .AI
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-neutral-800/80">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={cn(
                  'flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all',
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {location.pathname !== '/new' && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
              onClick={() => navigate('/new')}
            >
              Buat Kampanye
            </Button>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-3 border-l border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-xs font-bold">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 truncate max-w-[120px]">
                    {user?.company || 'UMKM'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="text-neutral-400 hover:text-rose-400 p-2 rounded-lg hover:bg-neutral-900 transition-colors"
                title="Keluar"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
              Masuk
            </Button>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Buka Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-300 hover:text-white hover:bg-neutral-900 text-left"
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}

          <Button
            variant="primary"
            isFullWidth
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => {
              navigate('/new');
              setIsMobileMenuOpen(false);
            }}
          >
            Buat Kampanye Baru
          </Button>

          {isAuthenticated ? (
            <Button
              variant="outline"
              isFullWidth
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={() => {
                logout();
                navigate('/login');
                setIsMobileMenuOpen(false);
              }}
            >
              Keluar ({user?.name})
            </Button>
          ) : (
            <Button
              variant="secondary"
              isFullWidth
              onClick={() => {
                navigate('/login');
                setIsMobileMenuOpen(false);
              }}
            >
              Masuk
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
