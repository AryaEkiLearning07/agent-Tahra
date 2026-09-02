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
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

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
  const statusTabs = [
    { key: 'All', label: 'Semua Status' },
    { key: 'Running', label: '🟢 Iklan Aktif' },
    { key: 'Ready', label: '📋 Blueprint Siap' },
    { key: 'Veto', label: '🛡️ Terproteksi' },
  ];

  const filteredCampaigns = safeCampaigns.filter((c) => {
    if (!c) return false;
    const matchesSearch = c.product_name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPlatform =
      selectedPlatform === 'All' ||
      c.platform?.toLowerCase() === selectedPlatform.toLowerCase();

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Running' && (c.status?.toLowerCase() === 'running' || c.status?.toLowerCase() === 'aktif')) ||
      (selectedStatus === 'Ready' && (c.status?.toLowerCase() === 'ready' || c.status?.toLowerCase() === 'completed' || c.status?.toLowerCase() === 'sukses')) ||
      (selectedStatus === 'Veto' && (c.status?.toLowerCase() === 'veto' || c.status?.toLowerCase() === 'rejected'));

    return matchesSearch && matchesPlatform && matchesStatus;
  });

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

  const displayName = user?.name || 'Owner UMKM';
  const displayCompany = user?.company || 'Pebisnis Digital';

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="Pusat Komando Strategi AI"
        title={`Dashboard Kampanye • ${displayCompany}`}
        description={`Selamat datang kembali, ${displayName}! Pantau seluruh simulasi iklan anti-boncos dan strategi periklanan produk Anda dalam satu dasbor terpadu.`}
        actions={
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
            onClick={() => navigate('/new')}
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
            onClick={() => navigate('/new')}
            className="shrink-0 text-xs"
          >
            Uji Produk Baru →
          </Button>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
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

        {/* Filter Bar: Search + Status Tabs + Platform Filters */}
        <div className="flex flex-col gap-3 mb-6 p-3 bg-neutral-950/60 rounded-2xl border border-neutral-900">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Box */}
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

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {statusTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedStatus(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedStatus === tab.key
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Filter Chips */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-900/80 text-xs">
            <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
              Filter Channel:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedPlatform === p
                      ? 'bg-neutral-800 text-white border border-neutral-700'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign List Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <CampaignCardSkeleton key={n} />
            ))}
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <EmptyState
            title="Belum Ada Kampanye"
            description={
              searchQuery || selectedPlatform !== 'All' || selectedStatus !== 'All'
                ? 'Tidak ada produk yang cocok dengan filter aktif. Coba ubah pencarian atau tab status.'
                : 'Mulai buat strategi periklanan pertama Anda menggunakan 5 Sub-Agent AI otonom.'
            }
            actionLabel="Uji Produk Pertama Sekarang"
            onAction={() => navigate('/new')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCampaigns.map((c, idx) => {
              if (!c) return null;
              const platformKey = (c.platform || 'tiktok').toLowerCase();
              const icon = platformIcons[platformKey] || '📢';
              const roasDisplay =
                c.roas ||
                (c.result?.roas_report?.roas_percentage
                  ? `${c.result.roas_report.roas_percentage}%`
                  : '210%');

              return (
                <Card
                  key={c.id || idx}
                  hasRedBar
                  isHoverable
                  onClick={() =>
                    navigate(`/campaign/${c.id || idx}`, { state: { campaign: c } })
                  }
                  className="flex flex-col justify-between cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-xl shrink-0">
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
                      {c.target_audience ||
                        c.result?.agent1_research?.target_demography ||
                        c.result?.product?.audience_psychography ||
                        'Target audiens UMKM yang telah disesuaikan oleh Sub-Agent 1 & 2.'}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                        Estimasi ROAS (Balik Modal)
                      </span>
                      <span className="text-lg font-black text-rose-400 font-mono tracking-tight">
                        {c.status?.toLowerCase() === 'veto' ? '-' : roasDisplay}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 hover:text-white group">
                      <span>{c.status?.toLowerCase() === 'veto' ? 'Lihat Alasan Veto' : 'Buka Blueprint'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </CardFooter>
                </Card>
              );
            })}

            {/* Quick Add Card Slot */}
            <div
              onClick={() => navigate('/new')}
              className="rounded-2xl border-2 border-dashed border-neutral-800 hover:border-rose-500/50 bg-neutral-950/30 hover:bg-rose-500/[0.02] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(244,63,94,0.15)] mb-3">
                <Plus className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">
                Uji Produk Baru
              </h4>
              <p className="text-xs text-neutral-500 font-medium max-w-[200px]">
                Analisis produk baru dengan simulasi matematis instan
              </p>
            </div>
          </div>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
}
