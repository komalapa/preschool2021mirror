const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');


const slidesLength = slideLeft.querySelectorAll('div').length;

let activeSlide = 0;
slideLeft.style.top = `-${(slidesLength -1) * 100}vh`

function changeSlide(direction){
    const sliderHeight = sliderContainer.clientHeight;
    if (direction === 'up'){
        activeSlide++;
        if (activeSlide > slidesLength-1) activeSlide = 0;
    } else if (direction === 'down'){
        activeSlide--;
        if (activeSlide < 0) activeSlide = slidesLength-1;
    }
    console.log(activeSlide*sliderHeight)
    slideRight.style.transform = `translateY(-${activeSlide*sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlide*sliderHeight}px)`;
}


upBtn.addEventListener('click', ()=>{
    changeSlide('up')
})
downBtn.addEventListener('click', ()=>{
    changeSlide('down')
})