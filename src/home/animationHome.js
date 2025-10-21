import { gsap } from "gsap";

const $homeBtn = document.getElementById('home-btn');
const $flowerFall = document.querySelectorAll('.flower-fall');

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
export let tlHome = gsap.timeline({
  paused: true,
  defaults: {
    ease: 'sine.out',
  }
})
tlHome.to('#home-btn', {
  opacity: 0,
  duration: 0.2,
}).to('#home-avatar', {
  y: '100%',
  duration: 0.5,
}).to('#home-background', {
  scale: 3,
  duration: 0.8,
}).set('#home', {
  display: 'none'
})

$homeBtn.addEventListener('click', e=>{
  tlHome.restart();
})

// Animación caida de flores

const flowerFall = (flower)=>{
  const xMove = gsap.utils.random(-150, 150);
  const flowerDelay = gsap.utils.random(0, 6);

  gsap.to(flower, {
    y: '110dvh',
    x: xMove,
    rotate: 180,
    duration: 5,
    delay: flowerDelay,
    ease: 'sine.in',
    onComplete: ()=>{
      gsap.set(flower, {
        x:0,
        y:0,
        rotate: 0,
      })
      flowerFall(flower);
    }
  })
}
$flowerFall.forEach(el=>{
  flowerFall(el);
})

