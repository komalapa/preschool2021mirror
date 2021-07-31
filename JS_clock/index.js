//this way do not need to get date every second, but only once.
//we will rotate containers for animation, and hands angle in containers to define start time 

let     hands =[];
function validateHands(){
    if (hands.length!=3) return false;
    if (hands[2].count>59){
        hands[1].count++;
        hands[2].count = 0;
    }
    if (hands[1].count>59){
        hands[0].count++;
        setGreeting();
        hands[1].count = 0;
    }
    if (hands[0].count>23){
        hands[0].count = 0;
        setGreeting();
    }
}

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
    for (let i = 0; i < hands.length; i++) {
      let selector='.' + hands[i].hand;
      let elements = document.querySelectorAll(selector);
            
      for (let j = 0; j < elements.length; j++) {
          elements[j].style.webkitTransform = 'rotateZ('+ hands[i].angle +'deg)';
          elements[j].style.transform = 'rotateZ('+ hands[i].angle +'deg)';
          if (hands[i].hand === 'minutes') {//to move minutes only than seconds hand on 12 we need this "error" number
            elements[j].parentNode.setAttribute('data-second-angle', hands[i + 1].angle);
          }
      }
    }
  }

  function moveMinuteHands(containers) {
    if (!containers) containers = document.querySelectorAll('.minutes-container');
    for (let i = 0; i < containers.length; i++) {//first step after delay
        console.log(hands)
        hands[1].count++;
        validateHands();
        containers[i].style.webkitTransform = 'rotateZ(6deg)';
        containers[i].style.transform = 'rotateZ(6deg)';
    }
    // other steps
    setInterval(function() {
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].angle === undefined) {
            hands[1].count+=2;
            containers[i].angle = 12;
        } else {
            hands[1].count++;
            containers[i].angle += 6;
        }
        validateHands();
        containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
      }
    }, 60000);///5000);
  }

  function moveSecondHands() {
    let containers = document.querySelectorAll('.seconds-container');
    setInterval(function() {
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].angle === undefined) {
          containers[i].angle = 6;
          hands[2].count=1;
        } else {
            hands[2].count++;
            containers[i].angle += 6;
        }
        containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
        containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
        validateHands();
      }
    }, 1000);///5000);
  }

  function setUpMinuteHands() { //sync minute hand with seconds hand
    let containers = document.querySelectorAll('.minutes-container');
    let secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {
      let delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
      setTimeout(function() {
        moveMinuteHands(containers);
      }, delay);
    }
  }

let currentDate = new Date;
initLocalClocks(new Date);
//hour hand moves by css animation, because it is 
setUpMinuteHands();
moveSecondHands();

function setGreeting(){
//с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
// с 12:00 до 17:59 - Good day / Добрый день / Добры дзень
// с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
// с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
    const greetingsRU = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
    console.log(greetingsRU)
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
