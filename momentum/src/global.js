console.log(`
    Приветствие появляется на 10 секунд и исчезает т.к. не дает информации
    Фоны меняются раз в 10 минут автоматически, стрелками влево/вправо, кнопками по краям экрана
    Время идет.
    Погода в трех предустановленных городах (Минск, Москва, Самара) плюс город из localStorage + можно добавлять через настройки

`)


let timeOfDay = 'day';//'morning' 'evening' 'night'
let userName = localStorage.getItem('momentName') ? `, ${localStorage.getItem('momentName')}` : ''

const DEFAULT_CITIES = ['минск', 'москва','самара'];

const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const daysRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    


const app = document.querySelector('#app')

