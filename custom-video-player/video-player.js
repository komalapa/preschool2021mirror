const video = document.querySelector('#video-paris');

//controls
const centralPlayBtn = document.querySelector('.video-player-start');
const playBtn = document.querySelector('.video-player-controls-play');
const backBtn = document.querySelector('.video-player-controls-back');
const forwardBtn = document.querySelector('.video-player-controls-forward');
const muteBtn = document.querySelector('.video-player-controls-mute');
const fullscreenBtn = document.querySelector('.video-player-controls-full');


const progressBar = document.querySelector('.video-player-controls-progress');
const volumeBar = document.querySelector('.video-player-controls-volume');

const controlsMsg = document.querySelector('#video-message');

//range styles
progressBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${progressBar.value}%, #c4c4c4 ${progressBar.value}%, #c4c4c4 100%)`  
volumeBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${volumeBar.value}%, #c4c4c4 ${volumeBar.value}%, #c4c4c4 100%)`  


const MSG_DURATION = 2000;

const VIDEOS = ['assets/video/paris.mp4', "assets/video/TourEiffel.mp4", "assets/video/louvre.mp4"]
let activeVideo = 0;
function vpPlay(){
    video[video.paused ? 'play' : 'pause']();
    //msg
    controlsMsg.innerText = `${video.paused ? 'pause' : 'play'}` 
    controlsMsg.style.display = 'block';
    setTimeout(() => {
        controlsMsg.style.display = 'none';
    }, MSG_DURATION);
}

function vpChooseVideo(direction = 'back'){
    const length = VIDEOS.length
    if (direction === 'forward'){
        activeVideo = activeVideo < length -1 ? activeVideo + 1 : 0
    } else if (direction === 'back'){
        activeVideo = activeVideo > 0 ? activeVideo - 1 : length -1    
    }
    video.src = VIDEOS[activeVideo]
    video.play();
    //msg
    controlsMsg.innerText = `${direction}` 
    controlsMsg.style.display = 'block';
    setTimeout(() => {
        controlsMsg.style.display = 'none';
    }, MSG_DURATION);
}

function vpMute(){
    video.muted = !video.muted;
    if (video.muted){
        muteBtn.classList.add("crossed")
    } else {
        muteBtn.classList.remove("crossed")
    }
    //msg
    controlsMsg.innerText = `${video.muted ? 'muted' : 'unmuted'}` 
    controlsMsg.style.display = 'block';
    setTimeout(() => {
        controlsMsg.style.display = 'none';
    }, MSG_DURATION);
}

function vpSetVolume(e){
    video.volume = e ? e.target.value/100 : volumeBar.value/100;
    volumeBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${volumeBar.value}%, #c4c4c4 ${volumeBar.value}%, #c4c4c4 100%)`
    //msg
    controlsMsg.innerText = `Volume ${volumeBar.value}%` 
        controlsMsg.style.display = 'block';
        setTimeout(() => {
            controlsMsg.style.display = 'none';
        }, MSG_DURATION);
}
function vpSetProgress(e){
    let value
    if (!e) {
        console.log("not e")
        value = progressBar.value;
    } else {
        value = e.target.value;
    }
    video.currentTime = value/100 * video.duration
}

function vpFullscreen(){
    if (!document.fullscreenElement) {
        document.querySelector('.video-player-wrp').requestFullscreen();
        video.classList.add("fullscreen")
    } else if (document.exitFullscreen) {
        document.exitFullscreen();      
    } 
}
//fixes exit fullscreen by esc and button
document.addEventListener('fullscreenchange', () => {
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        video.classList.remove("fullscreen") 
    }
})

function vpReplaceIconPlay(){
    console.log("icon")
    if (!video.paused){
        centralPlayBtn.style.opacity = 0;
        playBtn.classList.add('video-player-controls-pause');
    } else {
        centralPlayBtn.style.opacity = 1;
        playBtn.classList.remove('video-player-controls-pause');
    }
}

//Listeners
playBtn.addEventListener('click', vpPlay);
centralPlayBtn.addEventListener('click', vpPlay);
video.addEventListener('click', vpPlay);
video.addEventListener('play',vpReplaceIconPlay);
video.addEventListener('pause',vpReplaceIconPlay);
video.addEventListener('ended',  () => vpChooseVideo('forward'))
backBtn.addEventListener('click',() => vpChooseVideo('back'));
forwardBtn.addEventListener('click', () => vpChooseVideo('forward'));
muteBtn.addEventListener('click', vpMute);
fullscreenBtn.addEventListener('click', vpFullscreen);

