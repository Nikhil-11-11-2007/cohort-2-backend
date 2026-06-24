import { Environment, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from "three"

const Experience = () => {

    const cubeRef = useRef(null)

    useFrame((state, delta) => {
        // cubeRef.current.rotation.y += delta
    })

    // use this TextureLoader
    const { texture, texture2 } = useTexture(
        {
            texture: "https://images.unsplash.com/photo-1779896411942-ea4ca54de043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            texture2: "https://images.unsplash.com/photo-1781461565715-887bd369f481?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    )

    // const texture = useLoader( // insted of this texture lodeer use drei TTextureLoader
    //     THREE.TextureLoader,
    //     "https://images.unsplash.com/photo-1779896411942-ea4ca54de043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // )

    const { scene } = useGLTF("./model.glb")

    const handelClick = () => {
        cubeRef.current.material.color.set("green")
    }

    return (
        <>
            <mesh onClick={handelClick} ref={cubeRef}>
                <boxGeometry args={[2, 2, 2]} />
                {/* <meshBasicMaterial map={texture2} color={""} /> */}
                <meshStandardMaterial roughness={0.01} metalness={0.9} color={"red"} />
            </mesh>

            {/* <ambientLight intensity={3} color={"#fffff"} />

            <primitive object={scene} position={[0,-2,0]} /> */}

            <Environment files='./envMap.hdr' />

        </>
    )
}

export default Experience