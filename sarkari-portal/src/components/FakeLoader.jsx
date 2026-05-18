import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

const CYCLE_MESSAGES = [
  ['Connecting to server...', 'Authenticating credentials...', 'Loading form data...', 'Almost done...'],
  ['Verifying documents...', 'Cross-referencing Aadhaar DB...', 'Checking criminal records...', 'Connection lost. Reconnecting...'],
  ['Final verification...', 'Generating application token...', 'Submitting to department...', 'Please wait, do not refresh...'],
]

export default function FakeLoader({ nextRoute, onComplete }) {
  const barRef = useRef(null)
  const [cycle, setCycle] = useState(0)
  const [msg, setMsg] = useState('Initializing portal...')
  const navigate = useNavigate()
  const doneRef = useRef(false)

  useEffect(() => {
    if (cycle >= 3) {
      if (!doneRef.current) {
        doneRef.current = true
        if (onComplete) onComplete()
        if (nextRoute) navigate(nextRoute)
      }
      return
    }

    let msgIdx = 0
    const msgs = CYCLE_MESSAGES[cycle] || []
    const iv = setInterval(() => {
      if (msgIdx < msgs.length) setMsg(msgs[msgIdx++])
    }, 750)

    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(iv)
        setCycle(c => c + 1)
      },
    })
    tl.set(barRef.current, { width: '0%' })
    tl.to(barRef.current, { width: '100%', duration: 3, ease: 'power1.inOut' })
    tl.to(barRef.current, { width: '0%', duration: 0.35, ease: 'power3.in', delay: 0.3 })

    return () => {
      clearInterval(iv)
      tl.kill()
    }
  }, [cycle])

  return (
    <div className="w-full p-6 bg-gray-100 border-2 border-[#003087] rounded-none">
      <div className="flex justify-between mb-2">
        <span style={{ fontFamily: 'Courier New', fontSize: '12px' }} className="text-[#003087]">{msg}</span>
        <span style={{ fontFamily: 'Courier New', fontSize: '12px' }} className="text-red-600 font-bold">
          {cycle < 3 ? `Attempt ${cycle + 1}/3` : 'Done!'}
        </span>
      </div>
      <div className="w-full bg-gray-300 h-7 border border-gray-500 overflow-hidden">
        <div ref={barRef} className="h-full bg-[#FF6600]" style={{ width: '0%' }} />
      </div>
      {cycle > 0 && (
        <p className="text-red-600 text-xs mt-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          ⚠️ ERROR CODE {Math.floor(Math.random() * 9000 + 1000)}: Connection timed out. Retrying automatically...
        </p>
      )}
    </div>
  )
}
