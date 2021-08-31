const weatherList = document.createElement('ul');
weatherList.classList.add('weather-list');
app.append(weatherList)

async function getWeather(city='Минск', lang = 'ru') {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=ad379d091ac804c128d00dc78bd9de17&units=metric`;
    const res = await fetch(url);
    // console.log(res.status)
    if (res.status !== 200) return null;
    const data = await res.json(); 
    //console.log(data, data.weather[0].id, data.weather[0].description, data.main.temp);
    const weatherItem = document.createElement('li');
    weatherItem.classList.add('weather-list-item');
    
    const name = document.createElement('h3');
    name.classList.add('weather-list-item-header');
    name.innerText = city;

    const temp = document.createElement('span');
    temp.classList.add('weather-list-item-temp');
    temp.innerHTML = data.main.temp.toFixed(0) + '&deg;C';
    temp.title = `ощущается как ${data.main.feels_like.toFixed(0)}°C`
    
    // const tempFeels = document.createElement('span');
    // tempFeels.classList.add('weather-list-item-temp-feels');
    // tempFeels.innerHTML = `(${data.main.feels_like.toFixed(0)}&deg;C)`;
    // tempFeels.title = "температура комфортности"

    const icon = document.createElement('span');
    icon.classList.add('weather-list-item-icon','weather-icon' , 'owf' , 'owf-'+data.weather[0].id);
    icon.title = data.weather[0].description;

    // const description = document.createElement('span');
    // description.classList.add('weather-list-item-description');
    // description.innerText = data.weather[0].description;

    weatherItem.append(name, icon, temp,)
    weatherList.append(weatherItem)

  }


  DEFAULT_CITIES.forEach(city => {
      getWeather(city)
    })
