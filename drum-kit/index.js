console.log(`
Разобраться в коде чужого проекта, понять его, воспроизвести исходное приложение. Правки и изменения допускаются и приветствуются, если они не ухудшают внешний вид и функционал исходного проекта - 10 баллов
Дополнить исходный проект обязательным дополнительным функционалом, указанным в описании задания - 10 баллов
1 Обязательное задание: клавиши работают и с клавиатуры и по клику мыши
2 Дополнительно: можно "играть" водя зажатой мышью. (Старт только на клавишах)
3 При движении мыши текст не выделяется
4 Переход в полноэкранный режим по клику на иконку
+10
Итог 30
`)
function playSound(event){
    const audioEl = document.querySelector(`audio[data-key="${event.keyCode}"]`)||document.querySelector(`audio[data-key="${event.target.getAttribute("data-key")}"]`);
    if (!audioEl) return;
    const keyEl = document.querySelector(`div[data-key="${event.keyCode}"]`)|| document.querySelector(`[data-key="${event.target.getAttribute("data-key")}"]`);
    if (!keyEl) return;
    keyEl.classList.add('playing');
    audioEl.currentTime = 0;
    audioEl.play();
}
function stopSound(event){
    //uncomment to stop sound on "UP" events. It's not good for this sounds 
    //const audioEl = document.querySelector(`audio[data-key="${event.keyCode}"]`)||document.querySelector(`audio[data-key="${event.target.getAttribute("data-key")}"]`);
    //if (!audioEl) return;
    const keyEl = document.querySelector(`div[data-key="${event.keyCode}"]`)|| document.querySelector(`div[data-key="${event.target.getAttribute("data-key")}"]`);
    if (!keyEl) return;
    keyEl.classList.remove('playing');
    //audioEl.pause();

}
window.addEventListener('keydown', playSound);
window.addEventListener('mousedown', (evt) =>{
    if (!evt.target.getAttribute("data-key")) return;
    window.addEventListener('mouseover', playSound);
    window.addEventListener('mouseout', stopSound);
    playSound(evt);
});

window.addEventListener('keyup', stopSound);
window.addEventListener('mouseup', (evt) => {
    if (!evt.target.getAttribute("data-key")) return;
    window.removeEventListener('mouseover', playSound);
    window.removeEventListener('mouseout', stopSound);
    stopSound(evt);
});


//full screen
const wrp = document.querySelector("#key-wrp");
const fullScreenBtn = document.querySelector("#full-screen-btn");

function toggleFullScreen() {
    console.log(document.fullscreenElement)
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
  fullScreenBtn.onclick = function(){
      toggleFullScreen()
  }
