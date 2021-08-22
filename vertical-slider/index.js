console.log(`
Бесконечная прокрутка без смены направления
Дополнительно добавила свайп мышью.
Управление стрелками на клавиатуре с подсветкой кнопки
`)
const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
slideRight.append(slideRight.querySelector('div:first-child').cloneNode(true))
slideLeft.prepend(slideLeft.querySelector('div:last-child').cloneNode(true))

const slidesLength = slideLeft.querySelectorAll('div').length;

let activeSlide = 0;
slideLeft.style.top = `-${(slidesLength -1) * 100}vh`

let inTransition = false;
slideLeft.addEventListener('transitionstart', () => {
    inTransition = true
})
slideLeft.addEventListener('transitionend', () => {
    inTransition = false
})

function changeSlide(direction){
    
    if (inTransition) return;
    const sliderHeight = sliderContainer.clientHeight;
    if (direction === 'up'){
        if (activeSlide > slidesLength-2) {//double first/last 
            slideLeft.classList.remove('transition')
            slideRight.classList.remove('transition')
            activeSlide=0
            setTimeout(()=>{changeSlide('up')})
        } else {
            activeSlide++;
            slideLeft.classList.add('transition')
            slideRight.classList.add('transition')
        }
        // activeSlide++;
        // if (activeSlide > slidesLength-1) activeSlide = 0;
    } else if (direction === 'down'){
        if (activeSlide < 1) {//double first/last 
            slideLeft.classList.remove('transition')
            slideRight.classList.remove('transition')
            activeSlide=slidesLength-1
            setTimeout(()=>{changeSlide('down')})
        } else {
            activeSlide--;
            slideLeft.classList.add('transition')
            slideRight.classList.add('transition')
        }
        // activeSlide--;
        // if (activeSlide < 0) activeSlide = slidesLength-1;
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