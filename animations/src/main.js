import './style.css'
import gsap from 'gsap'

// const box = document.querySelector(".box")

// gsap.to(".box", {
//   x: 700,
//   y: 400,
//   delay: 1,
//   duration: 1
// })

// gsap.from(".box", {
//   x: 700,
//   y: 400,
//   delay: 1,
//   duration: 1
// })

// gsap.fromTo(".box",
//   {
//     x:0,
//   },
//   {
//     delay: 0.6,
//     duration: 1,
//     x: 400,
//     y: 290
//   }
// )

// gsap.set(".box", {
//   delay: 2,
//   duration: 10,
//   x: 600,
//   backgroundColor: "red",
//   scale: 1.5
// });

gsap.set(".box", {
  opacity: 0,
  y: 100
});

gsap.to(".box", {
  delay:2,
  opacity: 1,
  y: 0,
  duration: 1
});