//this script will get date every second.  
console.log(`
1 аналоговые часы работают по принципу из видео: постоянно запрашивая текущее время (index_2.js) 
2 Другой вариант счета времени без запроса даты. (index.js). Для поддержания точности раз в час дату обновляет. Удобен для проверки верстки т.к. если отключить корректировку, то можно "ускорить время"
переключение скрипта только в коде html
3 Из обячательного: цифровое точное время, день недели, дата
4 Дополнительно: смена фона день/ночь, приветствие`)


let hands =[];

function initLocalClocks(date = new Date) {
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    
    hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2),
        count: hours,
      },
      {
        hand: 'minutes',
        angle: (minutes * 6),
        count: minutes,
      },
      {
        hand: 'seconds',
        angle: (seconds * 6),
        count: seconds,
      }
    ];
    setGreeting();
    setBackground();
    setDigitalClock();
    setDateText();
}
  

  function moveHands() {
    const hourHands = document.querySelectorAll(".hours-container");
    const minuteHands = document.querySelectorAll(".minutes-container");
    const secondHands = document.querySelectorAll(".seconds-container");
    setInterval(function() {
      initLocalClocks();  
      hourHands.forEach(hand => {
        if (hands[0].angle===0){ //prevent back animation on zero angle
          hand.classList.add("notransition")
        } else {
          hand.classList.remove("notransition")
        }
        hand.style.webkitTransform = `rotateZ(${hands[0].angle}deg)`;
        hand.style.transform = `rotateZ(${hands[0].angle}deg)`;
      })
      minuteHands.forEach(hand => {
        if (hands[1].angle===0){ //prevent back animation on zero angle
          hand.classList.add("notransition")
        } else {
          hand.classList.remove("notransition")
        }
        hand.style.webkitTransform = `rotateZ(${hands[1].angle}deg)`;
        hand.style.transform = `rotateZ(${hands[1].angle}deg)`;
      })
      secondHands.forEach(hand => {
        if (hands[2].angle===0){ //prevent back animation on zero angle
          hand.classList.add("notransition")
        } else {
          hand.classList.remove("notransition")
        }
          hand.style.webkitTransform = `rotateZ(${hands[2].angle}deg)`;
          hand.style.transform = `rotateZ(${hands[2].angle}deg)`;
        
        
      })
    }, 1000);///5000);//DEBUG
  }

  function setDateText(date = new Date){
    const dateEl = document.querySelector("#date")
    dateEl.time = date;
    dateEl.innerHTML = humanReadDate(date)
  }
  function setDigitalClock(){
    const timeEl = document.querySelector("#time");
    timeEl.innerHTML = `${('0'+hands[0].count).slice(-2)}:${('0'+hands[1].count).slice(-2)}:${('0'+hands[2].count).slice(-2)}`
  }
function setGreeting(){
//с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
// с 12:00 до 17:59 - Good day / Добрый день / Добры дзень
// с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
// с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
    const greetingsRU = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
    const greeting = document.querySelector("#greeting");
    if (hands[0].count<6) {
        greeting.innerHTML= greetingsRU[0];    
        return greetingsRU[0];
    }
    if (hands[0].count<12) {
        greeting.innerHTML= greetingsRU[1];    
        return greetingsRU[1];
    }
    if (hands[0].count<18) {
        greeting.innerHTML= greetingsRU[2];    
        return greetingsRU[2];
    }
    
        greeting.innerHTML= greetingsRU[3];    
        return greetingsRU[3];
}

function setBackground(){
    const mainWrp = document.querySelector("#main-screen");
    if (hands[0].count>19 || hands[0].count<7){
        mainWrp.classList.add("night");
        mainWrp.classList.remove("day");
    } else {
        mainWrp.classList.add("day");
        mainWrp.classList.remove("night");
    }
}
function humanReadDate(date = new Date){
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  const days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
  return `${days[date.getDay()]}, ${date.getDay()+1} ${months[date.getMonth()]} ${date.getUTCFullYear()}` 
}
function start(){
    initLocalClocks(new Date);
    moveHands();

    const hourHands = document.querySelectorAll(".hours-container")
    hourHands.forEach(hand => {//another animation for this variant
      hand.style.animation = `none`;
      hand.style.transition = `transform 0.3s cubic-bezier(.4, 2.08, .55, .44);`;
    })
}
start()