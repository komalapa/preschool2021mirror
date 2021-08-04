console.log(`
Дополнительно добавила свайп мышью.
Управление стрелками на клавиатуре с подсветкой кнопки
`)
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
    slideRight.style.transform = `translateY(-${activeSlide*sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlide*sliderHeight}px)`;
}


upBtn.addEventListener('click', ()=>{
    changeSlide('up')
})
downBtn.addEventListener('click', ()=>{
    changeSlide('down')
})

function detectSwipe(evt){
    const startY = evt.clientY;
    const moveSlide = (e) =>{
        if (e.clientY>startY){
            if (slideRight.contains(e.target)) changeSlide('down')  
            if (slideLeft.contains(e.target)) changeSlide('up')  
        } else if (e.clientY<startY){
            if (slideRight.contains(e.target)) changeSlide('up')  
            if (slideLeft.contains(e.target)) changeSlide('down')  
        }
        document.removeEventListener('mousemove', moveSlide)
    }
    document.addEventListener('mousemove', moveSlide)
}

document.addEventListener('mousedown', detectSwipe)

document.addEventListener('keydown',(e) =>{
    if (e.key === "ArrowUp"){
        upBtn.classList.add('active-btn');
        changeSlide('up');
    } else if (e.key === "ArrowDown"){
        downBtn.classList.add('active-btn');
        changeSlide('down');
    }  
    setTimeout(()=>{
        upBtn.classList.remove('active-btn');
        downBtn.classList.remove('active-btn')
    }, 300)
})