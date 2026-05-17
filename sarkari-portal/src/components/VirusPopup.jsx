import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function VirusPopup() {
  const [visible, setVisible] = useState(false)
  const popupRef = useRef(null)
  const posRef = useRef({ top: '30%', left: '25%' })

  useEffect(() => {
    const delay = 6000 + Math.random() * 6000
    const t = setTimeout(() => {
      posRef.current = {
        top: `${15 + Math.random() * 40}%`,
        left: `${10 + Math.random() * 45}%`,
      }
      setVisible(true)
    }, delay)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (visible && popupRef.current) {
      const sx = Math.random() > 0.5 ? -600 : 600
      const sy = Math.random() > 0.5 ? -600 : 600
      gsap.fromTo(
        popupRef.current,
        { x: sx, y: sy, opacity: 0, rotation: Math.random() * 20 - 10 },
        { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
      )
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={popupRef}
      className="fixed z-[99999] w-80 shadow-2xl"
      style={{ top: posRef.current.top, left: posRef.current.left }}
    >
      <div className="bg-[#003087] text-white px-2 py-1 flex justify-between items-center">
        <span style={{ fontFamily: 'Times New Roman', fontSize: '11px' }}>
          ⚠️ GovSewa Security Alert
        </span>
        <button
          id="virus-popup-close"
          onClick={() => setVisible(false)}
          className="text-white"
          style={{ fontSize: '4px', width: '4px', height: '4px', overflow: 'hidden', lineHeight: '1', display: 'block' }}
          title="close"
        >✕</button>
      </div>
      <div className="bg-gray-100 border-2 border-gray-400 p-4 text-center">
        <div className="text-5xl mb-2">☣️</div>
        <p className="font-black text-red-700 text-base mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          15 VIRUSES DETECTED!
        </p>
        <p className="text-sm mb-3" style={{ fontFamily: 'Times New Roman' }}>
          Your computer has 15 critical viruses. Your Aadhaar number has been compromised.
          Click OK to continue using this portal safely and securely.
        </p>
        <p className="text-gray-400 mb-3" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS' }}>
          Clicking OK grants GovSewa permission to access your webcam, microphone, GPS, PAN, Aadhaar, and browser history since 2009.
        </p>
        <button
          id="virus-ok-btn"
          onClick={() => setVisible(false)}
          className="bg-[#003087] text-white px-8 py-2 font-bold hover:bg-blue-900 uppercase tracking-wide"
          style={{ fontFamily: 'Times New Roman' }}
        >
          OK (Proceed Safely)
        </button>
      </div>
    </div>
  )
}
