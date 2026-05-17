import { useState } from 'react'

const DATA = {
  'Uttar Pradesh': {
    Lucknow: ['Lucknow Sadar', 'Chinhat', 'Malihabad', 'Bakshi Ka Talab'],
    Varanasi: ['Kashi Vidyapeeth', 'Pindra', 'Sevapuri', 'Rohania'],
    Agra: ['Etmadpur', 'Fatehabad', 'Kheragarh', 'Bah'],
  },
  Maharashtra: {
    Mumbai: ['Andheri', 'Borivali', 'Kurla', 'Dharavi'],
    Pune: ['Haveli', 'Mulshi', 'Velhe', 'Bhor'],
    Nagpur: ['Hingna', 'Kamptee', 'Narkhed', 'Ramtek'],
  },
  'Tamil Nadu': {
    Chennai: ['Ambattur', 'Sholinganallur', 'Perambur', 'Tondiarpet'],
    Coimbatore: ['Coimbatore North', 'Coimbatore South', 'Pollachi', 'Valparai'],
    Madurai: ['Madurai North', 'Madurai South', 'Melur', 'Tirumangalam'],
  },
  'West Bengal': {
    Kolkata: ['Alipore', 'Dum Dum', 'Behala', 'Jadavpur'],
    Howrah: ['Bally', 'Shibpur', 'Domjur', 'Uluberia'],
    Darjeeling: ['Siliguri', 'Kurseong', 'Kalimpong', 'Mirik'],
  },
}

export default function NestedDropdown({ onChange }) {
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [sub, setSub] = useState('')

  const update = (s, d, sd) => {
    setState(s); setDistrict(d); setSub(sd)
    if (onChange) onChange({ state: s, district: d, subDistrict: sd })
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-[#003087] font-black uppercase tracking-widest text-sm" style={{ fontFamily: 'Impact' }}>
        PERMANENT ADDRESS — STATE / DISTRICT / SUB-DISTRICT *
      </label>

      <select
        id="state-select"
        value={state}
        onChange={e => update(e.target.value, '', '')}
        className="border-2 border-[#003087] p-2 w-full bg-white text-sm"
        style={{ fontFamily: 'Times New Roman' }}
      >
        <option value="">— SELECT STATE (MANDATORY) —</option>
        {Object.keys(DATA).map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {state && (
        <select
          id="district-select"
          value={district}
          onChange={e => update(state, e.target.value, '')}
          className="border-2 border-[#FF6600] p-2 w-full bg-white text-sm"
          style={{ fontFamily: 'Times New Roman' }}
        >
          <option value="">— SELECT DISTRICT (MANDATORY) —</option>
          {Object.keys(DATA[state]).map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      )}

      {district && (
        <select
          id="subdistrict-select"
          value={sub}
          onChange={e => update(state, district, e.target.value)}
          className="border-2 border-[#800000] p-2 w-full bg-white text-sm"
          style={{ fontFamily: 'Times New Roman' }}
        >
          <option value="">— SELECT SUB-DISTRICT (MANDATORY) —</option>
          {DATA[state][district].map(sd => <option key={sd} value={sd}>{sd}</option>)}
        </select>
      )}
    </div>
  )
}
