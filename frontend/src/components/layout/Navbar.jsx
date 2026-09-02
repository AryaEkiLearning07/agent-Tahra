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
          className="flex items-center gap-1.5 cursor-pointer group select-none"
        >
          <TahraLogo size="sm" className="group-hover:scale-105 transition-transform" />
          <div className="flex items-center">
            <span className="font-black text-xl tracking-tight text-white font-heading">
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
