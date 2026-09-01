import { useLocation, useNavigate } from 'react-router-dom'

const MOCK = {
  status:'COMPLETED',
  product:{ product_name:'Sambal TAHRA', key_features:['Rasa pedas autentik','Bahan alami tanpa MSG','Kemasan higienis vakum'], product_class:'Menengah', audience_psychography:'Wanita 20-35 tahun, pecinta kuliner, urban, aktif di media sosial' },
  financial_report:{ margin_value:15000, margin_percentage:60.0, financial_status:'HEALTHY', consultation_advice:'Margin sangat sehat! Kamu punya ruang yang besar untuk beriklan agresif dan tetap profit.' },
  strategy:{ target_demography:'Wanita 20-35 tahun, urban, Jawa-Bali', platform:'TikTok', aspect_ratio:'9:16', bidding_model:'CPM', max_cpa_limit:6000 },
  creative:{ headline:'Pedas yang Bikin Nagih, Sekali Coba Ketagihan!', primary_text:'Bosan sambal yang hambar dan tidak berasa? Sambal TAHRA hadir dengan cita rasa autentik yang langsung membakar semangat makanmu. Dibuat dari cabai segar pilihan tanpa bahan pengawet.', cta:'Order Sekarang! Gratis Ongkir 🔥', image_prompt:'Product photo of premium chili sauce jar, dramatic studio lighting, dark moody background, smoke effect, 9:16 vertical format, high-end food photography' },
  roas_report:{ budget_harian:100000, estimasi_tayangan:5000, estimasi_klik:100, estimasi_pembeli:3, estimasi_omzet:75000, estimasi_laba_bersih:5000, roas_percentage:75.0, roas_status:'BONCOS', summary:'Dengan budget Rp 100.000/hari, ROAS masih di bawah 100%. Disarankan tingkatkan budget atau harga jual agar mencapai titik profit.' }
}

const Rp = n => `Rp ${Number(n).toLocaleString('id-ID')}`

