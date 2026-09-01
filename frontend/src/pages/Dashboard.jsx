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
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
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

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        console.error('Failed to load campaigns:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const platforms = ['All', 'TikTok', 'Instagram', 'Facebook'];

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.product_name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPlatform =
      selectedPlatform === 'All' ||
      c.platform?.toLowerCase() === selectedPlatform.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  const completedCount = campaigns.filter(
    (c) => c.status === 'Completed' || c.status === 'Sukses'
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
                Cara Kerja 5 Sub-Agent TAHRA AI
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                1. Input Parameter Produk → 2. Cek Anti-Boncos & Naskah PAS → 3. Dapatkan Blueprint Ads Manager Siap Pakai.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/new')}
            className="shrink-0 text-xs h-8"
          >
            Mulai Simulasi Baru →
          </Button>
        </div>

        {/* Metric Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            title="Total Kampanye"
            value={campaigns.length}
            subtitle="Diuji oleh 5 Multi-Agent"
            icon={<Layers className="w-5 h-5" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Kampanye Selesai"
            value={completedCount}
            subtitle="Strategi Siap Dieksekusi"
            icon={<ShieldCheck className="w-5 h-5" />}
            trend={`${Math.round((completedCount / (campaigns.length || 1)) * 100)}% Rasio Siap`}
            trendDirection="up"
            isLoading={isLoading}
          />
          <StatCard
            title="Rata-rata ROAS"
            value="210"
            suffix="%"
            subtitle="Prediksi Nilai Balik Modal"
            icon={<TrendingUp className="w-5 h-5" />}
            trend="+35% vs Ads Manual"
            trendDirection="up"
            isLoading={isLoading}
          />
          <StatCard
            title="Unit Economics"
            value="Anti-Boncos"
            subtitle="Proteksi Margin Minimum 20%"
            icon={<BarChart3 className="w-5 h-5" />}
            isLoading={isLoading}
          />
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 p-3 bg-neutral-950/60 rounded-2xl border border-neutral-900">
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

          {/* Platform Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedPlatform === p
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-transparent'
                }`}
              >
                {p === 'All' ? 'Semua Platform' : p}
              </button>
            ))}
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
              searchQuery || selectedPlatform !== 'All'
                ? 'Tidak ada produk yang cocok dengan filter pencarian Anda. Coba sesuaikan kata kunci.'
                : 'Mulai buat strategi periklanan pertama Anda menggunakan 5 Sub-Agent AI otonom.'
            }
            actionLabel="Buat Kampanye Pertama"
            onAction={() => navigate('/new')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCampaigns.map((c, idx) => {
              const platformKey = (c.platform || 'tiktok').toLowerCase();
              const icon = platformIcons[platformKey] || '📢';
              const roasDisplay = c.roas || (c.result?.roas_report?.roas_percentage ? `${c.result.roas_report.roas_percentage}%` : '210%');

              return (
                <Card
                  key={c.id || idx}
                  hasRedBar
                  isHoverable
                  onClick={() =>
                    navigate(`/campaign/${c.id || idx}`, { state: { campaign: c } })
                  }
                  className="flex flex-col justify-between"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-xl shrink-0">
                        {icon}
                      </div>
                      <StatusBadge status={c.status || 'Completed'} />
                    </div>

                    <CardTitle className="text-base line-clamp-1 group-hover:text-rose-400 transition-colors">
                      {c.product_name}
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
                        Target ROAS
                      </span>
                      <span className="text-lg font-black text-rose-400 font-mono tracking-tight">
                        {roasDisplay}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 hover:text-white group">
                      <span>Buka Laporan</span>
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
                Tambah Kampanye
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
