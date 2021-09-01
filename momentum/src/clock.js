const clock = document.createElement('span');
clock.className = "clock";
const greeting = document.createElement('span');
greeting.className = "greeting";
const dateSpan = document.createElement("span");
dateSpan.className = 'date'

const clockWrp = document.createElement("div");
clockWrp.className = 'clock-wrp';

clockWrp.append(clock,dateSpan)
app.append(greeting, clockWrp);

function setGreeting(date) {
    //с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
    // с 12:00 до 17:59 - Good day / Добрый день / Добры дзень
    // с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
    // с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
    const greetingsRU = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']

    if (date.getHours() < 6) {
      timeOfDay = 'night';
      return greetingsRU[0] + userName + '!';
    }
    if (date.getHours() < 12) {
      timeOfDay = 'morning';
      return greetingsRU[1] +userName + '!';
    }
    if (date.getHours() < 18) {
      timeOfDay = 'day';
      return greetingsRU[2] + userName + '!';
    }
  
    timeOfDay = 'evening';
    return greetingsRU[3] + userName + '!';
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
    return `${daysRu[date.getDay()]}, ${date.getDate()} ${monthsRu[date.getMonth()]} ${date.getUTCFullYear()}`;
}
function setDate(date){
    dateSpan.innerHTML = humanReadDate(date)
}
