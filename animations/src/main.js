import './style.css'
import gsap from 'gsap'

// easing in gsap 

// gsap.to(".box", {
//   x: 600,
//   duration: 1,
//   delay: 0.7,
//   ease: "power1.inOut",
//   y: 300
// })

// bounce easing family

// gsap.to(".box", {
//   x: 600,
//   duration: 1,
//   delay: 0.7,
//   ease: "bounce.inOut",
//   y: 300
// })

// elastic easing

// gsap.to(".box", {
//   x: 600,
//   duration: 5,
//   delay: 0.7,
//   ease: "elastic.inOut(1,0.3)",
//   y: 300
// })

//  custom easing

// gsap.to(".box", {
//   x: 600,
//   duration: 1,
//   delay: 0.7,
//   ease: CustomEase.create("custom",
//     "M0,0 C0,0 0.144,-0.219 0.191,-0.221 0.208,-0.222 0.27,-0.206 0.283,-0.201 0.296,-0.196 0.373,-0.161 0.386,-0.149 0.401,-0.135 0.453,-0.032 0.466,-0.009 0.481,0.017 0.507,0.175 0.523,0.222 0.564,0.34 0.552,0.844 0.591,0.966 0.605,1.011 0.651,1.167 0.664,1.195 0.675,1.221 0.728,1.334 0.742,1.353 0.755,1.372 0.859,1.399 0.874,1.409 0.889,1.419 0.979,1.403 1,1.404 1.049,1.407 1,1.006 1,0.94 "),
//   y: 300
// })

// repetaion in animation

// gsap.set(".box", {
//   x: -300,
// })

// gsap.to(".track", {
//   xPercent: -50,
//   duration: 4,
//   ease: "none",
//   repeat: -1,
// });

// callback functions 

const box = document.querySelector(".box")

gsap.to(box, {
  x: 600,
  duration: 1,
  delay: 0.7,
  ease: "power1.inOut",

  // onStart: () => {
  //   box.style.backgroundColor = "blue"
  // }

  // onComplete: () => {
  //   box.style.backgroundColor = "green"
  // }

  onUpdate: () => {
    box.style.backgroundColor = "yellow"
  }

});