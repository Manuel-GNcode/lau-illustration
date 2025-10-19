import { gsap } from "gsap";
import { images, food } from "./sources";
import { tlHome } from "../home/animationHome";

const $btnLeft = document.getElementById('work-arrow-left');
const $btnRight = document.getElementById('work-arrow-right');
const $currentImg = document.getElementById('work-current-img');
const $slider = document.getElementById('work-slider');
const $btnHome = document.getElementById('work-btn-home');

let $sliderCtr = '';
let $btnsImg = '';

let currentSlide = 0;
let isAnimating = false;

const stepSlide = 100/6;

const renderSlider = ()=>{
  let sliderItems = '';
  for (let index = 0; index < food.length; index++) {
    const element = food[index];
    const item = `
    <button data-illustration="${index}" class="btn-img py-2 px-4 size-full cursor-pointer hover:scale-[1.1]">
      <img src="${element.url}" alt="${element.name}" class="work-food size-full object-contain pointer-events-none"/>
    </button>
    `
    sliderItems += item;
  }

  $slider.innerHTML = `
  <div id="work-slider-ctr" class="h-full w-[600%] flex sm:w-[300%] lg:w-[200%]">
    ${sliderItems}
  </div>
  `

  $sliderCtr = document.getElementById('work-slider-ctr');
  $btnsImg = document.querySelectorAll('.btn-img');

  $btnsImg.forEach(item => {
    item.addEventListener('click', (e) => {
      $currentImg.style.display = 'flex';
      const idImg = e.target.dataset.illustration;
      $btnsImg.forEach(i => {
        i.classList.remove('food-active');
      })
      e.target.classList.add('food-active')
      renderImg(idImg)
    })
  })
}

// responsive
let device = 0;

const updateDevice = () => {
  const w = window.innerWidth;

  const lastDevice = device;
  if (w < 640) device = 1;
  else if (w >= 640 && w < 1024) device = 2;
  else device = 3;

  if (lastDevice != device) {
    renderSlider();
    gsap.set($sliderCtr, {
      x: 0,
    })
    currentSlide = 0;
    $btnRight.classList.remove('btn-off');
    $btnLeft.classList.add('btn-off');
  }
};
updateDevice();
window.addEventListener('resize', updateDevice);

const moveSlider = async (nextSlide) => {
  if (nextSlide == 0) $btnLeft.classList.add('btn-off');
  else if (nextSlide == food.length - device) $btnRight.classList.add('btn-off');

  if (isAnimating) return;
  isAnimating = true;

  const delta = nextSlide > currentSlide ? `-=${stepSlide}%` : `+=${stepSlide}%`;

  await new Promise((resolve) => {
    gsap.to($sliderCtr, {
      x: delta,
      duration: 0.5,
      ease: 'sine.out',
      onComplete: resolve
    });
  });

  currentSlide = nextSlide;
  isAnimating = false;
}

const renderImg = (newImg)=>{
  $currentImg.innerHTML = `
    <figure class="bg-gray p-4 border-5 border-white rounded-[28px] w-80 h-100 flex items-center justify-center absolute lg:w-100">
      <img src="${images[newImg].url}" alt="imagen ${images[newImg].name}" class='rounded-xl size-full object-contain lg:object-cover'>
      <button id="work-btn-close" class="absolute -top-1 -translate-y-1/2 cursor-pointer w-15"><img src='/work/works-btnX.webp' alt='Button close'></button>
      <p class='absolute bottom-0 translate-y-1/2 border-5 border-white rounded-3xl bg-rouse px-4 py-1 text-white'>${images[newImg].name}</p>
    </figure>
  `
  document.getElementById('work-btn-close').addEventListener('click', ()=>{
    $currentImg.style.display = 'none';
    $btnsImg.forEach(i=>{
      i.classList.remove('food-desactive');
      i.classList.remove('food-active');
    })
  })
};

$btnLeft.addEventListener('click', ()=>{
  $btnRight.classList.remove('btn-off');
  moveSlider(currentSlide - 1);
});
$btnRight.addEventListener('click', ()=>{
  $btnLeft.classList.remove('btn-off');
  moveSlider(currentSlide + 1);
})
$btnHome.addEventListener('click', (e)=>{
  tlHome.reverse();
})

gsap.to($btnLeft, {
  x: '-10%',
  duration: 0.5,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
})
gsap.to($btnRight, {
  x: '10%',
  duration: 0.5,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
})

