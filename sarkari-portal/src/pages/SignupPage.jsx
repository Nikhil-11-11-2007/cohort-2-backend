import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import usePageTransition from '../hooks/usePageTransition'

import FormField from '../components/FormField'

function validatePassword(pw) {
  const errs = []
  if (pw.length < 47) errs.push(`Minimum 47 characters required (you have ${pw.length})`)
  if (!/[A-Z]/.test(pw)) errs.push('Must contain at least one UPPERCASE letter')
  if (!/[0-9]/.test(pw)) errs.push('Must contain at least one number')
  if (!/[\u{1F000}-\u{1FFFF}]/u.test(pw) && !/[\u{2600}-\u{27BF}]/u.test(pw)) {
    errs.push('Must contain at least one emoji 🤡')
  }
  if (/password/i.test(pw)) errs.push('Cannot contain the word "password". Rookie mistake.')
  return errs
}

const SECURITY_QUESTIONS = [
  '— Select a Security Question —',
  "What is the name of the street you grew up on? (Include PIN code, landmark, nearest metro, and tehsil)",
  "What was your first pet's full legal name as per Aadhaar?",
  "What is your mother's maiden name? (Spell it exactly as written in Form 27B/6)",
  "Name of your Class 3 teacher? (Include their employee ID)",
  "What was the registration number of your first bicycle?",
  "What is the 8th digit of your first phone number from 1997?",
  "What did you eat for breakfast on July 14, 2003?",
  "Name of the officer who issued your ration card (include designation)?",
]

