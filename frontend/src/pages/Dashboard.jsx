import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Filter,
  ArrowUpRight,
  Bot,
  Zap,
  HelpCircle,
  PlayCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, StatusBadge } from '../components/ui/Badge';
import { CampaignCardSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuth } from '../context/AuthContext';
import { getCampaigns } from '../services/api';
import { formatRp, formatDate } from '../utils/formatters';
import { cn } from '../utils/cn';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getCampaigns();
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load campaigns:', err);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const safeCampaigns = Array.isArray(campaigns) ? campaigns : [];
  const platforms = ['All', 'TikTok', 'Instagram', 'Facebook'];

  const filteredCampaigns = safeCampaigns.filter((c) => {
    if (!c) return false;
    const matchesSearch = c.product_name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPlatform =
      selectedPlatform === 'All' ||
      c.platform?.toLowerCase() === selectedPlatform.toLowerCase();

    return matchesSearch && matchesPlatform;
  });

  // Separate into 2 Dedicated Categories
  const runningCampaigns = filteredCampaigns.filter(
    (c) => c && (c.status?.toLowerCase() === 'running' || c.status?.toLowerCase() === 'aktif')
  );

  const completedCampaigns = filteredCampaigns.filter(
    (c) => c && (c.status?.toLowerCase() !== 'running' && c.status?.toLowerCase() !== 'aktif')
  );

  const runningCount = safeCampaigns.filter(
    (c) => c && (c.status?.toLowerCase() === 'running' || c.status?.toLowerCase() === 'aktif')
  ).length;

  const readyCount = safeCampaigns.filter(
    (c) => c && (c.status?.toLowerCase() === 'ready' || c.status?.toLowerCase() === 'completed')
  ).length;

  const vetoCount = safeCampaigns.filter(
    (c) => c && c.status?.toLowerCase() === 'veto'
  ).length;

  const platformIcons = {
    tiktok: '🎵',
    instagram: '📸',
    facebook: '📢',
    google: '🔍',
  };

  const handleCreateCampaignClick = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          redirect: '/new',
          message: 'Silakan masuk atau daftar akun terlebih dahulu untuk mulai membuat kampanye iklan AI.',
        },
      });
    } else {
      navigate('/new');
    }
  };

  const displayName = user?.name;
  const displayCompany = user?.company || 'Brand UMKM Digital';

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between transition-colors">
      <Navbar />

      <PageContainer
        badge="Pusat Komando Strategi AI"
        title={isAuthenticated ? `Dashboard Kampanye • ${displayCompany}` : 'Dashboard Kampanye Tahra.ai'}
        description={
          isAuthenticated
            ? `Selamat datang kembali, ${displayName}! Pantau seluruh kampanye aktif dan laporan hasil periklanan bisnis Anda.`
            : 'Selamat datang di Tahra.ai! Masuk untuk memantau performa iklan dan mengelola kampanye aktif Anda secara otonom.'
        }
        actions={
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
            onClick={handleCreateCampaignClick}
          >
            Buat Kampanye Baru
          </Button>
        }
      >
        {/* Top 4 KPI Metrics with Multi-Color Theming */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            variant="indigo"
            title="Total Produk Diuji"
            value={safeCampaigns.length}
            subtitle="Diuji oleh 5 Multi-Agent"
            icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            isLoading={isLoading}
          />
          <StatCard
            variant="emerald"
            title="Iklan Sedang Tayang"
            value={runningCount}
            subtitle="Live Aktif Menghasilkan Penjualan"
            icon={<PlayCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            trend={`${runningCount} Kampanye Aktif`}
            trendDirection="up"
            isLoading={isLoading}
          />
          <StatCard
            variant="cyan"
            title="Blueprint Siap Pakai"
            value={readyCount}
            subtitle="Tinggal Salin ke Ads Manager"
            icon={<CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
            trend="1-Click Copy Ready"
            trendDirection="up"
            isLoading={isLoading}
          />
          <StatCard
            variant="amber"
            title="Modal Terproteksi"
            value={vetoCount}
            subtitle="Produk Dicegah Boncos (Margin <20%)"
            icon={<ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            isLoading={isLoading}
          />
        </div>

        {/* Search & Channel Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 p-3 bg-white/90 dark:bg-[#0c1f17]/90 rounded-2xl border border-slate-200/80 dark:border-emerald-800/60 shadow-sm backdrop-blur-xl">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama produk / kampanye..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50/70 dark:bg-emerald-950/40 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2 border border-slate-200 dark:border-emerald-800 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 font-heading">
              Platform:
            </span>
            {platforms.map((p) => {
              const isActive = selectedPlatform === p;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer',
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/20'
                      : p === 'TikTok'
                      ? 'bg-rose-50/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/70 dark:border-rose-800/50 hover:bg-rose-100'
                      : p === 'Instagram'
                      ? 'bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/50 hover:bg-indigo-100'
                      : p === 'Facebook'
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/50 hover:bg-blue-100'
                      : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-[#0f271d] border border-slate-200 dark:border-emerald-700/80 hover:bg-slate-50'
                  )}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD PEMBUNGKUS 1: KAMPANYE SEDANG BERJALAN (LIVE RUNNING) */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0c1f17]/95 border border-emerald-500/25 dark:border-emerald-500/30 shadow-xl shadow-emerald-950/5 dark:shadow-black/40 backdrop-blur-xl mb-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-emerald-100 dark:border-emerald-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 flex items-center justify-center shadow-sm">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950 dark:text-white tracking-tight font-heading flex items-center gap-2.5">
                  1. Kampanye Sedang Berjalan (Live Running)
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 animate-pulse">
                    {runningCampaigns.length} Aktif
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Klik card produk untuk memantau keseluruhan tiap tahap proses 5 Sub-Agent AI secara live.
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2].map((n) => <CampaignCardSkeleton key={n} />)}
            </div>
          ) : runningCampaigns.length === 0 ? (
            <div className="p-8 rounded-2xl bg-emerald-50/40 dark:bg-[#0a1c14] border border-emerald-200/80 dark:border-emerald-800/60 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0f271d] border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 shadow-sm">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 dark:text-white mb-1 font-heading">Tidak Ada Kampanye yang Sedang Running</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                Mulai buat strategi periklanan baru agar 5 Sub-Agent AI membedah pasar dan menayangkan iklan otonom Anda.
              </p>
              <Button variant="outline" size="sm" onClick={handleCreateCampaignClick}>
                + Jalankan Kampanye Baru
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {runningCampaigns.map((c, idx) => {
                const platformKey = (c.platform || 'tiktok').toLowerCase();
                const icon = platformIcons[platformKey] || '📢';
                const roasDisplay = c.roas || `${c.result?.roas_report?.roas_percentage || '240'}%`;

                return (
                  <Card
                    key={c.id || idx}
                    hasBrandBar
                    isHoverable
                    onClick={() => navigate(`/campaign/${c.id || idx}`, { state: { campaign: c, viewMode: 'process' } })}
                    className="flex flex-col justify-between cursor-pointer border-emerald-300/80 dark:border-emerald-700/80 hover:border-emerald-500 bg-white dark:bg-[#0c1f17]"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center text-xl shrink-0">
                          {icon}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          LIVE RUNNING
                        </span>
                      </div>

                      <CardTitle className="text-base line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        {c.product_name || 'Produk UMKM'}
                      </CardTitle>

                      <CardDescription>
                        {c.platform || 'Multi-Platform'} • Budget {formatRp(c.budget || 100000)}/hari
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                        {c.target_audience || c.result?.agent1_research?.target_demography || 'Target audiens teroptimasi 5 Sub-Agent AI.'}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-3 border-t border-emerald-100 dark:border-emerald-900/60">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-heading">
                          Target ROAS
                        </span>
                        <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-heading">
                          {roasDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-white group">
                        <span>Lihat Proses Tahap 1-5</span>
                        <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CARD PEMBUNGKUS 2: KAMPANYE SELESAI (LAPORAN HASIL IKLAN & ARSIP) */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0c1f17]/95 border border-emerald-500/20 dark:border-emerald-500/30 shadow-xl shadow-emerald-950/5 dark:shadow-black/40 backdrop-blur-xl mb-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-emerald-100 dark:border-emerald-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950 dark:text-white tracking-tight font-heading flex items-center gap-2.5">
                  2. Kampanye Selesai (Laporan Hasil Iklan & Blueprint)
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {completedCampaigns.length} Selesai
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Klik card produk untuk langsung menampilkan laporannya saja (hasil iklannya bagaimana).
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2].map((n) => <CampaignCardSkeleton key={n} />)}
            </div>
          ) : completedCampaigns.length === 0 ? (
            <div className="p-8 rounded-2xl bg-emerald-50/40 dark:bg-[#0a1c14] border border-emerald-200/80 dark:border-emerald-800/60 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0f271d] border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 dark:text-white mb-1 font-heading">Belum Ada Riwayat Kampanye Selesai</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                Laporan performa dan rekapitulasi omzet akan otomatis tersimpan di sini setelah kampanye selesai.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {completedCampaigns.map((c, idx) => {
                const platformKey = (c.platform || 'tiktok').toLowerCase();
                const icon = platformIcons[platformKey] || '📢';
                const isVeto = c.status?.toLowerCase() === 'veto';
                const roasDisplay = c.roas || `${c.result?.roas_report?.roas_percentage || '240'}%`;

                return (
                  <Card
                    key={c.id || idx}
                    hasBrandBar
                    isHoverable
                    onClick={() => navigate(`/campaign/${c.id || idx}`, { state: { campaign: c, viewMode: 'report' } })}
                    className="flex flex-col justify-between cursor-pointer bg-white dark:bg-[#0c1f17]"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center text-xl shrink-0">
                          {icon}
                        </div>
                        <StatusBadge status={c.status || 'Ready'} />
                      </div>

                      <CardTitle className="text-base line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        {c.product_name || 'Produk UMKM'}
                      </CardTitle>

                      <CardDescription>
                        {c.platform || 'Multi-Platform'} • {formatDate(c.created_at || c.date)}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                        {isVeto
                          ? 'Iklan dicegah tayang oleh Sub-Agent 2 karena margin laba berada di bawah batas aman anti-boncos.'
                          : (c.result?.agent5_deploy?.qc_notes || 'Laporan hasil eksekusi strategi iklan 5 Sub-Agent AI telah selesai disusun.')}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-3 border-t border-emerald-100 dark:border-emerald-900/60">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-heading">
                          {isVeto ? 'Status Evaluasi' : 'ROAS Tercapai'}
                        </span>
                        <span className={`text-base font-extrabold font-heading ${isVeto ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                          {isVeto ? 'TERPROTEKSI VETO' : roasDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-white group">
                        <span>{isVeto ? 'Buka Analisis Veto' : 'Buka Laporan Hasil'}</span>
                        <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
