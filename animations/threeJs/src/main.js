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

// CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100,
)

camera.position.z = 5

// MESH (3D object)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: "rgba(225, 10, 7, 0.72)"
})

const cube = new THREE.Mesh(geometry, material)

cube.rotation.y = 1.2
cube.rotation.x = 1.2

scene.add(cube)

// CANVAS (parda)

const canvas = document.querySelector("canvas")

// RENDERER (projector)

const renderer = new THREE.WebGLRenderer({
  canvas,
})

const controls = new OrbitControls( camera, renderer.domElement ); 
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

  cube.rotation.y = delta;

  controls.update()

  renderer.render(scene,camera)

  requestAnimationFrame(animate);

}

animate()