volumeBar.addEventListener('input', vpSetVolume);
progressBar.addEventListener('input', vpSetProgress);

setInterval(() => {
    progressBar.value = Math.floor(100*video.currentTime/video.duration)
    progressBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${progressBar.value}%, #c4c4c4 ${progressBar.value}%, #c4c4c4 100%)`
}, 100);

//keyboard
function toggleKeys(e){
    const hideMsg = () =>{
        controlsMsg.style.display = 'none';
        video.removeEventListener('click', hideMsg)
    } 
    const key = e.key;
    if (!key) return;
    console.log(e.shiftKey,key)
    if (key === "k" || key === "л" || key === " ") {
        vpPlay();
        return
    }
    if (key === "j" || key === "о" || e.key === "ArrowLeft") {
        video.currentTime -= 10/60 //tmp not 10s (1/6 s) because videos too short
        //msg
        controlsMsg.innerText = `${progressBar.value}%` 
        controlsMsg.style.display = 'block';
        setTimeout(() => {
            controlsMsg.style.display = 'none';
        }, MSG_DURATION);
        return
    }
    if (key === "l" || key === "д" || e.key === "ArrowRight") {
        video.currentTime += 10/60
        //msg
        controlsMsg.innerText = `${progressBar.value}%` 
        controlsMsg.style.display = 'block';
        setTimeout(() => {
            controlsMsg.style.display = 'none';
        }, MSG_DURATION);
        return
    }
    if (key === "P" || (e.shiftKey && key ==="p") || key === "З" || (e.shiftKey && key ==="з")) {
        vpChooseVideo('back')
        return
    }
    if (key === "N" || (e.shiftKey && key ==="n") || key === "Т" || (e.shiftKey && key ==="т")) {
        vpChooseVideo('forward')
        return
    }

    if ((key === "," || key ==="б") && video.paused) {
        video.currentTime -= 0.04//25frames per sec
        return
    }
    if ((key === "." || key ==="ю") && video.paused) {
        video.currentTime += 0.04//25frames per sec
        return
    }
    if (((e.shiftKey && key ===",") || key === "<" || key ==="Б") && video.playbackRate > 0.25 ) {
        video.playbackRate -= 0.25
        //msg
        controlsMsg.innerText = `playback rate: ${video.playbackRate}` 
        controlsMsg.style.display = 'block';
        setTimeout(() => {
            controlsMsg.style.display = 'none';
        }, MSG_DURATION);
        return
    }
    if (((e.shiftKey && key ===".") ||key === ">" || key ==="Ю") && video.playbackRate < 3 ) {
        video.playbackRate += 0.25
        //msg
        controlsMsg.innerText = `playback rate: ${video.playbackRate}` 
        controlsMsg.style.display = 'block';
        setTimeout(() => {
            controlsMsg.style.display = 'none';
        }, MSG_DURATION);
        return
    }
    if (key === "F" || (e.shiftKey && key ==="f") || key === "А" || (e.shiftKey && key ==="а") || key ==="а" || key ==="f") {
        vpFullscreen()
        return
    }
    if (+key >=0 || +key<=9){
       progressBar.value = +key * 10;
        vpSetProgress();
        //msg
        controlsMsg.innerText = `${progressBar.value}%` 
        controlsMsg.style.display = 'block';
        setTimeout(() => {
            controlsMsg.style.display = 'none';
        }, MSG_DURATION);
        return
    }
    if (((e.shiftKey && key ==="/") || key === "?" )) {
        //msg
        controlsMsg.innerText = `
        k               - play
        j / ←           - forward
        l / →           - back
        P / Shift + p   - previous video
        N / Shift + n   - next video
        ,               - previous frame
        .               - next frame
        <               - slower
        >               - faster
        f / F / Shift+f - fullscreen
        0..9            - navigation by tenths
        ↑               - volume up
        ↓               - volume down
        ` 
        controlsMsg.style.display = 'block';
        video.addEventListener('click', hideMsg);
        return
    }
    if (e.key === "ArrowDown" && volumeBar.value >= 5) {
        volumeBar.value = +volumeBar.value - 5
        vpSetVolume()
        return
    }
    if (e.key === "ArrowUp" && volumeBar.value <= 95) {
        volumeBar.value = +volumeBar.value + 5
        console.log(volumeBar.value)
        vpSetVolume()
        return
    }
    if (key === "M" || (e.shiftKey && key ==="m") || key === "Ь" || (e.shiftKey && key ==="ь") || key ==="ь" || key ==="m") {
        vpMute()
        return
    }
}

document.addEventListener('keyup', toggleKeys)
