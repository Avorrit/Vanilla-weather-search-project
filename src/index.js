let currentDate = new Date();
let daysArr = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];


function displayTime(){
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let day = daysArr[currentDate.getDay()];


    let dayElement = document.getElementById('current-date');
    let timeElement = document.getElementById('current-time');

    dayElement.innerHTML = day;
    timeElement.innerHTML = `${hours}:${minutes}`;
}

function displayWeather(response){
    
    let cityName = response.data.city;
    console.log(response.data.city)
    let weatherIconUrl = response.data.condition.icon_url;
    let weatherConditionDesc = response.data.condition.description;
    let iconAlterText = response.data.condition.icon;

    let humidity = response.data.temperature.humidity;
    let windSpeed = response.data.wind.speed;
    let temperature = Math.round(response.data.temperature.current);


    let cityElement = document.getElementById('city-name');
    let weatherIconElement = document.getElementById('weather-icon');
    let currentTemperatureElement = document.getElementById('current-temperature');
    let humidityElement = document.getElementById('humidity');
    let windElement = document.getElementById('wind-speed');
    let weatherConditionElement = document.getElementById('current-condition');

    cityElement.innerHTML = cityName;
    weatherIconElement.outerHTML = `<img src="${weatherIconUrl}"  id="weather-icon" alt="${iconAlterText}">`;
    currentTemperatureElement.outerHTML = `<h2 id="current-temperature">${temperature}<sup>°C</sup></h2>`;
    weatherConditionElement.innerHTML = weatherConditionDesc;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${windSpeed}km/h`;
}

function searchDestCity(cityName){
    const apiKey = 'td30122f3632b6421c87bebo74a76a17';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
}

function search(event){
    event.preventDefault();
    let cityInputElement = document.getElementById('search-box');
    let warningElement = document.getElementById('warning-text');

    if(cityInputElement.value.length > 0){
        warningElement.innerHTML = '';
          searchDestCity(cityInputElement.value);
    }
    else {
        warningElement.innerHTML = 'Please fill out this field';
    }
}

let searchButton = document.getElementById('submit-button');
let searchForm = document.getElementById('search-box');

searchButton.addEventListener("click", search);
searchForm.addEventListener("submit", search);

searchDestCity('Paris');
displayTime();

