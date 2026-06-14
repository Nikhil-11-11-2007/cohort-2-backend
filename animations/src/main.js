import './style.css'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import InertiaPlugin from 'gsap/InertiaPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';


gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip);

// flip

// Draggable.create(".box", {
//   bounds: "#app",
//   type: "x,y",
//   edgeResistance: 0.5,
//   inertia: true,
//   dragResistance: 0.2,
  

// })

// splitText 

// const split = new SplitText('.title h1', {
//   type: "chars,words,lines", // ye to fir kr hi rha hai
//   // type: "words" ye bhi work krega
//   wordsClass: "titleWords",
//   charsClass: "titleChars"
// })

// gsap.from(split.chars,{
//   yPercent: 100,
//   opacity: 0,
//   duration: 1,
//   ease: "expo.out",
//   stagger: {
//     each: 0.02,
//     from: "center"
//   }
// })


// gsap.set(".imageDiv", {
//   scale: 0.3
// })

// gsap.set(".content", {
//   gap: "37rem",
//   opacity:0
// })

// const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".page2",
//     start: "top top",
//     end: "top -100%",
//     scrub: true,
//     pin: true,
//   }
// })

// tl.to(".imageDiv", {
//   scale: 1,
//   ease: "power4.out",
// }).to(".content", {
//   gap: "7rem",
//   opacity:1
// }, "<")