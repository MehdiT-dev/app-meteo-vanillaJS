import sortedWeekDays from './gestionDate/gestionDate.js';

console.log(sortedWeekDays);

const APIKEY = "72b6a4fd272d3dc431e029a581c6e55e";
let APIresults;

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const localization = document.querySelector('.localization');

const hours = document.querySelectorAll('.name-hour');
const hoursTemperature = document.querySelectorAll('.temperature-hour');
const days = document.querySelectorAll('.name-day');
const weatherDays = document.querySelectorAll('.weather-day');
const daysTemperature = document.querySelectorAll('.temperature-day');
const weatherLogo = document.querySelector('.weather-logo');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        appelAPI(lat, lon);
    }, () => {
        alert(`Géolocalisation nécessaire au bon fonctionnement de l'application`);
    })
};

function appelAPI(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        APIresults = data;

        weather.innerText = APIresults.current.weather[0].description;
        temperature.innerText = parseInt(APIresults.current.temp) + '°';
        localization.innerText = APIresults.timezone;

        let currentTime = new Date().getHours();

        for (let i=0; i<hours.length; i++) {
            let nextHour = currentTime + i;
            if (nextHour > 24) {
                hours[i].innerText = (nextHour -24) + 'h';
            } else if (nextHour === 24 || nextHour === 0) {
                hours[i].innerText = '00h';
            } else {
                hours[i].innerText = nextHour + 'h';
            }
        }

        for (let j=0; j<hoursTemperature.length; j++) {
            hoursTemperature[j].innerText = parseInt(APIresults.hourly[j].temp) + '°';
        }

        for (let k=0; k<days.length; k++) {
            days[k].innerText = sortedWeekDays[k];
        }

        console.log(weatherDays);

        for (let l=0; l<weatherDays.length; l++) {
            weatherDays[l].innerText = APIresults.daily[l+1].weather[0].description;
        }

        for (let m=0; m<daysTemperature.length; m++) {
            daysTemperature[m].innerHTML = `<span class="max-temp">${parseInt(APIresults.daily[m+1].temp.min)}°</span> / ${parseInt(APIresults.daily[m+1].temp.max)}°`;
        }

        if (currentTime >= 6 && currentTime < 21) {
            weatherLogo.src = `assets/svg/day/${APIresults.current.weather[0].icon}.svg`;
        } else {
            weatherLogo.src = `assets/svg/night/${APIresults.current.weather[0].icon}.svg`;
        }
    })
};