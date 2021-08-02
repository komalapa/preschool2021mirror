console.log(`
1 Обязательноет задание: клавиши работают и с клавиатуры и по клику мыши
2 Дополнительно: можно "играть" водя зажатой мышью
`)
function playSound(event){
    const audioEl = document.querySelector(`audio[data-key="${event.keyCode}"]`)||document.querySelector(`audio[data-key="${event.target.getAttribute("data-key")}"]`);
    if (!audioEl) return;
    const keyEl = document.querySelector(`div[data-key="${event.keyCode}"]`)|| document.querySelector(`[data-key="${event.target.getAttribute("data-key")}"]`);
    if (!keyEl) return;
    keyEl.classList.add('playing');
    //console.log(keyEl)
    audioEl.currentTime = 0;
    audioEl.play();
}
function stopSound(event){
    //const audioEl = document.querySelector(`audio[data-key="${event.keyCode}"]`)||document.querySelector(`audio[data-key="${event.target.getAttribute("data-key")}"]`);
    //if (!audioEl) return;
    const keyEl = document.querySelector(`div[data-key="${event.keyCode}"]`)|| document.querySelector(`div[data-key="${event.target.getAttribute("data-key")}"]`);
    if (!keyEl) return;
    keyEl.classList.remove('playing');
    //audioEl.pause();

}
window.addEventListener('keydown', playSound);
window.addEventListener('mousedown', (evt) =>{
    window.addEventListener('mouseover', playSound);
    window.addEventListener('mouseout', stopSound);
    playSound(evt);
});

window.addEventListener('keyup', stopSound);
window.addEventListener('mouseup', (evt) => {
    window.removeEventListener('mouseover', playSound);
    window.removeEventListener('mouseout', stopSound);
    stopSound(evt);
});

