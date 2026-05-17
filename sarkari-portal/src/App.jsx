import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ApplyForm from './pages/ApplyForm'
import CaptchaPage from './pages/CaptchaPage'
import ConfirmPage from './pages/ConfirmPage'
import SuccessPage from './pages/SuccessPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MarqueeTicker from './components/MarqueeTicker'
import CookieBanner from './components/CookieBanner'
import SessionTimer from './components/SessionTimer'

function Watermark() {
  const rows = Array(18).fill(null)
  const cols = Array(8).fill(null)
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 1, overflow: 'hidden', opacity: 0.05,
    }}>
      {rows.map((_, r) => (
        <div key={r} style={{ display: 'flex', gap: '60px', padding: '20px 0' }}>
          {cols.map((_, c) => (
            <span
              key={c}
              style={{
                fontFamily: 'Impact', fontSize: '18px', color: '#003087',
                transform: 'rotate(-30deg)', display: 'inline-block', whiteSpace: 'nowrap',
              }}
            >
              GOVERNMENT OF INDIA
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen relative" style={{ fontFamily: 'Times New Roman, serif', backgroundColor: '#f0ede0' }}>
      <Watermark />
      <div className="relative z-10">
        <MarqueeTicker />
        <SessionTimer />
        <CookieBanner />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/apply"   element={<ApplyForm />} />
          <Route path="/captcha" element={<CaptchaPage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login"   element={<LoginPage />} />
          <Route path="/signup"  element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  )
}
