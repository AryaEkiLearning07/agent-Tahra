import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MOCK = [
  { id: 1, product_name: 'Sambal TAHRA', status: 'Completed', platform: 'TikTok', roas: '185%', date: '2026-09-01' },
  { id: 2, product_name: 'Kopi Kekinian', status: 'Thinking', platform: 'Instagram', roas: '-', date: '2026-09-01' },
  { id: 3, product_name: 'Kaos Distro', status: 'Draft', platform: '-', roas: '-', date: '2026-08-31' },
];

const Badge = ({ status }) => {
  const m = {
    Completed: { cls: 'badge-green', dot: '#34d399', label: 'Selesai', pulse: false },
    Thinking: { cls: 'badge-yellow', dot: '#fbbf24', label: 'Thinking...', pulse: true },
    Draft: { cls: 'badge-gray', dot: null, label: 'Draft', pulse: false },
  };
  const s = m[status] || m.Draft;
  return (
    <span
      className={`badge ${s.cls}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.02em',
        backdropFilter: 'blur(4px)',
      }}
    >
      {s.dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: s.dot,
            display: 'inline-block',
            boxShadow: `0 0 8px ${s.dot}`,
            animation: s.pulse ? 'pulse 1.5s ease-in-out infinite' : 'none',
          }}
        />
      )}
      {s.label}
    </span>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/campaigns')
      .then((res) => {
        setCampaigns(res.data);
      })
      .catch((err) => console.error('Gagal mengambil data dari MySQL:', err));
  }, []);

  const completed = campaigns.filter((c) => c.status === 'Completed').length;

  return (
    <div
      className="bg-main"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% -20%, rgba(196,30,58,0.15), transparent 70%), #0d0d0d',
        color: '#f3f4f6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            className="logo-mark"
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
          <span className="logo-text" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
            TAHRA <span style={{ color: '#f43f5e', fontWeight: 400 }}>AI</span>
          </span>
        </div>
        <button
          id="btn-new-campaign"
          className="btn-red"
          onClick={() => navigate('/new')}
          style={{
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 14px rgba(225,29,72,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 900 }}>+</span> BUAT KAMPANYE BARU
        </button>
      </nav>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 24px' }}>
        {/* Title */}
        <div className="fade-up" style={{ marginBottom: 36 }}>
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
            Overview
          </span>
          <h1 style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 12, color: '#fff' }}>DASHBOARD KAMPANYE</h1>
          <p style={{ color: '#9ca3af', marginTop: 6, fontSize: 14 }}>Kelola dan optimalkan strategi iklan UMKM kamu secara otomatis</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 44 }}>
          {[
            { label: 'Total Kampanye', value: campaigns.length, suffix: '', icon: '📊' },
            { label: 'Kampanye Selesai', value: completed, suffix: '', icon: '✅' },
            { label: 'Avg ROAS', value: '185', suffix: '%', icon: '🔥' },
          ].map((s, i) => (
            <div
              key={i}
              className="stat-card fade-up"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: 24,
                borderRadius: 16,
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                    {s.value}
                    <span style={{ fontSize: 22, color: '#f43f5e' }}>{s.suffix}</span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    background: 'rgba(255,255,255,0.05)',
                    padding: 10,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {s.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em' }}>KAMPANYE TERBARU ({campaigns.length})</p>
        </div>

        {/* Campaign Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {campaigns.map((c, i) => (
            <div
              key={i}
              id={`card-${c.id || i}`}
              className="card card-lift fade-up"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onClick={() => navigate(`/campaign/${c.id || i}`, { state: { campaign: c } })}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: 'rgba(244,63,94,0.1)',
                      border: '1px solid rgba(244,63,94,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                    }}
                  >
                    {c.platform === 'TikTok' ? '🎵' : c.platform === 'Instagram' ? '📸' : '📢'}
                  </div>
                  <Badge status={c.status} />
                </div>

                <div style={{ width: 28, height: 3, background: '#f43f5e', borderRadius: 2, marginBottom: 12 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>{c.product_name}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
                  {c.platform !== '-' ? c.platform : 'Belum diproses'} · {c.date}
                </p>
              </div>

              {c.status === 'Completed' && (
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.05em' }}>ROAS TARGET</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#f43f5e' }}>{c.roas}</span>
                </div>
              )}
            </div>
          ))}

          {/* Add New Card */}
          <div
            className="card fade-up"
            style={{
              padding: 24,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 180,
              borderRadius: 16,
              border: '2px dashed rgba(244,63,94,0.3)',
              background: 'rgba(244,63,94,0.02)',
              transition: 'all 0.2s ease',
            }}
            onClick={() => navigate('/new')}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(244,63,94,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                color: '#f43f5e',
                marginBottom: 10,
              }}
            >
              +
            </div>
            <p style={{ fontSize: 13, color: '#f43f5e', fontWeight: 700, letterSpacing: '0.02em' }}>BUAT KAMPANYE BARU</p>
          </div>
        </div>
      </main>
    </div>
  );
}
