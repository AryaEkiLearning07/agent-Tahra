import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function NewCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('');
  const [form, setForm] = useState({
    product_name: '',
    target_audience: '',
    budget: '',
    platform: 'TikTok',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setStep('🔍 Menganalisis target audiens & tren pasar...');

    setTimeout(() => {
      setStep('✍️ Menyusun copywriting & hook iklan otomatis...');
    }, 1500);

    setTimeout(() => {
      setStep('📊 Memprediksi ROAS & menyimpan ke MySQL...');
    }, 3000);

    setTimeout(() => {
      // Simpan data langsung ke database MySQL via API Express
      axios
        .post('http://localhost:5000/api/campaigns', form)
        .then((res) => {
          setLoading(false);
          navigate('/dashboard');
        })
        .catch((err) => {
          console.error('Gagal menyimpan ke MySQL:', err);
          setLoading(false);
        });
    }, 4500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% -20%, rgba(196,30,58,0.15), transparent 70%), #0d0d0d',
        color: '#f3f4f6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(13,13,13,0.75)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #e11d48, #9f1239)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 20,
              color: '#fff',
              boxShadow: '0 0 16px rgba(225,29,72,0.4)',
            }}
          >
            T
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
            TAHRA <span style={{ color: '#f43f5e', fontWeight: 400 }}>AI</span>
          </span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#9ca3af',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '8px 16px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          ← Kembali ke Dashboard
        </button>
      </nav>

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#f43f5e',
              background: 'rgba(244,63,94,0.1)',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            Step 1 dari 2: Input Data
          </span>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 12, color: '#fff' }}>BUAT KAMPANYE BARU</h1>
          <p style={{ color: '#9ca3af', marginTop: 6, fontSize: 14 }}>Isi info produk kamu dan biarkan Agen AI merancang strategi secara otomatis</p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: 32,
            backdropFilter: 'blur(12px)',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  border: '4px solid rgba(244,63,94,0.2)',
                  borderTop: '4px solid #f43f5e',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ fontSize: 18, color: '#fff', fontWeight: 700, marginBottom: 8 }}>Tahra AI Sedang Bekerja...</h3>
              <p style={{ color: '#f43f5e', fontSize: 14, fontWeight: 600 }}>{step}</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, letterSpacing: '0.05em' }}>NAMA PRODUK / UMKM</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kopi Susu Aren TAHRA"
                  value={form.product_name}
                  onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, letterSpacing: '0.05em' }}>PLATFORM IKLAN</label>
                <select
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                  }}
                >
                  <option value="TikTok" style={{ background: '#121212' }}>
                    🎵 TikTok Ads
                  </option>
                  <option value="Instagram" style={{ background: '#121212' }}>
                    📸 Instagram Ads
                  </option>
                  <option value="Facebook" style={{ background: '#121212' }}>
                    📢 Facebook Ads
                  </option>
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, letterSpacing: '0.05em' }}>TARGET AUDIENS</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Anak muda umur 18-25 tahun, suka nongkrong"
                  value={form.target_audience}
                  onChange={(e) => setForm({ ...form, target_audience: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, letterSpacing: '0.05em' }}>ESTIMASI BUDGET (RP)</label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 500000"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(225,29,72,0.3)',
                }}
              >
                🚀 GENERATE STRATEGI KAMPANYE (AI AGENT)
              </button>
            </>
          )}
        </form>
      </main>
    </div>
  );
}
