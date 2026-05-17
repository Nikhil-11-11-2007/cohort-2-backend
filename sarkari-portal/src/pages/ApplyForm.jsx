import { useState } from 'react'
import usePageTransition from '../hooks/usePageTransition'
import EscapeButton from '../components/EscapeButton'
import VirusPopup from '../components/VirusPopup'
import NestedDropdown from '../components/NestedDropdown'

// ─── Constants ─────────────────────────────────────────────────────────────────
const DOC_TYPES = [
  'Aadhaar Card (Original)',
  'Aadhaar Card (Photocopy)',
  'Aadhaar Card (Self-Attested Copy)',
  'PAN Card',
  'Voter ID',
  'Driving Licence',
  'Passport (Valid)',
  'Passport (Expired, but still counts maybe)',
  'Ration Card (Yellow)',
  'Ration Card (White)',
  'Ration Card (Other Color)',
  'Birth Certificate (Original)',
  'Birth Certificate (Notarised)',
  'School Leaving Certificate',
  'Character Certificate (From Sarpanch)',
  'Form 27B/6 (Rev-II)',
  'Form 16C (Triplicate)',
  'No Objection Certificate (NOC)',
  'Self-Declaration Form (Unattested)',
  'Self-Declaration Form (Attested by Self)',
]

const INPUT_CLS = 'border-2 border-[#003087] p-2 w-full bg-white text-sm focus:border-[#FF6600] focus:outline-none'
const LABEL_CLS = 'block text-[#003087] font-black uppercase tracking-widest text-xs mb-1'

function validatePassword(pw) {
  const errors = []
  if (pw.length < 47) errors.push(`Must be at least 47 characters (currently ${pw.length})`)
  if (!/[A-Z]/.test(pw)) errors.push('Must contain at least one UPPERCASE letter')
  if (!/[0-9]/.test(pw)) errors.push('Must contain at least one number')
  if (!/[\u{1F000}-\u{1FFFF}]/u.test(pw) && !/[\u{2600}-\u{27BF}]/u.test(pw)) {
    errors.push('Must contain at least one emoji 🤡')
  }
  return errors
}

