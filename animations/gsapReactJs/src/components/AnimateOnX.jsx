import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const AnimateOnX = ({ children }) => {
// console.log(children.props)
const containerRef = useRef(null)
    useGSAP(() => {
        gsap.to(containerRef.current, {
            x: 500,
            delay: 0.6,
            duration: 0.8
        })
    }, {scope: containerRef.current})

    return (
        <div ref={containerRef}>
            {children}
        </div>
    )
}

export default AnimateOnX