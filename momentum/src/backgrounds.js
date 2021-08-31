const BACKGROUNDS_COUNT = 20;
const AUTO_CHANGE_INTERVAL = 10 * 60 * 1000; //10min


const sliderLeftBtn = document.querySelector('#slider-left');
const sliderRightBtn = document.querySelector('#slider-right');

let inTransition = false;
app.addEventListener('transitionstart', () => {
    inTransition = true
})
app.addEventListener('transitionend', () => {
    inTransition = false
})


let backgroundNumber = Math.floor(Math.random() * BACKGROUNDS_COUNT) + 1;

document.documentElement.style.setProperty('--background-image', ` )`)

function setBackground(number = backgroundNumber){
    //console.log(backgroundNumber)
    const image = new Image();
    number = ('0' + number).slice(-2)
    image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${number}.jpg`;

    image.onload = function () {
        if (!inTransition){ //only when not transition apply changes for new background
            document.documentElement.style.setProperty('--background-image', `url("${image.src}")`)
            app.style.opacity = 1;
        }
    };
};

let slidesTimer;//for automatic change
function changeSlide(direction = 'right'){
    // console.log('direction')
    if (direction === 'right'){
        backgroundNumber = backgroundNumber < BACKGROUNDS_COUNT-1 ? ++backgroundNumber : 1;
        setBackground();
    } else if (direction === 'left'){
        backgroundNumber = backgroundNumber > 1 ? --backgroundNumber : BACKGROUNDS_COUNT;
        setBackground();
    }
    clearInterval(slidesTimer);
    slidesTimer = setInterval(changeSlide,AUTO_CHANGE_INTERVAL)
}
 

function toggleKey(e){
    //console.log(e)
    if (!e) return;
    if (e.key === "ArrowRight" ){
        changeSlide('right');
        return;
    }
    if (e.key === "ArrowLeft"){
        changeSlide('left');
        return;
    }
}
//events
document.addEventListener('keyup', toggleKey);
sliderLeftBtn.addEventListener('click',()=>changeSlide('left'));
sliderRightBtn.addEventListener('click',()=>changeSlide('right'));

//init
setBackground()