const form = document.querySelector('#start-form');
const nameInput = document.querySelector('#name');
const cityInput = document.querySelector('#city');
const settingsBtn = document.querySelector('#settings-btn');
const cancelBtn = document.querySelector('#start-form-reset');
const submitBtn = document.querySelector('#start-form-submit');

const cities = [...DEFAULT_CITIES]

let name, city;
resetStartForm();

if (city && typeof getWeather == 'function') {
    cities.push(city.toLowerCase());
    getWeather(city)
} //if weather module disabled city will be ignored
function submitStartForm(e){
    e.preventDefault();
    if (nameInput.value) {
        localStorage.setItem('momentName', nameInput.value);
        userName = nameInput.value;
    }
    if (cityInput.value && cities.indexOf(cityInput.value.toLowerCase()) < 0 ) {
        if (typeof getWeather == 'function'){
            let weather = getWeather(cityInput.value)
            weather.then((weather)=>{
                
                if (weather === null) {
                    form.classList.add('error-city');
                    setTimeout(()=>{
                        form.classList.remove('error-city');
                    }, 5000)
                } else {
                    localStorage.setItem('momentCity', cityInput.value);
                    cities.push(city.toLowerCase());
                    form.classList.add("form-none")
                }
            })
            
        } else {
            form.classList.add("form-none")//module not found. exit
        }
        localStorage.setItem('momentName', nameInput.value);
        
    }
}

function resetStartForm(e){
    if (e) e.preventDefault();
    name = localStorage.getItem('momentName');
    city = localStorage.getItem('momentCity');
    nameInput.value = name || '';
    cityInput.value = city || '';
    form.classList.add("form-none")//module not found. exit
}

settingsBtn.addEventListener('click', () => form.classList.remove('form-none'));
cancelBtn.addEventListener('click', resetStartForm);
submitBtn.addEventListener('click', submitStartForm)

if (!name || ! city) form.classList.remove('form-none');