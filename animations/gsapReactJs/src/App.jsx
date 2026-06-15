import React from 'react'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimateOnX from './components/AnimateOnX'

const App = () => {

  const boxRef = useRef([]) // agar mere ko multiple div ya boxes select krne ho to null ki jagha [] pass kro
  //  agar ye nhi krenge to multiple refs bnane padenge
  const boxRef2 = useRef(null)
  const containerRef = useRef(null)

  console.log(boxRef)

  const animationProps = {
    x: 500,
    delay: 0.6,
    duration: 0.8
  }

  const { contextSafe } = useGSAP(() => {
    gsap.to(boxRef.current[0], animationProps)
  }, { scope: containerRef.current, dependencies: [], revertOnUpdate: true })

  const handleClick = contextSafe(() => {
    gsap.to(boxRef.current[2], animationProps)
  })

  return (
    <div ref={containerRef}>
      {/* or ye krne ki jagha ref={boxRef} ye kro  */}
      <div ref={(el) => boxRef.current.push(el)} className="box"></div>
      <div ref={(el) => boxRef.current.push(el)} className="box"></div>
      <div ref={(el) => boxRef.current.push(el)} className="box1"></div>
      <button onClick={handleClick}>Click Me</button>
      <AnimateOnX >
        <div className="box2"></div>
      </AnimateOnX>
      {/* agar same animation dena hai animateonX wala or bhi kisi component ya div mai o fir se ye kro -- */}

      <AnimateOnX>
        <div className="box3"></div>
      </AnimateOnX>

    </div>
  )
}

export default App