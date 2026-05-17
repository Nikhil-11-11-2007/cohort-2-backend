const MODALS = [
  {
    title: 'CONFIRMATION REQUIRED',
    msg: 'Are you sure you want to submit this application? This action may or may not be reversible depending on the current lunar cycle and departmental mood.',
    confirm: 'Yes, I Am Sure',
    cancel: 'No (Restart from Beginning)',
  },
  {
    title: 'ARE YOU REALLY SURE?',
    msg: 'Are you REALLY sure? Our records indicate you have NOT read the 847-page Terms & Conditions (Form 16-C/Rev-II). Proceed anyway at your own risk?',
    confirm: 'Yes, I Am REALLY Sure',
    cancel: 'Let Me Re-Read All 847 Pages',
  },
  {
    title: '⚠️ ABSOLUTE LAST CHANCE ⚠️',
    msg: 'This is your ABSOLUTE last chance. Once submitted, your application enters a bureaucratic black hole for 3–7 years (subject to extension). No refunds. No callbacks.',
    confirm: 'Yes, Destroy My Future',
    cancel: 'Save Myself (Go Back to Start)',
  },
  {
    title: 'FINE. WHATEVER.',
    msg: "Fine. Whatever. We genuinely don't care anymore. The system is down anyway. The office is closed. The officer is on leave. Click confirm if you must.",
    confirm: 'FINE. JUST SUBMIT.',
    cancel: 'Actually, Nevermind (Start Over)',
  },
]

export default function ConfirmModal({ step, onConfirm, onCancel }) {
  const modal = MODALS[step] ?? MODALS[0]

  return (
    <div className="fixed inset-0 bg-black/75 z-[99999] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-[#800000] shadow-2xl max-w-lg w-full">
        <div className="bg-[#800000] text-white px-4 py-2 flex justify-between items-center">
          <span style={{ fontFamily: 'Impact', letterSpacing: '3px', fontSize: '13px' }}>
            {modal.title}
          </span>
          <button
            id={`confirm-modal-close-${step}`}
            onClick={onCancel}
            className="text-white"
            style={{ fontSize: '4px', width: '4px', height: '4px', overflow: 'hidden', lineHeight: '1', display: 'block' }}
            title="close"
          >✕</button>
        </div>
        <div className="p-6 text-center">
          <div className="text-4xl mb-4">{step === 3 ? '🫠' : step === 2 ? '😱' : '🤔'}</div>
          <p className="mb-6 leading-relaxed" style={{ fontFamily: 'Times New Roman', fontSize: '16px' }}>
            {modal.msg}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id={`confirm-yes-${step}`}
              onClick={onConfirm}
              className="bg-[#003087] hover:bg-blue-900 text-white px-8 py-3 font-black uppercase tracking-widest transition-colors"
              style={{ fontFamily: 'Impact' }}
            >
              {modal.confirm}
            </button>
            <button
              id={`confirm-no-${step}`}
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 font-bold uppercase transition-colors"
              style={{ fontFamily: 'Times New Roman' }}
            >
              {modal.cancel}
            </button>
          </div>
          <p className="mt-4 text-gray-300" style={{ fontSize: '6px', fontFamily: 'Comic Sans MS, cursive' }}>
            Ref: GOV/INDIA/PORTAL/CONFIRM/2024/XYZ/FINAL/v{step + 1}.{step}.{step} | All confirmations are final but also meaningless.
          </p>
        </div>
      </div>
    </div>
  )
}
