//main canvas variables
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const img = new Image();

img.src = "img/kitty.jpeg";
drawImgInCanvases(img);
let width, height;

//================create presets elements================
const defaultPreset = document.createElement('canvas');
defaultPreset.id = "canvas-default";
defaultPreset.classList = "presets-item";
defaultPreset.title = "default";
const defaultPresetContext = defaultPreset.getContext('2d');
defaultPreset.onclick = () => {
	copyPresetToCurrent('default')
	applyFilters('default');
}

const saturatePreset = document.createElement('canvas');
saturatePreset.id = "canvas-saturate";
saturatePreset.classList = "presets-item";
saturatePreset.title = "Saturate";
const saturatePresetContext = saturatePreset.getContext('2d');
saturatePreset.onclick = () => {
	copyPresetToCurrent('saturate')
	applyFilters('saturate');
}

const xrayPreset = document.createElement('canvas');
xrayPreset.id = "canvas-xray";
xrayPreset.classList = "presets-item";
xrayPreset.title = "X-Rays";
const xrayPresetContext = xrayPreset.getContext('2d');
xrayPreset.onclick = () => {
	copyPresetToCurrent('xRays')
	applyFilters('xRays');
}

const toxicPreset = document.createElement('canvas');
toxicPreset.id = "canvas-xray";
toxicPreset.classList = "presets-item";
toxicPreset.title = "Toxic Sky";
const toxicPresetContext = toxicPreset.getContext('2d');
toxicPreset.onclick = () => {
	copyPresetToCurrent('toxicSky')
	applyFilters('toxicSky');
}

const presetsWrp = document.querySelector('#presets');
presetsWrp.append(defaultPreset, saturatePreset, xrayPreset, toxicPreset)
//================end create presets elements================

//================controls================
//filters
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

//save btn
const downloader = document.querySelector('#download')
downloader.addEventListener('click', function (e) {
	const link = document.querySelector("#download");
	link.download = "image.png";
	link.href = canvas.toDataURL();
	link.delete;
});
//copy css btn
const copyBtn = document.querySelector("#copy-btn");
copyBtn.addEventListener('click', copyCSS);

function copyCSS() {
	navigator.clipboard.writeText(cssText.innerText)
		.then(() => {
			cssText.style.transform = "rotate(360deg) scale(0)";
			cssText.style.transition = "transform .5s";
			setTimeout(() => {
				cssText.style.transition = "initial";
				cssText.style.transform = "initial";

			}, 500)
		})
		.catch(err => {
			console.log('Something went wrong with clipboard', err);
		});
}
//================end controlls================

//max filters consts
// const BLUR_MAX = 20;
// const INVERT_MAX = 100;
// const SEPIA_MAX = 100;
// const SATURATE_MAX = 600;
// const HUE_MAX = 360;
// const CONTRAST_MAX = 300;
// const BRIGHTNESS_MAX = 300;
// const GRAYSCALE_MAX = 100;
const MAXS = {
	blur: 20,
	invert: 100,
	sepia: 100,
	saturate: 100,
	hue: 360,
	contrast: 300,
	brightness: 300,
	grayscale: 100,
}

function drawImgInCanvases(img) {
	img.onload = () => {
		context.drawImage(img, 0, 0);
		//max sizes for canvases
		const MAX_WIDTH = 800;
		const MAX_HEIGHT = 500; 
		const MAX_WIDTH_PRESET = 100; 
		const MAX_HEIGHT_PRESET = 100;

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

		//================drawing presets================
		defaultPreset.width = widthPreset;
		defaultPreset.height = heightPreset;
		applyFilters('default', defaultPresetContext);
		defaultPresetContext.drawImage(img, 0, 0, widthPreset, heightPreset);

		saturatePreset.width = widthPreset;
		saturatePreset.height = heightPreset;
		applyFilters('saturate', saturatePresetContext);
		saturatePresetContext.drawImage(img, 0, 0, widthPreset, heightPreset);


		xrayPreset.width = widthPreset;
		xrayPreset.height = heightPreset;
		applyFilters('xRays', xrayPresetContext);
		xrayPresetContext.drawImage(img, 0, 0, widthPreset, heightPreset);


		toxicPreset.width = widthPreset;
		toxicPreset.height = heightPreset;
		applyFilters('toxicSky', toxicPresetContext);
		toxicPresetContext.drawImage(img, 0, 0, widthPreset, heightPreset);
		//================end drawing presets================

		//!!clear filters for every new image
		copyPresetToCurrent('default')
		applyFilters('default');
		
		getAverageRGB(img);
	}
}

