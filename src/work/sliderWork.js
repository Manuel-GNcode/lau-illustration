import { gsap } from "gsap";
import { images, food } from "./sources";

const $btnLeft = document.getElementById('work-arrow-left');
const $btnRight = document.getElementById('work-arrow-right');
const $currentImg = document.getElementById('work-current-img');
const $slider = document.getElementById('work-slider');

let currentSlide = 0;
let isAnimating = false;

const numberImg = images.length;
const stepSlide = 100/numberImg;
let currentImg = 0;

const renderSlider = ()=>{
  let sliderItems = '';
  for (let index = 0; index < food.length; index++) {
    const element = food[index];
    const item = `
    <button data-illustration="${index}" class="btn-img py-1 px-2 size-full cursor-pointer hover:scale-[1.1]">
      <img src="${element.url}" alt="${element.name}" class="size-full object-contain pointer-events-none"/>
    </button>
    `
    sliderItems += item;
  }

  $slider.innerHTML = `
  <div id="work-slider-ctr" class="h-full w-${numberImg}/1 flex">
    ${sliderItems}
  </div>
  `
}
renderSlider();
const $sliderCtr = document.getElementById('work-slider-ctr');
const $btnsImg = document.querySelectorAll('.btn-img');

const moveSlider = async (nextSlide) => {
  if (nextSlide == 0) $btnLeft.classList.add('btn-off');
  else if (nextSlide == food.length-1) $btnRight.classList.add('btn-off');

  if (isAnimating) return;
  isAnimating = true;

  const delta = nextSlide > currentSlide ? `-=${stepSlide}%` : `+=${stepSlide}%`;

  await new Promise((resolve) => {
    gsap.to($sliderCtr, {
      x: delta,
      onComplete: resolve
    });
  });

  currentSlide = nextSlide;
  isAnimating = false;
}

const renderImg = (newImg)=>{
  $currentImg.innerHTML = `
    <figure class="bg-gray p-4 border-5 border-white rounded-3xl w-80 h-100 flex items-center justify-center absolute">
      <img src="${images[newImg].url}" alt="imagen ${images[newImg].name}" class='rounded-xl'>
      <button id="work-btn-close" class="absolute -top-1 -translate-y-1/2 cursor-pointer w-15"><img src='/work/works-btnX.webp' alt='Button close'></button>
      <p class='absolute bottom-0 translate-y-1/2 border-5 border-white rounded-3xl bg-rouse px-4 py-1 text-white'>${images[newImg].name}</p>
    </figure>
  `
  document.getElementById('work-btn-close').addEventListener('click', ()=>{
    $currentImg.style.display = 'none';
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
$btnsImg.forEach(item=>{
  item.addEventListener('click', (e)=>{
    $currentImg.style.display = 'flex';
    const numberImg = e.target.dataset.illustration;
    renderImg(numberImg)
  })
})

