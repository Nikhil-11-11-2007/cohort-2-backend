export default function FormField({ id, label, type = 'text', value, onChange, onBlur, error, placeholder = '', hint = '' }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[#003087] font-black uppercase tracking-widest text-xs mb-1" style={{ fontFamily: 'Impact' }}>
        {label} *
      </label>
      {hint && <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: 'Times New Roman' }}>{hint}</p>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete="off"
        className="border-2 border-[#003087] p-2 w-full bg-white text-sm focus:border-[#FF6600] focus:outline-none"
        style={{ fontFamily: 'Times New Roman' }}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          ❌ {error}
        </p>
      )}
    </div>
  )
}
