import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% -20%, rgba(196,30,58,0.25), transparent 70%), #0d0d0d',
        color: '#f3f4f6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          padding: 36,
          backdropFilter: 'blur(12px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #e11d48, #9f1239)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 24,
            color: '#fff',
            margin: '0 auto 16px',
            boxShadow: '0 0 20px rgba(225,29,72,0.4)',
          }}
        >
          T
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{isSignUp ? 'Buat Akun Baru' : 'Selamat Datang Kembali'}</h2>
        <p style={{ color: '#9ca3af', fontSize: 13, marginTop: 6, marginBottom: 24 }}>{isSignUp ? 'Daftar untuk mulai mengelola kampanye AI' : 'Masuk ke akun TAHRA AI kamu'}</p>

        <form onSubmit={handleAuth} style={{ display: 'grid', gap: 16, textAlign: 'left' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 6 }}>NAMA LENGKAP</label>
              <input
                type="text"
                required
                placeholder="Ahmad Rasyid"
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 14px',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 6 }}>EMAIL</label>
            <input
              type="email"
              required
              placeholder="nama@umkm.com"
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 14px',
                borderRadius: 10,
                color: '#fff',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 6 }}>PASSWORD</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 14px',
                borderRadius: 10,
                color: '#fff',
                fontSize: 13,
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
              padding: '12px',
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              marginTop: 8,
              boxShadow: '0 4px 14px rgba(225,29,72,0.3)',
            }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'} →
          </button>
        </form>

        <p style={{ color: '#9ca3af', fontSize: 12, marginTop: 20 }}>
          {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
          <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#f43f5e', fontWeight: 700, cursor: 'pointer' }}>
            {isSignUp ? 'Sign In' : 'Daftar Sekarang'}
          </span>
        </p>
      </div>
    </div>
  );
}
