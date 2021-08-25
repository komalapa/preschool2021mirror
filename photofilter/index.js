//canvas variables
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d"); 
const img = new Image();

//const defaultImg = new Image();
//defaultImg.src = "img/kitty.jpeg";
//img = defaultImg
img.src = "img/kitty.jpeg";
drawImgInCanvases(img);
let width, height;

const defaultPreset = document.createElement('canvas');
defaultPreset.id = "canvas-default";
defaultPreset.classList = "presets-item";
const defaultPresetContext = defaultPreset.getContext('2d');
defaultPreset.onclick = () => {
	copyPresetToCurrent('default')
	applyFilters('default');
}
const xrayPreset = document.createElement('canvas');
xrayPreset.id = "canvas-xray";
xrayPreset.classList = "presets-item";
const xrayPresetContext = xrayPreset.getContext('2d');
xrayPreset.onclick = () => {
	copyPresetToCurrent('xRays')
	applyFilters('xRays');
}

const toxicPreset = document.createElement('canvas');
toxicPreset.id = "canvas-xray";
toxicPreset.classList = "presets-item";
const toxicPresetContext = toxicPreset.getContext('2d');
toxicPreset.onclick = () => {
	copyPresetToCurrent('toxicSky')
	applyFilters('toxicSky');
}

const presetsWrp = document.querySelector('#presets');
presetsWrp.append(defaultPreset,xrayPreset,toxicPreset)
//controls
const cssText = document.querySelector('.css-value');

const blurRange = document.querySelector('#filter-blur');
const blurNumber = document.querySelector('#filter-blur-number');

const invertRange = document.querySelector('#filter-invert');
const invertNumber = document.querySelector('#filter-invert-number');

const sepiaRange = document.querySelector('#filter-sepia');
const sepiaNumber = document.querySelector('#filter-sepia-number');

const saturateRange = document.querySelector('#filter-saturate');
const saturateNumber = document.querySelector('#filter-saturate-number');

const hueRange = document.querySelector('#filter-hue');
const hueNumber = document.querySelector('#filter-hue-number');

const contrastRange = document.querySelector('#filter-contrast');
const contrastNumber = document.querySelector('#filter-contrast-number');

const brightnessRange = document.querySelector('#filter-brightness');
const brightnessNumber = document.querySelector('#filter-brightness-number');

const grayscaleRange = document.querySelector('#filter-grayscale');
const grayscaleNumber = document.querySelector('#filter-grayscale-number');

//max consts
const BLUR_MAX = 20;
const INVERT_MAX = 100;
const SEPIA_MAX = 100;
const SATURATE_MAX = 600;
const HUE_MAX = 360;
const CONTRAST_MAX = 300;
const BRIGHTNESS_MAX = 300;
const GRAYSCALE_MAX = 100;

function drawImgInCanvases(img){
	img.onload = () => {
		context.drawImage(img, 0, 0);
		const MAX_WIDTH = 800;//canvas.clientWidth;
		const MAX_HEIGHT = 600;//canvas.clientHeight;
		const MAX_WIDTH_PRESET = 100;//canvas.clientWidth;
		const MAX_HEIGHT_PRESET = 100;//canvas.clientHeight;
		width = img.width;
		height = img.height;
		widthPreset = img.width;
		heightPreset = img.height;
		
		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width;
				width = MAX_WIDTH;
			}
			if (widthPreset > MAX_WIDTH_PRESET) {
				heightPreset *= MAX_WIDTH_PRESET / widthPreset;
				widthPreset = MAX_WIDTH_PRESET;
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height;
				height = MAX_HEIGHT;
			}
			if (heightPreset > MAX_HEIGHT_PRESET) {
				widthPreset *= MAX_HEIGHT_PRESET / heightPreset;
				heightPreset = MAX_HEIGHT_PRESET;
			}
		}
		canvas.width = width;
		canvas.height = height;
		context.drawImage(img, 0, 0, width, height);

		defaultPreset.width = widthPreset;
		defaultPreset.height = heightPreset;
		applyFilters('default', defaultPresetContext);
		defaultPresetContext.drawImage(img, 0, 0, widthPreset, heightPreset);
		

		xrayPreset.width = widthPreset;
		xrayPreset.height = heightPreset;
		applyFilters('xRays', xrayPresetContext);
		xrayPresetContext.drawImage(img, 0, 0, widthPreset, heightPreset);
		

		toxicPreset.width = widthPreset;
		toxicPreset.height = heightPreset;
		applyFilters('toxicSky', toxicPresetContext);
		toxicPresetContext.drawImage(img, 0, 0, widthPreset, heightPreset);
		
		console.log(getAverageRGB(img))
	}
}

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
                    drawImgInCanvases(img)
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
	},
	xRays:{
		blur: 0,
		invert: 100,
		sepia: 100,
		saturate: 100,
		hue: 160,
		contrast: 120,
		brightness:105,
		grayscale:0
	},
	toxicSky:{
		blur: 0,
		invert: 100,
		sepia: 0,
		saturate: 100,
		hue: 90,
		contrast: 100,
		brightness:100,
		grayscale:0
	}
}