function loadCanvasWithInputFile() {

	const fileInput = document.getElementById('new-file');

	fileInput.onchange = function (evt) {

		const files = evt.target.files;
		const file = files[0];
		if (file.type.match('image*')) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function (evt) {
				if (evt.target.readyState == FileReader.DONE) {
					img.src = evt.target.result;
					drawImgInCanvases(img)
				}
			}
		} else {
			alert("not an image");
		}
	};
}

//storage for presets
const filtersSets = {
	current: {
		blur: 0,
		invert: 0,
		sepia: 0,
		saturate: 100,
		hue: 0,
		contrast: 100,
		brightness: 100,
		grayscale: 0
	},
	default: {
		blur: 0,
		invert: 0,
		sepia: 0,
		saturate: 100,
		hue: 0,
		contrast: 100,
		brightness: 100,
		grayscale: 0
	},
	saturate: {
		blur: 0,
		invert: 0,
		sepia: 0,
		saturate: 250,
		hue: 0,
		contrast: 100,
		brightness: 100,
		grayscale: 0
	},
	xRays: {
		blur: 0,
		invert: 100,
		sepia: 100,
		saturate: 100,
		hue: 160,
		contrast: 120,
		brightness: 105,
		grayscale: 0
	},
	toxicSky: {
		blur: 0,
		invert: 100,
		sepia: 0,
		saturate: 100,
		hue: 90,
		contrast: 100,
		brightness: 100,
		grayscale: 0
	}
}

function copyPresetToCurrent(preset = "default") {
	for (let key in filtersSets.current) {
		filtersSets.current[key] = filtersSets[preset][key]
	}
}

function applyFilters(set = "default", curContext = context) {
	blurRange.value = filtersSets[set].blur;
	blurNumber.value = filtersSets[set].blur;
	
	invertRange.value = filtersSets[set].invert;
	invertNumber.value = filtersSets[set].invert;
	
	sepiaRange.value = filtersSets[set].sepia;
	sepiaNumber.value = filtersSets[set].sepia;
	
	saturateRange.value = filtersSets[set].saturate;
	saturateNumber.value = filtersSets[set].saturate;
	
	hueRange.value = filtersSets[set].hue;
	hueNumber.value = filtersSets[set].hue;
	
	contrastRange.value = filtersSets[set].contrast;
	contrastNumber.value = filtersSets[set].contrast;
	
	brightnessRange.value = filtersSets[set].brightness;
	brightnessNumber.value = filtersSets[set].brightness;
	
	grayscaleRange.value = filtersSets[set].grayscale;
	grayscaleNumber.value = filtersSets[set].grayscale;
	
	const filterStr = `blur(${filtersSets[set].blur}px) invert(${filtersSets[set].invert}%) sepia(${filtersSets[set].sepia}%) saturate(${filtersSets[set].saturate}%) hue-rotate(${filtersSets[set].hue}deg) contrast(${filtersSets[set].contrast}%) brightness(${filtersSets[set].brightness}%) grayscale(${filtersSets[set].grayscale}%) `
	curContext.filter = filterStr;
	cssText.innerText = 'filter: ' + filterStr;
	curContext.drawImage(img, 0, 0, width, height);
}

function changeFilter(name, value) {
	filtersSets.current[name] = value < MAXS[name] ?  value : MAXS[name];
	applyFilters('current', context)
}



