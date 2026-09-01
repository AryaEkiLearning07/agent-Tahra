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
  Video,
  Code2,
  CheckCircle2,
  Users,
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
    navigator.clipboard.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Safe extraction supporting both unified 5-agent schema and legacy formats
  const agent1 = result?.agent1_research || result?.product || {
    product_name: campaign?.product_name || 'Produk UMKM TAHRA',
    product_class: 'Menengah',
    target_demography: 'Pria & Wanita 18-35 tahun, Urban',
    audience_psychography: 'Konsumen modern pencari cita rasa autentik dan kepraktisan.',
    usp: 'Kualitas rasa autentik Nusantara tanpa bahan pengawet sintesis.',
    pain_points: ['Bosan dengan rasa sambal pasaran yang hambar', 'Sulit menemukan sambal higienis praktis'],
    competitor_proxy: 'Sambal Bu Rudy / Sambal Kemasan Supermarket',
  };

  const agent2 = result?.agent2_strategy || result?.financial_report || {
    margin_value: 17500,
    margin_percentage: 58.3,
    financial_status: 'HEALTHY',
    platform: campaign?.platform || 'TikTok',
    format_iklan: 'Video Pendek (9:16)',
    aspect_ratio: '9:16',
    bidding_model: 'CPM',
    max_cpa_limit: 7000,
    strategic_rationale: 'Margin sangat sehat! Format video vertikal 9:16 di TikTok ideal untuk produk visual FMCG.',
  };

  const agent3 = result?.agent3_creative || result?.creative || {
    headline: 'Pedas Nendang, Bikin Nagih Sejak Suapan Pertama!',
    primary_text:
      'Bosan sama sambal biasa yang rasanya hambar? Sambal TAHRA dibuat dari 100% cabai segar pilihan tanpa bahan pengawet. Sensasi pedas gurihnya langsung bikin nafsu makan berlipat ganda!',
    cta: 'Pesan Sekarang Gratis Ongkir 🔥',
    video_script: {
      hook_0_3s: 'Tunjukkan close-up sambal pedas disiram di atas nasi hangat mengepul.',
      body_3_10s: 'Bandingkan sambal biasa yang berminyak dingin vs Sambal TAHRA yang segar alami.',
      cta_10_15s: 'Klik link di bio sekarang, diskon 20% khusus 100 pembeli pertama!',
    },
  };

  const agent4 = result?.agent4_visual || {
    image_prompt:
      'Commercial close-up photograph of artisan Indonesian chili paste jar with glossy red oil, fresh fiery red chili peppers and garlic cloves around the base, dramatic studio lighting with dark moody background, high-end food magazine photography, 9:16 vertical ratio.',
    visual_mood: 'Cinematic, Moody, Artisan, Warm Red Glow',
    aspect_ratio: agent2.aspect_ratio || '9:16',
    recommended_composition: 'Centered macro shot on rustic wooden table with steam rising.',
  };

  const agent5 = result?.agent5_deploy || {
    qc_status: 'APPROVED',
    qc_notes: 'QA Passed: Pesan headline konsisten dengan USP produk dan rasio visual 9:16.',
    campaign_blueprint_payload: {
      campaign_name: `TAHRA_${agent1.product_name.toUpperCase().replace(/\s+/g, '_')}_TIKTOK`,
      objective: 'CONVERSIONS',
      daily_budget: campaign?.budget || 100000,
      bidding_strategy: agent2.bidding_model || 'CPM',
      placements: [agent2.platform || 'TikTok'],
      ad_creative: {
        headline: agent3.headline,
        body: agent3.primary_text,
        call_to_action: agent3.cta,
        image_prompt: agent4.image_prompt,
      },
    },
    roas_report: result?.roas_report || {
      budget_harian: campaign?.budget || 100000,
      estimasi_tayangan: 5000,
      estimasi_klik: 100,
      estimasi_pembeli: 3,
      estimasi_omzet: 105000,
      estimasi_laba_bersih: 15000,
      roas_percentage: 105.0,
      roas_status: 'PROFIT',
      summary: 'Proyeksi ROAS positif (105%) dengan potensi laba bersih sejak awal kampanye.',
    },
    tracking_link: `https://tahra.ai/track?id=${campaign?.id || id || '123'}`,
    deployment_status: 'DEPLOYED_SIMULATION',
  };

  const isVeto = agent2.financial_status === 'VETO' || result?.status === 'VETO';
  const isProfitable = agent5.roas_report.roas_percentage >= 100;

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="TAHRA AI 5-Agent Blueprint"
        title={agent1.product_name}
        description={`Cetak biru strategi digital marketing hasil orkestrasi 5 Sub-Agent spesialis • Dibuat pada ${formatDate(
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
          {/* VETO ALERT */}
          {isVeto && (
            <Alert
              variant="danger"
              title="🚫 Kampanye Dihentikan oleh Sub-Agent 2 (Strategy Architect)"
            >
              {agent2.strategic_rationale ||
                'Margin produk di bawah 20%. Iklan dibatalkan demi melindungi modal operasional UMKM Anda.'}
            </Alert>
          )}

          {/* SUB-AGENT 1: Market & Product Researcher */}
          <Card hasRedBar className="p-6 sm:p-8">
            <CardHeader className="p-0 pb-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">
                  <Users className="w-5 h-5 text-rose-500" />
                  <span>Sub-Agent 1: Market & Product Researcher (The Explorer)</span>
                </CardTitle>
                <Badge variant="brand">{agent1.product_class || 'Menengah'}</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium">
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                    Unique Selling Proposition (USP)
                  </span>
                  <p className="text-white bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 font-semibold leading-relaxed">
                    {agent1.usp}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                    Competitor Proxy (Pesaing Pasar Terdekat)
                  </span>
                  <p className="text-rose-400 bg-rose-950/20 p-2.5 rounded-xl border border-rose-500/30 font-bold">
                    ⚔️ {agent1.competitor_proxy}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                    Target Demografi & Psikografi Konsumen
                  </span>
                  <p className="text-neutral-300 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 leading-relaxed">
                    <strong>{agent1.target_demography}</strong> — {agent1.audience_psychography}
                  </p>
                </div>

                {agent1.pain_points && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                      Pain Points Pasar
                    </span>
                    <ul className="flex flex-col gap-1 text-neutral-300">
                      {agent1.pain_points.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SUB-AGENT 2: Strategy Architect */}
          <Card hasRedBar className="p-6 sm:p-8">
            <CardHeader className="p-0 pb-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">
                  <Target className="w-5 h-5 text-rose-500" />
                  <span>Sub-Agent 2: Strategy Architect (The Planner)</span>
                </CardTitle>
                <Badge
                  variant={agent2.financial_status === 'HEALTHY' ? 'success' : 'warning'}
                >
                  {agent2.financial_status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Platform Pilihan
                  </span>
                  <p className="text-lg font-black text-white mt-1">
                    {agent2.platform}
                  </p>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {agent2.format_iklan}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Bidding Model
                  </span>
                  <p className="text-lg font-black text-rose-400 font-mono mt-1">
                    {agent2.bidding_model}
                  </p>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Rasio: {agent2.aspect_ratio}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Margin Kotor
                  </span>
                  <p className="text-lg font-black text-emerald-400 font-mono mt-1">
                    {formatPercent(agent2.margin_percentage, 1)}
                  </p>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {formatRp(agent2.margin_value)} / unit
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Batas Maksimal CPA
                  </span>
                  <p className="text-lg font-black text-rose-400 font-mono mt-1">
                    {formatRp(agent2.max_cpa_limit)}
                  </p>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Maks 40% Margin
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-medium">
                <strong>Rasional Strategis:</strong> {agent2.strategic_rationale}
              </div>
            </CardContent>
          </Card>

          {/* SUB-AGENT 3 & 4: Creative Director & Art Director */}
          {!isVeto && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sub-Agent 3: Copywriting PAS & Video Script */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        <FileText className="w-5 h-5 text-rose-500" />
                        <span>Sub-Agent 3: Creative Copywriter (The Wordsmith)</span>
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
                          onClick={() => handleCopy(agent3.headline, 'head')}
                          className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                        >
                          {copiedKey === 'head' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Salin</span>
                        </button>
                      </div>
                      <p className="text-sm font-black text-white bg-neutral-900/70 p-3 rounded-xl border border-neutral-800 leading-snug">
                        {agent3.headline}
                      </p>
                    </div>

                    {/* Primary Text */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          Caption Iklan (Problem - Agitate - Solution)
                        </span>
                        <button
                          onClick={() => handleCopy(agent3.primary_text, 'body')}
                          className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                        >
                          {copiedKey === 'body' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Salin</span>
                        </button>
                      </div>
                      <p className="text-neutral-300 bg-neutral-900/70 p-3.5 rounded-xl border border-neutral-800 leading-relaxed">
                        {agent3.primary_text}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">Call-to-Action:</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold rounded-lg text-xs shadow-md shadow-rose-950/40">
                        {agent3.cta}
                      </span>
                    </div>

                    {/* Video Script 15s */}
                    {agent3.video_script && (
                      <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                          <Video className="w-4 h-4" />
                          Naskah Video 15 Detik (TikTok / Reels)
                        </span>

                        <div className="grid grid-cols-1 gap-2">
                          <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-neutral-800">
                            <span className="text-[10px] font-bold text-rose-400 uppercase">Detik 0-3 (Hook Visual):</span>
                            <p className="text-neutral-300 text-[11px] mt-0.5">{agent3.video_script.hook_0_3s}</p>
                          </div>
                          <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-neutral-800">
                            <span className="text-[10px] font-bold text-rose-400 uppercase">Detik 3-10 (Body / Solusi):</span>
                            <p className="text-neutral-300 text-[11px] mt-0.5">{agent3.video_script.body_3_10s}</p>
                          </div>
                          <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-neutral-800">
                            <span className="text-[10px] font-bold text-rose-400 uppercase">Detik 10-15 (Call-to-Action):</span>
                            <p className="text-neutral-300 text-[11px] mt-0.5">{agent3.video_script.cta_10_15s}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sub-Agent 4: Art Director & Visual Designer */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base">
                      <ImageIcon className="w-5 h-5 text-rose-500" />
                      <span>Sub-Agent 4: Art Director (The Creator)</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex flex-col gap-4 text-xs font-medium">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Visual Mood & Rasio
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="brand">{agent4.visual_mood || 'Cinematic'}</Badge>
                        <Badge variant="neutral">{agent4.aspect_ratio || '9:16'}</Badge>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                          Prompt Text-to-Image (Midjourney / DALL-E)
                        </span>
                        <button
                          onClick={() => handleCopy(agent4.image_prompt, 'prompt')}
                          className="text-[11px] text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1"
                        >
                          {copiedKey === 'prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Salin</span>
                        </button>
                      </div>
                      <div className="p-3.5 bg-black/80 rounded-xl border border-rose-500/25 font-mono text-[11px] text-neutral-300 leading-relaxed italic">
                        "{agent4.image_prompt}"
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 text-[11px] text-neutral-400">
                      💡 <strong>Rekomendasi Komposisi:</strong> {agent4.recommended_composition}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* SUB-AGENT 5: Adversarial Evaluator & Executor (QA & Deployer) */}
          {!isVeto && (
            <Card hasRedBar className="p-6 sm:p-8">
              <CardHeader className="p-0 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="text-base sm:text-lg">
                    <TrendingUp className="w-5 h-5 text-rose-500" />
                    <span>Sub-Agent 5: Adversarial Evaluator & Executor (The QA & Deployer)</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" hasDot>
                      {agent5.qc_status}
                    </Badge>
                    <Badge variant={isProfitable ? 'success' : 'danger'}>
                      {isProfitable ? 'ROAS PROFIT' : 'RISIKO BONCOS'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-6">
                {/* QC Notes */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{agent5.qc_notes}</span>
                </div>

                {/* Big ROAS Display */}
                <div className="text-center py-6 px-4 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 rounded-2xl border border-neutral-800">
                  <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                    Proyeksi Nilai Balik Modal Iklan
                  </span>
                  <div
                    className="text-5xl sm:text-7xl font-black font-mono tracking-tight my-2"
                    style={{ color: isProfitable ? '#34d399' : '#f87171' }}
                  >
                    {formatPercent(agent5.roas_report.roas_percentage, 1)}
                  </div>
                  <p className="text-xs text-neutral-400 font-medium max-w-md mx-auto">
                    {agent5.roas_report.summary}
                  </p>
                </div>

                {/* Matrix Table */}
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
                        {formatRp(agent5.roas_report.budget_harian)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Alokasi budget yang Anda tetapkan</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Tayangan (CPM Rp 20rb)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(agent5.roas_report.estimasi_tayangan).toLocaleString('id-ID')} orang
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Jumlah calon konsumen yang melihat iklan Anda</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Klik (CTR 2%)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(agent5.roas_report.estimasi_klik).toLocaleString('id-ID')} orang
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Calon pembeli yang tertarik mengklik tautan iklan</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Pembeli (CVR 3%)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {Number(agent5.roas_report.estimasi_pembeli).toLocaleString('id-ID')} transaksi
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Konsumen yang berhasil checkout dan membayar</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Omzet Harian</TableCell>
                      <TableCell className="text-right font-mono font-bold text-neutral-200">
                        {formatRp(agent5.roas_report.estimasi_omzet)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Total penjualan kotor harian</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-white">Estimasi Laba Bersih</TableCell>
                      <TableCell
                        className="text-right font-mono font-black"
                        style={{ color: agent5.roas_report.estimasi_laba_bersih >= 0 ? '#34d399' : '#f87171' }}
                      >
                        {formatRp(agent5.roas_report.estimasi_laba_bersih)}
                      </TableCell>
                      <TableCell className="text-neutral-400 text-xs">Omzet dikurangi modal HPP dan biaya iklan</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Ads Manager JSON Payload */}
                <div className="pt-4 border-t border-neutral-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-rose-500" />
                      Campaign Blueprint Payload (Siap Copy ke Ads Manager)
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={copiedKey === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      onClick={() => handleCopy(agent5.campaign_blueprint_payload, 'payload')}
                    >
                      {copiedKey === 'payload' ? 'Tersalin!' : 'Copy JSON Payload'}
                    </Button>
                  </div>
                  <pre className="p-4 bg-black/90 rounded-2xl border border-neutral-800 font-mono text-[11px] text-neutral-300 overflow-x-auto max-h-60 leading-relaxed">
                    {JSON.stringify(agent5.campaign_blueprint_payload, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
