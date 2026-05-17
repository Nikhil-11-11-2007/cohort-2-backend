import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import usePageTransition from '../hooks/usePageTransition'

import FormField from '../components/FormField'

export default function LoginPage() {
  const pageRef = usePageTransition()
  const navigate = useNavigate()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [captcha] = useState(() => {
    const a = Math.floor(Math.random() * 9) + 1
    const b = Math.floor(Math.random() * 9) + 1
    return { a, b, answer: String(a + b) }
  })
  const [captchaInput, setCaptchaInput] = useState('')
  const [errors, setErrors] = useState({})
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [showOtpScreen, setShowOtpScreen] = useState(false)
  const [otp, setOtp] = useState('')

  const validate = () => {
    const e = {}
    if (!userId.trim()) e.userId = 'User ID is required (Aadhaar / PAN / Voter ID / Passport / Ration Card)'
    if (!password) e.password = 'Password is required'
    if (captchaInput !== captcha.answer) e.captcha = `Wrong answer. The answer is not "${captchaInput}". Seriously? Try harder.`
    return e
  }

  const handleLogin = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      setLoginAttempts(a => a + 1)
      return
    }
    // After 2 successful validations, show OTP screen as another barrier
    setShowOtpScreen(true)
  }

  const handleOtpSubmit = () => {
    if (!otp) { setErrors({ otp: 'OTP is required. Check your 2009 phone number.' }); return }
    // UX CRIME: OTP always wrong first time
    if (otp !== '000000') {
      setErrors({ otp: `OTP "${otp}" is incorrect. Please check the OTP sent to your registered mobile number ending in ****. (Hint: it was sent in 2019)` })
      return
    }
    navigate('/apply')
  }

  if (showOtpScreen) {
    return (
      <div ref={pageRef} className="min-h-screen bg-[#f0ede0] flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-[#003087] text-white text-center py-4 border-b-4 border-[#FF6600]">
            <h1 className="text-2xl font-black uppercase tracking-widest text-yellow-300" style={{ fontFamily: 'Impact' }}>
              OTP VERIFICATION
            </h1>
            <p style={{ fontFamily: 'Courier New', fontSize: '11px' }} className="text-gray-300 mt-1">
              Step 2 of 7 — OTP Authentication
            </p>
          </div>
          <div className="bg-white border-4 border-[#800000] p-6 shadow-xl space-y-4">
            <div className="bg-yellow-50 border-2 border-yellow-400 p-3 text-sm" style={{ fontFamily: 'Times New Roman' }}>
              <p className="font-bold text-yellow-700">OTP sent to: +91-XXXXXXX{Math.floor(Math.random() * 90 + 10)}</p>
              <p className="text-xs text-gray-500 mt-1">(OTP valid for 30 seconds. You have been on this screen for 31 seconds.)</p>
            </div>
            <FormField
              id="otp-input" label="Enter 6-Digit OTP" type="text"
              value={otp} onChange={e => { setOtp(e.target.value); setErrors({}) }}
              placeholder="Enter OTP (Hint: 000000)" error={errors.otp}
            />
            <p className="text-gray-300" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS' }}>
              Did not receive OTP? Click Resend after 300 seconds. Resend limit: 0 per day. Contact helpdesk at 3:00 AM.
            </p>
            <button
              id="otp-submit-btn"
              onClick={handleOtpSubmit}
              className="w-full bg-[#003087] hover:bg-blue-900 text-white font-black uppercase tracking-widest py-3 transition-colors"
              style={{ fontFamily: 'Impact' }}
            >
              VERIFY OTP &amp; LOGIN
            </button>
            <button
              className="w-full text-gray-400 underline text-xs"
              style={{ fontFamily: 'Times New Roman', fontSize: '4px' }}
              onClick={() => {}}
            >
              Resend OTP (0 attempts remaining)
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f0ede0] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* HEADER */}
        <div className="bg-[#003087] text-white text-center py-5 border-b-4 border-[#FF6600]">
          <div className="text-4xl mb-2">🏛️</div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-yellow-300" style={{ fontFamily: 'Impact' }}>
            CITIZEN LOGIN
          </h1>
          <p style={{ fontFamily: 'Courier New', fontSize: '11px' }} className="text-gray-300 mt-1">
            GovSewa Portal v1.0.0-alpha-beta-FINAL (2003)
          </p>
        </div>

        {loginAttempts >= 3 && (
          <div className="bg-red-700 text-white p-3 text-center text-sm" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            ⚠️ {loginAttempts} failed attempts! Account will be locked after 3 more attempts (limit: ∞).
          </div>
        )}

        <div className="bg-white border-4 border-[#800000] p-6 shadow-xl space-y-5">
          <FormField
            id="userId"
            label="User ID (Aadhaar / PAN / Voter ID / Passport No. / Ration Card No. / Employee ID / Any Govt ID)"
            value={userId} onChange={e => { setUserId(e.target.value); setErrors(er => ({ ...er, userId: undefined })) }}
            placeholder="Enter any of 47 accepted ID types" error={errors.userId}
          />

          <FormField
            id="login-password" label="Password" type="password"
            value={password} onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: undefined })) }}
            placeholder="Your 47-character emoji password" error={errors.password}
          />

          {/* CAPTCHA */}
          <div>
            <label className="block text-[#003087] font-black uppercase tracking-widest text-xs mb-1" style={{ fontFamily: 'Impact' }}>
              CAPTCHA: What is {captcha.a} + {captcha.b}? *
            </label>
            <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Times New Roman' }}>
              (Audio CAPTCHA available — call helpdesk at 3:00 AM for assistance)
            </p>
            <div className="flex gap-2 items-center">
              <div
                className="border-2 border-dashed border-gray-400 bg-gray-100 px-6 py-3 select-none font-black text-xl text-[#800000]"
                style={{ fontFamily: 'Courier New', letterSpacing: '8px', filter: 'blur(0.5px)' }}
              >
                {captcha.a} + {captcha.b} = ?
              </div>
              <input
                id="login-captcha"
                type="text"
                value={captchaInput}
                onChange={e => { setCaptchaInput(e.target.value); setErrors(er => ({ ...er, captcha: undefined })) }}
                placeholder="Answer"
                className="border-2 border-[#003087] p-2 w-24 text-center text-sm focus:border-[#FF6600] focus:outline-none"
                style={{ fontFamily: 'Courier New' }}
                autoComplete="off"
              />
            </div>
            {errors.captcha && (
              <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>❌ {errors.captcha}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer" style={{ fontFamily: 'Times New Roman' }}>
              <input type="checkbox" className="accent-[#003087]" />
              Remember me on this device for 0 days
            </label>
            <button
              className="text-gray-300 underline"
              style={{ fontSize: '5px', fontFamily: 'Times New Roman' }}
              onClick={() => alert('Forgot Password? Visit office 3:00 AM – 3:15 AM with 17 documents.')}
            >
              Forgot Password?
            </button>
          </div>

          <button
            id="login-submit-btn"
            onClick={handleLogin}
            className="w-full bg-[#003087] hover:bg-blue-900 active:scale-95 text-white font-black uppercase tracking-widest py-4 text-lg transition-all"
            style={{ fontFamily: 'Impact' }}
          >
            🔐 LOGIN TO PORTAL
          </button>

          <div className="text-center space-y-2">
            <Link
              to="/signup"
              className="block text-[#FF6600] hover:text-orange-400 underline text-sm font-bold"
              style={{ fontFamily: 'Times New Roman' }}
            >
              New User? Register Here (Takes 45 minutes minimum)
            </Link>
            <Link
              to="/"
              className="block text-gray-400 hover:text-gray-600 underline"
              style={{ fontFamily: 'Times New Roman', fontSize: '11px' }}
            >
              ← Back to Home
            </Link>
          </div>

          <p className="text-gray-200" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive', lineHeight: '1.5' }}>
            By logging in you agree to 847 pages of terms. Login sessions expire every 10 seconds (see timer). Maximum 0 login attempts per day.
            Account locked after ∞ wrong attempts. Password reset requires visiting the office (see help tooltip). We are not responsible for anything.
          </p>
        </div>
      </div>
    </div>
  )
}
