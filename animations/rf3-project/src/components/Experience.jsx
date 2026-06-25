import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import FanGroup from './FanGroup'

const Experience = () => {

    const { x, y } = useControls("box-psition-x", {
        x: { value: 0, min: -4, max: 4, step: 0.01, label: "X-position" },
        y: { value: 0, min: -4, max: 4, step: 0.01 }
    }
    )

    return (
        <>
            <ambientLight intensity={3} color={"#ffffff"} />
            <FanGroup />
            <OrbitControls />
        </>
    )
}

export default Experience