const Section = ({ icon, title, badge, children }) => (
  <div className="card" style={{ padding:28 }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ fontSize:18 }}>{icon}</span>
        <h3 style={{ fontSize:15, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.02em' }}>{title}</h3>
      </div>
      {badge}
    </div>
    <div className="red-bar" style={{ width:40 }} />
    {children}
  </div>
)

const Metric = ({ label, value, color }) => (
  <div style={{ background:'var(--bg2)', borderRadius:10, padding:'16px 18px', border:'1px solid var(--border)' }}>
    <p style={{ fontSize:10, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>{label}</p>
    <p style={{ fontSize:26, fontWeight:900, color: color || 'var(--text)', letterSpacing:'-0.03em' }}>{value}</p>
  </div>
)

const StepRow = ({ step, title, status, delay }) => {
  const cfg = { done:{cls:'step-done',icon:'✓',note:'Selesai'}, loading:{cls:'step-active',icon:'●',note:'Sedang berjalan...'}, pending:{cls:'step-pending',icon:'○',note:'Menunggu'} }[status]
  return (
    <div className="step-row fade-up" style={{ animationDelay:`${delay}s` }}>
      <div className={`step-dot ${cfg.cls}`} style={status==='loading'?{animation:'pulse 1.5s ease-in-out infinite'}:{}}>
        {cfg.icon}
      </div>
      <div style={{ flex:1 }}>
        <p style={{ fontSize:14, fontWeight:700 }}>{title}</p>
        <p style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>Sub-Agent {step} · {cfg.note}</p>
      </div>
      {status==='loading' && (
        <span className="spin-anim" style={{ width:15, height:15, border:'2px solid rgba(196,30,58,0.3)', borderTopColor:'var(--red-bright)', borderRadius:'50%', display:'inline-block' }} />
      )}
    </div>
  )
}

export default function CampaignDetail() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const campaign = state?.campaign
  const result = campaign?.result || MOCK

  const isCompleted = ['COMPLETED','VETO'].includes(result?.status)
  const isVeto = result?.financial_report?.financial_status === 'VETO'
  const roas = result?.roas_report
  const isProfitable = parseFloat(roas?.roas_percentage) >= 100
  const fin = result?.financial_report
  const strat = result?.strategy
  const cr = result?.creative

  return (
    <div className="bg-main">
      <nav className="navbar">
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button className="btn-ghost" onClick={() => navigate('/')}>← Dashboard</button>
          <span style={{ color:'var(--border)', fontSize:20 }}>|</span>
          <span style={{ fontSize:14, fontWeight:700, color:'var(--muted2)' }}>{result?.product?.product_name || campaign?.product_name}</span>
        </div>
        <span className={`badge ${isCompleted ? 'badge-green' : 'badge-yellow'}`}>
          {isCompleted ? '✅ SELESAI' : '⏳ THINKING...'}
        </span>
      </nav>

      <main style={{ maxWidth:880, margin:'0 auto', padding:'52px 32px' }}>
        {!isCompleted ? (
          /* THINKING */
          <div style={{ maxWidth:460, margin:'0 auto' }}>
            <div className="fade-up" style={{ marginBottom:32 }}>
              <p className="label">PROSES BERJALAN</p>
              <h1 style={{ fontSize:30, fontWeight:900, letterSpacing:'-0.03em', textTransform:'uppercase' }}>AI SEDANG MENGANALISIS</h1>
              <p style={{ color:'var(--muted2)', marginTop:10, fontSize:14 }}>5 agent spesialis bekerja secara berurutan</p>
            </div>
            <div className="card" style={{ padding:28 }}>
              <div className="red-bar" />
              {[
                { step:'1A', title:'Product Decoder',     status:'done',    delay:0 },
                { step:'2',  title:'Business Consultant', status:'done',    delay:0.1 },
                { step:'3',  title:'Media Planner',       status:'loading', delay:0.2 },
                { step:'4A', title:'Copywriter',          status:'pending', delay:0.3 },
                { step:'5B', title:'Financial Reporter',  status:'pending', delay:0.4 },
              ].map(s => <StepRow key={s.step} {...s} />)}
            </div>
          </div>
        ) : (
          /* COMPLETED */
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div className="fade-up" style={{ marginBottom:8 }}>
              <p className="label">LAPORAN KAMPANYE</p>
              <h1 style={{ fontSize:34, fontWeight:900, letterSpacing:'-0.04em', textTransform:'uppercase' }}>
                {result?.product?.product_name}
              </h1>
            </div>

            {isVeto && (
              <div className="fade-up" style={{ padding:'20px 24px', borderRadius:14, background:'rgba(196,30,58,0.1)', border:'1px solid rgba(196,30,58,0.3)' }}>
                <h3 style={{ fontSize:15, fontWeight:800, color:'var(--red-bright)', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:8 }}>🚫 KAMPANYE DIVETO</h3>
                <p style={{ fontSize:14, color:'#fca5a5', lineHeight:1.7 }}>{fin?.consultation_advice}</p>
              </div>
            )}

            {/* Card A */}
            <Section icon="💼" title="Analisis Finansial">
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:18 }}>
                <Metric label="Margin" value={`${fin?.margin_percentage?.toFixed(1)}%`}
                  color={fin?.financial_status==='HEALTHY' ? '#34d399' : 'var(--red-bright)'} />
                <Metric label="Profit/Unit" value={Rp(fin?.margin_value)} color="var(--red-bright)" />
                <Metric label="Status" value={fin?.financial_status}
                  color={fin?.financial_status==='HEALTHY' ? '#34d399' : fin?.financial_status==='VETO' ? 'var(--red-bright)' : '#fbbf24'} />
              </div>
              <div style={{ padding:'14px 18px', borderRadius:10, background:'rgba(196,30,58,0.07)', border:'1px solid rgba(196,30,58,0.18)', color:'#fca5a5', fontSize:13, lineHeight:1.7, fontStyle:'italic' }}>
                💡 {fin?.consultation_advice}
              </div>
            </Section>

            {/* Card B */}
            {!isVeto && (
              <Section icon="🎨" title="Aset Kampanye"
                badge={<span className="chip">{strat?.platform} · {strat?.aspect_ratio}</span>}
              >
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }}>
                  <div>
                    <p style={{ fontSize:10, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>TARGET</p>
                    <p style={{ fontSize:13, color:'var(--muted2)', marginBottom:18 }}>{strat?.target_demography}</p>

                    <p style={{ fontSize:10, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>HEADLINE</p>
                    <p style={{ fontSize:19, fontWeight:900, lineHeight:1.3, marginBottom:18, letterSpacing:'-0.02em' }}>{cr?.headline}</p>

                    <p style={{ fontSize:10, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>COPY (PAS FRAMEWORK)</p>
                    <p style={{ fontSize:13, color:'var(--muted2)', lineHeight:1.75, marginBottom:18 }}>{cr?.primary_text}</p>

                    <span className="btn-red" style={{ fontSize:12, padding:'8px 18px', borderRadius:100, cursor:'default' }}>
                      {cr?.cta}
                    </span>
                  </div>
                  <div style={{ background:'var(--bg2)', borderRadius:12, padding:18, border:'1px solid var(--border)', height:'fit-content' }}>
                    <p style={{ fontSize:10, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:10 }}>AI IMAGE PROMPT</p>
                    <p style={{ fontSize:12, color:'var(--muted2)', lineHeight:1.8, fontStyle:'italic' }}>"{cr?.image_prompt}"</p>
                    <div style={{ marginTop:14, padding:'8px 12px', borderRadius:8, background:'rgba(196,30,58,0.1)', color:'#f87171', fontSize:11, fontWeight:600 }}>
                      ↗ Copy ke Midjourney / DALL-E / SD
                    </div>
                  </div>
                </div>
              </Section>
            )}

            {/* Card C */}
            {!isVeto && roas && (
              <Section icon="📊" title="Proyeksi ROAS"
                badge={<span className={`badge ${isProfitable?'badge-green':'badge-red'}`}>{isProfitable?'✅ PROFIT':'⚠️ BONCOS'}</span>}
              >
                {/* Big number */}
                <div style={{ textAlign:'center', padding:'28px 0 24px' }}>
                  <p style={{ fontSize:72, fontWeight:900, color: isProfitable ? '#34d399' : 'var(--red-bright)', letterSpacing:'-0.05em', lineHeight:1 }}>
                    {parseFloat(roas.roas_percentage).toFixed(1)}%
                  </p>
                  <p style={{ fontSize:13, color:'var(--muted2)', marginTop:8, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em' }}>Return on Ad Spend</p>
                </div>

                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Metrik</th>
                      <th style={{ textAlign:'right' }}>Estimasi AI</th>
                      <th>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { l:'Budget Harian',      v:Rp(roas.budget_harian),                                n:'Input kamu' },
                      { l:'Estimasi Tayangan',  v:`${Number(roas.estimasi_tayangan).toLocaleString()} orang`, n:'CPM Rp 20.000' },
                      { l:'Estimasi Klik',      v:`${Number(roas.estimasi_klik).toLocaleString()} orang`,     n:'CTR 2%' },
                      { l:'Estimasi Pembeli',   v:`${Number(roas.estimasi_pembeli).toLocaleString()} orang`,  n:'CVR 3%' },
                      { l:'Estimasi Omzet',     v:Rp(roas.estimasi_omzet),                               n:'Pembeli × Harga' },
                      { l:'Estimasi Laba',      v:Rp(roas.estimasi_laba_bersih),                          n:'Omzet − HPP − Iklan' },
                    ].map((r,i) => (
                      <tr key={i}>
                        <td style={{ fontWeight:500 }}>{r.l}</td>
                        <td style={{ textAlign:'right', fontWeight:800, color:'var(--red-bright)' }}>{r.v}</td>
                        <td style={{ color:'var(--muted)', fontSize:11 }}>{r.n}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{
                  marginTop:18, padding:'14px 18px', borderRadius:10, fontSize:13, lineHeight:1.7,
                  background: isProfitable ? 'rgba(16,185,129,0.08)' : 'rgba(196,30,58,0.08)',
                  border: `1px solid ${isProfitable ? 'rgba(16,185,129,0.2)' : 'rgba(196,30,58,0.25)'}`,
                  color: isProfitable ? '#6ee7b7' : '#fca5a5',
                }}>{roas.summary}</div>
              </Section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
