import { useNavigate, Link } from 'react-router-dom'
import usePageTransition from '../hooks/usePageTransition'
import Nav from '../components/Nav'
import VirusPopup from '../components/VirusPopup'

const ROUTES = ['/', '/apply', '/captcha', '/confirm', '/success']
function randomRoute(current) {
  const others = ROUTES.filter(r => r !== current)
  return others[Math.floor(Math.random() * others.length)]
}

function SidebarAd({ emoji, title, price, tag }) {
  return (
    <div className="border-2 border-[#FF6600] bg-yellow-50 p-3 mb-3 text-center relative overflow-hidden">
      <div className="text-3xl mb-1">{emoji}</div>
      <p className="font-black text-[#800000] text-sm uppercase" style={{ fontFamily: 'Impact', letterSpacing: '1px' }}>{title}</p>
      <p className="text-[#003087] font-bold text-lg">{price}</p>
      <p className="text-xs text-red-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{tag}</p>
      <button className="mt-2 bg-[#FF6600] text-white text-xs px-3 py-1 font-bold hover:bg-orange-400 uppercase w-full" style={{ fontFamily: 'Impact' }}>
        BUY NOW
      </button>
      <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] px-1 rotate-12 translate-x-1 -translate-y-1">HOT</div>
    </div>
  )
}

