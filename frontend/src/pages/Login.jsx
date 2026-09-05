import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User, Building, Phone, Info, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Alert } from '../components/ui/Alert';
import { TahraLogo } from '../components/ui/TahraLogo';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const redirectMessage = location.state?.message || '';
  const redirectTarget = location.state?.redirect || '/dashboard';

  const [form, setForm] = useState({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
    password: '',
  });

  const isPasswordLongEnough = form.password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!form.email.trim() || !form.password) {
      setError('Mohon lengkapi email dan kata sandi Anda.');
      return;
    }

    if (isSignUp) {
      if (!form.name.trim() || !form.company.trim()) {
        setError('Mohon lengkapi Nama Lengkap dan Nama Brand UMKM Anda.');
        return;
      }
      if (form.password.length < 8) {
        setError('Kata sandi harus minimal 8 karakter untuk keamanan akun.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignUp) {
        await register({
          email: form.email.trim(),
          password: form.password,
          name: form.name.trim(),
          company: form.company.trim(),
          whatsapp: form.whatsapp.trim() || null,
        });
        setSuccessMsg('Akun berhasil didaftarkan! Mengalihkan ke dashboard...');
      } else {
        await login({
          email: form.email.trim(),
          password: form.password,
        });
        setSuccessMsg('Autentikasi berhasil! Mengalihkan...');
      }

      setTimeout(() => {
        navigate(redirectTarget);
      }, 600);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memproses otentikasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-main min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden transition-colors">
      {/* Radiant ambient green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/30 dark:bg-emerald-600/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div
            onClick={() => navigate('/')}
            className="mb-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <TahraLogo size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-white tracking-tight font-heading">
            {isSignUp ? 'Daftar Akun Baru' : 'Masuk ke Platform'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            {isSignUp
              ? 'Daftarkan bisnis UMKM Anda dengan enkripsi sandi aman (min 8 karakter)'
              : 'Akses dashboard orkestrasi kampanye periklanan TAHRA AI'}
          </p>
        </div>

        <Card hasBrandBar className="p-6 sm:p-8 shadow-2xl shadow-emerald-950/10 dark:shadow-black/50 bg-white/95 dark:bg-[#0c1f17]/95">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-emerald-50 dark:bg-[#081811] rounded-2xl mb-6 border border-emerald-200 dark:border-emerald-800">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/25 font-black'
                  : 'text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/25 font-black'
                  : 'text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white'
              }`}
            >
              Daftar
            </button>
          </div>

          {redirectMessage && !error && !successMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5">
              <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{redirectMessage}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mb-5" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <>
                <Input
                  label="Nama Lengkap Pemilik"
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Ahmad Rasyid"
                  prefix={<User className="w-4 h-4" />}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <Input
                  label="Nama Brand / Toko UMKM"
                  id="company"
                  type="text"
                  required
                  placeholder="e.g. Sambal TAHRA Nusantara"
                  prefix={<Building className="w-4 h-4" />}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />

                <Input
                  label="Nomor WhatsApp Utama (Opsional)"
                  id="whatsapp"
                  type="text"
                  placeholder="e.g. 081289123456"
                  prefix={<Phone className="w-4 h-4" />}
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                />
              </>
            )}

            <Input
              label="Alamat Email"
              id="email"
              type="email"
              required
              placeholder="owner@tahra.id"
              prefix={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="flex flex-col gap-1">
              <Input
                label="Kata Sandi"
                id="password"
                type="password"
                required
                placeholder="Minimal 8 karakter"
                prefix={<Lock className="w-4 h-4" />}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {isSignUp && form.password.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1 text-[11px]">
                  <span
                    className={
                      isPasswordLongEnough
                        ? 'text-emerald-600 font-bold flex items-center gap-1'
                        : 'text-amber-600 font-medium'
                    }
                  >
                    {isPasswordLongEnough
                      ? '✓ Panjang sandi valid (minimal 8 karakter)'
                      : `Kurang ${8 - form.password.length} karakter lagi (minimal 8 karakter)`}
                  </span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isFullWidth
              isLoading={loading}
              loadingText={isSignUp ? 'Mendaftarkan Akun...' : 'Memvalidasi...'}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="mt-2 text-xs font-black shadow-xl shadow-emerald-700/25"
            >
              {isSignUp ? 'Daftar Sekarang' : 'Masuk ke Dashboard'}
            </Button>
          </form>
        </Card>

        {/* Back to home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
          >
            ← Kembali ke Halaman Depan
          </button>
        </div>
      </div>
    </div>
  );
}