export default function SignupPage() {
  const pageRef = usePageTransition()
  const navigate = useNavigate()

  // Individual state per field — NO focus loss
  const [aadhaar, setAadhaar] = useState('')
  const [pan, setPan] = useState('')
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [secQuestion, setSecQuestion] = useState(SECURITY_QUESTIONS[0])
  const [secAnswer, setSecAnswer] = useState('')
  const [referenceNo, setReferenceNo] = useState('')
  const [agreed, setAgreed] = useState(false)

  const [pwErrors, setPwErrors] = useState([])
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1) // multi-step registration

  const handlePwChange = (v) => {
    setPassword(v)
    setPwErrors(v.length > 0 ? validatePassword(v) : [])
  }

  const validateStep1 = () => {
    const e = {}
    if (!aadhaar.trim() || aadhaar.replace(/\D/g, '').length !== 12)
      e.aadhaar = 'Valid 12-digit Aadhaar required'
    if (!pan.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase()))
      e.pan = 'Invalid PAN format (should be ABCDE1234F)'
    if (!fullName.trim())
      e.fullName = 'Full name is required'
    if (!dob)
      e.dob = 'Date of birth is required'
    return e
  }

  const validateStep2 = () => {
    const e = {}
    if (!mobile.trim() || mobile.replace(/\D/g, '').length !== 10)
      e.mobile = 'Valid 10-digit mobile required'
    if (!email.trim() || !email.includes('@'))
      e.email = 'Valid email required'
    const pe = validatePassword(password)
    if (pe.length > 0) e.password = pe[0]
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    return e
  }

  const validateStep3 = () => {
    const e = {}
    if (secQuestion === SECURITY_QUESTIONS[0]) e.secQuestion = 'Please select a security question'
    if (!secAnswer.trim()) e.secAnswer = 'Security answer is required'
    if (!referenceNo.trim()) e.referenceNo = 'Reference number is required (see Step 1 acknowledgement)'
    if (!agreed) e.agreed = 'You must agree to all 847 pages of terms'
    return e
  }

  const handleNext = () => {
    if (step === 1) {
      const e = validateStep1()
      if (Object.keys(e).length > 0) { setErrors(e); return }
      setErrors({})
      setStep(2)
    } else if (step === 2) {
      const e = validateStep2()
      if (Object.keys(e).length > 0) { setErrors(e); return }
      setErrors({})
      setStep(3)
    } else {
      const e = validateStep3()
      if (Object.keys(e).length > 0) { setErrors(e); return }
      setErrors({})
      navigate('/login')
    }
  }

  const STEP_LABELS = ['Identity Verification', 'Account Credentials', 'Final Declarations']

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f0ede0] py-6 px-4">
      <div className="max-w-lg mx-auto">
        {/* HEADER */}
        <div className="bg-[#003087] text-white text-center py-5 border-b-4 border-[#FF6600]">
          <div className="text-4xl mb-1">📋</div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-yellow-300" style={{ fontFamily: 'Impact' }}>
            NEW CITIZEN REGISTRATION
          </h1>
          <p style={{ fontFamily: 'Courier New', fontSize: '11px' }} className="text-gray-300 mt-1">
            One-Time Registration | 47 Steps | Estimated Time: 2.5 Hours
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="bg-[#FF6600] px-4 py-3 flex justify-between items-center">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 flex items-center justify-center font-black text-sm border-2 mb-1 ${
                i + 1 < step ? 'bg-green-500 border-green-300 text-white'
                : i + 1 === step ? 'bg-white border-white text-[#FF6600] animate-pulse'
                : 'bg-orange-600 border-orange-400 text-orange-200'
              }`} style={{ fontFamily: 'Impact' }}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span className="text-white text-center" style={{ fontFamily: 'Courier New', fontSize: '8px' }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border-4 border-[#800000] p-5 shadow-xl space-y-4">

          {/* ── STEP 1: IDENTITY ── */}
          {step === 1 && (
            <>
              <div className="bg-blue-50 border-2 border-[#003087] p-3 text-sm" style={{ fontFamily: 'Times New Roman' }}>
                <p className="font-bold text-[#003087]">⚠️ Before you begin:</p>
                <p>Keep the following original documents ready: Aadhaar, PAN, Voter ID, Passport, Ration Card,
                  Birth Certificate, Domicile Certificate, Income Certificate, Caste Certificate, Character Certificate,
                  and Form 27B/6 (Rev-II) in triplicate.</p>
              </div>

              <FormField
                id="reg-aadhaar" label="Aadhaar Card Number (12 Digits)"
                value={aadhaar} onChange={e => { setAadhaar(e.target.value); setErrors(er => ({ ...er, aadhaar: undefined })) }}
                placeholder="XXXX XXXX XXXX" error={errors.aadhaar}
                hint="As per UIDAI records. Must match your face exactly."
              />
              <FormField
                id="reg-pan" label="PAN Card Number"
                value={pan} onChange={e => { setPan(e.target.value.toUpperCase()); setErrors(er => ({ ...er, pan: undefined })) }}
                placeholder="ABCDE1234F" error={errors.pan}
                hint="Must be linked to Aadhaar, or not. Doesn't matter."
              />
              <FormField
                id="reg-fullname" label="Full Name (Exactly As On Aadhaar, Including Typos)"
                value={fullName} onChange={e => { setFullName(e.target.value); setErrors(er => ({ ...er, fullName: undefined })) }}
                placeholder="ENTER IN CAPITAL LETTERS EVEN THOUGH WE SAID BLOCK CAPS" error={errors.fullName}
              />
              <div>
                <label htmlFor="reg-dob" className="block text-[#003087] font-black uppercase tracking-widest text-xs mb-1" style={{ fontFamily: 'Impact' }}>
                  Date of Birth *
                </label>
                <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Times New Roman' }}>Must be after 1900 and before today. Future births not accepted yet.</p>
                <input
                  id="reg-dob" type="date" value={dob}
                  onChange={e => { setDob(e.target.value); setErrors(er => ({ ...er, dob: undefined })) }}
                  className="border-2 border-[#003087] p-2 w-full bg-white text-sm focus:border-[#FF6600] focus:outline-none"
                  style={{ fontFamily: 'Times New Roman' }}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS' }}>❌ {errors.dob}</p>}
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 p-3 text-xs" style={{ fontFamily: 'Courier New' }}>
                <p className="font-bold text-yellow-700">📌 NOTE:</p>
                <p>After Step 1 you will receive an acknowledgement number on your registered mobile. You will need this in Step 3.
                  If you do not have a registered mobile, visit the office at 3:00 AM (alternate Tuesdays).</p>
              </div>
            </>
          )}

          {/* ── STEP 2: CREDENTIALS ── */}
          {step === 2 && (
            <>
              <div className="bg-red-50 border-2 border-red-300 p-3 text-sm" style={{ fontFamily: 'Times New Roman' }}>
                <p className="font-bold text-red-700">⚠️ Password Policy (Non-Negotiable):</p>
                <ul className="text-xs mt-1 space-y-1 text-red-600">
                  <li>• Minimum 47 characters (exactly 47 minimum, no more than 48 recommended)</li>
                  <li>• At least 1 uppercase, 1 number, 1 emoji</li>
                  <li>• Cannot contain: "password", your name, your birthday, your Aadhaar, or anything memorable</li>
                  <li>• Password expires every 4 hours</li>
                </ul>
              </div>

              <FormField
                id="reg-mobile" label="Mobile Number (10 Digits, Active Since 2010)"
                type="tel" value={mobile}
                onChange={e => { setMobile(e.target.value); setErrors(er => ({ ...er, mobile: undefined })) }}
                placeholder="Registered with Aadhaar and also with your horoscope" error={errors.mobile}
              />
              <FormField
                id="reg-email" label="Email Address (Personal, Not Disposable)"
                type="email" value={email}
                onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })) }}
                placeholder="yourname@example.com (we will spam this)" error={errors.email}
              />

              <div>
                <label htmlFor="reg-password" className="block text-[#003087] font-black uppercase tracking-widest text-xs mb-1" style={{ fontFamily: 'Impact' }}>
                  Create Password (min 47 chars + uppercase + number + emoji) *
                </label>
                <input
                  id="reg-password" type="text" value={password}
                  onChange={e => handlePwChange(e.target.value)}
                  placeholder="E.g.: MySecureGovt@Pass2024WithEmoji🤡AndNumbers123456789"
                  autoComplete="off"
                  className="border-2 border-[#003087] p-2 w-full bg-white text-sm focus:border-[#FF6600] focus:outline-none"
                  style={{ fontFamily: 'Courier New' }}
                />
                {pwErrors.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {pwErrors.map((err, i) => (
                      <li key={i} className="text-red-600 text-xs" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        ❌ {err}. Seriously? Try harder.
                      </li>
                    ))}
                  </ul>
                )}
                {pwErrors.length === 0 && password.length >= 47 && (
                  <p className="text-green-600 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS' }}>✅ Barely acceptable.</p>
                )}
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS' }}>❌ {errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-confirm-password" className="block text-[#003087] font-black uppercase tracking-widest text-xs mb-1" style={{ fontFamily: 'Impact' }}>
                  Confirm Password *
                </label>
                <input
                  id="reg-confirm-password" type="text" value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setErrors(er => ({ ...er, confirmPassword: undefined })) }}
                  autoComplete="off"
                  className="border-2 border-[#003087] p-2 w-full bg-white text-sm focus:border-[#FF6600] focus:outline-none"
                  style={{ fontFamily: 'Courier New' }}
                />
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-red-600 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    ❌ Passwords do not match. Seriously? Try harder.
                  </p>
                )}
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS' }}>❌ {errors.confirmPassword}</p>
                )}
              </div>
            </>
          )}

          {/* ── STEP 3: DECLARATIONS ── */}
          {step === 3 && (
            <>
              <div>
                <label className="block text-[#003087] font-black uppercase tracking-widest text-xs mb-1" style={{ fontFamily: 'Impact' }}>
                  Security Question *
                </label>
                <select
                  id="reg-sec-question"
                  value={secQuestion}
                  onChange={e => { setSecQuestion(e.target.value); setErrors(er => ({ ...er, secQuestion: undefined })) }}
                  className="border-2 border-[#003087] p-2 w-full bg-white text-sm focus:border-[#FF6600] focus:outline-none"
                  style={{ fontFamily: 'Times New Roman' }}
                >
                  {SECURITY_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                {errors.secQuestion && <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS' }}>❌ {errors.secQuestion}</p>}
              </div>

              <FormField
                id="reg-sec-answer" label="Security Answer (Case Sensitive, Include Punctuation)"
                value={secAnswer} onChange={e => { setSecAnswer(e.target.value); setErrors(er => ({ ...er, secAnswer: undefined })) }}
                placeholder="Answer exactly as you will remember in 2031" error={errors.secAnswer}
                hint="Warning: You will forget this. There is no recovery option."
              />

              <FormField
                id="reg-ref-no" label="Acknowledgement Reference No. (From Step 1 SMS)"
                value={referenceNo} onChange={e => { setReferenceNo(e.target.value); setErrors(er => ({ ...er, referenceNo: undefined })) }}
                placeholder="REF/GSEWA/2024/XXXXXX" error={errors.referenceNo}
                hint="SMS was sent to your registered mobile. If not received, visit office at 3:00 AM."
              />

              <div className="bg-gray-50 border border-gray-200 p-3 max-h-24 overflow-y-auto">
                <p className="text-gray-400" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive', lineHeight: '1.5' }}>
                  TERMS AND CONDITIONS (847 pages): By registering on this portal you agree to all present and future terms, meta-terms,
                  sub-terms, implied terms, verbal terms, non-verbal terms, interpretive terms, quantum terms, and terms that will be invented
                  after your death. GovSewa Portal reserves the right to modify, delete, or monetize your data at any time without notice,
                  consent, or remorse. Registration does not guarantee access, functionality, or existence of this portal. Your registration
                  data may be shared with all ministries, departments, PSUs, contractors, subcontractors, interns, and sentient AIs.
                  You waive the right to complain, litigate, exist in the records, or be acknowledged as a human being for the purposes of
                  this portal. Fees are non-refundable. Registration may be cancelled at any time for reasons including but not limited to:
                  insufficient paper in the printer, officer not in mood, and lunar eclipses.
                </p>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  id="reg-agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={e => { setAgreed(e.target.checked); setErrors(er => ({ ...er, agreed: undefined })) }}
                  className="mt-1 accent-[#003087] shrink-0"
                />
                <span className="text-xs text-gray-600" style={{ fontFamily: 'Times New Roman' }}>
                  I have read and understood all 847 pages of Terms &amp; Conditions, Privacy Policy, Cookie Policy,
                  Data Processing Agreement, Acceptable Use Policy, and the Secret Addendum (available on request at the office, 3:00 AM only).
                </span>
              </label>
              {errors.agreed && <p className="text-red-500 text-xs" style={{ fontFamily: 'Comic Sans MS' }}>❌ {errors.agreed}</p>}
            </>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button
                id="reg-back-btn"
                onClick={() => { setStep(s => s - 1); setErrors({}) }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-black uppercase tracking-widest py-3 transition-colors"
                style={{ fontFamily: 'Impact' }}
              >
                ← BACK
              </button>
            )}
            <button
              id="reg-next-btn"
              onClick={handleNext}
              className="flex-1 bg-[#003087] hover:bg-blue-900 active:scale-95 text-white font-black uppercase tracking-widest py-3 text-base transition-all"
              style={{ fontFamily: 'Impact' }}
            >
              {step < 3 ? `NEXT: ${STEP_LABELS[step]} →` : '✅ COMPLETE REGISTRATION'}
            </button>
          </div>

          <div className="text-center space-y-2 pt-1">
            <Link
              to="/login"
              className="block text-[#FF6600] hover:text-orange-400 underline text-sm font-bold"
              style={{ fontFamily: 'Times New Roman' }}
            >
              Already registered? Login Here
            </Link>
            <Link
              to="/"
              className="block text-gray-400 hover:text-gray-600 underline"
              style={{ fontFamily: 'Times New Roman', fontSize: '11px' }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <p className="mt-3 text-gray-300 text-center" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive' }}>
          Registration is free. Processing takes 3–7 business years. You will receive an acknowledgement maybe.
          GovSewa is not responsible for any registration-related trauma, existential crises, or loss of faith in democracy.
        </p>
      </div>
    </div>
  )
}
