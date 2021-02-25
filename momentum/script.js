document.addEventListener('DOMContentLoaded', () => {
  let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


/* Background */
let hour = new Date().getHours();
let app = document.querySelector('.momentum');


function farmList(item) {
  const set = new Set();
  while(set.size < 6) {
    let i = Math.floor(Math.random() * 20) + 1;
    set.add(`url('./assets/images/${item}/${i < 10 ? '0' + i : i}.jpg')`)
  }
  return Array.from(set)
}

const backgroundConfig = Array.from(['night','morning', 'day', 'evening'].map(farmList)).flat();

function changeBackgroundImage() {
  app.style.backgroundImage = backgroundConfig[hour];
  checkTimeOfADay();
  function checkTime () {
    let minutes = new Date().getMinutes();
      if (minutes == 0) {
        checkTimeOfADay();
        hour = new Date().getHours();
        app.style.backgroundImage = backgroundConfig[hour];
        clearInterval(fastIntervalID);
        setTimeout(() => checkTime, 3600000)
      }
    }
  let fastIntervalID = setInterval(() => checkTime(), 1000);
}
changeBackgroundImage();
/* Time */

let time = document.querySelector('.momentum_time')
time.innerText = drowTime('24');
setInterval(() => time.innerText = drowTime('24'), 1000)

function drowTime(parameter) {
  return parameter == '24' ? 
  `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()}` 
  :`${new Date().getHours() > 12 ? (new Date().getHours() % 12) < 10 ? 
    '0' + new Date().getHours() % 12 : new Date().getHours() % 12 
  : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()} ${new Date().getHours() > 12 ? "PM" : 'AM'}`
}

/* Get time of a day */

function checkTimeOfADay() {
  let timeOfADay = document.querySelector('.momentum_time-of-day');
  if (hour >= 0 && hour < 6) {
    timeOfADay.innerText = 'night'
  } else if ( hour > 6 && hour <= 12 ) {
    timeOfADay.innerText = 'morning';
  } else if ( hour > 12 && hour <= 18 ) {
    timeOfADay.innerText = 'day';
  } else {
    timeOfADay.innerText = 'evening';
  }
}


/* manual change bg */

let changeBtn = document.querySelector('.momentum_btn')
changeBtn.addEventListener('click', manualChangeBtn);
function manualChangeBtn() {
  changeBtn.disabled = true;
  changeBtn.classList.add('momentum_btn--disabled');
  setTimeout(() => {
    changeBtn.disabled = false;
    changeBtn.classList.remove('momentum_btn--disabled');
  }, 1500)
  hour >= 24 ? hour = 0 : hour++;
  app.style.backgroundImage = backgroundConfig[hour];
}


/* Greeting */

let greetingPlace = document.querySelector('.momentum_name');
greetingPlace.textContent = localStorage.getItem('userName') || '[Enter You Name]';

greetingPlace.onclick = () => {
  greetingPlace.textContent = '';
  app.addEventListener('click', function valueLengthChecker(e) {
    if (!e.target.classList.contains('momentum_name')) {
      if (greetingPlace.textContent != '') {
        localStorage.setItem('userName', greetingPlace.textContent);
        greetingPlace.textContent = greetingPlace.textContent;
      } else {
        greetingPlace.textContent =  localStorage.getItem('userName') || '[Enter You Name]';
      }
      app.removeEventListener('click', valueLengthChecker)
    }
  })
  greetingPlace.onkeypress = (e) => {
    if (e.keyCode == 13 && greetingPlace.textContent != '') {
      localStorage.setItem('userName', greetingPlace.textContent);
      greetingPlace.textContent = greetingPlace.textContent;
      greetingPlace.blur();
    } else if (e.keyCode == 13) {
      greetingPlace.textContent = localStorage.getItem('userName');
      greetingPlace.blur();
    }
  }
}

/* Focus */ 

let focusArea = document.querySelector('.momentum_focus');
focusArea.textContent = localStorage.getItem('yourFocus') || '[Enter You Focus]';

focusArea.onclick = () => {
  focusArea.textContent = '';
  app.addEventListener('click', function valueLengthChecker(e) {
    if (!e.target.classList.contains('momentum_focus')) {
      if (focusArea.textContent != '') {
        localStorage.setItem('yourFocus', focusArea.textContent);
        focusArea.textContent = focusArea.textContent;
      } else {
        focusArea.textContent =  localStorage.getItem('yourFocus') || '[Enter You Focus]';
      }
      app.removeEventListener('click', valueLengthChecker)
    }
  })
  focusArea.onkeypress = (e) => {
    if (e.keyCode == 13 && focusArea.textContent != '') {
      localStorage.setItem('yourFocus', focusArea.textContent);
      focusArea.textContent = focusArea.textContent;
      focusArea.blur();
    } else if (e.keyCode == 13) {
      focusArea.textContent = localStorage.getItem('yourFocus');
      focusArea.blur();
    }
  }
}


/* Work with Date */ 

let dayZone = document.querySelector('.momentum_day');
let dateZone = document.querySelector('.momentum_date');
let monthZone = document.querySelector('.momentum_month');
let day = new Date().getDay();
let date = new Date().getDate();
let month = new Date().getMonth();
dayZone.textContent = week[day];
dateZone.textContent = date;
monthZone.textContent = monthNames[month];


function checkDay(id) {
    let currentDay = new Date().getDay();
    let currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth();
    day = currentDay != day ? currentDay : day;
    dayZone.textContent = week[day];
    date = currentDate != date ? currentDate : date;
    dateZone.textContent = date;
    month = currentMonth != month ? currentMonth : month;
    monthZone.textContent = monthNames[month]
    if (new Date().getHours() == 0 && new Date().getMinutes() == 0) {
      clearInterval(id);
      setTimeout(() => checkDay(checkdayIntervalId), 86400000);
    }
}

let checkdayIntervalId = setInterval(() => checkDay(checkdayIntervalId), 1000);



/* Preload */ 

  function preloadImages(...images) {
      images.forEach((image, i) => {
          image = new Image();
          image.src = preloadImages.arguments[i];
      });
  };

  // Предварительная загрузка нужных картинок 
  let imagesArr = [];
  ['night', 'morning', 'day', 'evening'].map((item) => {
    for (let i = 1; i <= 20; i++) {
     imagesArr.push(`./assets/images/${item}/${i < 10 ? '0' + i : i}.jpg`);
    }
  })

  preloadImages(...imagesArr);

/* Weather */ 
  localStorage.setItem('yourCity', 'Minsk')


  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const city = document.querySelector('.city');

  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('yourCity')}&lang=ru&appid=1f5238fb06bc4224624ed42eab778757&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
  getWeather();
  city.textContent =  localStorage.getItem('yourCity') || 'Minsk';
  city.onclick = () => {
    city.textContent = '';
    app.addEventListener('click', function valueLengthChecker(e) {
      if (!e.target.classList.contains('city')) {
        if (city.textContent != '') {
          localStorage.setItem('yourCity', city.textContent);
          city.textContent = city.textContent;
        } else {
          city.textContent =  localStorage.getItem('yourCity') || 'Minsk';
        }
        app.removeEventListener('click', valueLengthChecker)
      }
    })
    city.onkeypress = (e) => {
      if (e.keyCode == 13 && city.textContent != '') {
        localStorage.setItem('yourCity', city.textContent);
        city.textContent = city.textContent;
        city.blur();
        getWeather();
      } else if (e.keyCode == 13) {
        city.textContent = localStorage.getItem('yourCity');
        city.blur();
      }
    }
  }


  // если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
  // скопируйте код себе и запустите со своего компьютера
  const blockquote = document.querySelector('blockquote');
  const figcaption = document.querySelector('figcaption');

  // если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
  // префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
  async function getQuote() {  
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
  }
  getQuote()

})