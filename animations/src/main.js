import './style.css'
import gsap from 'gsap'

// staggerg and gsap timeline

// stagger

// gsap.to(".box", {
//   x: 500,
//   duration: 1,
//   ease: "power4.out",
//   delay: 0.7,
//   stagger: {
//     each: 0.1,
//     from: "random"
//   }
// })

// gsap.from("h1 span", {
//   yPercent: 100,
//   opacity: 0,
//   duration: 0.6,
//   ease: "expo.out",
//   stagger: {
//     each: "0.08",
//     from: "center"
//   }
// })

// gsap timeline

const tl = gsap.timeline()

// tl.to(".box", {
//   x: 500,
//   duration: 1,
//   ease: "power4.out",
//   delay: 0.7,
// }).to(".box1", {
//   x: 500,
//   duration: 1,
//   ease: "power4.out",
// }, "<").to(".box2", {
//   x: 500,
//   duration: 1,
//   ease: "power4.out",
// }, "<1").to(".box3", {
//   x: 500,
//   duration: 1,
//   ease: "power4.out",
// }, "-=0.8")


tl.to(".box", {
  x: 500,
  duration: 1,
  ease: "power4.out",
  delay: 0.7,
}).to(".box1", {
  x: 500,
  duration: 1,
  ease: "power4.out",
}, "nik").to(".box2", {
  x: 500,
  duration: 1,
  ease: "power4.out",
}, "nik-=0.1").to(".box3", {
  x: 500,
  duration: 1,
  ease: "power4.out",
})