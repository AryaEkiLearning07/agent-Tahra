import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Bot,
  Layers,
  ArrowLeft,
  ExternalLink,
  Target,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, StatusBadge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { formatRp, formatDate, formatPercent } from '../utils/formatters';

export default function CampaignDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const campaign = state?.campaign;
  const result = campaign?.result;

  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Fallback defaults if opened directly
  const productName =
    result?.product?.product_name ||
    campaign?.product_name ||
    'Produk Demo TAHRA AI';

  const fin = result?.financial_report || {
    margin_value: 17500,
    margin_percentage: 58.3,
    financial_status: 'HEALTHY',
    consultation_advice:
      'Margin sangat sehat! Ideal untuk kampanye iklan digital dengan CPA agresif.',
  };

  const strat = result?.strategy || {
    target_demography: 'Pria & Wanita 18-35 tahun, Pengguna Aktif TikTok',
    platform: campaign?.platform || 'TikTok',
    aspect_ratio: '9:16',
    bidding_model: 'CPM',
    max_cpa_limit: 7000,
  };

  const creative = result?.creative || {
    headline: 'Pedas Nendang, Bikin Nagih Sejak Suapan Pertama!',
    primary_text:
      'Bosan sama sambal biasa yang rasanya hambar? Sambal TAHRA dibuat dari 100% cabai segar pilihan tanpa bahan pengawet. Sensasi pedas gurihnya langsung bikin nafsu makan berlipat ganda!',
    cta: 'Pesan Sekarang Gratis Ongkir 🔥',
    image_prompt:
      'Commercial close-up photograph of artisan Indonesian chili paste jar with glossy red oil, fresh fiery red chili peppers and garlic cloves around the base, dramatic studio lighting with dark moody background, high-end food magazine photography, 9:16 vertical ratio.',
  };

  const roas = result?.roas_report || {
    budget_harian: campaign?.budget || 100000,
    estimasi_tayangan: 5000,
    estimasi_klik: 100,
    estimasi_pembeli: 3,
    estimasi_omzet: 105000,
    estimasi_laba_bersih: 15000,
    roas_percentage: 105.0,
    roas_status: 'PROFIT',
    summary:
      'Proyeksi ROAS positif (105%). Setiap Rp 100 biaya iklan diproyeksikan menghasilkan omzet Rp 105 dengan laba bersih positif.',
  };

  const isVeto =
    fin.financial_status === 'VETO' || result?.status === 'VETO';
  const isProfitable =
    roas.roas_status === 'PROFIT' || roas.roas_percentage >= 100;
  const trackingLink = `https://tahra.ai/track?id=${campaign?.id || id || '123'}`;

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="Laporan Strategis AI"
        title={productName}
        description={`Blueprint strategi periklanan terverifikasi oleh 5 Sub-Agent AI TAHRA • Dibuat pada ${formatDate(
          campaign?.created_at || new Date()
        )}`}
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
        actions={
          <div className="flex items-center gap-3">
            <StatusBadge status={isVeto ? 'Veto' : 'Completed'} />
            <Button
              variant="outline"
              size="sm"
              leftIcon={
                copiedKey === 'share' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )
              }
              onClick={() => handleCopy(window.location.href, 'share')}
            >
              {copiedKey === 'share' ? 'Tersalin!' : 'Bagikan Laporan'}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-8">
          {/* VETO ALERT BANNER */}
          {isVeto && (
            <Alert
              variant="danger"
              title="🚫 Kampanye Dihentikan oleh Agent 2 (Anti-Boncos Filter)"
            >
              {fin.consultation_advice}
            </Alert>
          )}

          {/* Section 1: Financial & Unit Economics Card */}
          <Card hasRedBar className="p-6 sm:p-8">
            <CardHeader className="p-0 pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">
                  <DollarSign className="w-5 h-5 text-rose-500" />
                  <span>Card A: Unit Economics & Validasi Finansial (Agent 2)</span>
                </CardTitle>
                <Badge
                  variant={fin.financial_status === 'HEALTHY' ? 'success' : 'warning'}
                >
                  {fin.financial_status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Margin Kotor
                  </span>
                  <p
                    className="text-2xl font-black font-mono mt-1"
                    style={{
                      color:
                        fin.financial_status === 'HEALTHY' ? '#34d399' : '#fbbf24',
                    }}
                  >
                    {formatPercent(fin.margin_percentage, 1)}
                  </p>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Ambang batas aman &gt;30%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Nominal Profit per Unit
                  </span>
                  <p className="text-2xl font-black font-mono text-white mt-1">
                    {formatRp(fin.margin_value)}
                  </p>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Harga Jual - HPP Modal
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Batas Maksimal CPA
                  </span>
                  <p className="text-2xl font-black font-mono text-rose-400 mt-1">
                    {formatRp(strat.max_cpa_limit || fin.margin_value * 0.4)}
                  </p>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Maks 40% dari Margin Profit
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 leading-relaxed font-medium flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Nasihat Advisor:</strong> {fin.consultation_advice}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Campaign Strategy & Creatives */}
          {!isVeto && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Media Planning Strategy */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base">
                      <Target className="w-5 h-5 text-rose-500" />
                      <span>Card B: Media Planning (Agent 3)</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex flex-col gap-4 text-xs font-medium">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Platform Terpilih
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="brand">{strat.platform}</Badge>
                        <Badge variant="neutral">{strat.aspect_ratio || '9:16'}</Badge>
                        <Badge variant="info">{strat.bidding_model || 'CPM'}</Badge>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Target Demografi & Psikografi
                      </span>
                      <p className="text-neutral-300 leading-relaxed bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                        {strat.target_demography}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Tracking Link Siap Pasang
                      </span>
                      <div className="flex items-center gap-2 bg-neutral-900/90 p-2.5 rounded-xl border border-neutral-800">
                        <span className="font-mono text-neutral-300 text-[11px] truncate flex-1">
                          {trackingLink}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(trackingLink, 'track')}
                          className="shrink-0 h-7 px-2"
                        >
                          {copiedKey === 'track' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Creative Copywriting PAS & Visual Prompt */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        <FileText className="w-5 h-5 text-rose-500" />
                        <span>Card C: Copywriting & Visual (Agent 4A)</span>
                      </CardTitle>
                      <Badge variant="brand">PAS Framework</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 flex flex-col gap-5 text-xs font-medium">
                    {/* Headline */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          Headline Iklan
                        </span>
                        <button
                          onClick={() => handleCopy(creative.headline, 'head')}
                          className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                        >
                          {copiedKey === 'head' ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Salin</span>
                        </button>
                      </div>
                      <p className="text-sm font-black text-white bg-neutral-900/70 p-3 rounded-xl border border-neutral-800 tracking-tight leading-snug">
                        {creative.headline}
                      </p>
                    </div>

                    {/* Primary Text */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          Caption Iklan (Problem - Agitate - Solution)
                        </span>
                        <button
                          onClick={() => handleCopy(creative.primary_text, 'body')}
                          className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                        >
                          {copiedKey === 'body' ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Salin</span>
                        </button>
                      </div>
                      <p className="text-neutral-300 bg-neutral-900/70 p-3.5 rounded-xl border border-neutral-800 leading-relaxed">
                        {creative.primary_text}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                        Call-to-Action:
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold rounded-lg text-xs shadow-md shadow-rose-950/40">
                        {creative.cta}
                      </span>
                    </div>

                    {/* AI Image Generator Prompt */}
                    <div className="pt-3 border-t border-neutral-800">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          Prompt Text-to-Image (Sub-Agent 4B)
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(creative.image_prompt, 'prompt')
                          }
                          className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                        >
                          {copiedKey === 'prompt' ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Salin Prompt</span>
                        </button>
                      </div>
                      <div className="p-3 bg-black/60 rounded-xl border border-rose-500/20 font-mono text-[11px] text-neutral-400 leading-relaxed italic">
                        "{creative.image_prompt}"
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Section 3: Predictive Financial & ROAS Model Table */}
          {!isVeto && (
            <Card hasRedBar className="p-6 sm:p-8">
              <CardHeader className="p-0 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-base sm:text-lg">
                    <TrendingUp className="w-5 h-5 text-rose-500" />
                    <span>Card D: Proyeksi Finansial & ROAS (Agent 5B)</span>
                  </CardTitle>
                  <Badge
                    variant={isProfitable ? 'success' : 'danger'}
                    size="md"
                    hasDot
                  >
                    {isProfitable ? 'PROFIT ROAS' : 'RISIKO BONCOS'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Big ROAS Display */}
                <div className="text-center py-6 px-4 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 rounded-2xl border border-neutral-800 mb-6">
                  <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                    Estimasi Nilai Balik Modal Iklan
                  </span>
                  <div
                    className="text-5xl sm:text-7xl font-black font-mono tracking-tight my-2"
                    style={{ color: isProfitable ? '#34d399' : '#f87171' }}
                  >
                    {formatPercent(roas.roas_percentage, 1)}
                  </div>
                  <p className="text-xs text-neutral-400 font-medium max-w-md mx-auto">
                    {roas.summary}
                  </p>
                </div>

                {/* Detailed Matrix Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metrik Finansial</TableHead>
                      <TableHead className="text-right">Estimasi AI</TableHead>
                      <TableHead>Penjelasan untuk Pemilik Bisnis</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold text-white">Budget Iklan Harian</TableCell>
                      <TableCell className="text-right font-mono font-bold text-rose-400">
                        {formatRp(roas.budget_harian)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">
                        Alokasi budget yang Anda tetapkan
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Tayangan (CPM Rp 20rb)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(roas.estimasi_tayangan).toLocaleString('id-ID')} orang
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">
                        Jumlah calon konsumen yang melihat iklan Anda
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Klik (CTR 2%)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(roas.estimasi_klik).toLocaleString('id-ID')} orang
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">
                        Calon pembeli yang tertarik mengklik tautan iklan
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Pembeli (CVR 3%)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(roas.estimasi_pembeli).toLocaleString('id-ID')} transaksi
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">
                        Konsumen yang berhasil checkout dan membayar
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Omzet Harian</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {formatRp(roas.estimasi_omzet)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">
                        Total penjualan kotor harian
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Laba Bersih</TableCell>
                      <TableCell
                        className="text-right font-mono font-black"
                        style={{
                          color: roas.estimasi_laba_bersih >= 0 ? '#34d399' : '#f87171',
                        }}
                      >
                        {formatRp(roas.estimasi_laba_bersih)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">
                        Omzet dikurangi modal HPP dan biaya iklan
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
