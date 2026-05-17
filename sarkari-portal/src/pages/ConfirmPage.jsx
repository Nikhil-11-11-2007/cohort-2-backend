import { useState } from 'react'
import usePageTransition from '../hooks/usePageTransition'
import ConfirmModal from '../components/ConfirmModal'
import FakeLoader from '../components/FakeLoader'

export default function ConfirmPage() {
  const pageRef = usePageTransition()
  const [modalStep, setModalStep] = useState(0)
  const [allConfirmed, setAllConfirmed] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [started, setStarted] = useState(false)

  const handleConfirm = () => {
    if (modalStep < 3) {
      setModalStep(s => s + 1)
    } else {
      setAllConfirmed(true)
    }
  }

  const handleCancel = () => {
    setCancelled(true)
    setStarted(false)
    setTimeout(() => {
      setModalStep(0)
      setCancelled(false)
    }, 2500)
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f0ede0] flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-[#003087] text-white py-4 px-6 border-b-4 border-[#FF6600] mb-6">
          <h1 className="text-2xl font-black uppercase tracking-widest text-yellow-300" style={{ fontFamily: 'Impact' }}>
            FINAL SUBMISSION CONFIRMATION
          </h1>
          <p style={{ fontFamily: 'Courier New', fontSize: '11px' }} className="text-gray-300 mt-1">
            Please confirm your intent to confirm your confirmation of submission.
          </p>
        </div>

        <div className="bg-white border-4 border-[#800000] p-6 shadow-xl">
          {!allConfirmed ? (
            <>
              <div className="text-6xl mb-4">📋</div>
              <p className="text-lg font-bold text-[#003087] mb-2" style={{ fontFamily: 'Times New Roman' }}>
                Application Reference: GSEWA/2024/TEMP-{Math.floor(Math.random() * 900000 + 100000)}
              </p>
              <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Times New Roman' }}>
                You must complete 4 mandatory confirmation steps before submission.
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`w-10 h-10 flex items-center justify-center font-black text-sm border-2 ${
                    i < modalStep ? 'bg-green-600 border-green-600 text-white'
                    : i === modalStep && started ? 'bg-[#FF6600] border-[#FF6600] text-white animate-pulse'
                    : 'bg-gray-200 border-gray-400 text-gray-500'
                  }`} style={{ fontFamily: 'Impact' }}>
                    {i < modalStep ? '✓' : i + 1}
                  </div>
                ))}
              </div>
              <button
                id="start-confirm-btn"
                onClick={() => setStarted(true)}
                className="bg-[#003087] hover:bg-blue-900 text-white font-black uppercase tracking-widest px-8 py-4 text-lg transition-colors"
                style={{ fontFamily: 'Impact' }}
              >
                🚀 BEGIN CONFIRMATION RITUAL
              </button>
              {cancelled && (
                <p className="mt-4 text-red-600 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  😭 Application cancelled. Resetting in 2 seconds...
                </p>
              )}
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">⚙️</div>
              <p className="text-lg font-black text-[#003087] mb-4 uppercase tracking-widest" style={{ fontFamily: 'Impact' }}>
                PROCESSING YOUR APPLICATION...
              </p>
              <FakeLoader nextRoute="/success" />
            </>
          )}
        </div>

        <p className="mt-4 text-gray-300" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive' }}>
          All 4 confirmations mandatory per Rule 47(b) sub-section III of GovSewa Procedural Manual (2003 ed., revised 2007, re-revised 2009).
        </p>
      </div>

      {started && !allConfirmed && !cancelled && (
        <ConfirmModal step={modalStep} onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  )
}
