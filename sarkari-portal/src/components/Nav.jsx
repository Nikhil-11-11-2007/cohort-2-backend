import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FakeLoader from './FakeLoader'

const ROUTES = ['/', '/apply', '/captcha', '/confirm', '/success']
function randomRoute(current) {
  const others = ROUTES.filter(r => r !== current)
  return others[Math.floor(Math.random() * others.length)]
}

export default function Nav() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true')

    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true')
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('auth-change', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-change', handleStorageChange)
    }
  }, [])

  const handleNav = (target) => {
    const go = Math.random() < 0.2 ? randomRoute(target) : target
    navigate(go)
  }

  const handleLogout = () => {
    setShowLoader(true)
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    window.dispatchEvent(new Event('auth-change'))
    // FakeLoader will handle the navigation to '/'
  }

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white shadow-2xl">
            <FakeLoader nextRoute="/" onComplete={() => setShowLoader(false)} />
          </div>
        </div>
      )}
      <nav className="bg-[#003087] text-white px-4 py-2 flex flex-wrap items-center gap-4 border-b-4 border-[#FF6600] relative z-40">
        <div className="flex items-center gap-2 mr-auto">
          <span className="text-3xl">🏛️</span>
          <div>
            <div className="font-black uppercase tracking-widest text-yellow-300 text-sm" style={{ fontFamily: 'Impact' }}>GOVSEWA PORTAL</div>
            <div className="text-[10px] text-gray-300" style={{ fontFamily: 'Courier New' }}>भारत सरकार | Government of India | Est. 1947</div>
          </div>
        </div>
        <button onClick={() => handleNav('/apply')} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>Home</button>
        <button onClick={() => handleNav('/')} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>About</button>
        <button onClick={() => handleNav('/apply')} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>Services</button>

        {!isAuthenticated && (
          <>
            <button onClick={() => handleNav('/login')} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>Login</button>
            <button onClick={() => handleNav('/signup')} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>Register</button>
          </>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>Logout</button>
        )}

        <button onClick={() => handleNav('/')} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>Contact</button>
        <button onClick={() => handleNav('/apply')} className="text-yellow-300 hover:text-white text-sm uppercase tracking-widest hover:underline" style={{ fontFamily: 'Impact' }}>Help</button>
      </nav>
    </>
  )
}
