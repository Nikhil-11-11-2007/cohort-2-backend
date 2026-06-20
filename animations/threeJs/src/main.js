import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// SCENE (set)

const scene = new THREE.Scene()

// CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
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

renderer.setSize(window.innerWidth, window.innerHeight);

  // renderer.render(scene,camera)

const animate = () => {
  
  // cube.rotation.y += 0.01;

  controls.update()

  renderer.render(scene,camera)

  requestAnimationFrame(animate);

}

animate()