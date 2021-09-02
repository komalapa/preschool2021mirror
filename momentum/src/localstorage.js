const form = document.querySelector('#start-form');
const nameInput = document.querySelector('#name');
const cityInput = document.querySelector('#city');
const settingsBtn = document.querySelector('#settings-btn');
const cancelBtn = document.querySelector('#start-form-reset');
const submitBtn = document.querySelector('#start-form-submit');
const langSwitch = document.querySelector('#lang-switch');

const nameLbl = document.querySelector('#name-lbl');
const cityLbl = document.querySelector('#city-lbl');

if (localStorage.getItem('momentLang')) lang = localStorage.getItem('momentLang');
langSwitch.checked = (lang === 'en')
// if (typeof weatherListGen == 'function') weatherListGen();

const cities = (lang == 'ru') ? [...DEFAULT_CITIES_RU] : [...DEFAULT_CITIES_EN]
let name, city;
resetStartForm();
changeLang();
// if (city && typeof getWeather == 'function') {
//     cities.push(city.toLowerCase());
//     getWeather(city)
// } //if weather module disabled city will be ignored
function submitStartForm(e){
    e.preventDefault();
    if (nameInput.value) {
        localStorage.setItem('momentName', nameInput.value);
        userName = nameInput.value;
    } else {
        localStorage.setItem('momentName', '');
        userName = '';
    }

    
    if (cityInput.value) {
        if (cities.indexOf(cityInput.value.toLowerCase()) < 0 ){
            if (typeof getWeather == 'function'){
                let weather = getWeather(cityInput.value)
                weather.then((weather)=>{
                    
                    if (weather === null) {
                        form.classList.add('error-city');
                        setTimeout(()=>{
                            form.classList.remove('error-city');
                        }, 5000)
                    } else {
                        // console.log('add city')
                        localStorage.setItem('momentCity', cityInput.value);
                        cities.push(cityInput.value.toLowerCase());
                        form.classList.add("form-none")
                    }
                })
                
            } else {
                form.classList.add("form-none")//module not found. exit
            }
        } else {
            form.classList.add("form-none")//city exists
        }
        localStorage.setItem('momentName', nameInput.value);
    }
}

function resetStartForm(e){
    if (e) e.preventDefault();
    name = localStorage.getItem('momentName');
    city = localStorage.getItem('momentCity');
    if (city) cities.push(city.toLowerCase());
    nameInput.value = name || '';
    cityInput.value = city || '';
    form.classList.add("form-none")//module not found. exit
}

function changeLang(){
    lang = langSwitch.checked ? 'en' : 'ru';
    localStorage.setItem('momentLang', lang);
    if (typeof weatherListGen == 'function') weatherListGen();
    if (city && (typeof getWeather == 'function')) getWeather(city, lang) 
    if (typeof newQuote == 'function') newQuote();
    if (lang === 'ru'){
        cityLbl.innerText = 'Город';
        nameLbl.innerText = 'Имя';
        cancelBtn.innerText = 'Отмена';
    } else {
        cityLbl.innerText = 'City';
        nameLbl.innerText = 'Name';
        cancelBtn.innerText = 'Cancel';
    }
}

settingsBtn.addEventListener('click', () => form.classList.remove('form-none'));
cancelBtn.addEventListener('click', resetStartForm);
submitBtn.addEventListener('click', submitStartForm)
langSwitch.addEventListener('input',changeLang)

if (!name || ! city) form.classList.remove('form-none');

