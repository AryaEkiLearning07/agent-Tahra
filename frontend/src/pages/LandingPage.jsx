import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% -20%, rgba(196,30,58,0.25), transparent 70%), #0d0d0d',
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
          padding: '20px 48px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #e11d48, #9f1239)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 22,
              color: '#fff',
              boxShadow: '0 0 16px rgba(225,29,72,0.4)',
            }}
          >
            T
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
            TAHRA <span style={{ color: '#f43f5e', fontWeight: 400 }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 20px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(225,29,72,0.3)',
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#f43f5e',
            background: 'rgba(244,63,94,0.1)',
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid rgba(244,63,94,0.2)',
          }}
        >
          🚀 AI Marketing Agent untuk UMKM
        </span>

        <h1 style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.04em', marginTop: 24, color: '#fff', lineHeight: 1.1 }}>Otomatisasi Iklan & Strategi Marketing UMKM dalam Sekejap</h1>
        <p style={{ color: '#9ca3af', marginTop: 20, fontSize: 18, lineHeight: 1.6, maxWidth: 680, margin: '20px auto 40px' }}>
          Tahra AI membantu pebisnis merancang ide konten, strategi audiens, hingga prediksi ROAS iklan secara otomatis berbasis kecerdasan buatan.
        </p>

        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#fff',
            border: 'none',
            padding: '16px 36px',
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(225,29,72,0.4)',
          }}
        >
          Coba Sekarang Gratis →
        </button>
      </main>
    </div>
  );
}
