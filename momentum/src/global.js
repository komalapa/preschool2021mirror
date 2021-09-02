console.log(`
    1. Часы и календарь - Дата, день недели, год, время
    2. Приветствие появляется на 10 секунд и исчезает т.к. не дает информации
    3. Слайдер изображений. Фоны меняются раз в 10 минут автоматически, стрелками влево/вправо, скрытыми кнопками по краям экрана
    4. Виджет погоды: Погода в трех предустановленных городах (Минск, Москва, Самара) плюс город из localStorage + можно добавлять через настройки. В localstorage сохраняется последний
    5. Аудиоплеер. Три мелодии, управление работает. 
    6. Виджет цитата дня: цитаты выбираются случайно из json-файла соответсвующего языку
    7. Переключение языка в форме настроек
`)


let timeOfDay = 'day';//'morning' 'evening' 'night'
let userName = localStorage.getItem('momentName') ? localStorage.getItem('momentName') : ''

let lang = 'ru';//'en'

const DEFAULT_CITIES_RU = ['минск', 'москва','самара'];
const DEFAULT_CITIES_EN = ['minsk', 'moskva','samara'];


const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const daysRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    
const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const greetingsRu = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'];
const greetingsEn = ['Good night ', 'Good morning', 'Good day', 'Good evening'];

const app = document.querySelector('#app')

// function removeAllChildNodes(parent) {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }