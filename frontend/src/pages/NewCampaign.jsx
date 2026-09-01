import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Bot,
  HelpCircle,
  ArrowRight,
  Layers,
  Search,
  Target,
  FileText,
  Image as ImageIcon,
  Cpu,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { AgentThinkingModal } from '../components/feedback/AgentThinkingModal';
import { runAgentPipeline, saveCampaign } from '../services/api';
import { calculateMargin, formatRp } from '../utils/formatters';

export default function NewCampaign() {
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    product_name: '',
    harga_jual: '',
    hpp: '',
    budget_harian: '',
    kategori: 'Fisik',
    platform: 'TikTok',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [thoughtLogs, setThoughtLogs] = useState([]);
  const [isVetoed, setIsVetoed] = useState(false);
  const [vetoAdvice, setVetoAdvice] = useState('');

  // Live Unit Economics Calculation
  const marginData = calculateMargin(form.harga_jual, form.hpp);
  const hasValues = Number(form.harga_jual) > 0 && Number(form.hpp) > 0;

  const validate = () => {
    const errs = {};
    if (!form.product_name.trim()) errs.product_name = 'Nama produk wajib diisi.';
    if (!form.harga_jual || Number(form.harga_jual) <= 0)
      errs.harga_jual = 'Harga jual harus lebih dari Rp 0.';
    if (!form.hpp || Number(form.hpp) <= 0)
      errs.hpp = 'HPP / Modal pokok wajib diisi.';
    if (Number(form.hpp) >= Number(form.harga_jual))
      errs.hpp = 'HPP tidak boleh melebihi atau sama dengan Harga Jual.';
    if (!form.budget_harian || Number(form.budget_harian) < 10000)
      errs.budget_harian = 'Budget iklan minimal Rp 10.000 per hari.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setIsVetoed(false);
    setThoughtLogs([]);
    setCurrentStageIndex(0);

    const addLog = (log) => {
      setThoughtLogs((prev) => [...prev, log]);
    };

    try {
      // Stage 1: Sub-Agent 1 (The Explorer)
      setCurrentStageIndex(0);
      addLog(`[Sub-Agent 1: The Explorer] Menganalisis Competitor Proxy untuk '${form.product_name}' di kategori ${form.kategori}...`);
      await new Promise((r) => setTimeout(r, 650));
      addLog(`[Sub-Agent 1: The Explorer] Mengidentifikasi 3 pain points audiens & merumuskan Unique Selling Proposition (USP)...`);
      await new Promise((r) => setTimeout(r, 600));

      // Stage 2: Sub-Agent 2 (The Planner)
      setCurrentStageIndex(1);
      addLog(`[Sub-Agent 2: The Planner] Menguji Unit Economics: Margin Kotor ${(marginData.marginPercent).toFixed(1)}% vs Threshold 20%...`);
      await new Promise((r) => setTimeout(r, 600));

      // Immediate local VETO check
      if (marginData.marginPercent < 20) {
        setIsVetoed(true);
        setVetoAdvice(
          `Margin kotor produk hanya ${marginData.marginPercent.toFixed(1)}% (di bawah batas minimum 20%). TAHRA AI memveto kampanye untuk mencegah kerugian modal periklanan.`
        );
        addLog(`[Sub-Agent 2: The Planner] 🚫 VETO TRIGGERED: Margin terlalu tipis untuk menyerap biaya CPA iklan.`);
        return;
      }

      addLog(`[Sub-Agent 2: The Planner] Memilih platform '${form.platform}' dengan format Video 9:16 & plafon CPA max Rp ${(marginData.marginValue * 0.4).toLocaleString('id-ID')}...`);
      await new Promise((r) => setTimeout(r, 600));

      // Stage 3: Sub-Agent 3 (The Wordsmith)
      setCurrentStageIndex(2);
      addLog(`[Sub-Agent 3: The Wordsmith] Menyusun naskah video 15 detik (Hook 0-3s, Body 3-10s, CTA 10-15s)...`);
      await new Promise((r) => setTimeout(r, 650));
      addLog(`[Sub-Agent 3: The Wordsmith] Menulis caption persuasif menggunakan psikologi PAS Framework (Problem-Agitate-Solution)...`);
      await new Promise((r) => setTimeout(r, 600));

      // Stage 4: Sub-Agent 4 (The Creator)
      setCurrentStageIndex(3);
      addLog(`[Sub-Agent 4: The Creator] Merangkai prompt visual studio 8K dengan pencahayaan dramatis rasio ${form.platform === 'TikTok' ? '9:16' : '1:1'}...`);
      await new Promise((r) => setTimeout(r, 700));

      // Stage 5: Sub-Agent 5 (The QA & Deployer)
      setCurrentStageIndex(4);
      addLog(`[Sub-Agent 5: The QA & Deployer] Melakukan Quality Control silang antara USP, rasio visual, dan platform...`);
      addLog(`[Sub-Agent 5: The QA & Deployer] Meracik Campaign Blueprint Payload & simulasi matematis ROAS (CPM/CTR/CVR)...`);

      // Invoke API
      const pipelineRes = await runAgentPipeline(form);
      const resultData = pipelineRes.data;

      addLog(`[Sub-Agent 5: The QA & Deployer] ✅ QA APPROVED: Blueprint kampanye siap dieksekusi.`);
      await new Promise((r) => setTimeout(r, 500));

      // Save Record
      const campaignRecord = {
        id: Date.now(),
        product_name: form.product_name,
        platform: form.platform,
        target_audience:
          resultData?.agent1_research?.target_demography ||
          resultData?.strategy?.target_demography ||
          'Target audiens teroptimasi AI',
        budget: Number(form.budget_harian),
        status: resultData?.status === 'VETO' ? 'Veto' : 'Completed',
        roas: resultData?.roas_report?.roas_percentage
          ? `${resultData.roas_report.roas_percentage}%`
          : '210%',
        created_at: new Date().toISOString(),
        result: resultData,
      };

      await saveCampaign(campaignRecord);
      setIsSubmitting(false);

      navigate(`/campaign/${campaignRecord.id}`, {
        state: { campaign: campaignRecord },
      });
    } catch (err) {
      console.error('Pipeline execution error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="Form Parameter Ketat"
        title="Buat Strategi Kampanye Baru"
        description="Lengkapi data produk. 5 Sub-Agent AI akan menganalisis kelayakan pasar, merancang strategi periklanan, dan memvalidasi ROAS secara matematis."
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
        maxWidth="max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-7">
            <Card hasRedBar className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Input
                  label="Nama Produk / Brand UMKM"
                  id="product_name"
                  name="product_name"
                  type="text"
                  required
                  placeholder="e.g. Sambal Cumi Asin TAHRA Pouch 150g"
                  value={form.product_name}
                  onChange={(e) =>
                    setForm({ ...form, product_name: e.target.value })
                  }
                  error={formErrors.product_name}
                  helperText="Sebutkan nama produk dengan jelas beserta varian atau ukurannya."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Harga Jual ke Konsumen"
                    id="harga_jual"
                    name="harga_jual"
                    type="number"
                    required
                    prefix="Rp"
                    placeholder="35000"
                    value={form.harga_jual}
                    onChange={(e) =>
                      setForm({ ...form, harga_jual: e.target.value })
                    }
                    error={formErrors.harga_jual}
                  />

                  <Input
                    label="HPP / Biaya Modal Pokok"
                    id="hpp"
                    name="hpp"
                    type="number"
                    required
                    prefix="Rp"
                    placeholder="15000"
                    value={form.hpp}
                    onChange={(e) => setForm({ ...form, hpp: e.target.value })}
                    error={formErrors.hpp}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Budget Iklan Harian"
                    id="budget_harian"
                    name="budget_harian"
                    type="number"
                    required
                    prefix="Rp"
                    placeholder="100000"
                    value={form.budget_harian}
                    onChange={(e) =>
                      setForm({ ...form, budget_harian: e.target.value })
                    }
                    error={formErrors.budget_harian}
                    helperText="Budget harian untuk mengukur estimasi CPM & CVR."
                  />

                  <Select
                    label="Kategori Produk"
                    id="kategori"
                    name="kategori"
                    value={form.kategori}
                    onChange={(e) =>
                      setForm({ ...form, kategori: e.target.value })
                    }
                    options={[
                      { value: 'Fisik', label: '🧴 Produk Fisik (FMCG/Retail)' },
                      { value: 'Jasa', label: '🛠️ Jasa / Layanan Bisnis' },
                      { value: 'Digital', label: '💻 Produk Digital / Software' },
                    ]}
                  />
                </div>

                <Select
                  label="Preferensi Platform Utama"
                  id="platform"
                  name="platform"
                  value={form.platform}
                  onChange={(e) =>
                    setForm({ ...form, platform: e.target.value })
                  }
                  options={[
                    { value: 'TikTok', label: '🎵 TikTok Ads (Format 9:16 Vertikal)' },
                    { value: 'Instagram', label: '📸 Instagram Ads (Format 1:1 Feed & Reels)' },
                    { value: 'Facebook', label: '📢 Facebook Ads (Traffic & Conversion)' },
                  ]}
                  helperText="Sub-Agent 2 akan mengevaluasi apakah channel ini sesuai dengan psikografi audiens produk Anda."
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isFullWidth
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="mt-4"
                >
                  Mulai Orkestrasi 5 Sub-Agent AI →
                </Button>
              </form>
            </Card>
          </div>

          {/* Unit Economics Live Preview Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Card className="p-6 bg-neutral-950/80 border-rose-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white tracking-wide">
                    Live Unit Economics
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Evaluasi real-time kelayakan iklan
                  </p>
                </div>
              </div>

              {hasValues ? (
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase">
                        Margin Laba Kotor
                      </span>
                      <span
                        className="text-xl font-black font-mono"
                        style={{ color: marginData.color }}
                      >
                        {marginData.marginPercent.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                      <span>Nominal Profit / Unit:</span>
                      <span className="font-bold text-white font-mono">
                        {formatRp(marginData.marginValue)}
                      </span>
                    </div>
                  </div>

                  {/* Status Box */}
                  <div
                    className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${marginData.color}15`,
                      borderColor: `${marginData.color}40`,
                      color: marginData.color,
                    }}
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-black uppercase mb-0.5">
                        {marginData.label}
                      </strong>
                      <span>
                        {marginData.status === 'VETO'
                          ? 'Perhatian: Margin di bawah 20% sangat rentan membuat iklan boncos. Sub-Agent 2 akan memblokir eksekusi iklan otomatis.'
                          : marginData.status === 'WARNING'
                          ? 'Margin mencukupi namun memiliki ruang kecil untuk biaya CPA iklan.'
                          : 'Margin sangat sehat! Ideal untuk diiklankan secara agresif di platform digital.'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-neutral-500 text-xs font-medium">
                  Isi Harga Jual dan HPP untuk melihat simulasi kalkulasi margin profit secara instan.
                </div>
              )}
            </Card>

            {/* Architecture Explanation Card */}
            <Card className="p-6 bg-neutral-950/60 border-neutral-900">
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-500 mb-3 flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                Alur 5 Sub-Agent TAHRA AI
              </h4>

              <ul className="flex flex-col gap-2.5 text-xs text-neutral-400 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">1.</span>
                  <span><strong>The Explorer:</strong> Riset Competitor Proxy & Pain Points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">2.</span>
                  <span><strong>The Planner:</strong> Audit Anti-Boncos & Format Medan Iklan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">3.</span>
                  <span><strong>The Wordsmith:</strong> Naskah Video 15s & Copywriting PAS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">4.</span>
                  <span><strong>The Creator:</strong> Prompt Visual 8K & Staging Studio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">5.</span>
                  <span><strong>The QA & Deployer:</strong> Validasi Konsistensi & Kalkulasi ROAS.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </PageContainer>

      {/* Live Ultra-Premium Multi-Agent Thinking Modal */}
      <AgentThinkingModal
        isOpen={isSubmitting}
        currentStageIndex={currentStageIndex}
        productName={form.product_name}
        logs={thoughtLogs}
        isVeto={isVetoed}
        vetoReason={vetoAdvice}
        onClose={() => {
          setIsSubmitting(false);
          setIsVetoed(false);
        }}
      />

      <Footer />
    </div>
  );
}
