import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import NewCampaign from './pages/NewCampaign'
import CampaignDetail from './pages/CampaignDetail'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<NewCampaign />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
