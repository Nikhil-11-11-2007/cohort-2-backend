import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CookieBanner() {
  const [visible, setVisible] = useState(true)
  const bannerRef = useRef(null)

  useEffect(() => {
    if (bannerRef.current) {
      gsap.from(bannerRef.current, { y: 100, opacity: 0, duration: 1.2, ease: 'bounce.out', delay: 2.5 })
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#003087] border-t-4 border-[#FF6600] p-4 md:p-6 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 max-w-screen-xl mx-auto">
        <div className="text-white flex-1">
          <p className="text-lg md:text-xl font-black uppercase tracking-widest mb-1" style={{ fontFamily: 'Impact' }}>
            🍪 MANDATORY COOKIE ACCEPTANCE NOTICE
          </p>
          <p className="text-xs md:text-sm" style={{ fontFamily: 'Times New Roman' }}>
            This website uses 847 varieties of cookies, supercookies, evercookies, localStorage bombs, browser fingerprints,
            session DNA, IP tattoos, and 3 types of cookies that don't exist yet. By clicking "Accept All Mega Cookies" you
            consent to being tracked across all 11 dimensions of space-time. Your data will be sold to 12,847 third parties
            including shadow governments, your ex, and the local paanwala.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <button
            id="accept-cookies-btn"
            onClick={() => setVisible(false)}
            className="bg-[#FF6600] hover:bg-orange-400 active:scale-95 text-white font-black px-8 py-4 uppercase tracking-widest border-4 border-yellow-300 shadow-lg transition-transform hover:scale-105 text-lg md:text-2xl"
            style={{ fontFamily: 'Impact', minWidth: '240px' }}
          >
            🍪 ACCEPT ALL MEGA COOKIES
          </button>
          <button
            id="decline-cookies-btn"
            onClick={() => setVisible(false)}
            className="text-gray-400 underline hover:text-gray-300"
            style={{ fontSize: '4px', fontFamily: 'Times New Roman' }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
