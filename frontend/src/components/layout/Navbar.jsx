import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, LogOut, Menu, X, LayoutDashboard, Home, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { TahraLogo } from '../ui/TahraLogo';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, setTheme, isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#08120d]/90 backdrop-blur-2xl border-b border-emerald-500/20 dark:border-emerald-500/25 shadow-[0_4px_24px_rgba(16,185,129,0.06)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Integrated Brand: [Glossy T-Logo] + TAHRA + .AI */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center cursor-pointer group select-none gap-2.5"
        >
          <TahraLogo size="sm" className="group-hover:scale-105 transition-transform" />

          <div className="flex items-center">
            <span className="font-extrabold text-[22px] tracking-[-0.03em] text-emerald-950 dark:text-white leading-none font-heading">
              TAHRA
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-black text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 font-mono tracking-wider ml-1.5 shadow-sm">
              .AI
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-emerald-50/80 dark:bg-[#0f241a] p-1 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={cn(
                  'flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/25'
                    : 'text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-emerald-900/40'
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
          {/* EXPLICIT 2-BUTTON SEGMENTED THEME TOGGLE (Terang / Gelap) */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#0c1f17] border border-slate-200/80 dark:border-emerald-800/60 shadow-inner">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer select-none font-heading',
                !isDark
                  ? 'bg-white text-emerald-950 shadow-md border border-emerald-300/60'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              )}
              title="Aktifkan Mode Terang (Light Mode)"
              aria-label="Mode Terang"
            >
              <Sun className={cn('w-3.5 h-3.5', !isDark ? 'text-amber-500 fill-amber-400' : 'text-slate-400')} />
              <span>Terang</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer select-none font-heading',
                isDark
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              )}
              title="Aktifkan Mode Gelap (Dark Mode)"
              aria-label="Mode Gelap"
            >
              <Moon className={cn('w-3.5 h-3.5', isDark ? 'text-emerald-100 fill-emerald-100' : 'text-slate-400')} />
              <span>Gelap</span>
            </button>
          </div>

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
            <div className="flex items-center gap-3 pl-3 border-l border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold truncate max-w-[120px]">
                    {user?.company || 'UMKM'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
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
          {/* Mobile Theme Switcher Icon */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-emerald-50 dark:bg-[#0f241a] border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

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
        <div className="md:hidden bg-white/95 dark:bg-[#08120d]/95 backdrop-blur-2xl border-b border-emerald-200 dark:border-emerald-800 px-4 py-4 flex flex-col gap-3 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-950 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-left"
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}

          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-100 dark:bg-[#0c1f17] border border-slate-200 dark:border-emerald-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-heading">Tema Tampilan</span>
            <div className="flex items-center p-0.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all',
                  !isDark ? 'bg-emerald-600 text-white' : 'text-slate-500'
                )}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Terang</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all',
                  isDark ? 'bg-emerald-600 text-white' : 'text-slate-500'
                )}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Gelap</span>
              </button>
            </div>
          </div>

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
