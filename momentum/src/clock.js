const clock = document.createElement('span');
clock.className = "clock";
const greeting = document.createElement('span');
greeting.className = "greeting";
const daySpan = document.createElement("span");
daySpan.className = 'day'
const dateSpan = document.createElement("span");
dateSpan.className = 'date'

const clockWrp = document.createElement("div");
clockWrp.className = 'clock-wrp';

clockWrp.append(clock, daySpan, dateSpan)
app.append(greeting, clockWrp);

function setGreeting(date) {
    //с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
    // с 12:00 до 17:59 - Good day / Добрый день / Добры дзень
    // с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
    // с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
    //const greetings = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
    const userNameStr = userName.length > 0 ? `, ${userName}!` : '!'  
    //console.log(userName, userNameStr);
    if (lang === "ru") {
      greetings = [...greetingsRu]
    } 
    if (lang === "en") {
      greetings = [...greetingsEn]
    } 
    if (date.getHours() < 6) {
      timeOfDay = 'night';
      return greetings[0] + userNameStr;
    }
    if (date.getHours() < 12) {
      timeOfDay = 'morning';
      return greetings[1] +userNameStr;
    }
    if (date.getHours() < 18) {
      timeOfDay = 'day';
      return greetings[2] + userNameStr;
    }
  
    timeOfDay = 'evening';
    return greetings[3] + userNameStr;
  }

  setInterval(()=>{
      let date = new Date();
      greeting.innerHTML = setGreeting(date);
      setDate(date)
      clock.innerHTML = `${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}:${('0'+date.getSeconds()).slice(-2)}`;
  }, 1000)

  greeting.style.visibility = "initial";
  setTimeout(()=>greeting.style.visibility = null, 10000)

function humanReadDate(date = new Date) {
  if (lang === 'ru'){
    return `${date.getDate()} ${monthsRu[date.getMonth()]} ${date.getUTCFullYear()}`;
  } else {
    return `${monthsEn[date.getMonth()]} ${date.getDate()}, ${date.getUTCFullYear()}`;
  }
    
}
function setDate(date){
  if (lang === 'ru'){
    daySpan.innerText = `${daysRu[date.getDay()]}`;
  } else {
    daySpan.innerText = `${daysEn[date.getDay()]}`;
  }
  dateSpan.innerText = humanReadDate(date)
}
