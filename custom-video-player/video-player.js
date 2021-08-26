const video = document.querySelector('#video-paris');

//controls
const centralPlayBtn = document.querySelector('.video-player-start');
const playBtn =  document.querySelector('.video-player-controls-play');
const backBtn =  document.querySelector('.video-player-controls-back');
const forwardBtn =  document.querySelector('.video-player-controls-forward');
const muteBtn =  document.querySelector('.video-player-controls-mute');
const fullscreenBtn =  document.querySelector('.video-player-controls-full');

//vp = videoPlayer
const VIDEOS = ['assets/video/paris.mp4', "assets/video/TourEiffel.mp4", "assets/video/louvre.mp4"]
let activeVideo = 0;
function vpPlay(){
    video[video.paused ? 'play' : 'pause']()
}

function vpChooseVideo(direction = 'back'){
    console.log(direction)
    const length = VIDEOS.length
    if (direction === 'forward'){
        activeVideo = activeVideo < length -1 ? activeVideo + 1 : 0
    } else if (direction === 'back'){
        activeVideo = activeVideo > 0 ? activeVideo - 1 : length -1    
    }

    video.src = VIDEOS[activeVideo]
    video.play();
}

function vpReplaceIconPlay(){
    //console.log("icon")
    if (!video.paused){
        centralPlayBtn.style.opacity = 0;
        playBtn.classList.add('video-player-controls-pause');
    } else {
        centralPlayBtn.style.opacity = 1;
        playBtn.classList.remove('video-player-controls-pause');
    }
}



playBtn.addEventListener('click', vpPlay);
video.addEventListener('play',vpReplaceIconPlay);
video.addEventListener('pause',vpReplaceIconPlay);
video.addEventListener('ended',  () => vpChooseVideo('forward'))
backBtn.addEventListener('click',() => vpChooseVideo('back'));
forwardBtn.addEventListener('click', () => vpChooseVideo('forward'));