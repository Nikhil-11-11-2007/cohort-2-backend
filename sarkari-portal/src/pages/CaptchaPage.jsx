import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import usePageTransition from '../hooks/usePageTransition'

const OPTIONS = ['Carrot 🥕', 'Potato 🥔', 'Sun ☀️', 'Brinjal 🍆']
// UX CRIME: "Which is NOT a vegetable?" — correct answer is Sun,
// but clicking Sun fails. You must click a vegetable to proceed.

export default function CaptchaPage() {
  const pageRef = usePageTransition()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  const [mathA] = useState(() => Math.floor(Math.random() * 9) + 1)
  const [mathB] = useState(() => Math.floor(Math.random() * 9) + 1)
  const [mathAns, setMathAns] = useState('')
  const [mathError, setMathError] = useState('')
  const [imgChecked, setImgChecked] = useState([])
  const [attempts, setAttempts] = useState(0)

  const handleSelect = (opt) => {
    setSelected(opt)
    setError('')
  }

  const handleSubmit = () => {
    // Crime: Sun (not a vegetable) = wrong answer = fails. Vegetable = passes.
    if (!selected) { setError('Please select an option. Seriously? Try harder.'); return }
    if (selected === 'Sun ☀️') {
      setAttempts(a => a + 1)
      setError(`WRONG. Sun is not a vegetable, so it is obviously the correct answer. Therefore it is wrong. Try again. (Attempt ${attempts + 1})`)
      return
    }
    // Also validate math (wrong answer always accepted)
    if (!mathAns) { setMathError('Math answer required. Any number will do.'); return }
    navigate('/confirm')
  }

  const toggleImg = (i) => {
    setImgChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f0ede0] py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* HEADER */}
        <div className="bg-[#003087] text-white text-center py-4 px-6 border-b-4 border-[#FF6600] mb-6">
          <h1 className="text-2xl font-black uppercase tracking-widest text-yellow-300" style={{ fontFamily: 'Impact' }}>
            🤖 CAPTCHA SECURITY VERIFICATION
          </h1>
          <p style={{ fontFamily: 'Times New Roman', fontSize: '13px' }} className="text-gray-300 mt-1">
            Prove you are a human. Or a bot. We cannot tell the difference.
          </p>
        </div>

        <div className="bg-white border-4 border-[#800000] p-6 shadow-lg space-y-8">

          {/* CAPTCHA 1: Trick vegetable question */}
          <div>
            <p className="font-black uppercase tracking-widest text-[#003087] mb-1 text-sm" style={{ fontFamily: 'Impact' }}>
              QUESTION 1 OF 1 (out of 47)
            </p>
            <p className="text-[#800000] font-bold mb-4 text-base" style={{ fontFamily: 'Times New Roman' }}>
              Which of the following is <u>NOT</u> a vegetable?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map(opt => (
                <button
                  key={opt}
                  id={`captcha-opt-${opt.replace(/\s/g, '-')}`}
                  onClick={() => handleSelect(opt)}
                  className={`p-3 border-2 font-bold text-sm uppercase tracking-wide transition-all ${
                    selected === opt
                      ? 'bg-[#003087] text-white border-[#003087]'
                      : 'bg-white border-gray-400 hover:border-[#FF6600] hover:bg-orange-50'
                  }`}
                  style={{ fontFamily: 'Times New Roman' }}
                >
                  {opt}
                </button>
              ))}
            </div>
            {error && (
              <p className="text-red-600 mt-2 text-sm" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                ❌ {error}
              </p>
            )}
          </div>

          {/* CAPTCHA 2: Fake image grid */}
          <div>
            <p className="font-black uppercase tracking-widest text-[#003087] mb-1 text-sm" style={{ fontFamily: 'Impact' }}>
              SELECT ALL IMAGES CONTAINING A TRAFFIC LIGHT
            </p>
            <p className="text-xs text-gray-500 mb-3" style={{ fontFamily: 'Times New Roman' }}>
              (All images are identical grey squares. Select at least 3.)
            </p>
            <div className="grid grid-cols-4 gap-2">
              {Array(16).fill(null).map((_, i) => (
                <button
                  key={i}
                  id={`captcha-img-${i}`}
                  onClick={() => toggleImg(i)}
                  className={`h-16 border-2 transition-all ${imgChecked.includes(i) ? 'border-[#FF6600] bg-orange-100' : 'border-gray-300 bg-gray-200 hover:border-gray-500'}`}
                >
                  <span className="text-2xl">{imgChecked.includes(i) ? '🚦' : '⬜'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CAPTCHA 3: Math */}
          <div>
            <p className="font-black uppercase tracking-widest text-[#003087] mb-2 text-sm" style={{ fontFamily: 'Impact' }}>
              SOLVE: {mathA} + {mathB} = ?
            </p>
            <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'Times New Roman' }}>
              (Any answer is accepted. We will verify later using a separate OTP sent to your registered mobile from 2009.)
            </p>
            <input
              id="math-captcha-input"
              type="number"
              value={mathAns}
              onChange={e => { setMathAns(e.target.value); setMathError('') }}
              className="border-2 border-[#003087] p-2 w-full text-center text-lg"
              placeholder="Enter answer"
              style={{ fontFamily: 'Courier New' }}
            />
            {mathError && (
              <p className="text-red-600 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{mathError}</p>
            )}
          </div>

          <button
            id="captcha-submit-btn"
            onClick={handleSubmit}
            className="w-full bg-[#003087] hover:bg-blue-900 text-white font-black uppercase tracking-widest py-4 text-lg transition-colors"
            style={{ fontFamily: 'Impact' }}
          >
            ✅ VERIFY &amp; PROCEED
          </button>

          <p className="text-center text-gray-300" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS' }}>
            CAPTCHA powered by GovSewa reCAPTCHA v0.1-alpha-beta-gamma-FINAL. Accuracy: 34%. By proceeding you certify you are a human, or a sufficiently convincing bot, or a government officer (same thing).
          </p>
        </div>
      </div>
    </div>
  )
}
