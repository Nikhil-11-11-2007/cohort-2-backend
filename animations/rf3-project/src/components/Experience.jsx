import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

const Experience = () => {

    const { x, y } = useControls("box-psition-x",{
        x: { value: 0, min: -4, max: 4, step: 0.01, label: "X-position" },
        y: { value: 0, min: -4, max: 4, step: 0.01 }
    }
)

    return (
        <>
            <mesh position={[x, y, 0]}>
                <boxGeometry />
                <meshBasicMaterial color={"red"} />
                <OrbitControls />
            </mesh>
        </>
    )
}

export default Experience