export default function Home() {
  const pageRef = usePageTransition()
  const navigate = useNavigate()

  const handleNav = (target) => {
    const go = Math.random() < 0.2 ? randomRoute(target) : target
    navigate(go)
  }

  return (
    <div ref={pageRef} className="min-h-screen">
      <VirusPopup delayMs={3000} />
      <VirusPopup delayMs={8000} />
      <VirusPopup delayMs={13000} />
      <VirusPopup delayMs={19000} />
      <VirusPopup delayMs={24000} />
      <VirusPopup delayMs={29000} />
      <Nav />

      {/* HERO SECTION */}
      <div className="bg-gradient-to-b from-[#003087] to-[#004aad] text-white py-8 px-4 text-center border-b-8 border-[#FF6600]">
        <div className="flex justify-center gap-3 mb-3 flex-wrap">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png" alt="Emblem" className="h-16 w-auto" onError={e => e.target.style.display='none'} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-yellow-300 mb-2" style={{ fontFamily: 'Impact' }}>
          GOVSEWA CITIZEN PORTAL
        </h1>
        <p className="text-lg sm:text-2xl text-[#FF6600] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'Impact' }}>
          सरकारी सेवा | DIGITAL BHARAT INITIATIVE
        </p>
        <p className="text-sm text-gray-300 mb-4" style={{ fontFamily: 'Times New Roman' }}>
          Empowering Citizens Through Intentionally Confusing Technology Since 1947
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-yellow-200 mb-4" style={{ fontFamily: 'Courier New' }}>
          <span>🌐 ISO 9001:2005 Certified</span>
          <span>|</span>
          <span>🏅 Best Govt Website Award 2003</span>
          <span>|</span>
          <span>🔒 SSL Maybe Encrypted</span>
        </div>
        <button
          id="apply-main-btn"
          onClick={() => handleNav('/apply')}
          className="bg-[#FF6600] hover:bg-orange-400 active:scale-95 text-white font-black text-xl sm:text-2xl px-10 py-4 uppercase tracking-widest border-4 border-yellow-300 shadow-2xl transition-all hover:scale-105 animate-bounce"
          style={{ fontFamily: 'Impact' }}
        >
          📋 APPLY FOR CERTIFICATE
        </button>
        <p className="text-[10px] text-gray-400 mt-2" style={{ fontFamily: 'Courier New' }}>
          *Processing time: 3–7 business years. Fee: ₹2,340 (non-refundable). Re-application fee: ₹4,680.
        </p>
      </div>

      {/* MAIN CONTENT + SIDEBAR */}
      <div className="flex flex-col lg:flex-row gap-0 max-w-screen-xl mx-auto">
        {/* MAIN */}
        <main className="flex-1 p-4 sm:p-6">
          {/* NOTICES */}
          <div className="border-4 border-[#800000] bg-red-50 p-4 mb-6">
            <h2 className="text-[#800000] font-black uppercase tracking-widest text-lg mb-3" style={{ fontFamily: 'Impact' }}>
              📢 LATEST CIRCULAR NOTICES
            </h2>
            {[
              ['NEW', 'Circular 2024/GOV/ABC/XYZ/001/FINAL/v3 — All applications must be submitted before the previous deadline.'],
              ['URGENT', 'Office hours changed: Now open 3:00 AM – 3:15 AM on alternate Tuesdays only.'],
              ['NOTICE', 'Form 27B/6 is now mandatory. Form 27B/6 has been discontinued. Please use Form 27B/6.'],
              ['UPDATE', 'The portal will be down for maintenance. Duration: Indefinite. Reason: Classified.'],
              ['ALERT', 'Applicants born before death are now eligible. Others may apply posthumously.'],
            ].map(([tag, text], i) => (
              <div key={i} className="flex gap-2 mb-2 text-sm items-start" style={{ fontFamily: 'Times New Roman' }}>
                <span className={`shrink-0 px-1 text-[10px] font-black text-white ${i === 0 ? 'bg-red-600' : i === 1 ? 'bg-[#FF6600]' : 'bg-[#003087]'}`} style={{ fontFamily: 'Impact' }}>
                  {tag}
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* SERVICES GRID */}
          <h2 className="font-black uppercase tracking-widest text-[#003087] text-xl mb-4 border-b-4 border-[#FF6600] pb-2" style={{ fontFamily: 'Impact' }}>
            OUR SERVICES (All Under Maintenance)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              ['🏠', 'Domicile Certificate', '₹340'],
              ['🎂', 'Birth Certificate', '₹280'],
              ['💀', 'Death Certificate', '₹280'],
              ['💍', 'Marriage Certificate', '₹560'],
              ['🚗', 'Vehicle NOC', '₹1,200'],
              ['🏗️', 'Building Permit', '₹8,400'],
            ].map(([icon, name, fee], i) => (
              <button
                key={i}
                onClick={() => handleNav('/apply')}
                className="border-2 border-[#003087] bg-white hover:bg-[#003087] hover:text-white group p-3 text-center transition-colors cursor-pointer"
              >
                <div className="text-3xl mb-1">{icon}</div>
                <div className="text-xs font-bold uppercase group-hover:text-white text-[#003087]" style={{ fontFamily: 'Impact', letterSpacing: '1px' }}>{name}</div>
                <div className="text-[10px] text-gray-500 group-hover:text-gray-300" style={{ fontFamily: 'Courier New' }}>{fee} + cess + surcharge</div>
                <div className="text-[8px] text-red-500 mt-1" style={{ fontFamily: 'Comic Sans MS' }}>🔴 Under Maintenance</div>
              </button>
            ))}
          </div>

          {/* LEGAL DISCLAIMER */}
          <div className="border border-gray-300 bg-gray-50 p-3">
            <p className="text-gray-400" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive', lineHeight: '1.4' }}>
              LEGAL DISCLAIMER (IMPORTANT — PLEASE READ ALL 847 PAGES): By accessing this portal you hereby agree to all terms, sub-terms,
              meta-terms, conditional terms, unconditional terms, quantum terms, and terms that do not yet exist in any known language.
              GovSewa Portal, its parent ministry, subsidiary departments, affiliated agencies, ghostly predecessors, and future successor
              bodies shall not be held liable for any loss of data, loss of time, loss of sanity, loss of faith in democracy, existential
              dread, bureaucratic trauma, digital imprisonment, or accidental application to the wrong scheme. All rights reserved.
              All wrongs also reserved. Fee once paid is non-refundable, non-transferable, non-negotiable, and non-existent.
              This website is best viewed on Internet Explorer 6.0 at 800×600 resolution. Government of India. All Rights Reserved.
              Circulars supersede all previous circulars including this one. Form 27B/6 Rev-II applicable from a date to be notified.
            </p>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="lg:w-56 p-4 bg-[#f5f0e0] border-l-2 border-[#FF6600] shrink-0">
          <div className="font-black uppercase tracking-widest text-[#800000] text-sm mb-3 border-b-2 border-[#800000] pb-1" style={{ fontFamily: 'Impact' }}>
            🛒 SPONSORED ADS
          </div>
          <SidebarAd emoji="💳" title="Aadhaar Cover Premium" price="₹2,999" tag="Limited Stock! 847 left!" />
          <SidebarAd emoji="📁" title="Official File Cover" price="₹599" tag="Govt Approved™ Maybe" />
          <SidebarAd emoji="🔏" title="Digital Signature USB" price="₹4,499" tag="Works 60% of the time!" />
          <SidebarAd emoji="🖨️" title="Self-Attesting Stamp" price="₹1,299" tag="Notary Not Included" />

          <div className="border-2 border-[#008080] bg-teal-50 p-3 mt-4 text-center">
            <p className="font-black text-[#008080] uppercase text-xs" style={{ fontFamily: 'Impact' }}>📞 HELPLINE</p>
            <p className="text-[#800000] font-bold" style={{ fontFamily: 'Courier New', fontSize: '13px' }}>1800-XXX-0000</p>
            <p className="text-gray-500" style={{ fontSize: '8px', fontFamily: 'Times New Roman' }}>Available: 3:00 AM – 3:15 AM<br />Alternate Tuesdays only<br />(Excluding public holidays,<br />lunar eclipses, and Tuesdays)</p>
          </div>

          <div className="mt-4 border-2 border-[#FF6600] bg-orange-50 p-2 text-center">
            <p className="font-black uppercase text-[10px] text-[#FF6600]" style={{ fontFamily: 'Impact' }}>📊 PORTAL STATS</p>
            <p style={{ fontSize: '9px', fontFamily: 'Courier New' }} className="text-gray-600">Applications Pending: 4,72,891</p>
            <p style={{ fontSize: '9px', fontFamily: 'Courier New' }} className="text-gray-600">Approved This Year: 0</p>
            <p style={{ fontSize: '9px', fontFamily: 'Courier New' }} className="text-gray-600">Server Uptime: 12%</p>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#003087] text-white text-center py-6 border-t-4 border-[#FF6600] mt-4">
        <p className="font-black uppercase tracking-widest text-yellow-300 text-sm" style={{ fontFamily: 'Impact' }}>
          © 1947–2024 GOVERNMENT OF INDIA. ALL RIGHTS RESERVED. SOME RIGHTS RESERVED. NO RIGHTS RESERVED.
        </p>
        <p style={{ fontFamily: 'Courier New', fontSize: '10px' }} className="text-gray-300 mt-1">
          This site is best viewed in Internet Explorer 6.0 | 800×600 | Enable ActiveX | Disable Popup Blocker | Install Flash Player
        </p>
      </footer>
    </div>
  )
}
