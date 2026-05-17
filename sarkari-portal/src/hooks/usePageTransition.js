import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function usePageTransition() {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [])
  return ref
}
