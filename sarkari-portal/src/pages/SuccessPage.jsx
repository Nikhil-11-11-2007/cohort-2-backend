import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import usePageTransition from '../hooks/usePageTransition'

export default function SuccessPage() {
  const pageRef = usePageTransition()
  const confettiRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!confettiRef.current) return
    const pieces = confettiRef.current.querySelectorAll('.confetti-piece')
    gsap.fromTo(
      pieces,
      { y: 0, x: 0, opacity: 1, scale: 0, rotation: 0 },
      {
        y: () => -200 - Math.random() * 400,
        x: () => (Math.random() - 0.5) * 600,
        opacity: 0,
        scale: () => 0.5 + Math.random() * 1.5,
        rotation: () => Math.random() * 720 - 360,
        duration: () => 1.5 + Math.random() * 1.5,
        ease: 'power2.out',
        stagger: 0.03,
        repeat: -1,
        repeatDelay: 1,
      }
    )
  }, [])

  const EMOJIS = ['🎉', '🎊', '✨', '🏆', '⭐', '🌟', '🎈', '🥳', '🎁', '🇮🇳']
  const COLORS = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400', 'bg-teal-400']

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f0ede0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* CONFETTI */}
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none flex items-end justify-center overflow-hidden">
        {Array(50).fill(null).map((_, i) => (
          <div
            key={i}
            className={`confetti-piece absolute w-3 h-3 ${COLORS[i % COLORS.length]}`}
            style={{
              bottom: '10%',
              left: `${(i / 50) * 100}%`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0' : '2px',
              fontSize: i % 5 === 0 ? '20px' : '10px',
            }}
          >
            {i % 7 === 0 ? EMOJIS[i % EMOJIS.length] : ''}
          </div>
        ))}
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        <div className="bg-[#003087] text-white py-4 px-6 border-b-4 border-[#FF6600] mb-0">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-yellow-300" style={{ fontFamily: 'Impact' }}>
            APPLICATION SUBMITTED!
          </h1>
        </div>

        <div className="bg-white border-4 border-green-600 p-6 sm:p-8 shadow-2xl">
          <div className="text-7xl mb-4 animate-bounce">🏆</div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-green-700 mb-2" style={{ fontFamily: 'Impact' }}>
            CONGRATULATIONS!
          </h2>
          <p className="text-base text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman' }}>
            Your application has been <strong>tentatively received</strong> by our servers (probably).
          </p>

          <div className="bg-green-50 border-2 border-green-400 p-4 mb-4 text-left">
            <p className="font-black text-green-700 uppercase tracking-widest text-sm mb-2" style={{ fontFamily: 'Impact' }}>APPLICATION DETAILS</p>
            <p style={{ fontFamily: 'Courier New', fontSize: '12px' }} className="text-gray-700">Reference No: GSEWA/2024/{Math.floor(Math.random() * 9000000 + 1000000)}</p>
            <p style={{ fontFamily: 'Courier New', fontSize: '12px' }} className="text-gray-700">Status: <span className="text-yellow-600 font-bold">PENDING (Possibly)</span></p>
            <p style={{ fontFamily: 'Courier New', fontSize: '12px' }} className="text-gray-700">Est. Processing: 3–7 Business Years</p>
            <p style={{ fontFamily: 'Courier New', fontSize: '12px' }} className="text-gray-700">Next Step: Visit office 3:00 AM–3:15 AM</p>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 mb-6 text-left">
            <p className="font-black text-yellow-700 uppercase text-sm mb-2" style={{ fontFamily: 'Impact' }}>⚠️ IMPORTANT NEXT STEPS</p>
            <ol className="text-sm space-y-1" style={{ fontFamily: 'Times New Roman' }}>
              <li>1. Print this page in triplicate (colour ink mandatory)</li>
              <li>2. Self-attest all 3 copies with blue ink only</li>
              <li>3. Visit office (3:00 AM–3:15 AM, alternate Tuesdays)</li>
              <li>4. Submit along with Form 27B/6 (Rev-II) in original</li>
              <li>5. Pay ₹2,340 counter fee (cash only, no change given)</li>
              <li>6. Wait 3–7 years for a response (maybe)</li>
              <li>7. If no response, re-apply from the beginning</li>
            </ol>
          </div>

          <button
            id="apply-again-btn"
            onClick={() => navigate('/')}
            className="w-full bg-[#FF6600] hover:bg-orange-400 text-white font-black uppercase tracking-widest py-4 text-lg border-4 border-yellow-300 transition-colors mb-3"
            style={{ fontFamily: 'Impact' }}
          >
            🔄 APPLY FOR ANOTHER CERTIFICATE
          </button>
          <button
            id="download-btn"
            onClick={() => alert('Download failed. Server is under maintenance. Please visit office at 3:00 AM.')}
            className="w-full bg-[#003087] hover:bg-blue-900 text-white font-bold uppercase py-3 transition-colors"
            style={{ fontFamily: 'Times New Roman' }}
          >
            ⬇️ Download Acknowledgement (PDF)
          </button>
        </div>

        <p className="mt-4 text-gray-300" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive' }}>
          This acknowledgement is auto-generated and holds no legal validity. GovSewa does not guarantee receipt, processing, or existence of your application in any government database.
          Application fees are non-refundable. This success screen is cosmetic only.
        </p>
      </div>
    </div>
  )
}
