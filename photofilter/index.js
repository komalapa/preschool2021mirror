//canvas variables
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d"); 
const img = new Image();
let width, height

//controls
const blurRange = document.querySelector('#filter-blur');
const blurNumber = document.querySelector('#filter-blur-number');
const blurCss = document.querySelector('#blur-css');

const invertRange = document.querySelector('#filter-invert');
const invertNumber = document.querySelector('#filter-invert-number');
const invertCss = document.querySelector('#invert-css');


const sepiaRange = document.querySelector('#filter-sepia');
const sepiaNumber = document.querySelector('#filter-sepia-number');
const sepiaCss = document.querySelector('#sepia-css');

const saturateRange = document.querySelector('#filter-saturate');
const saturateNumber = document.querySelector('#filter-saturate-number');
const saturateCss = document.querySelector('#saturate-css');

const hueRange = document.querySelector('#filter-hue');
const hueNumber = document.querySelector('#filter-hue-number');
const hueCss = document.querySelector('#hue-css');

const contrastRange = document.querySelector('#filter-contrast');
const contrastNumber = document.querySelector('#filter-contrast-number');
const contrastCss = document.querySelector('#contrast-css');

const brightnessRange = document.querySelector('#filter-brightness');
const brightnessNumber = document.querySelector('#filter-brightness-number');
const brightnessCss = document.querySelector('#brightness-css');

const grayscaleRange = document.querySelector('#filter-grayscale');
const grayscaleNumber = document.querySelector('#filter-grayscale-number');
const grayscaleCss = document.querySelector('#grayscale-css');

//consts
const BLUR_MAX = 20;
const INVERT_MAX = 100;
const SEPIA_MAX = 100;
const SATURATE_MAX = 600;
const HUE_MAX = 360;
const CONTRAST_MAX = 300;
const BRIGHTNESS_MAX = 300;
const GRAYSCALE_MAX = 100;

function loadCanvasWithInputFile(){
	
	const fileInput = document.getElementById('new-file'); 
	
    console.log(fileInput, canvas)
	fileInput.onchange = function(evt) {
        
		const files = evt.target.files;
        console.log(files[0].type)
	    const file = files[0];
	    if(file.type.match('image*')) {
	        const reader = new FileReader();
	        reader.readAsDataURL(file);
	    	reader.onload = function(evt){
                console.log('loaded')
	    		if( evt.target.readyState == FileReader.DONE) {
                    img.src = evt.target.result;
                    img.onload = () => {
						context.drawImage(img, 0, 0);
						const MAX_WIDTH = 800;//canvas.clientWidth;
            			const MAX_HEIGHT = 600;//canvas.clientHeight;
            			width = img.width;
            			height = img.height;
						if (width > height) {
							if (width > MAX_WIDTH) {
								height *= MAX_WIDTH / width;
								width = MAX_WIDTH;
							}
						} else {
							if (height > MAX_HEIGHT) {
								width *= MAX_HEIGHT / height;
								height = MAX_HEIGHT;
							}
						}
						canvas.width = width;
						canvas.height = height;
                        context.drawImage(img, 0, 0, width, height);
                    }
			    }
	    	}    
	    } else {
	        alert("not an image");
	    }
	};
}
loadCanvasWithInputFile()

const filtersSets = {
	default:{
		blur: 0,
		invert: 0,
		sepia: 0,
		saturate: 100,
		hue: 0,
		contrast: 100,
		brightness:100,
		grayscale:0
	},
	current:{
		blur: 0,
		invert: 0,
		sepia: 0,
		saturate: 100,
		hue: 0,
		contrast: 100,
		brightness:100,
		grayscale:0
	}
}



function applyFilters(set = "default"){
	//console.log(filtersSets[set])
	blurRange.value = filtersSets[set].blur;
	blurNumber.value = filtersSets[set].blur;
	blurCss.innerText = filtersSets[set].blur;

	invertRange.value = filtersSets[set].invert;
	invertNumber.value = filtersSets[set].invert;
	invertCss.innerText = filtersSets[set].invert;

	sepiaRange.value = filtersSets[set].sepia;
	sepiaNumber.value = filtersSets[set].sepia;
	sepiaCss.innerText = filtersSets[set].sepia;

	saturateRange.value = filtersSets[set].saturate;
	saturateNumber.value = filtersSets[set].saturate;
	saturateCss.innerText = filtersSets[set].saturate;

	hueRange.value = filtersSets[set].hue;
	hueNumber.value = filtersSets[set].hue;
	hueCss.innerText = filtersSets[set].hue;
	
	contrastRange.value = filtersSets[set].contrast;
	contrastNumber.value = filtersSets[set].contrast;
	contrastCss.innerText = filtersSets[set].contrast;

	brightnessRange.value = filtersSets[set].brightness;
	brightnessNumber.value = filtersSets[set].brightness;
	brightnessCss.innerText = filtersSets[set].brightness;

	grayscaleRange.value = filtersSets[set].grayscale;
	grayscaleNumber.value = filtersSets[set].grayscale;
	grayscaleCss.innerText = filtersSets[set].grayscale;
	
	const filterStr = `
		blur(${filtersSets[set].blur}px) 
		invert(${filtersSets[set].invert}%) 
		sepia(${filtersSets[set].sepia}%) 
		saturate(${filtersSets[set].saturate}%) 
		hue-rotate(${filtersSets[set].hue}deg) 
		contrast(${filtersSets[set].contrast}%) 
		brightness(${filtersSets[set].brightness}%) 
		grayscale(${filtersSets[set].grayscale}%) `
	context.filter = filterStr;
	//console.log(context.filter)
	context.drawImage(img, 0, 0, width, height);
}

