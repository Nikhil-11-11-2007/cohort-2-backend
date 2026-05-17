import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TICKER_TEXT = '⚠️ IMPORTANT: Portal under maintenance 11:59PM–11:58PM daily • Apply before Dec 1999 • Fees hiked 300% • Circular 2024/GOV/XYZ/FINAL/v2.3 released • Download Form 27B/6 in triplicate • Office relocated to new address (address TBD) • Aadhaar seeding mandatory for all citizens born after Big Bang • New rule: applicants must submit application before applying • ⚠️ '

export default function MarqueeTicker() {
  const tickerRef = useRef(null)

  useEffect(() => {
    if (!tickerRef.current) return
    gsap.to(tickerRef.current, {
      x: '-50%',
      duration: 22,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <div className="overflow-hidden bg-[#800000] text-yellow-300 py-1 z-50 relative border-b-2 border-yellow-400">
      <div ref={tickerRef} className="whitespace-nowrap inline-block" style={{ fontFamily: 'Courier New, monospace', fontSize: '12px' }}>
        {TICKER_TEXT}{TICKER_TEXT}
      </div>
    </div>
  )
}
