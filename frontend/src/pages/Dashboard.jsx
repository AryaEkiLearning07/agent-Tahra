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
    <div className="bg-main min-h-screen flex flex-col justify-between">
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
        {/* Onboarding / Workflow Quick Guide Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-neutral-950/60 to-rose-950/30 border border-rose-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Cara Kerja 5 Sub-Agent TAHRA AI untuk Pemula
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                Tidak perlu paham istilah teknis iklan! AI otomatis meriset pasar, memilihkan platform terbaik, menuliskan naskah video, dan melindungi modal Anda dari risiko rugi.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateCampaignClick}
            className="shrink-0 text-xs font-bold"
          >
            Uji Produk Baru →
          </Button>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Produk Diuji"
            value={safeCampaigns.length}
            subtitle="Diuji oleh 5 Multi-Agent"
            icon={<Layers className="w-5 h-5" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Iklan Sedang Tayang"
            value={runningCount}
            subtitle="Live Aktif Menghasilkan Penjualan"
            icon={<PlayCircle className="w-5 h-5" />}
            trend={`${runningCount} Kampanye Aktif`}
            trendDirection="up"
            isLoading={isLoading}
          />
          <StatCard
            title="Blueprint Siap Pakai"
            value={readyCount}
            subtitle="Tinggal Salin ke Ads Manager"
            icon={<CheckCircle2 className="w-5 h-5" />}
            trend="1-Click Copy Ready"
            trendDirection="up"
            isLoading={isLoading}
          />
          <StatCard
            title="Modal Terproteksi"
            value={vetoCount}
            subtitle="Produk Dicegah Boncos (Margin <20%)"
            icon={<ShieldAlert className="w-5 h-5" />}
            isLoading={isLoading}
          />
        </div>

        {/* Search & Channel Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 p-3 bg-neutral-950/70 rounded-2xl border border-neutral-900">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama produk / kampanye..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2 border border-neutral-800 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mr-1">
              Platform:
            </span>
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedPlatform === p
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN 1: KAMPANYE SEDANG BERJALAN (RUNNING / PROSES AI AKTIF) */}
        {/* ========================================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <PlayCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-tight font-heading flex items-center gap-2">
                  1. Kampanye Sedang Berjalan (Live Running)
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                    {runningCampaigns.length} Aktif
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Klik card produk untuk memantau detail proses 5 Sub-Agent AI & telemetri iklan secara langsung.
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2].map((n) => <CampaignCardSkeleton key={n} />)}
            </div>
          ) : runningCampaigns.length === 0 ? (
            <div className="p-8 rounded-2xl bg-neutral-950/40 border border-neutral-900 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-500 flex items-center justify-center mb-3">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-neutral-300 mb-1">Tidak Ada Kampanye yang Sedang Running</h4>
              <p className="text-xs text-neutral-500 max-w-sm mb-4">
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
                    hasRedBar
                    isHoverable
                    onClick={() => navigate(`/campaign/${c.id || idx}`, { state: { campaign: c, viewMode: 'process' } })}
                    className="flex flex-col justify-between cursor-pointer border-emerald-500/30 hover:border-emerald-500/60"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl shrink-0">
                          {icon}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-black uppercase text-emerald-300 flex items-center gap-1.5 font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          LIVE RUNNING
                        </span>
                      </div>

                      <CardTitle className="text-base line-clamp-1 group-hover:text-emerald-400 transition-colors">
                        {c.product_name || 'Produk UMKM'}
                      </CardTitle>

                      <CardDescription>
                        {c.platform || 'Multi-Platform'} • Budget {formatRp(c.budget || 100000)}/hari
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-medium">
                        {c.target_audience || c.result?.agent1_research?.target_demography || 'Target audiens teroptimasi 5 Sub-Agent AI.'}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-3 border-t border-neutral-800/80">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          Target ROAS
                        </span>
                        <span className="text-base font-black text-emerald-400 font-mono">
                          {roasDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-neutral-300 hover:text-white group">
                        <span>Lihat Proses Tahap 1-5</span>
                        <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN 2: KAMPANYE SELESAI (LAPORAN HASIL IKLAN & BLUEPRINT ARSIP) */}
        {/* ========================================================================= */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-tight font-heading flex items-center gap-2">
                  2. Kampanye Selesai (Laporan Hasil Iklan & Blueprint)
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300">
                    {completedCampaigns.length} Selesai
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Klik card produk yang sudah selesai untuk langsung membuka laporan performa akhir & rekapitulasi laba.
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2].map((n) => <CampaignCardSkeleton key={n} />)}
            </div>
          ) : completedCampaigns.length === 0 ? (
            <div className="p-8 rounded-2xl bg-neutral-950/40 border border-neutral-900 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-500 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-neutral-300 mb-1">Belum Ada Riwayat Kampanye Selesai</h4>
              <p className="text-xs text-neutral-500 max-w-sm">
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
                    hasRedBar
                    isHoverable
                    onClick={() => navigate(`/campaign/${c.id || idx}`, { state: { campaign: c, viewMode: 'report' } })}
                    className="flex flex-col justify-between cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xl shrink-0">
                          {icon}
                        </div>
                        <StatusBadge status={c.status || 'Ready'} />
                      </div>

                      <CardTitle className="text-base line-clamp-1 group-hover:text-rose-400 transition-colors">
                        {c.product_name || 'Produk UMKM'}
                      </CardTitle>

                      <CardDescription>
                        {c.platform || 'Multi-Platform'} • {formatDate(c.created_at || c.date)}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-medium">
                        {isVeto
                          ? 'Iklan dicegah tayang oleh Sub-Agent 2 karena margin laba berada di bawah batas aman anti-boncos.'
                          : (c.result?.agent5_deploy?.qc_notes || 'Laporan hasil eksekusi strategi iklan 5 Sub-Agent AI telah selesai disusun.')}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-3 border-t border-neutral-800/80">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          {isVeto ? 'Status Evaluasi' : 'ROAS Tercapai'}
                        </span>
                        <span className={`text-base font-black font-mono ${isVeto ? 'text-rose-500' : 'text-rose-400'}`}>
                          {isVeto ? 'TERPROTEKSI VETO' : roasDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 hover:text-white group">
                        <span>{isVeto ? 'Buka Analisis Veto' : 'Buka Laporan Hasil'}</span>
                        <ArrowUpRight className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
