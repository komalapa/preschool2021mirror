const music = [
    {
        name:"Canary",
        src:"assets/music/canary_bird.mp3"
    },
    {
        name:"Nature Alarm",
        src:"assets/music/morning-alarm.mp3"
    },
    {
        name:"Nature",
        src:"assets/music/nature-sounds.mp3"
    }
]
let activeAudio = 0;

const audioWrp = document.createElement('div');
audioWrp.className = "audio-wrp";

const audioControlsWrp = document.createElement('div');
audioControlsWrp.className = "audio-controls-wrp";

const audioPlay = document.createElement('span');
audioPlay.className = "audio-play-btn audio-btn icon-play";

const audioPrev = document.createElement('span');
audioPrev.className = "audio-prev-btn audio-btn icon-step-backward";

const audioNext = document.createElement('span');
audioNext.className = "audio-next-btn audio-btn icon-step-forward";

const audioProgress = document.createElement('input');
audioProgress.type = "range";
audioProgress.className = "audio-progress audio-range";
audioProgress.min = 0;
audioProgress.max = 100;

const audioVolumeWrp = document.createElement('div');
audioVolumeWrp.className = "audio-volume-wrp";

const audioVolumeIcon = document.createElement('span');
audioVolumeIcon.className = "audio-volume-icon icon-volume-up";

const audioVolume = document.createElement('input');
audioVolume.type = "range";
audioVolume.className = "audio-volume audio-range";

audioVolumeWrp.append(audioVolumeIcon, audioVolume);

const audioTiming = document.createElement('span');
audioTiming.className = "audio-timing";
audioTiming.innerText = "0:00/0:00";

const audioName = document.createElement('span');
audioName.className = "audio-name";

const audioPlaylist = document.createElement('ul');
audioPlaylist.className = "audio-playlist";

const audioPlayer = document.createElement('audio');
audioPlayer.className = "audio-player";
audioPlayer.src = music[activeAudio].src;
audioPlayer.preload = "metadata";

audioName.innerText = music[activeAudio].name;

audioControlsWrp.append(audioPrev, audioPlay, audioNext,)
audioWrp.append(audioControlsWrp, audioName, audioPlayer,audioProgress,audioTiming, audioVolumeWrp, audioPlaylist)
app.append(audioWrp);

music.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.className = "audio-playlist-item";
    listItem.dataset.id = index;
    listItem.innerHTML = item.name;
    listItem.addEventListener('click', () => {
        activeAudio = index;
        audioPlayer.src = music[activeAudio].src;
        audioName.innerText = item.name;
        audioPlayer.play();
    }) 
    audioPlaylist.append(listItem)
})


function playAudio(){
    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
}
function playIconToggle(action = "play"){
    //console.log(action)
    if (action === 'pause'){
        audioPlay.classList.remove('icon-pause');
        audioPlay.classList.add('icon-play');
    } else if (action === 'play'){
        audioPlay.classList.remove('icon-play');
        audioPlay.classList.add('icon-pause')
    }
}

function changeAudio(direction = "next"){
    const paused = audioPlayer.paused;
    audioPlayer.pause();
    if (direction === "prev"){
        activeAudio = activeAudio > 0 ? activeAudio -1 : music.length - 1;
    } else if (direction === "next"){
        activeAudio = activeAudio < (music.length - 1) ? activeAudio + 1 : 0;
    }
    //console.log(activeAudio)
    audioName.innerText = music[activeAudio].name;
    audioPlayer.src = music[activeAudio].src;
    audioPlayer.load();
    audioPlayer.play()
    updateTiming()
}

function updateTiming(){
    audioTiming.innerText =`${Math.floor(audioPlayer.currentTime / 60)}:${('0'+Math.floor(audioPlayer.currentTime)%60).slice(-2)}/${Math.floor(audioPlayer.duration/60)}:${('0'+Math.floor(audioPlayer.duration)%60).slice(-2)}`;
    audioProgress.value = (audioPlayer.currentTime/audioPlayer.duration)*100;
}

function setProgress(e){

    const value = Math.floor((e.target.value/100)*audioPlayer.duration);
    //console.log(e.target.value)
    audioPlayer.pause();
    audioPlayer.currentTime = value;
    audioPlayer.play();
}

function setVolume(e){
    audioPlayer.volume = e.target.value/100;
    if (audioPlayer.volume == 0){
        audioVolumeIcon.classList.add('icon-volume-off');
        audioVolumeIcon.classList.remove('icon-volume-up');
    } else {
        audioVolumeIcon.classList.remove('icon-volume-off');
        audioVolumeIcon.classList.add('icon-volume-up');
        audioPlayer.muted = false;
    }
}

function mute(){
    if (audioPlayer.muted){
        audioPlayer.muted = false;
        audioVolumeIcon.classList.remove('icon-volume-off');
        audioVolumeIcon.classList.add('icon-volume-up');
    } else {
        audioPlayer.muted = true;
        audioVolumeIcon.classList.add('icon-volume-off');
        audioVolumeIcon.classList.remove('icon-volume-up');
        
    }
}

function musicToggleKey(e){
    if (e.code && !e.repeat ) playAudio();    
}

//events
audioPlayer.addEventListener('pause', ()=>playIconToggle('pause'));
audioPlayer.addEventListener('play', ()=>playIconToggle('play'));
audioPlayer.addEventListener('ended', ()=>changeAudio("next"))
audioPlayer.addEventListener('timeupdate', updateTiming);
audioPlayer.addEventListener('loadedmetadata', updateTiming);

audioPlay.addEventListener('click', playAudio);
audioPrev.addEventListener('click', ()=>changeAudio("prev"));
audioNext.addEventListener('click', ()=>changeAudio("next"));

audioProgress.addEventListener('input', setProgress);
audioVolume.addEventListener('input', setVolume);

audioVolumeIcon.addEventListener('click', mute)

audioName.addEventListener('click',playAudio)

//document.addEventListener('keypress', musicToggleKey);