import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  DollarSign,
  Search,
  Target,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  Calculator,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Play,
  Award,
  BarChart3,
  Percent,
  Compass,
  Star,
  Lock,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { formatRp } from '../utils/formatters';
import { cn } from '../utils/cn';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Interactive Live Mockup Tab
  const [activeAgentPreview, setActiveAgentPreview] = useState(0);

  // Interactive Anti-Boncos Calculator State
  const [calcHargaJual, setCalcHargaJual] = useState(75000);
  const [calcHpp, setCalcHpp] = useState(35000);
  const [calcBudget, setCalcBudget] = useState(100000);

  // Interactive FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const handleMulaiNgiklan = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login', {
        state: {
          redirect: '/dashboard',
          message: 'Silakan masuk atau daftar akun terlebih dahulu untuk mulai membuat kampanye iklan AI.',
        },
      });
    }
  };

  // Calculator calculations
  const calcLabaKotor = Math.max(0, calcHargaJual - calcHpp);
  const calcMarginPercent = calcHargaJual > 0 ? (calcLabaKotor / calcHargaJual) * 100 : 0;
  const isCalcSafe = calcMarginPercent >= 20;
  const calcMaxCpa = Math.round(calcLabaKotor * 0.4);
  const calcEstKlik = Math.round(calcBudget / 750);
  const calcEstPembeli = Math.max(1, Math.round(calcEstKlik * 0.03));
  const calcEstOmzet = calcEstPembeli * calcHargaJual;
  const calcRoas = calcBudget > 0 ? Math.round((calcEstOmzet / calcBudget) * 100) : 0;

  const agents = [
    {
      code: 'Agent 1',
      role: 'The Explorer',
      title: 'Deep Market & Competitor Intelligence',
      desc: 'Memindai Google Places & Ad Library secara real-time untuk memetakan radius 5km dan mencari celah pasar tanpa asumsi.',
      color: 'from-cyan-500 to-sky-600',
      badgeBg: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700',
      tagColor: 'text-cyan-600 dark:text-cyan-400',
      icon: <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      highlight: 'Places API + Ad Library',
    },
    {
      code: 'Agent 2',
      role: 'The Guardian',
      title: 'Unit Economics & Anti-Boncos Veto',
      desc: 'Membedah HPP, margin laba, dan titik impas (BEP). Menolak otomatis kampanye berisiko rugi demi melindungi modal Anda.',
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700',
      tagColor: 'text-amber-600 dark:text-amber-400',
      icon: <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      highlight: 'Plafon CPA & Margin Guard',
    },
    {
      code: 'Agent 3',
      role: 'The Strategist',
      title: 'Media Planner & Channel Matrix',
      desc: 'Mencocokkan demografi usia & geolokasi dengan kanal paling efektif (TikTok, Instagram, Google) untuk efisiensi CPM.',
      color: 'from-indigo-500 to-violet-600',
      badgeBg: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700',
      tagColor: 'text-indigo-600 dark:text-indigo-400',
      icon: <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      highlight: 'TikTok / Meta Media Matrix',
    },
    {
      code: 'Agent 4',
      role: 'The Wordsmith',
      title: 'PAS Copywriting & Hook Engine',
      desc: 'Merancang 3 variasi naskah iklan berbasis psikologi Problem-Agitation-Solution dengan Hook 3 detik anti-skip.',
      color: 'from-rose-500 to-pink-600',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700',
      tagColor: 'text-rose-600 dark:text-rose-400',
      icon: <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      highlight: 'Formula PAS + Visual Studio 8K',
    },
    {
      code: 'Agent 5',
      role: 'The Commander',
      title: 'Execution & ROAS Controller',
      desc: 'Menghitung simulasi matematis ROAS harian, memverifikasi parameter iklan, dan menyiapkan blueprint 1-klik deploy.',
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
      tagColor: 'text-emerald-600 dark:text-emerald-400',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      highlight: 'Audit QC & Simulasi Laba',
    },
  ];

  const agentSimulatorTabs = [
    {
      id: 0,
      name: 'Agent 1: Explorer',
      badge: 'Riset Pasar Empiris',
      content: {
        headline: 'Hasil Scanning Pasar & Intelijen Kompetitor',
        sub: 'Radius 5km • Google Places Live • Ad Library Scanner',
        points: [
          'Ditemukan 14 kompetitor lokal sejenis di radius 5km dengan rating rata-rata 4.2.',
          'Peluang Celah Pasar (USP): 82% pembeli mengeluhkan pengiriman lambat & porsi kurang padat.',
          'Rekomendasi Persona: Karyawan & mahasiswa usia 21-34 tahun aktif di TikTok & Instagram.',
        ],
      },
    },
    {
      id: 1,
      name: 'Agent 2: Guardian',
      badge: 'Unit Economics & CPA Guard',
      content: {
        headline: 'Validasi Margin Finansial & Plafon Anti-Boncos',
        sub: 'Margin Bersih 53.3% • Status: DISETUJUI UNTUK NGIKLAN (Safety Pass)',
        points: [
          'Harga Jual: Rp 75.000 | HPP Pokok: Rp 35.000 | Laba Kotor: Rp 40.000 / unit.',
          'Plafon Maksimal Biaya Iklan per Pembeli (Max CPA): Rp 15.000 (Toleransi 37.5%).',
          'Titik Impas (BEP): Cukup 3 transaksi penjualan per hari untuk menutup seluruh biaya iklan harian.',
        ],
      },
    },
    {
      id: 2,
      name: 'Agent 3: Strategist',
      badge: 'Media Matrix & Saluran',
      content: {
        headline: 'Rencana Media & Bidding Konversi',
        sub: 'Kanal Utama: TikTok Ads Video Vertikal 9:16',
        points: [
          'Format Terpilih: Short-form video 15 detik dengan optimasi CPA Bidding otomatis.',
          'Jadwal Tayang Optimal: 11.30 - 13.30 (Jam Istirahat) & 18.30 - 21.00 WIB.',
          'Targeting Geografis: Radius 10km sekitar outlet bisnis lokal + demografi 20-35 th.',
        ],
      },
    },
    {
      id: 3,
      name: 'Agent 4: Wordsmith',
      badge: 'PAS Copywriting & Prompt 8K',
      content: {
        headline: 'Naskah Video 15 Detik & Prompt Studio AI',
        sub: 'Formula Hook 3 Detik + Problem-Agitation-Solution',
        points: [
          'Hook 0-3s: "Makan siang selalu hambar dan porsi pelit? Jangan biarkan harimu makin bad mood!"',
          'Body 3-10s: "Cobain menu spesial dengan bumbu rempah melimpah, hangat, dan porsi dijamin kenyang puas."',
          'CTA 10-15s: "Klik tombol Pesan Sekarang di bawah untuk promo diskon 20% hari ini saja!"',
        ],
      },
    },
    {
      id: 4,
      name: 'Agent 5: Commander',
      badge: 'Proyeksi Finansial ROAS',
      content: {
        headline: 'Simulasi Matematis Konversi & Laba Bersih Harian',
        sub: 'Budget Iklan: Rp 100.000 / Hari • Proyeksi Omzet: Rp 315.000 (ROAS 315%)',
        points: [
          'Estimasi Tayangan (Impressions): 7.000 tayangan dengan CPM efisien Rp 14.285.',
          'Estimasi Klik (CTR 2.0%): 140 pengunjung tertarget masuk ke link WhatsApp/Toko.',
          'Estimasi Pembeli (CVR 3.0%): 4 - 5 transaksi | Estimasi Laba Bersih Bersih: Rp 175.000/hari.',
        ],
      },
    },
  ];

  const comparisonData = [
    {
      feature: 'Biaya Layanan',
      traditional: 'Rp 3.000.000 - Rp 7.000.000 / bulan (Agensi / Freelancer)',
      tahra: 'Gratis & Sangat Terjangkau untuk skala UMKM',
      tahraWin: true,
    },
    {
      feature: 'Proteksi Risiko Boncos',
      traditional: 'Tidak ada. Uang tetap habis dibakar meski margin produk tipis.',
      tahra: 'Safety Veto otomatis: Menolak iklan jika margin < 20% demi melindungi modal.',
      tahraWin: true,
    },
    {
      feature: 'Dasar Riset Pasar',
      traditional: 'Asumsi & perkiraan manual yang memakan waktu berhari-hari.',
      tahra: 'Data empiris real-time dari Google Places API & Facebook Ad Library.',
      tahraWin: true,
    },
    {
      feature: 'Waktu Pengerjaan',
      traditional: '3 hingga 7 hari kerja untuk penyusunan copywriting & revisi.',
      tahra: '15 detik selesai lengkap dengan naskah PAS & formula prompt 8K.',
      tahraWin: true,
    },
    {
      feature: 'Kepastian Return (ROAS)',
      traditional: 'Hanya janji "brand awareness" tanpa simulasi matematis laba bersih.',
      tahra: 'Kalkulasi matematis transparan: Budget → Klik → Pembeli → Estimasi Omzet.',
      tahraWin: true,
    },
  ];

  const faqs = [
    {
      q: 'Apa perbedaan TAHRA AI dengan ChatGPT biasa?',
      a: 'ChatGPT biasa hanya memberikan saran teks umum berdasarkan asumsi. TAHRA AI adalah sistem otonom 5 Sub-Agent yang terhubung langsung dengan data empiris Google Places API, menghitung kalkulasi finansial Unit Economics, memiliki fitur Veto Anti-Boncos, dan memberikan blueprint siap tayang dalam 15 detik.',
    },
    {
      q: 'Bagaimana cara kerja fitur Veto Anti-Boncos?',
      a: 'Sub-Agent 2 (The Guardian) akan menguji margin laba kotor Anda sebelum kampanye dijalankan. Jika margin keuntungan di bawah batas aman 20% atau biaya akuisisi pelanggan (CPA) melebihi keuntungan per unit, sistem otomatis MEMBATALKAN kampanye dan memberikan rekomendasi perbaikan harga agar Anda tidak rugi uang.',
    },
    {
      q: 'Saya pemula dan belum pernah beriklan, apakah bisa menggunakannya?',
      a: 'Sangat bisa! TAHRA dirancang khusus untuk pemilik UMKM Indonesia yang tidak mengerti istilah teknis rumit. Cukup ketik deskripsi produk dalam bahasa santai sehari-hari, dan 5 Sub-Agent AI akan menyusun seluruh naskah, video hook, pengaturan audiens, hingga estimasi laba untuk Anda.',
    },
    {
      q: 'Berapa modal budget minimal yang disarankan untuk mulai ngiklan?',
      a: 'Anda bisa mulai dari budget iklan harian minimal Rp 25.000 hingga Rp 50.000 per hari di platform TikTok Ads atau Meta Ads sesuai rekomendasi Sub-Agent 2.',
    },
  ];

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between transition-colors">
      <Navbar />

      {/* =================================================================== */}
      {/* 1. HERO SECTION */}
      {/* =================================================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-black font-mono flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI HACKFEST 2026 • AUTONOMOUS MARKETING TRACK</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6 font-heading">
            AI Marketing Strategist{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-indigo-300 drop-shadow-xs">
              Anti-Boncos
            </span>{' '}
            Untuk UMKM
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
            Gantikan biaya agensi periklanan mahal. Sistem{' '}
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold">5 Sub-Agent Otonom</strong> yang membedah unit economics produk, merancang audiens & copywriting PAS, serta memprediksi laba ROAS secara matematis sebelum uang iklan dikeluarkan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <Button
              size="lg"
              variant="primary"
              isFullWidth
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={handleMulaiNgiklan}
              className="py-4 text-base sm:text-lg font-black tracking-wide shadow-xl shadow-emerald-700/20 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              Mulai Ngiklan Gratis
            </Button>
            <a
              href="#kalkulator"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all text-center shadow-xs"
            >
              Uji Kalkulator Anti-Boncos ↓
            </a>
          </div>

          {/* Trust Value Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Proteksi Margin & Veto Boncos</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
              <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Data Nyata Google Places API</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
              <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Simulasi Matematis ROAS Transparan</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. INTERACTIVE LIVE PIPELINE SIMULATOR MOCKUP */}
      {/* =================================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-6 sm:-mt-8 mb-20 relative z-20">
        <div className="rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 dark:shadow-black/60 overflow-hidden">
          {/* Browser / Canvas Header Bar */}
          <div className="p-4 sm:px-6 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 hidden sm:inline">
                tahra.ai/workspace/live-session
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-[11px] font-black font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                LIVE WORKSPACE SIMULATOR
              </span>
            </div>
          </div>

          {/* Interactive Agent Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 p-2 gap-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            {agentSimulatorTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAgentPreview(tab.id)}
                className={cn(
                  'px-3 py-2.5 rounded-2xl text-xs font-bold font-heading text-center transition-all flex flex-col items-center gap-0.5 cursor-pointer',
                  activeAgentPreview === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md ring-2 ring-emerald-500/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-900'
                )}
              >
                <span>{tab.name}</span>
                <span className="text-[10px] font-normal opacity-80 font-mono hidden sm:inline">{tab.badge}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-black font-mono">
                    {agentSimulatorTabs[activeAgentPreview].badge}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Output Terverifikasi JSON</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading mb-1">
                  {agentSimulatorTabs[activeAgentPreview].content.headline}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-5">
                  {agentSimulatorTabs[activeAgentPreview].content.sub}
                </p>

                <div className="flex flex-col gap-3">
                  {agentSimulatorTabs[activeAgentPreview].content.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Metric Badge Box */}
              <div className="w-full md:w-72 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 font-mono">Status Orchestrator</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="p-3 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
                  <span className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 block">WAKTU EKSEKUSI PIPELINE</span>
                  <span className="text-2xl font-black text-emerald-950 dark:text-emerald-200 font-mono">14.8 Detik</span>
                </div>
                <div className="flex flex-col gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                    <span>Akurasi Parsing JSON</span>
                    <strong className="text-slate-900 dark:text-white font-mono">100%</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                    <span>Tool Calls Places API</span>
                    <strong className="text-cyan-600 dark:text-cyan-400 font-mono">Aktif</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Veto Safety Check</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono">Passed ✅</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. 5 SUB-AGENTS COLORFUL ECOSYSTEM SHOWCASE */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0b1320]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400 font-heading bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 font-mono">
              ⚡ Multi-Agent Swarm Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3 font-heading">
              5 Sub-Agent Spesialis Bekerja Simultan
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">
              Tiap sub-agent memiliki domain keahlian terisolasi untuk menjamin validitas data, keamanan margin, dan kreativitas naskah iklan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {agents.map((ag, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-emerald-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={cn('text-[10px] font-mono font-black px-2 py-0.5 rounded-full border', ag.badgeBg)}>
                      {ag.code}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {ag.role}
                    </span>
                  </div>

                  <div className={cn('h-1.5 w-full rounded-full bg-gradient-to-r mb-4', ag.color)} />

                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shrink-0">
                      {ag.icon}
                    </div>
                    <span className={cn('text-[11px] font-black uppercase font-mono tracking-wider', ag.tagColor)}>
                      {ag.highlight}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-2 font-heading leading-snug">
                    {ag.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {ag.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. INTERACTIVE ANTI-BONCOS CALCULATOR WIDGET */}
      {/* =================================================================== */}
      <section id="kalkulator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-emerald-800/80 bg-slate-50/70 dark:bg-[#06120c]/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-heading bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 font-mono">
              🛡️ Fitur Unggulan Anti-Boncos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3 font-heading">
              Uji Kelayakan Margin Produk Anda
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">
              Geser nilai di bawah untuk melihat simulasi langsung bagaimana Sub-Agent 2 melindungi modal usaha Anda dari kerugian iklan.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-400/30 dark:border-emerald-500/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Sliders Input Controls */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    <span>Harga Jual Produk ke Konsumen</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">{formatRp(calcHargaJual)}</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="500000"
                    step="5000"
                    value={calcHargaJual}
                    onChange={(e) => setCalcHargaJual(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>Rp 15.000</span>
                    <span>Rp 500.000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    <span>HPP / Biaya Modal Pokok Produksi</span>
                    <span className="text-amber-700 dark:text-amber-400 font-mono text-sm">{formatRp(calcHpp)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="450000"
                    step="5000"
                    value={calcHpp}
                    onChange={(e) => setCalcHpp(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>Rp 5.000</span>
                    <span>Rp 450.000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    <span>Rencana Budget Iklan Harian</span>
                    <span className="text-indigo-700 dark:text-indigo-400 font-mono text-sm">{formatRp(calcBudget)}</span>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="500000"
                    step="25000"
                    value={calcBudget}
                    onChange={(e) => setCalcBudget(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>Rp 25.000 / hari</span>
                    <span>Rp 500.000 / hari</span>
                  </div>
                </div>
              </div>

              {/* Live Evaluation Box */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-black uppercase text-slate-500 font-mono">Evaluasi Sub-Agent 2</span>
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-black font-mono flex items-center gap-1.5',
                      isCalcSafe
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 border border-red-300 dark:bg-red-950 dark:text-red-300'
                    )}
                  >
                    {isCalcSafe ? '✅ MARGIN AMAN' : '🚫 VETO AKTIF (< 20%)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] uppercase text-slate-400 block font-mono">Margin Keuntungan</span>
                    <span className={cn('text-xl font-black font-mono', isCalcSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
                      {calcMarginPercent.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">Laba {formatRp(calcLabaKotor)}/unit</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] uppercase text-slate-400 block font-mono">Plafon Aman Max CPA</span>
                    <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
                      {formatRp(calcMaxCpa)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">Batas biaya per pembeli</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] uppercase text-slate-400 block font-mono">Estimasi Omzet</span>
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {formatRp(calcEstOmzet)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">Dari ~{calcEstPembeli} pembeli</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] uppercase text-slate-400 block font-mono">Proyeksi ROAS</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {calcRoas}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">Return on Ad Spend</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium pt-1">
                  {isCalcSafe ? (
                    <span>💡 <strong>Rekomendasi AI:</strong> Margin produk Anda sehat untuk beriklan secara agresif di TikTok / Meta Ads dengan target konversi langsung.</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">⚠️ <strong>Peringatan AI:</strong> Margin produk di bawah 20% terlalu riskan untuk beriklan. Tingkatkan harga jual atau kurangi HPP terlebih dahulu.</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. COMPARISON SECTION (CARA LAMA VS TAHRA AI) */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-emerald-800/80 bg-white dark:bg-[#081510]/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-heading bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 font-mono">
              ⚡ Kenapa TAHRA AI Berbeda
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3 font-heading">
              Perbandingan: Cara Lama vs TAHRA AI
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-6 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-heading font-black text-xs sm:text-sm">
              <span className="text-slate-500 uppercase font-mono">Parameter Perbandingan</span>
              <span className="text-red-700 dark:text-red-400 mt-2 md:mt-0">❌ Cara Lama / Agensi Manual</span>
              <span className="text-emerald-700 dark:text-emerald-400 mt-2 md:mt-0 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>✨ TAHRA 5-Sub-Agent AI</span>
              </span>
            </div>

            <div className="divide-y divide-slate-200/80 dark:divide-slate-800">
              {comparisonData.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-6 gap-3 items-center text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white font-heading">{item.feature}</span>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.traditional}</span>
                  <span className="font-semibold text-emerald-900 dark:text-emerald-200 bg-emerald-50/80 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 leading-relaxed">
                    {item.tahra}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. 3-STEP EASY WORKFLOW */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-emerald-800/80 bg-slate-50/50 dark:bg-[#06120c]/70">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-heading">
              Alur Kerja Simpel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 font-heading">
              Hanya 3 Langkah Mudah Menuju Iklan Siap Laba
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Ketik Deskripsi Produk',
                desc: 'Masukkan nama produk, harga jual, dan modal HPP dalam bahasa sehari-hari tanpa perlu keahlian teknis.',
                color: 'from-cyan-500 to-sky-600',
              },
              {
                step: '02',
                title: '5 Agent Bekerja Otonom',
                desc: 'Dalam 15 detik, AI memindai pasar, menguji margin anti-boncos, menuliskan naskah PAS, dan menghitung laba.',
                color: 'from-amber-500 to-orange-600',
              },
              {
                step: '03',
                title: 'Eksekusi & Panen Orderan',
                desc: 'Salin naskah video dan prompt gambar beresolusi tinggi langsung ke dashboard iklan TikTok / Meta Anda.',
                color: 'from-emerald-500 to-teal-600',
              },
            ].map((st, sIdx) => (
              <Card key={sIdx} isHoverable className="p-8 relative overflow-hidden">
                <div className={cn('w-12 h-12 rounded-2xl bg-gradient-to-tr text-white flex items-center justify-center font-black font-mono text-lg mb-6 shadow-md', st.color)}>
                  {st.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2 font-heading">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {st.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. FAQ ACCORDION */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-emerald-800/80 bg-white dark:bg-[#081510]/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-heading">
              Pertanyaan Umum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 font-heading">
              Semua yang Perlu Anda Ketahui
            </h2>
          </div>

          <div className="flex flex-col gap-3.5">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white font-heading hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={cn('w-5 h-5 shrink-0 transition-transform duration-300', isOpen && 'rotate-180 text-emerald-600')} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-t border-slate-200/60 dark:border-slate-800 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 8. HIGH-CONVERTING BOTTOM CTA */}
      {/* =================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-tr from-emerald-700 via-teal-700 to-indigo-800 p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-black font-mono">
              SIAP TINGKATKAN PENJUALAN PRODUK ANDA?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-tight">
              Mulai Buat Strategi Iklan AI Anti-Boncos Anda Sekarang
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
              Tidak ada kartu kredit diperlukan. 5 Sub-Agent AI siap mengoptimalkan kampanye pertama Anda dalam 15 detik.
            </p>
            <Button
              size="lg"
              variant="secondary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={handleMulaiNgiklan}
              className="py-4 px-8 text-base font-black tracking-wide shadow-2xl bg-white text-emerald-950 hover:bg-emerald-50 transition-all transform hover:scale-105"
            >
              Mulai Ngiklan Sekarang
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
