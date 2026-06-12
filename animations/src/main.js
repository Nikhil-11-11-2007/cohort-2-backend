import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * time control
 */

// const play = document.querySelector(".play")
// const pause = document.querySelector(".pause")
// const restart = document.querySelector(".restart")
// const reverse = document.querySelector(".reverse")
// const seek = document.querySelector(".seek")

// const tl = gsap.timeline({ paused: true })

// tl.to(".box", {
//   x: 500,
//   duration: 1,
//   ease: "power4.out",
//   delay: 0.7,
// })
//   .to(".box1", {
//     x: 500,
//     duration: 1,
//     ease: "power4.out",
//   }, "nik").addLabel("box1")
//   .to(".box2", {
//     x: 500,
//     duration: 1,
//     ease: "power4.out",
//   }, "nik-=0.1")
//   .to(".box3", {
//     x: 500,
//     duration: 1,
//     ease: "power4.out",
//   })


// play.addEventListener("click", () => {
//   tl.play()
// })

// pause.addEventListener("click", () => {
//   tl.pause()
// })

// restart.addEventListener("click", () => {
//   tl.restart()
// })

// reverse.addEventListener("click", () => {
//   tl.reverse()
// })

// seek.addEventListener("click", () => {
//   tl.seek("box1")
// })

// scrolltrigger

// gsap.to(".box", {
//   x:600,
//   ease: "power4.out",
//   scrollTrigger: {
//     trigger: ".page2",
//     start: "top top",
//     end: "top -100%",
//     scrub: true,
//     pin: true,
//     onEnter: () => {},
//     onLeave: () => {},
//     onUpdate: () => {}
//   }
// })

gsap.set(".imageDiv", {
  scale: 0.3
})

gsap.set(".content", {
  gap: "37rem",
  opacity:0
})

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    start: "top top",
    end: "top -100%",
    scrub: true,
    pin: true,
  }
})

tl.to(".imageDiv", {
  scale: 1,
  ease: "power4.out",
}).to(".content", {
  gap: "7rem",
  opacity:1
}, "<")