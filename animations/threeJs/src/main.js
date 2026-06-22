import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


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

// CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100,
)

camera.position.z = 5

// light

// ambientLight
const ambientLight = new THREE.AmbientLight("#ffffff", 1)

// 7 -> intensity jitn bhadoge utna bright dikhega 

scene.add(ambientLight)

// directonalLight

const directonalLight = new THREE.DirectionalLight("#ffffff", 3)

directonalLight.position.set(1,2,3)

// scene.add(directonalLight)

const directonalLightHelper = new THREE.DirectionalLightHelper(directonalLight)

// scene.add(directonalLightHelper)

// pointLight

const pointLight = new THREE.PointLight("#ffffff", 5, 5, 1)

pointLight.position.set(0,3,0)

scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight)

scene.add(pointLightHelper)


// MESH (3D object)

const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.CylinderGeometry( 1, 1, 4, 32 );
const material = new THREE.MeshStandardMaterial({
  color: "rgba(225, 10, 7, 0.72)"
  // map: texture2
})

const cube = new THREE.Mesh(geometry, material)

// position of the cube

// cube.position.x = 1.5
// cube.position.set(1.5,-1,1.3)

// scale of the cube 

// cube.scale.x = 1.5
// cube.scale.set(1.5,-2,1.3)

// rotation of the cube

// cube.rotation.x = Math.PI / 3

scene.add(cube)

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

  const delta = clock.getElapsedTime()

  // cube.rotation.y = delta;

  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate);

}

animate()