import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const MOCK = [
  { id:1, product_name:'Sambal TAHRA',   status:'Completed', platform:'TikTok',    roas:'185%', date:'2026-09-01' },
  { id:2, product_name:'Kopi Kekinian',  status:'Thinking',  platform:'Instagram', roas:'-',    date:'2026-09-01' },
  { id:3, product_name:'Kaos Distro',    status:'Draft',     platform:'-',         roas:'-',    date:'2026-08-31' },
]

const Badge = ({ status }) => {
  const m = {
    Completed: { cls:'badge-green',  dot:'#34d399', label:'Selesai',     pulse:false },
    Thinking:  { cls:'badge-yellow', dot:'#fbbf24', label:'Thinking...', pulse:true  },
    Draft:     { cls:'badge-gray',   dot:null,      label:'Draft',       pulse:false },
  }
  const s = m[status] || m.Draft
  return (
    <span className={`badge ${s.cls}`}>
      {s.dot && <span style={{ width:6, height:6, borderRadius:'50%', background:s.dot, display:'inline-block', animation: s.pulse ? 'pulse 1.5s ease-in-out infinite' : 'none' }} />}
      {s.label}
    </span>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tahra_campaigns') || '[]')
    setCampaigns([...saved, ...MOCK])
  }, [])

  const completed = campaigns.filter(c => c.status === 'Completed').length

  return (
    <div className="bg-main">
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div className="logo-mark">T</div>
          <span className="logo-text">TAHRA <span>AI</span></span>
        </div>
        <button id="btn-new-campaign" className="btn-red" onClick={() => navigate('/new')}>
          <span style={{ fontSize:16 }}>+</span> BUAT KAMPANYE BARU
        </button>
      </nav>

      <main style={{ maxWidth:1080, margin:'0 auto', padding:'52px 32px' }}>
        {/* Title */}
        <div className="fade-up" style={{ marginBottom:40 }}>
          <p className="label">Overview</p>
          <h1 style={{ fontSize:42, fontWeight:900, letterSpacing:'-0.04em', lineHeight:1.05, textTransform:'uppercase' }}>
            DASHBOARD
          </h1>
          <p style={{ color:'var(--muted2)', marginTop:10, fontSize:14 }}>
            Kelola semua kampanye iklan UMKM kamu
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:44 }}>
          {[
            { label:'Total Kampanye', value: campaigns.length, suffix:'',    icon:'📊' },
            { label:'Kampanye Selesai',value: completed,       suffix:'',    icon:'✅' },
            { label:'Avg ROAS',        value:'185',            suffix:'%',   icon:'🔥' },
          ].map((s, i) => (
            <div key={i} className="stat-card fade-up" style={{ animationDelay:`${i*0.08}s` }}>
              <div style={{ fontSize:26, marginBottom:14 }}>{s.icon}</div>
              <div style={{ fontSize:36, fontWeight:900, color:'var(--red-bright)', letterSpacing:'-0.04em' }}>
                {s.value}<span style={{ fontSize:22 }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize:12, color:'var(--muted2)', marginTop:6, fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Section */}
        <p className="label" style={{ marginBottom:16 }}>KAMPANYE TERBARU ({campaigns.length})</p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
          {campaigns.map((c, i) => (
            <div
              key={i}
              id={`card-${c.id || i}`}
              className="card card-lift fade-up"
              style={{ padding:22, cursor:'pointer', animationDelay:`${i*0.06}s` }}
              onClick={() => navigate(`/campaign/${c.id || i}`, { state:{ campaign:c } })}
            >
              {/* Top */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div style={{
                  width:40, height:40, borderRadius:10,
                  background:'rgba(196,30,58,0.12)', border:'1px solid rgba(196,30,58,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:18
                }}>
                  { c.platform==='TikTok' ? '🎵' : c.platform==='Instagram' ? '📸' : '📢' }
                </div>
                <Badge status={c.status} />
              </div>

              {/* Name */}
              <div className="red-bar" style={{ width:32, height:3, marginBottom:10 }} />
              <h3 style={{ fontSize:16, fontWeight:800, letterSpacing:'-0.02em', marginBottom:5 }}>{c.product_name}</h3>
              <p style={{ fontSize:12, color:'var(--muted)', marginBottom:14 }}>
                {c.platform !== '-' ? c.platform : 'Belum diproses'} · {c.date}
              </p>

              {c.status==='Completed' && (
                <div style={{ paddingTop:12, borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:11, color:'var(--muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>ROAS</span>
                  <span style={{ fontSize:18, fontWeight:900, color:'var(--red-bright)' }}>{c.roas}</span>
                </div>
              )}
            </div>
          ))}

          {/* Add card */}
          <div
            className="card fade-up"
            style={{
              padding:22, cursor:'pointer', display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', minHeight:160,
              border:'1px dashed rgba(196,30,58,0.25)', background:'rgba(196,30,58,0.03)',
              animationDelay:`${campaigns.length*0.06}s`
            }}
            onClick={() => navigate('/new')}
          >
            <div style={{ fontSize:30, color:'var(--red-bright)', opacity:0.6, marginBottom:8 }}>+</div>
            <p style={{ fontSize:12, color:'var(--muted)', fontWeight:600 }}>KAMPANYE BARU</p>
          </div>
        </div>
      </main>
    </div>
  )
}