function copyPresetToCurrent (preset="default"){
	for (let key in filtersSets.current){
		filtersSets.current[key] =filtersSets[preset][key]
	}
}

function applyFilters(set = "default", curContext = context){
	//console.log(filtersSets[set])
	blurRange.value = filtersSets[set].blur;
	blurNumber.value = filtersSets[set].blur;
	blurNumber.dataset.value = filtersSets[set].blur;
	// blurCss.innerText = filtersSets[set].blur;

	invertRange.value = filtersSets[set].invert;
	invertNumber.value = filtersSets[set].invert;
	// invertCss.innerText = filtersSets[set].invert;

	sepiaRange.value = filtersSets[set].sepia;
	sepiaNumber.value = filtersSets[set].sepia;
	// sepiaCss.innerText = filtersSets[set].sepia;

	saturateRange.value = filtersSets[set].saturate;
	saturateNumber.value = filtersSets[set].saturate;
	// saturateCss.innerText = filtersSets[set].saturate;

	hueRange.value = filtersSets[set].hue;
	hueNumber.value = filtersSets[set].hue;
	// hueCss.innerText = filtersSets[set].hue;
	
	contrastRange.value = filtersSets[set].contrast;
	contrastNumber.value = filtersSets[set].contrast;
	// contrastCss.innerText = filtersSets[set].contrast;

	brightnessRange.value = filtersSets[set].brightness;
	brightnessNumber.value = filtersSets[set].brightness;
	// brightnessCss.innerText = filtersSets[set].brightness;

	grayscaleRange.value = filtersSets[set].grayscale;
	grayscaleNumber.value = filtersSets[set].grayscale;
	// grayscaleCss.innerText = filtersSets[set].grayscale;
	
	const filterStr = `blur(${filtersSets[set].blur}px) invert(${filtersSets[set].invert}%) sepia(${filtersSets[set].sepia}%) saturate(${filtersSets[set].saturate}%) hue-rotate(${filtersSets[set].hue}deg) contrast(${filtersSets[set].contrast}%) brightness(${filtersSets[set].brightness}%) grayscale(${filtersSets[set].grayscale}%) `
	curContext.filter = filterStr;
	cssText.innerText = 'filter: '+ filterStr;
	//console.log(context.filter)
	curContext.drawImage(img, 0, 0, width, height);
}

function changeFilter(name, value){
	
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
	
	applyFilters('current', context)
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

const downloader = document.querySelector('#download')
downloader.addEventListener('click', function (e) {
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
});
setFilters()

//downloadCanvasAsImage()
//algorithm from http://jsfiddle.net/xLF38/818/
function getAverageRGB() {

    let blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
		console.log('no context')
        return defaultRGB;
    }

    height = canvas.height
    width = canvas.width

    try {
        data = context.getImageData(0, 0, width, height);
		//console.log(data)
    } catch(e) {
        /* security error, img on diff domain */
		console.log("can't get canvas data")
        return defaultRGB;
    }

    length = data.data.length;
	console.log(data.data)
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
		//console.log(rgb)
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
	if (rgb.r > 229 && rgb.g >229 && rgb.b >229){ //white is #e5e5e5
		rgb.r = 229;
		rgb.g = 229;
		rgb.b = 229;
	}
	if (rgb.r < 19 && rgb.g < 19 && rgb.b < 19){ //black is #d3d3d3
		rgb.r = 19;
		rgb.g = 19;
		rgb.b = 19;
	}
    //return rgb;
	let root = document.documentElement;
	root.style.setProperty('--background-color', `rgb(${rgb.r} ${rgb.g} ${rgb.b})`)
	//values for calculating text color https://websolutionstuff.com/post/change-text-color-based-on-background-color-using-javascript
	let backgroundColor = Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000); 
	let textColor = (backgroundColor > 200) ? '#131313' : '#f3f3f3';
	root.style.setProperty('--text-color', textColor)
}

