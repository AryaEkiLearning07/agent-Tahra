import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User, Building, Phone, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Alert } from '../components/ui/Alert';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (!form.email || !form.password) {
        setError('Mohon lengkapi email dan password Anda.');
        setLoading(false);
        return;
      }

      if (isSignUp && (!form.name || !form.company)) {
        setError('Mohon lengkapi Nama Lengkap dan Nama Brand UMKM Anda.');
        setLoading(false);
        return;
      }

      // Save Real User Profile
      login({
        name: form.name || 'Owner UMKM',
        email: form.email,
        company: form.company || 'Brand UMKM Nusantara',
        whatsapp: form.whatsapp || '081289123456',
      });

      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="bg-main min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 text-white font-black text-2xl shadow-[0_0_30px_rgba(244,63,94,0.4)] mb-4 cursor-pointer hover:scale-105 transition-transform"
          >
            T
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading">
            {isSignUp ? 'Daftar Akun Baru' : 'Masuk ke Platform'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-medium">
            {isSignUp
              ? 'Daftarkan bisnis UMKM Anda dan mulai otomatisasi periklanan dengan AI'
              : 'Akses dashboard orkestrasi kampanye periklanan TAHRA AI'}
          </p>
        </div>

        <Card hasRedBar className="p-6 sm:p-8">
          {/* Clean Mode Switcher Tabs (Tanpa Tanda Kurung) */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-900 rounded-xl mb-6 border border-neutral-800">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40 font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40 font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Daftar
            </button>
          </div>

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
                  label="Nomor WhatsApp Utama"
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

            <Input
              label="Kata Sandi"
              id="password"
              type="password"
              required
              placeholder="••••••••"
              prefix={<Lock className="w-4 h-4" />}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isFullWidth
              isLoading={loading}
              loadingText={isSignUp ? 'Mendaftarkan Akun...' : 'Memvalidasi...'}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="mt-2 text-xs font-black shadow-lg shadow-rose-950/50"
            >
              {isSignUp ? 'Daftar Sekarang' : 'Masuk ke Dashboard'}
            </Button>
          </form>
        </Card>

        {/* Back to home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            ← Kembali ke Halaman Depan
          </button>
        </div>
      </div>
    </div>
  );
}
