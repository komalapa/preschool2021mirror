//this way do not need to get date every second, but only once. I will sync time every hour.
//we will rotate containers for animation, and hands angle in containers to define start time 
console.log('Вариант 1');
console.log(`
Разобраться в коде чужого проекта, понять его, воспроизвести исходное приложение. Правки и изменения допускаются и приветствуются, если они не ухудшают внешний вид и функционал исходного проекта - 10 баллов
(Воспроизвела вариант из примера и иной)
Дополнить исходный проект обязательным дополнительным функционалом, указанным в описании задания ( цифровое точное время, день недели, дата)- 10 баллов

1 Часы работают за счет интервалов. Т.е. не запрашивают время постоянно. Для поддержания точности обновляют время раз в час (index.js) 
2 Второй вариант: аналоговые часы работают по принципу из видео: постоянно запрашивая текущее время  (index.js)."
переключение скрипта только в коде html
3 Из обязательного: цифровое точное время, день недели, дата
4 Дополнительно: смена фона день/ночь, приветствие +10

Итого 30
`); 

let hands = [];

function validateHands() {
  if (hands.length != 3) return false;
  if (hands[2].count > 59) {
    hands[1].count++;
    hands[2].count = 0;
  }
  if (hands[1].count > 59) {
    hands[0].count++;
    start(); //refresh time DISABLE FOR DEBUG
    setGreeting();
    setBackground();
    hands[1].count = 0;
  }
  if (hands[0].count > 23) {
    hands[0].count = 0;
    setGreeting();
    setBackground();
  }
}

function initLocalClocks(date = new Date) {
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  hands = [{
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
  for (let i = 0; i < hands.length; i++) {
    let selector = '.' + hands[i].hand;
    let elements = document.querySelectorAll(selector);

    for (let j = 0; j < elements.length; j++) {
      elements[j].style.webkitTransform = 'rotateZ(' + hands[i].angle + 'deg)';
      elements[j].style.transform = 'rotateZ(' + hands[i].angle + 'deg)';
      if (hands[i].hand === 'minutes') { //to move minutes only than seconds hand on 12 we need this "error" number
        elements[j].parentNode.setAttribute('data-second-angle', hands[i + 1].angle - 6); //secs 0-59 instead 1-60 so we need to increase angle
      }
    }
  }
}

function setDigitalClock() {
  const timeEl = document.querySelector("#time");
  timeEl.innerHTML = `${('0'+hands[0].count).slice(-2)}:${('0'+hands[1].count).slice(-2)}:${('0'+hands[2].count).slice(-2)}`;
}

function moveMinuteHands(containers) {
  if (!containers) containers = document.querySelectorAll('.minutes-container');
  for (let i = 0; i < containers.length; i++) { //first step after delay
    validateHands();
    containers[i].style.webkitTransform = 'rotateZ(6deg)';
    containers[i].style.transform = 'rotateZ(6deg)';
  }
  // other steps
  setInterval(function () {
    for (let i = 0; i < containers.length; i++) {
      containers[i].angle += hands[1].count*6;
      containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
      containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
    }
  }, 60000); ///5000);//DEBUG
}

function moveSecondHands() {
  let containers = document.querySelectorAll('.seconds-container');
  setInterval(function () {
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 0;
      } else {
        hands[2].count++;
        containers[i].angle += 6;
      }
      containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
      containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
      validateHands();
      setDigitalClock();
    }
  }, 1000); ///5000);//DEBUG
}

function setUpMinuteHands() { //sync minute hand with seconds hand
  let containers = document.querySelectorAll('.minutes-container');
  let secondAngle = containers[0].getAttribute("data-second-angle");
  if (secondAngle > 0) {
    let delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
    setTimeout(function () {
      moveMinuteHands(containers);
    }, delay);
  }
}

function setGreeting() {
  //с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
  // с 12:00 до 17:59 - Good day / Добрый день / Добры дзень
  // с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
  // с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
  const greetingsRU = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
  const greeting = document.querySelector("#greeting");
  if (hands[0].count < 6) {
    greeting.innerHTML = greetingsRU[0];
    return greetingsRU[0];
  }
  if (hands[0].count < 12) {
    greeting.innerHTML = greetingsRU[1];
    return greetingsRU[1];
  }
  if (hands[0].count < 18) {
    greeting.innerHTML = greetingsRU[2];
    return greetingsRU[2];
  }

  greeting.innerHTML = greetingsRU[3];
  return greetingsRU[3];
}

function setBackground() {
  const mainWrp = document.querySelector("#main-screen");
  if (hands[0].count > 19 || hands[0].count < 7) {
    mainWrp.classList.add("night");
    mainWrp.classList.remove("day");
  } else {
    mainWrp.classList.add("day");
    mainWrp.classList.remove("night");
  }
}

function humanReadDate(date = new Date) {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  return `${days[date.getDay()]}, ${date.getDay()+1} ${months[date.getMonth()]} ${date.getUTCFullYear()}`;
}

function start() {
  const dateEl = document.querySelector("#date")
  let currentDate = new Date;
  dateEl.time = currentDate;
  dateEl.innerHTML = humanReadDate(currentDate)
  initLocalClocks(new Date);
  //hour hand moves by css animation, because it moves all time
  setUpMinuteHands();
  moveSecondHands();
}
start();