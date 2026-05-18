import { useEffect, useState } from 'react'

export default function SessionTimer() {
  const [count, setCount] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev <= 3 ? 10 : prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed top-23 left-2 z-[9999] bg-red-700 text-white px-2 py-1 border-2 border-yellow-400 animate-pulse text-xs"
      style={{ fontFamily: 'Courier New, monospace' }}
    >
      ⏱ SESSION EXPIRES: {count}s
    </div>
  )
}
