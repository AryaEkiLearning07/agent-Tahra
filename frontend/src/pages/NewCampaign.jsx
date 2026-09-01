import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = 'http://127.0.0.1:8000'

const Field = ({ label, children, hint }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
    <label style={{ fontSize:11, fontWeight:800, color:'var(--red-bright)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{label}</label>
    {children}
    {hint && <p style={{ fontSize:11, color:'var(--muted)' }}>{hint}</p>}
  </div>
)

const RpInput = ({ id, name, value, onChange, placeholder }) => (
  <div style={{ position:'relative' }}>
    <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:12, color:'var(--muted)', fontWeight:700, pointerEvents:'none' }}>Rp</span>
    <input id={id} name={name} type="number" min="0" required
      value={value} onChange={onChange} placeholder={placeholder}
      className="form-input form-input-rp" />
  </div>
)

export default function NewCampaign() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ product_name:'', harga_jual:'', hpp:'', budget_harian:'', kategori:'Fisik' })

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const margin = form.harga_jual && form.hpp
    ? ((parseInt(form.harga_jual) - parseInt(form.hpp)) / parseInt(form.harga_jual)) * 100
    : null

  const marginColor = margin === null ? null : margin >= 30 ? '#34d399' : margin >= 20 ? '#fbbf24' : 'var(--red-bright)'
  const marginLabel = margin === null ? null : margin >= 30 ? '✅ MARGIN SEHAT' : margin >= 20 ? '⚡ PERLU PERHATIAN' : '🚫 BERISIKO VETO'

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const payload = {
        product_name: form.product_name,
        harga_jual: parseInt(form.harga_jual),
        hpp: parseInt(form.hpp),
        budget_harian: parseInt(form.budget_harian),
        kategori: form.kategori,
      }
      const res = await axios.post(`${BACKEND_URL}/api/start-agent`, payload)
      const result = res.data
      const saved = JSON.parse(localStorage.getItem('tahra_campaigns') || '[]')
      const newC = {
        id: Date.now(), product_name: form.product_name, status:'Completed',
        platform: result.strategy?.platform || '-',
        roas: result.roas_report?.roas_percentage ? `${parseFloat(result.roas_report.roas_percentage).toFixed(1)}%` : '-',
        date: new Date().toISOString().split('T')[0], result,
      }
      localStorage.setItem('tahra_campaigns', JSON.stringify([newC, ...saved]))
      navigate(`/campaign/${newC.id}`, { state:{ campaign: newC } })
    } catch {
      setError('Gagal koneksi ke backend. Pastikan server running di port 8000.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-main">
      <nav className="navbar">
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button className="btn-ghost" onClick={() => navigate('/')}>← Kembali</button>
          <span style={{ color:'var(--border)', fontSize:20 }}>|</span>
          <span style={{ fontSize:14, fontWeight:700, color:'var(--muted2)' }}>KAMPANYE BARU</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div className="logo-mark">T</div>
          <span className="logo-text">TAHRA <span>AI</span></span>
        </div>
      </nav>

      <main style={{ maxWidth:780, margin:'0 auto', padding:'52px 32px' }}>
        <div className="fade-up" style={{ marginBottom:36 }}>
          <p className="label">Langkah 1 dari 1</p>
          <h1 style={{ fontSize:36, fontWeight:900, letterSpacing:'-0.04em', textTransform:'uppercase' }}>DETAIL PRODUK</h1>
          <p style={{ color:'var(--muted2)', marginTop:10, fontSize:14 }}>
            Isi info produkmu — 5 Agent AI akan menganalisis dan merancang strategi terbaik
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card fade-up" style={{ padding:36 }}>
            {/* Top red accent */}
            <div className="red-bar" />

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }}>
              <div style={{ gridColumn:'1/-1' }}>
                <Field label="Nama Produk">
                  <input id="input-product-name" name="product_name" type="text" required
                    placeholder="e.g. Sambal Kemasan TAHRA"
                    value={form.product_name} onChange={onChange}
                    className="form-input" />
                </Field>
              </div>
              <Field label="Harga Jual" hint="Harga yang dibayar konsumen">
                <RpInput id="input-harga" name="harga_jual" value={form.harga_jual} onChange={onChange} placeholder="25000" />
              </Field>
              <Field label="HPP / Modal" hint="Biaya produksi per unit">
                <RpInput id="input-hpp" name="hpp" value={form.hpp} onChange={onChange} placeholder="10000" />
              </Field>
              <Field label="Budget Iklan Harian" hint="Budget yang dialokasikan per hari">
                <RpInput id="input-budget" name="budget_harian" value={form.budget_harian} onChange={onChange} placeholder="100000" />
              </Field>
              <Field label="Kategori Produk">
                <select id="input-kategori" name="kategori" value={form.kategori} onChange={onChange} className="form-input">
                  <option value="Fisik">🧴 Produk Fisik</option>
                  <option value="Jasa">🛠️ Jasa</option>
                  <option value="Digital">💻 Digital</option>
                </select>
              </Field>
            </div>

            {/* Live Margin Preview */}
            {margin !== null && (
              <div className="fade-up" style={{
                marginTop:22, padding:'16px 20px', borderRadius:10,
                background:'rgba(196,30,58,0.07)', border:'1px solid rgba(196,30,58,0.2)',
                display:'flex', alignItems:'center', justifyContent:'space-between'
              }}>
                <span style={{ fontSize:12, color:'var(--muted2)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>PREVIEW MARGIN</span>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:26, fontWeight:900, color:marginColor, letterSpacing:'-0.03em' }}>{margin.toFixed(1)}%</span>
                  <span style={{ fontSize:11, fontWeight:700, color:marginColor }}>{marginLabel}</span>
                </div>
              </div>
            )}

            {error && (
              <div style={{
                marginTop:18, padding:'14px 18px', borderRadius:10,
                background:'rgba(196,30,58,0.1)', border:'1px solid rgba(196,30,58,0.3)',
                color:'#f87171', fontSize:13
              }}>⚠️ {error}</div>
            )}

            <button id="btn-submit" type="submit" disabled={loading} className="btn-red"
              style={{ width:'100%', marginTop:28, justifyContent:'center', padding:'14px', fontSize:14, borderRadius:12 }}>
              {loading ? (
                <>
                  <span className="spin-anim" style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.2)', borderTopColor:'white', borderRadius:'50%', display:'inline-block' }} />
                  AGENT AI SEDANG BEKERJA...
                </>
              ) : '🔥 MULAI ANALISIS AI'}
            </button>
          </div>
        </form>

        <div style={{ display:'flex', gap:10, marginTop:20, flexWrap:'wrap' }}>
          {['5 Agent Spesialis','Analisis ROAS','Copy Iklan Otomatis','Anti-Boncos'].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </main>
    </div>
  )
}
