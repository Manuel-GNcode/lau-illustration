import { gsap } from "gsap";

const $homeBtn = document.getElementById('home-btn');

// Animación del avatar del home
gsap.to('#home-avatar', {
  x: '-75%',
  duration: 0.5,
  ease: 'steps(3)',
  repeat: -1,
})
// Animación del home button
gsap.to('#home-btn', {
  scale: 1.05,
  duration: 0.5,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
})
// Animación de todo el home
let tlHome = gsap.timeline({
  paused: true,
  defaults: {
    ease: 'power3.inOut',
  }
})
tlHome.to('#home-btn', {
  opacity: 0,
  duration: 0.2,
}).to('#home-avatar', {
  y: '100%',
  duration: 0.5,
}).to('#home-background', {
  scale: 4,
  duration: 1,
}).to('#home', {
  display: 'none'
})

$homeBtn.addEventListener('click', e=>{
  tlHome.restart();
})
