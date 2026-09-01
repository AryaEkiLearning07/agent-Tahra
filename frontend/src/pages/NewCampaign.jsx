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
  const [currentStage, setCurrentStage] = useState('');
  const [isVetoed, setIsVetoed] = useState(false);
  const [vetoAdvice, setVetoAdvice] = useState('');

  // Agent Steps Tracker for the Live Visualizer
  const [agentSteps, setAgentSteps] = useState([
    {
      code: '1A',
      title: 'Product Decoder',
      subtitle: 'Ekstraksi fitur, benefit & kelas produk',
      status: 'pending',
    },
    {
      code: '2',
      title: 'Business Consultant',
      subtitle: 'Validasi margin profit & proteksi anti-boncos',
      status: 'pending',
    },
    {
      code: '3',
      title: 'Media Planner',
      subtitle: 'Channel fit, bidding model & batas CPA',
      status: 'pending',
    },
    {
      code: '4A',
      title: 'Creative Copywriter',
      subtitle: 'Penyusunan naskah PAS & image prompt AI',
      status: 'pending',
    },
    {
      code: '5B',
      title: 'Financial Controller',
      subtitle: 'Simulasi CPM, CTR, CVR & ROAS Matrix',
      status: 'pending',
    },
  ]);

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

    // Progressive step simulation updates
    const updateStep = (index, status) => {
      setAgentSteps((prev) =>
        prev.map((s, i) => (i === index ? { ...s, status } : s))
      );
    };

    try {
      // Step 1: Agent 1A
      updateStep(0, 'active');
      setCurrentStage('Sub-Agent 1A: Menganalisis fitur produk & psikografi konsumen...');
      await new Promise((r) => setTimeout(r, 700));
      updateStep(0, 'done');

      // Step 2: Agent 2
      updateStep(1, 'active');
      setCurrentStage('Sub-Agent 2: Mengkalkulasi Unit Economics & ambang batas margin...');
      await new Promise((r) => setTimeout(r, 700));

      // Check if immediate local VETO is triggered
      if (marginData.marginPercent < 20) {
        updateStep(1, 'error');
        setIsVetoed(true);
        setVetoAdvice(
          `Margin kotor produk hanya ${marginData.marginPercent.toFixed(1)}% (di bawah batas minimum 20%). TAHRA AI memveto kampanye untuk mencegah kerugian operasional.`
        );
        return;
      }
      updateStep(1, 'done');

      // Step 3: Agent 3
      updateStep(2, 'active');
      setCurrentStage('Sub-Agent 3: Menentukan platform targeting & batas maksimal CPA...');
      await new Promise((r) => setTimeout(r, 800));
      updateStep(2, 'done');

      // Step 4: Agent 4A
      updateStep(3, 'active');
      setCurrentStage('Sub-Agent 4A: Menulis copy iklan PAS framework & merancang prompt visual...');
      await new Promise((r) => setTimeout(r, 900));
      updateStep(3, 'done');

      // Step 5: Agent 5B
      updateStep(4, 'active');
      setCurrentStage('Sub-Agent 5B: Mengompilasi laporan matematis ROAS & matriks finansial...');

      // Call API
      const pipelineRes = await runAgentPipeline(form);
      const resultData = pipelineRes.data;

      updateStep(4, 'done');
      await new Promise((r) => setTimeout(r, 500));

      // Construct and save record
      const campaignRecord = {
        id: Date.now(),
        product_name: form.product_name,
        platform: form.platform,
        target_audience:
          resultData?.strategy?.target_demography ||
          resultData?.product?.audience_psychography ||
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

      // Navigate to detail page
      navigate(`/campaign/${campaignRecord.id}`, {
        state: { campaign: campaignRecord },
      });
    } catch (err) {
      console.error('Pipeline error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="Form Parameter Ketat"
        title="Buat Strategi Kampanye Baru"
        description="Lengkapi parameter produk. 5 Sub-Agent AI akan menganalisis kelayakan ekonomi dan merancang blueprint periklanan siap pakai."
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
                  helperText="Sub-Agent 3 akan mengevaluasi apakah channel ini sesuai dengan psikografi audiens produk Anda."
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isFullWidth
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="mt-4"
                >
                  Jalankan 5 Sub-Agent AI →
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
                          ? 'Perhatian: Margin di bawah 20% sangat rentan membuat iklan boncos. Agent Advisor akan memblokir eksekusi iklan otomatis.'
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
                Pipeline Multi-Agent TAHRA
              </h4>

              <ul className="flex flex-col gap-2.5 text-xs text-neutral-400 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">1.</span>
                  <span>Agent 1A mengekstrak keunggulan & psikografi produk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">2.</span>
                  <span>Agent 2 memvalidasi Unit Economics (Anti-Boncos).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">3.</span>
                  <span>Agent 3 menentukan platform & batas maksimal CPA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">4.</span>
                  <span>Agent 4A menulis copy PAS & prompt visual HD.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-black">5.</span>
                  <span>Agent 5B memproyeksikan laba & ROAS harian.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </PageContainer>

      {/* Live Agent Thinking Modal */}
      <AgentThinkingModal
        isOpen={isSubmitting}
        currentStage={currentStage}
        steps={agentSteps}
        productName={form.product_name}
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
