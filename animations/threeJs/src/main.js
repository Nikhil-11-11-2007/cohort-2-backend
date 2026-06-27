import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js"


RGBELoader
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// SCENE (set)

const scene = new THREE.Scene()
const clock = new THREE.Clock()

// texture Loader

const textureLoader = new THREE.TextureLoader()

const texture = textureLoader.load(
  "https://images.unsplash.com/photo-1781112981218-db02b34ce0ac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  () => {
    console.log("Texture is loaded")
  },
  () => {
    console.log("Texture is loading...")
  },
  () => {
    console.log("error in texture loading")
  }
)

const texture2 = textureLoader.load(
  "https://images.unsplash.com/photo-1781460661007-48781a25a962?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

)

// RGBELoader 

const envMap = new RGBELoader()

envMap.load("/envMap.hdr", (envMap) => {
  // console.log(envMap)
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  // scene.background = envMap;
  scene.environment = envMap;

})

// gltf loader

// const gltf = new GLTFLoader()

// let mixer;

// gltf.load("/robot.glb", (gltf) => {


//   const model = gltf.scene;

//   model.position.y = -2

//   // console.log(gltf.animations)

//   mixer = new THREE.AnimationMixer(model);

//   const action = mixer.clipAction(gltf.animations[0])

//   action.play()

//   scene.add(model)

// })

// CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100,
)

camera.position.z = 3

// light

// ambientLight
const ambientLight = new THREE.AmbientLight("#ffffff", 2)

// 7 -> intensity jitn bhadoge utna bright dikhega 

scene.add(ambientLight)

// directonalLight

// const directonalLight = new THREE.DirectionalLight("#ffffff", 5)

// directonalLight.position.set(0.8, 1.5, 2.5)

// scene.add(directonalLight)

// const directonalLightHelper = new THREE.DirectionalLightHelper(directonalLight)

// scene.add(directonalLightHelper)

// pointLight

// const pointLight = new THREE.PointLight("#ffffff", 5, 5, 1)

// pointLight.position.set(0,3,0)

// scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)

// scene.add(pointLightHelper)

// MESH (3D object)
const geometry = new THREE.PlaneGeometry(1.5, 1.5, 32, 32)
// const geometry = new THREE.CylinderGeometry( 1, 1, 3, 32 );
// const geometry = new THREE.SphereGeometry( 1, 32, 16 );
// const material = new THREE.MeshStandardMaterial({
//   color: "rgba(225, 10, 7, 0.72)",
//   metalness: 0.9,
//   roughness: 0.01,
//   // wireframe: true
//   // map: texture2
// })

// creating a material using shader

const material = new THREE.ShaderMaterial({
  vertexShader: `

    uniform float uTime;

    varying vec2 vUv;

    void main(){
        vec3 pos = position;
        // pos.z += sin(pos.x * 6.0 + uTime);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);

        vUv = uv;

    }

  `,

  fragmentShader: `

      varying vec2 vUv;
      uniform sampler2D uTexA;
  
      void main (){
          gl_FragColor = vec4(vUv,0.0,1.0);
      }
  `,

  uniforms: {
    uTime: { value: 0 },
    uTexA: {value: texture}
  },

  // wireframe: true,

  side: THREE.DoubleSide

});

const cube = new THREE.Mesh(geometry, material)

const rayCaster = new THREE.Raycaster()

const mouse = new THREE.Vector2()


window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
  // console.log(mouse.x, mouse.y)
})

// position of the cube

// cube.position.x = 1.5
// cube.position.set(1.5,-1,1.3)

// scale of the cube 

// cube.scale.x = 1.5
// cube.scale.set(1.5,-2,1.3)

// rotation of the cube

// cube.rotation.x = Math.PI / 3

scene.add(cube)

window.addEventListener("click", () => {
  rayCaster.setFromCamera(mouse, camera)

  const intersect = rayCaster.intersectObject(cube)

  if (intersect.length > 0) {
    cube.material.color.set("green")
  }

})

// CANVAS (parda)

const canvas = document.querySelector("canvas")

// RENDERER (projector)

const renderer = new THREE.WebGLRenderer({
  canvas,
})

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true

renderer.setSize(size.width, size.height);

window.addEventListener("resize", () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
})


// renderer.render(scene,camera)

const animate = () => {

  // for rotating cube use this --
  const delta = clock.getElapsedTime()

  // cube.rotation.y = delta;

  // for animating robot use this -- 

  // const delta = clock.getDelta()

  // if (mixer) {
  //   mixer.update(delta * 2)
  // }

  cube.material.uniforms.uTime.value = delta

  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate);

}

animate()