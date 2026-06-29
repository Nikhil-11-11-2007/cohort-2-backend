import './style.css'
import gsap from "gsap"
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

// const texture = textureLoader.load(
//   "https://images.unsplash.com/photo-1781112981218-db02b34ce0ac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   () => {
//     console.log("Texture is loaded")
//   },
//   () => {
//     console.log("Texture is loading...")
//   },
//   () => {
//     console.log("error in texture loading")
//   }
// )

// const texture2 = textureLoader.load(
//   "https://images.unsplash.com/photo-1781460661007-48781a25a962?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

// )

const imageUrls = [
  "https://images.unsplash.com/photo-1781112981218-db02b34ce0ac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781460661007-48781a25a962?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781817388820-be87d7281356?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781112981218-db02b34ce0ac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781460661007-48781a25a962?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

const textures = imageUrls.map((url) => textureLoader.load(url))

let currentIndex = 0;

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
      uniform sampler2D uTexB;
      uniform float uProgress;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
  
      void main (){

        vec2 uv = vUv;
        vec2 dir = normalize(vec2(0.0,1.0));
        
        float ripple = sin(uProgress * 3.14) * 0.05;
        
        float gradient = dot(uv - 0.5, dir) + 0.5; // ye line y mai 0 se 1 ke beech mai value degi 

        float n = snoise(uv * 6.0) * 0.25;

        float localGradient = gradient + n;

        float edge = 0.15;

        float sweep = uProgress * (1.0 + edge * 2.0) - edge;

        float mixer = smoothstep(localGradient - edge, localGradient + edge, sweep);
        
        vec2 uvA = uv - dir * ripple;
        vec2 uvB = uv + dir * ripple;

        vec4 colorA = texture2D(uTexA,uvA); // ye color de rha hai like this (1,0,0.0,0.0,1.0) image se nikal ke 
        vec4 colorB = texture2D(uTexB,uvB);

        vec4 finalColor = mix(colorA,colorB,mixer);

        gl_FragColor = finalColor;
      }
  `,

  uniforms: {
    uTime: { value: 0 },
    uTexA: { value: textures[0] },
    uTexB: { value: textures[1] },
    uProgress: { value: 0.0 }
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

const thumbs = document.querySelectorAll(".thumb")

thumbs.forEach((thumb) => {

    thumb.addEventListener("mouseenter", () => {

        const nextIndex = Number(thumb.dataset.index);

        if(nextIndex === currentIndex) return;

        material.uniforms.uTexA.value = textures[currentIndex];

        material.uniforms.uTexB.value = textures[nextIndex];

        material.uniforms.uProgress.value = 0;

        gsap.to(material.uniforms.uProgress,{
            value:1,
            duration:1.2,
            ease:"power3.out",

            onComplete(){

                currentIndex = nextIndex;

                material.uniforms.uTexA.value = textures[currentIndex];

                material.uniforms.uProgress.value = 0;

            }

        });

    });

});

// window.addEventListener("click", () => {
//   rayCaster.setFromCamera(mouse, camera)

//   const intersect = rayCaster.intersectObject(cube)

//   if (intersect.length > 0) {
//     gsap.to(material.uniforms.uProgress, {
//       value: 1,
//       duration: 1.2,
//       ease: "power3.out"
//     })
//   }

// })

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