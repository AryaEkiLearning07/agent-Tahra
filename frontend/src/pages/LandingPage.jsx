import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, ShieldCheck, TrendingUp, Sparkles, Zap, CheckCircle2, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      title: 'Anti-Boncos AI Filter',
      description:
        'Validasi ketat margin & HPP produk sebelum beriklan. Menolak kampanye secara otomatis jika margin di bawah 20% demi keselamatan modal Anda.',
    },
    {
      icon: <Bot className="w-6 h-6 text-rose-500" />,
      title: '5 Multi-Agent Spesialis',
      description:
        'Product Decoder, Business Consultant, Media Planner, PAS Copywriter, dan ROAS Controller bekerja bersama menghasilkan strategi komprehensif.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-rose-500" />,
      title: 'Simulasi Matematika ROAS',
      description:
        'Prediksi CPM, CTR 2%, dan CVR 3% secara presisi untuk memproyeksikan laba bersih harian sebelum satu rupiah pun dihabiskan untuk iklan.',
    },
  ];

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="brand" size="md" hasDot isPulse>
              AI HackFest 2026 • Business Automation Track
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] mb-6 font-sans">
            AI Marketing Strategist{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-rose-600">
              Anti-Boncos
            </span>{' '}
            Untuk UMKM
          </h1>

          <p className="text-base sm:text-xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Gantikan agensi periklanan mahal. Sistem <strong className="text-neutral-200">Multi-Agent Otonom</strong> yang membedah unit economics produk, merancang audiens & copywriting PAS, serta memprediksi laba ROAS secara matematis.
          </p>

          <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-sm mx-auto">
            <Button
              size="lg"
              variant="primary"
              isFullWidth
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={handleMulaiNgiklan}
              className="py-4 text-base sm:text-lg font-black tracking-wide shadow-2xl shadow-rose-950/80 hover:shadow-rose-600/30 transition-all transform hover:-translate-y-0.5"
            >
              Mulai Ngiklan
            </Button>
          </div>

          {/* Quick Metrics highlight */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-12 border-t border-neutral-900">
            {[
              { val: '5 Agent', label: 'Spesialis Otonom' },
              { val: '100% JSON', label: 'Strict Parameter' },
              { val: 'PAS', label: 'Copywriting Framework' },
              { val: 'Zero', label: 'Risiko Boncos' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {stat.val}
                </span>
                <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900/80 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-rose-500">
              Arsitektur Sistem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-2">
              Direkayasa Khusus Untuk Profitabilitas UMKM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <Card key={idx} hasRedBar isHoverable className="p-8">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                  {feat.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                  {feat.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
