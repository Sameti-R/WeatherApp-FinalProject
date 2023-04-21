function dayFormat(timestamp) {
  now = new Date(timestamp);

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = weekDays[now.getDay(timestamp)];

  hours = now.getHours(timestamp);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  minutes = now.getMinutes(timestamp);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return ` ${day}, ${hours}:${minutes}`;
}
function getForecast(coord) {
  apiKey = "842b36d55cb28eba74a018029d56b04c";
  apiUrl = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function getForecastTwo(coord) {
  apiKey = "842b36d55cb28eba74a018029d56b04c";
  apiUrl = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  let cityName = document.querySelector("#the-city");

  cityName.innerHTML = `${response.data.name}`;

  temperature = response.data.main.temp;

  let temp = document.querySelector("#celcius");

  temp.innerHTML = `${Math.round(temperature)}`;
  let description = document.querySelector("#weather-condition");
  description.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed}`;
  dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = dayFormat(response.data.dt * 1000);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let windUnit = document.querySelector("#wind-unit");
  windUnit.innerHTML = "km/h";
  tempC.classList.add("active");
  tempF.classList.remove("active");
  getForecast(response.data.coord);
}
function showWeatherTwo(response) {
  let cityName = document.querySelector("#the-city");

  cityName.innerHTML = `${response.data.name}`;

  temperature = response.data.main.temp;

  let temp = document.querySelector("#celcius");

  temp.innerHTML = `${Math.round(temperature)}`;
  let description = document.querySelector("#weather-condition");
  description.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed}`;
  dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = dayFormat(response.data.dt * 1000);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let windUnit = document.querySelector("#wind-unit");
  windUnit.innerHTML = "mph";
  tempC.classList.remove("active");
  tempF.classList.add("active");
  getForecastTwo(response.data.coord);
}
function search(city) {
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function showCurrentData(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-engine");
  search(cityInputElement.value);
}

let form = document.querySelector("#my-form");
form.addEventListener("submit", showCurrentData);
function searchImperial(city) {
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeatherTwo);
}

function changeScaleOne(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#search-engine");

  searchImperial(cityInputElement.value);
}
function changeScaleTwo(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#search-engine");

  search(cityInputElement.value);
}

let tempF = document.querySelector("#imperial-temp");
tempF.addEventListener("click", changeScaleOne);
let tempC = document.querySelector("#metric-temp");
tempC.addEventListener("click", changeScaleTwo);
function formatDay(timestamp) {
  now = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  theDay = days[now.getDay(timestamp)];
  return `${theDay}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center forecastThree">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
          <p class="col">
          ${formatDay(forecastDay.dt)}<br /><img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="" width="42"
            />
            <br />
            <span class="degreeMax" id="degree-max"> ${Math.round(
              forecastDay.temp.max
            )}°</span>  

|

            <span class="degreeMin" id="degree-min">${Math.round(
              forecastDay.temp.min
            )}° </span>
          </p>
        `;
    }
    forecastElement.innerHTML = forecastHTML;
  });

  forecastHTML = forecastHTML + `</div>`;
}