function setFilters() {

	blurNumber.min = 0;
	blurRange.min = 0;
	blurNumber.max = MAXS['blur']//BLUR_MAX;
	blurRange.max = MAXS['blur'];
	blurNumber.addEventListener('input', () => changeFilter('blur', +blurNumber.value || 0));
	blurRange.addEventListener('input', () => changeFilter('blur', +blurRange.value || 0));

	invertNumber.min = 0;
	invertRange.min = 0;
	invertNumber.max = MAXS['invert'];
	invertRange.max = MAXS['invert'];
	invertNumber.addEventListener('input', () => changeFilter('invert', +invertNumber.value || 0));
	invertRange.addEventListener('input', () => changeFilter('invert', +invertRange.value || 0));

	sepiaNumber.min = 0;
	sepiaRange.min = 0;
	sepiaNumber.max = MAXS['sepia'];
	sepiaRange.max = MAXS['sepia'];
	sepiaNumber.addEventListener('input', () => changeFilter('sepia', +sepiaNumber.value || 0));
	sepiaRange.addEventListener('input', () => changeFilter('sepia', +sepiaRange.value || 0));


	saturateNumber.min = 0;
	saturateRange.min = 0;
	saturateNumber.max = MAXS['saturate'];
	saturateRange.max = MAXS['saturate'];
	saturateNumber.addEventListener('input', () => changeFilter('saturate', +saturateNumber.value || 0));
	saturateRange.addEventListener('input', () => changeFilter('saturate', +saturateRange.value || 0));

	hueNumber.min = 0;
	hueRange.min = 0;
	hueNumber.max = MAXS['hue'];
	hueRange.max = MAXS['hue'];
	hueNumber.addEventListener('input', () => changeFilter('hue', +hueNumber.value || 0));
	hueRange.addEventListener('input', () => changeFilter('hue', +hueRange.value || 0));

	contrastNumber.min = 0;
	contrastRange.min = 0;
	contrastNumber.max = MAXS['contrast'];
	contrastRange.max = MAXS['contrast'];
	contrastNumber.addEventListener('input', () => changeFilter('contrast', +contrastNumber.value || 0));
	contrastRange.addEventListener('input', () => changeFilter('contrast', +contrastRange.value || 0));

	brightnessNumber.min = 0;
	brightnessRange.min = 0;
	brightnessNumber.max = MAXS['brightness'];
	brightnessRange.max = MAXS['brightness'];
	brightnessNumber.addEventListener('input', () => changeFilter('brightness', +brightnessNumber.value || 0));
	brightnessRange.addEventListener('input', () => changeFilter('brightness', +brightnessRange.value || 0));


	grayscaleNumber.min = 0;
	grayscaleRange.min = 0;
	grayscaleNumber.max = MAXS['grayscale'];
	grayscaleRange.max = MAXS['grayscale'];
	grayscaleNumber.addEventListener('input', () => changeFilter('grayscale', +grayscaleNumber.value || 0));
	grayscaleRange.addEventListener('input', () => changeFilter('grayscale', +grayscaleRange.value || 0));
	applyFilters()
}


// Set average color as a background and calculate text color.
//algorithm from http://jsfiddle.net/xLF38/818/
function getAverageRGB() {

	let blockSize = 5, // only visit every 5 pixels because every pixel is a set of items
		defaultRGB = {
			r: 19,
			g: 19,
			b: 19
		},
		data, width, height,
		i = -4,
		length,
		rgb = {
			r: 0,
			g: 0,
			b: 0
		},
		count = 0;

	if (!context) {
		console.log('no context')
		return defaultRGB;
	}

	height = canvas.height
	width = canvas.width

	try {
		data = context.getImageData(0, 0, width, height);
		length = data.data.length;
		while ((i += blockSize * 4) < length) {
			++count;
			rgb.r += data.data[i];
			rgb.g += data.data[i + 1];
			rgb.b += data.data[i + 2];
		}

		// ~~ used to floor values
		rgb.r = ~~(rgb.r / count);
		rgb.g = ~~(rgb.g / count);
		rgb.b = ~~(rgb.b / count);
		if (rgb.r > 229 && rgb.g > 229 && rgb.b > 229) { //white is #e5e5e5
			rgb.r = 229;
			rgb.g = 229;
			rgb.b = 229;
		}
		if (rgb.r < 19 && rgb.g < 19 && rgb.b < 19) { //black is #d3d3d3
			rgb.r = 19;
			rgb.g = 19;
			rgb.b = 19;
		}

	} catch (e) {
		/* security error, img on diff domain */
		console.log("can't get canvas data")
		rgb = defaultRGB;
	}


	//set css variables
	let root = document.documentElement;
	root.style.setProperty('--background-color', `rgb(${rgb.r} ${rgb.g} ${rgb.b})`)
	//values for calculating text color https://websolutionstuff.com/post/change-text-color-based-on-background-color-using-javascript
	let backgroundColor = Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000);
	let textColor = (backgroundColor > 200) ? '#131313' : '#f3f3f3';
	let hoverColor = (backgroundColor > 200) ? '#555555' : '#d3d3d3';
	root.style.setProperty('--text-color', textColor);
	root.style.setProperty('--hover-color', hoverColor);
}


//FullScreen button
const fullScreenBtn = document.querySelector("#full-screen-btn");

function toggleFullScreen() {
	//console.log(document.fullscreenElement)
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
		fullScreenBtn.classList.remove('full-screen-off');
		fullScreenBtn.classList.add('full-screen-on')
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			fullScreenBtn.classList.remove('full-screen-on');
			fullScreenBtn.classList.add('full-screen-off')
		}
	}
}
fullScreenBtn.onclick = function () {
	toggleFullScreen()
}



loadCanvasWithInputFile()
setFilters()