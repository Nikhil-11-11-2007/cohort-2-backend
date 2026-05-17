import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

export default function EscapeButton({ nextRoute, label = 'SUBMIT APPLICATION' }) {
  const btnRef = useRef(null)
  const containerRef = useRef(null)
  const [attempts, setAttempts] = useState(0)
  const [surrendered, setSurrendered] = useState(false)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    if (surrendered) return
    const next = attempts + 1
    setAttempts(next)
    if (next >= 5) {
      setSurrendered(true)
      gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })
      return
    }
    const maxX = 220
    const maxY = 100
    const x = (Math.random() - 0.5) * maxX * 2
    const y = (Math.random() - 0.5) * maxY * 2
    gsap.to(btnRef.current, { x, y, duration: 0.18, ease: 'power3.out' })
  }

  const handleClick = () => {
    if (surrendered || attempts >= 5) {
      navigate(nextRoute)
    }
  }

  return (
    <div ref={containerRef} className="relative h-32 flex items-center justify-center overflow-visible my-4">
      {attempts > 0 && !surrendered && (
        <p className="absolute top-0 left-0 right-0 text-center text-red-600 text-xs" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          😤 Button is shy! Attempt {attempts}/5 — keep trying...
        </p>
      )}
      {surrendered && (
        <p className="absolute top-0 left-0 right-0 text-center text-green-700 text-xs font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          😮‍💨 Fine, the button gave up. Click it now.
        </p>
      )}
      <button
        ref={btnRef}
        id="submit-btn"
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={`px-10 py-4 font-black uppercase tracking-widest text-white border-4 text-lg transition-colors ${
          surrendered
            ? 'bg-green-700 border-green-400 cursor-pointer'
            : 'bg-[#800000] border-[#FF6600] cursor-none'
        }`}
        style={{ fontFamily: 'Impact', position: 'relative' }}
      >
        {surrendered ? '✅ ' : ''}
        {label}
      </button>
    </div>
  )
}
