import { gsap } from "gsap";
import { images } from "./sources";

const $btnLeft = document.getElementById('work-arrow-left');
const $btnRight = document.getElementById('work-arrow-right');
const $sliderCtr = document.getElementById('work-slider-ctr');
const $btnsImg = document.querySelectorAll('.btn-img');
const $currentImg = document.getElementById('work-current-img');

let currentSlide = 0;
let isAnimating = false;

const stepSlide = 100/6;

let currentImg = 0;

const moveSlider = async (nextSlide) => {
  if (nextSlide < 0 || nextSlide > 5) return;
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
  moveSlider(currentSlide - 1);
});
$btnRight.addEventListener('click', ()=>{
  moveSlider(currentSlide + 1);
})
$btnsImg.forEach(item=>{
  item.addEventListener('click', (e)=>{
    $currentImg.style.display = 'flex';
    const numberImg = e.target.dataset.illustration;
    renderImg(numberImg)
  })
})

