const progress = document.querySelector('#video-progress');
progress.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${progress.value}%, #c4c4c4 ${progress.value}%, #c4c4c4 100%)`  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
})

const volume = document.querySelector('#volume-level');
volume.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${volume.value}%, #c4c4c4 ${volume.value}%, #c4c4c4 100%)`  
  
volume.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
})