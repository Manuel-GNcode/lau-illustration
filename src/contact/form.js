import { gsap } from "gsap";

const $btnWork = document.getElementById('contact-btn-work');
const $mainCtr = document.getElementById('main-ctr');

$btnWork.addEventListener('click', ()=>{
  gsap.to($mainCtr, {
    xPercent: 0,
    duration: 0.5,
    ease: 'sine.out'
  })
})