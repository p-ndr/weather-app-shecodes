// Section for retrieving live date. Better loaded from an API than new Date().
let now = new Date();

// Too many classes.
let day = document.querySelector(".day");
let month = document.querySelector(".month");
let date = document.querySelector(".date");
let hour = document.querySelector(".hour");
let minute = document.querySelector(".minute");
let daylight = document.querySelector(".daylight-emoji");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// display date.
day.innerHTML = days[now.getDay()];
month.innerHTML = months[now.getMonth()];
date.innerHTML = now.getDate();
hour.innerHTML = now.getHours();
if (now.getMinutes() < 10) {
  minute.innerHTML = `0${now.getMinutes()}`;
} else {
  minute.innerHTML = now.getMinutes();
}

// getting the location

let apiKey = "2405521babf79c19f0fb38e819429c5f";
let metric = "metric";
let city = "Shiraz";

// default location is my own city.
function defaultWeatherInfo() {
  let defaultWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metric}`;
  axios.get(defaultWeather).then(function (response) {
    let cityElement = document.querySelector(".city-name");
    let cityTemp = document.getElementById("avg-temp");
    let weatherStat = document.getElementById("weather-status");
    let maxTemp = document.getElementById("max-temp");
    let minTemp = document.getElementById("min-temp");
    let precipitation = document.getElementById("precipitation");
    let windSpeed = document.getElementById("wind-speed");

    cityElement.innerHTML = response.data.name;
    cityTemp.innerHTML = Math.round(response.data.main.temp);
    weatherStat.innerHTML = response.data.weather[0].main;
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    precipitation.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = response.data.wind.speed;
  });
}

// one time call.
defaultWeatherInfo();

// retrieves live weather from openweathermap api.
function retrieveWeatherInfo(event) {
  event.preventDefault();
  city = document.getElementById("search-bar");
  city = city.value;
  let weatherAPIMetric = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metric}`;
  axios.get(weatherAPIMetric).then(function (response) {
    let currentCity = document.querySelector(".city-name");
    let currentTemp = document.getElementById("avg-temp");
    let currentWeatherStat = document.getElementById("weather-status");
    let maxTemp = document.getElementById("max-temp");
    let minTemp = document.getElementById("min-temp");
    let precipitation = document.getElementById("precipitation");
    let windSpeed = document.getElementById("wind-speed");
    currentCity.innerHTML = city;
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    currentWeatherStat.innerHTML = response.data.weather[0].main;
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    precipitation.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = response.data.wind.speed;
  });
}
//retrieve live weather
let seek = document.getElementById("weather-form");
seek.addEventListener("submit", retrieveWeatherInfo);

// retrieves live weather information based on the user's location. A little tipsy.
function showCurrentLocationInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    let geoLocationAPIMetric = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${metric}`;
    axios.get(geoLocationAPIMetric).then(function (response) {
      let currentCity = document.querySelector(".city-name");
      let avgTemp = document.getElementById("avg-temp");
      let currentWeatherStat = document.getElementById("weather-status");
      let maxTemp = document.getElementById("max-temp");
      let minTemp = document.getElementById("min-temp");
      let precipitation = document.getElementById("precipitation");
      let windSpeed = document.getElementById("wind-speed");
      currentCity.innerHTML = response.data.name;
      avgTemp.innerHTML = Math.round(response.data.main.temp);
      currentWeatherStat.innerHTML = response.data.weather[0].main;
      maxTemp.innerHTML = Math.round(response.data.main.temp_max);
      minTemp.innerHTML = Math.round(response.data.main.temp_min);
      precipitation.innerHTML = response.data.main.humidity;
      windSpeed.innerHTML = response.data.wind.speed;
    });
  });
}
// adds event to the current location button.
let current = document.getElementById("current-loc");
current.addEventListener("click", showCurrentLocationInfo);
