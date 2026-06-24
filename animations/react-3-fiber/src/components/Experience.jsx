import { useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from "three"
import { texture } from 'three/src/nodes/accessors/TextureNode.js'

const Experience = () => {

    const cubeRef = useRef(null)

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta
    })

    // use this TextureLoader
    const {texture,texture2} = useTexture(
        {
            texture: "https://images.unsplash.com/photo-1779896411942-ea4ca54de043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            texture2: "https://images.unsplash.com/photo-1781461565715-887bd369f481?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    )

    // const texture = useLoader( // insted of this texture lodeer use drei TTextureLoader
    //     THREE.TextureLoader,
    //     "https://images.unsplash.com/photo-1779896411942-ea4ca54de043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // )

    return (
        <>
            <mesh ref={cubeRef}>
                <boxGeometry args={[2, 2, 2]} />
                {/* <torusGeometry args={[1.5, 0.5, 16, 100]} /> */}
                <meshBasicMaterial map={texture2} color={""} />
            </mesh>

        </>
    )
}

export default Experience