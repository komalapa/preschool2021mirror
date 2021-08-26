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
//console.log(volumeBar)

//range styles
progressBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${progressBar.value}%, #c4c4c4 ${progressBar.value}%, #c4c4c4 100%)`  
volumeBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${volumeBar.value}%, #c4c4c4 ${volumeBar.value}%, #c4c4c4 100%)`  

//vp = videoPlayer
const VIDEOS = ['assets/video/paris.mp4', "assets/video/TourEiffel.mp4", "assets/video/louvre.mp4"]
let activeVideo = 0;
function vpPlay(){
    video[video.paused ? 'play' : 'pause']()
}

function vpChooseVideo(direction = 'back'){
    //console.log(direction)
    const length = VIDEOS.length
    if (direction === 'forward'){
        activeVideo = activeVideo < length -1 ? activeVideo + 1 : 0
    } else if (direction === 'back'){
        activeVideo = activeVideo > 0 ? activeVideo - 1 : length -1    
    }

    video.src = VIDEOS[activeVideo]
    video.play();
}

function vpMute(){
    //console.log(video.muted)
    video.muted = !video.muted;
    if (video.muted){
        muteBtn.classList.add("crossed")
    } else {
        muteBtn.classList.remove("crossed")
    }
}

function vpSetVolume(e){
   // console.log(e.target)
    video.volume = e.target.value/100;
    volumeBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${volumeBar.value}%, #c4c4c4 ${volumeBar.value}%, #c4c4c4 100%)`
}
function vpSetProgress(e){
    video.currentTime = e.target.value/100 * video.duration
}

function vpFullscreen(){
    //console.log (document.scale)
    if (!document.fullscreenElement) {
        //console.log("FS")
        document.querySelector('.video-player-wrp').requestFullscreen();
        video.classList.add("fullscreen")
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        // video.classList.remove("fullscreen")       
    } 
}
//fixes exit fullscreen by esc and button
document.addEventListener('fullscreenchange', () => {
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        video.classList.remove("fullscreen") 
    }
})

function vpReplaceIconPlay(){
    //console.log("icon")
    if (!video.paused){
        centralPlayBtn.style.opacity = 0;
        playBtn.classList.add('video-player-controls-pause');
    } else {
        centralPlayBtn.style.opacity = 1;
        //playBtn.classList.remove('video-player-controls-pause');
    }
}



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