// ─── Field component at MODULE SCOPE — never re-created on parent re-render ───
// FIX: was previously defined inside ApplyForm(), which caused React to treat it
// as a new component type on every state update → unmount → focus lost.
function Field({ id, label, value, onChange, onBlur, error, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLS} style={{ fontFamily: 'Impact' }}>
        {label} *
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder || `Enter ${label}`}
        className={INPUT_CLS}
        style={{ fontFamily: 'Times New Roman' }}
        autoComplete="off"
      />
      {error && (
        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ApplyForm() {
  const pageRef = usePageTransition()

  const [fullName, setFullName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [dob, setDob] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [pan, setPan] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [occupation, setOccupation] = useState('')
  const [annualIncome, setAnnualIncome] = useState('')
  const [religion, setReligion] = useState('')
  const [caste, setCaste] = useState('')
  const [purpose, setPurpose] = useState('')
  const [docType, setDocType] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [volume, setVolume] = useState(80)
  const [pwErrors, setPwErrors] = useState([])
  const [fieldErrors, setFieldErrors] = useState({})

  // UX CRIME: 30% chance field clears on blur — kept only here, not on keypress
  const makeBlurHandler = (setter, fieldKey) => () => {
    if (Math.random() < 0.3) {
      setter('')
      setFieldErrors(e => ({ ...e, [fieldKey]: 'Field auto-cleared for security. Please re-enter.' }))
    } else {
      setFieldErrors(e => ({ ...e, [fieldKey]: undefined }))
    }
  }

  const handlePwChange = (v) => {
    setPassword(v)
    setPwErrors(v.length > 0 ? validatePassword(v) : [])
  }

  const wordCount = purpose.split(/\s+/).filter(Boolean).length

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f0ede0] py-6 px-2 sm:px-4">
      <VirusPopup />

      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="bg-[#003087] text-white text-center py-4 border-b-4 border-[#FF6600]">
          <h1 className="text-xl sm:text-3xl font-black uppercase tracking-widest text-yellow-300" style={{ fontFamily: 'Impact' }}>
            APPLICATION FORM — CERTIFICATE ISSUANCE
          </h1>
          <p style={{ fontFamily: 'Courier New', fontSize: '11px' }} className="text-gray-300 mt-1">
            Form No: GSEWA/CERT/2024/XYZ/001/FINAL | Fill in BLOCK CAPITALS | Use Blue Ink | Do Not Fold
          </p>
        </div>

        {/* WARNING STRIP */}
        <div className="bg-[#FF6600] text-white px-4 py-2 text-center text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'Impact' }}>
          ⚠️ WARNING: FIELDS MAY CLEAR RANDOMLY FOR SECURITY. THIS IS A FEATURE, NOT A BUG. ⚠️
        </div>

        <div className="bg-white border-4 border-[#800000] p-4 sm:p-6 shadow-xl space-y-6">

          {/* SECTION A: PERSONAL DETAILS */}
          <section>
            <h2 className="text-[#800000] font-black uppercase tracking-widest text-base border-b-2 border-[#800000] pb-1 mb-4" style={{ fontFamily: 'Impact' }}>
              SECTION A: PERSONAL DETAILS (MANDATORY)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="fullName" label="Full Name (As Per Aadhaar)"
                value={fullName} onChange={e => setFullName(e.target.value)}
                onBlur={makeBlurHandler(setFullName, 'fullName')} error={fieldErrors.fullName}
              />
              <Field
                id="fatherName" label="Father's Name"
                value={fatherName} onChange={e => setFatherName(e.target.value)}
                onBlur={makeBlurHandler(setFatherName, 'fatherName')} error={fieldErrors.fatherName}
              />
              <Field
                id="motherName" label="Mother's Name (Maiden)"
                value={motherName} onChange={e => setMotherName(e.target.value)}
                onBlur={makeBlurHandler(setMotherName, 'motherName')} error={fieldErrors.motherName}
              />
              <Field
                id="dob" label="Date of Birth" type="date"
                value={dob} onChange={e => setDob(e.target.value)}
                onBlur={makeBlurHandler(setDob, 'dob')} error={fieldErrors.dob}
              />
              <Field
                id="aadhaar" label="Aadhaar Number (12 Digits)" placeholder="XXXX XXXX XXXX"
                value={aadhaar} onChange={e => setAadhaar(e.target.value)}
                onBlur={makeBlurHandler(setAadhaar, 'aadhaar')} error={fieldErrors.aadhaar}
              />
              <Field
                id="pan" label="PAN Card Number" placeholder="ABCDE1234F"
                value={pan} onChange={e => setPan(e.target.value)}
                onBlur={makeBlurHandler(setPan, 'pan')} error={fieldErrors.pan}
              />
              <Field
                id="mobile" label="Mobile Number (10 Digits)" type="tel"
                value={mobile} onChange={e => setMobile(e.target.value)}
                onBlur={makeBlurHandler(setMobile, 'mobile')} error={fieldErrors.mobile}
              />
              <Field
                id="email" label="Email Address" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                onBlur={makeBlurHandler(setEmail, 'email')} error={fieldErrors.email}
              />
            </div>
          </section>

          {/* SECTION B: ADDRESS */}
          <section>
            <h2 className="text-[#800000] font-black uppercase tracking-widest text-base border-b-2 border-[#800000] pb-1 mb-4" style={{ fontFamily: 'Impact' }}>
              SECTION B: ADDRESS DETAILS
            </h2>
            <NestedDropdown />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="occupation" label="Occupation"
                value={occupation} onChange={e => setOccupation(e.target.value)}
                onBlur={makeBlurHandler(setOccupation, 'occupation')} error={fieldErrors.occupation}
              />
              <Field
                id="annualIncome" label="Annual Income (₹)"
                value={annualIncome} onChange={e => setAnnualIncome(e.target.value)}
                onBlur={makeBlurHandler(setAnnualIncome, 'annualIncome')} error={fieldErrors.annualIncome}
              />
              <Field
                id="religion" label="Religion"
                value={religion} onChange={e => setReligion(e.target.value)}
                onBlur={makeBlurHandler(setReligion, 'religion')} error={fieldErrors.religion}
              />
              <Field
                id="caste" label="Caste Category"
                value={caste} onChange={e => setCaste(e.target.value)}
                onBlur={makeBlurHandler(setCaste, 'caste')} error={fieldErrors.caste}
              />
            </div>
          </section>

          {/* SECTION C: DOC TYPE — horizontal scroll only */}
          <section>
            <h2 className="text-[#800000] font-black uppercase tracking-widest text-base border-b-2 border-[#800000] pb-1 mb-2" style={{ fontFamily: 'Impact' }}>
              SECTION C: DOCUMENT TYPE
            </h2>
            <p className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'Times New Roman' }}>
              Scroll right to see all options →
            </p>
            <div className="overflow-x-auto overflow-y-hidden" style={{ whiteSpace: 'nowrap' }}>
              <div className="inline-flex gap-2 pb-2">
                {DOC_TYPES.map(dt => (
                  <button
                    key={dt}
                    id={`doc-${dt.replace(/\W+/g, '-').toLowerCase()}`}
                    onClick={() => setDocType(dt)}
                    className={`shrink-0 px-3 py-2 border-2 text-xs font-bold transition-colors ${
                      docType === dt
                        ? 'bg-[#003087] text-white border-[#003087]'
                        : 'bg-white border-gray-400 hover:border-[#FF6600]'
                    }`}
                    style={{ fontFamily: 'Times New Roman', minWidth: '200px' }}
                  >
                    {dt}
                  </button>
                ))}
              </div>
            </div>
            {docType && (
              <p className="text-green-700 text-xs mt-1" style={{ fontFamily: 'Courier New' }}>
                Selected: {docType}
              </p>
            )}
          </section>

          {/* SECTION D: PURPOSE */}
          <section>
            <h2 className="text-[#800000] font-black uppercase tracking-widest text-base border-b-2 border-[#800000] pb-1 mb-4" style={{ fontFamily: 'Impact' }}>
              SECTION D: PURPOSE OF APPLICATION
            </h2>
            <div>
              <label htmlFor="purpose" className={LABEL_CLS} style={{ fontFamily: 'Impact' }}>
                PURPOSE *
              </label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                onBlur={makeBlurHandler(setPurpose, 'purpose')}
                rows={3}
                className={INPUT_CLS + ' resize-none'}
                placeholder="Explain in detail why you need this certificate (minimum 500 words, maximum 501 words)"
                style={{ fontFamily: 'Times New Roman' }}
              />
              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Times New Roman' }}>
                Word count: {wordCount} / 500–501 words required
              </p>
              {fieldErrors.purpose && (
                <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  ⚠️ {fieldErrors.purpose}
                </p>
              )}
            </div>
          </section>

          {/* SECTION E: PASSWORD */}
          <section>
            <h2 className="text-[#800000] font-black uppercase tracking-widest text-base border-b-2 border-[#800000] pb-1 mb-4" style={{ fontFamily: 'Impact' }}>
              SECTION E: CREATE PORTAL PASSWORD
            </h2>
            <div className="space-y-3">
              <div>
                <label htmlFor="password" className={LABEL_CLS} style={{ fontFamily: 'Impact' }}>
                  PASSWORD * (min 47 chars, 1 uppercase, 1 number, 1 emoji)
                </label>
                <input
                  id="password"
                  type="text"
                  value={password}
                  onChange={e => handlePwChange(e.target.value)}
                  onBlur={makeBlurHandler(setPassword, 'password')}
                  className={INPUT_CLS}
                  placeholder="UPPERCASE + number + emoji + 47+ characters"
                  style={{ fontFamily: 'Courier New' }}
                  autoComplete="off"
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
                  <p className="text-green-600 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS' }}>
                    ✅ Password acceptable (barely).
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className={LABEL_CLS} style={{ fontFamily: 'Impact' }}>
                  CONFIRM PASSWORD *
                </label>
                <input
                  id="confirmPassword"
                  type="text"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onBlur={makeBlurHandler(setConfirmPassword, 'confirmPassword')}
                  className={INPUT_CLS}
                  style={{ fontFamily: 'Courier New' }}
                  autoComplete="off"
                />
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-red-600 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    ❌ Passwords do not match. Seriously? Try harder.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* VOLUME SLIDER — locked 80–100% */}
          <section className="bg-teal-50 border-2 border-[#008080] p-4">
            <h2 className="text-[#008080] font-black uppercase tracking-widest text-sm mb-2" style={{ fontFamily: 'Impact' }}>
              🎵 BACKGROUND MUSIC VOLUME
            </h2>
            <input
              id="volume-slider"
              type="range"
              min={80}
              max={100}
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-full accent-[#008080]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1" style={{ fontFamily: 'Courier New' }}>
              <span>80% (min)</span>
              <span className="font-bold text-[#008080]">Current: {volume}%</span>
              <span>100% (max)</span>
            </div>
            <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Times New Roman' }}>
              Note: Volume cannot be set below 80%. Muting is unpatriotic and punishable under Section 66A (still).
            </p>
          </section>

          {/* HELP TOOLTIP */}
          <div className="bg-yellow-50 border-2 border-yellow-400 p-3 flex gap-3 items-start">
            <span className="text-2xl">❓</span>
            <div>
              <p className="font-black uppercase text-sm text-yellow-700" style={{ fontFamily: 'Impact' }}>NEED HELP?</p>
              <p className="text-sm text-gray-700" style={{ fontFamily: 'Times New Roman' }}>
                Visit our office for in-person assistance.
              </p>
              <p className="text-xs text-red-700 font-bold mt-1" style={{ fontFamily: 'Courier New' }}>
                🏢 Office Hours: 3:00 AM – 3:15 AM, Alternate Tuesdays only
              </p>
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Times New Roman' }}>
                (Closed on public holidays, lunar eclipses, monsoons, and any Tuesday that falls on a Tuesday)
              </p>
            </div>
          </div>

          {/* LEGAL DISCLAIMER */}
          <div className="bg-gray-50 border border-gray-200 p-3">
            <p className="text-gray-300" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive', lineHeight: '1.5' }}>
              DECLARATION: I hereby solemnly affirm that all information provided is true, false, partially true, or completely fabricated.
              I understand that submission does not guarantee processing, acknowledgement, receipt, or existence within any government database.
              I waive all rights to appeal, grievance redressal, right to information, right to life, and right to a response.
              Processing fee ₹2,340 is non-refundable under any circumstance including acts of god, system downtime, officer retirement,
              departmental restructuring, change of government, change of planet, or heat death of the universe.
            </p>
          </div>

          {/* SUBMIT — escaping button */}
          <EscapeButton nextRoute="/captcha" label="SUBMIT APPLICATION" />
        </div>
      </div>
    </div>
  )
}