function changeFilter(name, value){
	// console.log(name, value)
				
	switch (name){
		case 'blur':{
			// console.log(name, value)
			filtersSets.current.blur = value;
			break;
		}
		case 'invert':{
			filtersSets.current.invert = value;
			break;
		}
		case 'sepia':{
			filtersSets.current.sepia = value;
			break;
		}
		case 'saturate':{
			filtersSets.current.saturate = value;
			break;
		}
		case 'hue':{
			filtersSets.current.hue = value;
			break;
		}
		case 'contrast':{
			filtersSets.current.contrast = value;
			break;
		}
		case 'brightness':{
			filtersSets.current.brightness = value;
			break;
		}
		case 'grayscale':{
			filtersSets.current.grayscale = value;
			break;
		}
	}
	
	applyFilters('current')
}



function setFilters(){
	blurNumber.min = 0;
	blurRange.min = 0;
	blurNumber.max = BLUR_MAX;
	blurRange.max = BLUR_MAX;
	blurNumber.addEventListener('input', ()=>changeFilter('blur', blurNumber.value));
	blurRange.addEventListener('input',()=> changeFilter('blur', blurRange.value));
	
	invertNumber.min = 0;
	invertRange.min = 0;
	invertNumber.max = INVERT_MAX;
	invertRange.max = INVERT_MAX;
	invertNumber.addEventListener('input', ()=>changeFilter('invert', invertNumber.value));
	invertRange.addEventListener('input',()=> changeFilter('invert', invertRange.value));
	
	sepiaNumber.min = 0;
	sepiaRange.min = 0;
	sepiaNumber.max = SEPIA_MAX;
	sepiaRange.max = SEPIA_MAX;
	sepiaNumber.addEventListener('input', ()=>changeFilter('sepia', sepiaNumber.value));
	sepiaRange.addEventListener('input',()=> changeFilter('sepia', sepiaRange.value));
	

	saturateNumber.min = 0;
	saturateRange.min = 0;
	saturateNumber.max = SATURATE_MAX;
	saturateRange.max = SATURATE_MAX;
	saturateNumber.addEventListener('input', ()=>changeFilter('saturate', saturateNumber.value));
	saturateRange.addEventListener('input',()=> changeFilter('saturate', saturateRange.value));

	hueNumber.min = 0;
	hueRange.min = 0;
	hueNumber.max = HUE_MAX;
	hueRange.max = HUE_MAX;
	hueNumber.addEventListener('input', ()=>changeFilter('hue', hueNumber.value));
	hueRange.addEventListener('input',()=> changeFilter('hue', hueRange.value));

	contrastNumber.min = 0;
	contrastRange.min = 0;
	contrastNumber.max = CONTRAST_MAX;
	contrastRange.max = CONTRAST_MAX;
	contrastNumber.addEventListener('input', ()=>changeFilter('contrast', contrastNumber.value));
	contrastRange.addEventListener('input',()=> changeFilter('contrast', contrastRange.value));

	brightnessNumber.min = 0;
	brightnessRange.min = 0;
	brightnessNumber.max = BRIGHTNESS_MAX;
	brightnessRange.max = BRIGHTNESS_MAX;
	brightnessNumber.addEventListener('input', ()=>changeFilter('brightness', brightnessNumber.value));
	brightnessRange.addEventListener('input',()=> changeFilter('brightness', brightnessRange.value));


	grayscaleNumber.min = 0;
	grayscaleRange.min = 0;
	grayscaleNumber.max = GRAYSCALE_MAX;
	grayscaleRange.max = GRAYSCALE_MAX;
	grayscaleNumber.addEventListener('input', ()=>changeFilter('grayscale', grayscaleNumber.value));
	grayscaleRange.addEventListener('input',()=> changeFilter('grayscale', grayscaleRange.value));
	applyFilters()
}

setFilters()