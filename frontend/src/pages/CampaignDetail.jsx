import { useLocation, useNavigate, useParams } from 'react';

export default function CampaignDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const campaign = location.state?.campaign || {
    id,
    product_name: 'Sambal TAHRA',
    platform: 'TikTok',
    status: 'Completed',
    roas: '185%',
    date: '2026-09-01',
    target_audience: 'Pencinta Makanan Pedas (18-35 tahun)',
    budget: '500000',
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
      {/* Navbar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate('/')}>
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
          onClick={() => navigate('/')}
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

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header Detail */}
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
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
              Detail Kampanye
            </span>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 12, color: '#fff' }}>{campaign.product_name}</h1>
            <p style={{ color: '#9ca3af', marginTop: 6, fontSize: 14 }}>
              Platform: <strong style={{ color: '#fff' }}>{campaign.platform}</strong> · Tanggal: {campaign.date}
            </p>
          </div>
          <div
            style={{
              background: 'rgba(244,63,94,0.1)',
              border: '1px solid rgba(244,63,94,0.2)',
              padding: '12px 20px',
              borderRadius: 12,
              textAlign: 'right',
            }}
          >
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>ROAS ESTIMATED</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#f43f5e' }}>{campaign.roas}</div>
          </div>
        </div>

        {/* Hasil Rekomendasi AI */}
        <div
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: 32,
            backdropFilter: 'blur(12px)',
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.01em' }}>🤖 Rekomendasi AI & Strategi Konten</h3>

          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 700 }}>HOOK KONTEN / CAPTION</span>
              <p style={{ color: '#fff', marginTop: 6, fontSize: 14, lineHeight: 1.5 }}>"Pedasnya nampol, bikin ketagihan! Cobain {campaign.product_name} sekarang sebelum kehabisan! 🔥"</p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 700 }}>REKOMENDASI AUDIENS</span>
              <p style={{ color: '#fff', marginTop: 6, fontSize: 14 }}>{campaign.target_audience || 'Demografi usia 18-30 tahun, hobi kuliner lokal.'}</p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 700 }}>ESTIMASI ANGGARAN</span>
              <p style={{ color: '#fff', marginTop: 6, fontSize: 14 }}>Rp {Number(campaign.budget || 500000).toLocaleString('id-ID')} / minggu</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
