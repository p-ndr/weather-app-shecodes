// Loading date from API.
function formatDay(dayCode) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayCode];
}

function formatMonth(monthCode) {
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

  return months[monthCode];
}

function setDateTime(timespan) {
  let now = new Date(timespan * 1000); // transform to milliseconds
  let day = document.querySelector(".day");
  let month = document.querySelector(".month");
  let date = document.querySelector(".date");
  let hour = document.querySelector(".hour");
  let minute = document.querySelector(".minute");
  day.innerHTML = formatDay(now.getDay());
  month.innerHTML = formatMonth(now.getMonth());
  date.innerHTML = now.getDate();
  if (minute < 10) {
    minute.innerHTML = `0${now.getMinutes()}`;
  } else {
    minute.innerHTML = now.getMinutes();
  }
  if (hour < 10) {
    hour.innerHTML = `0${now.getHours()}`;
  } else {
    hour.innerHTML = now.getHours();
  }
}

// getting the location
let apiKey = "2405521babf79c19f0fb38e819429c5f";
let metric = "metric";
let city = "Tehran";

// default location is my own city.
function defaultWeatherInfo() {
  let defaultWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metric}`;
  axios.get(defaultWeather).then(function (response) {
    let icon = document.getElementById("weather-icon");
    let cityElement = document.querySelector(".city-name");
    let cityTemp = document.getElementById("avg-temp");
    let weatherStat = document.getElementById("weather-status");
    let maxTemp = document.getElementById("max-temp");
    let minTemp = document.getElementById("min-temp");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("wind-speed");
    setDateTime(response.data.dt);
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    cityElement.innerHTML = response.data.name;
    cityTemp.innerHTML = Math.round(response.data.main.temp);
    weatherStat.innerHTML = response.data.weather[0].description;
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    humidity.innerHTML = response.data.main.humidity;
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
    let icon = document.getElementById("weather-icon");
    let currentCity = document.querySelector(".city-name");
    let currentTemp = document.getElementById("avg-temp");
    let currentWeatherStat = document.getElementById("weather-status");
    let maxTemp = document.getElementById("max-temp");
    let minTemp = document.getElementById("min-temp");
    let humidity = document.getElementById("humidity");
    let windSpeed = document.getElementById("wind-speed");

    setDateTime(response.data.dt);
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    currentCity.innerHTML = city;
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    currentWeatherStat.innerHTML = response.data.weather[0].description;
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    humidity.innerHTML = response.data.main.humidity;
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
      let icon = document.getElementById("weather-icon");
      let currentCity = document.querySelector(".city-name");
      let avgTemp = document.getElementById("avg-temp");
      let currentWeatherStat = document.getElementById("weather-status");
      let maxTemp = document.getElementById("max-temp");
      let minTemp = document.getElementById("min-temp");
      let humidity = document.getElementById("humidity");
      let windSpeed = document.getElementById("wind-speed");
      setDateTime(response.data.dt);
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      currentCity.innerHTML = response.data.name;
      avgTemp.innerHTML = Math.round(response.data.main.temp);
      currentWeatherStat.innerHTML = response.data.weather[0].description;
      maxTemp.innerHTML = Math.round(response.data.main.temp_max);
      minTemp.innerHTML = Math.round(response.data.main.temp_min);
      humidity.innerHTML = response.data.main.humidity;
      windSpeed.innerHTML = response.data.wind.speed;
    });
  });
}
// adds event to the current location button.
let current = document.getElementById("current-loc");
current.addEventListener("click", showCurrentLocationInfo);

function changeDegreeToCelsius(event) {
  event.preventDefault();
  let temps = document.querySelectorAll(".temp");
  let degrees = document.querySelectorAll(".degree");
  if (degrees[0].innerHTML === "F") {
    degrees.forEach((element) => {
      element.innerHTML = "C";
    });
    temps.forEach((element) => {
      let num = Number(element.innerHTML);
      let degCel = Math.round(((num - 32) * 5) / 9);
      element.innerHTML = degCel;
    });
  }
}
let celsius = document.getElementById("celsius");
celsius.addEventListener("click", changeDegreeToCelsius);

function changeDegreeToFahrenheit(event) {
  event.preventDefault();
  let temps = document.querySelectorAll(".temp");
  let degrees = document.querySelectorAll(".degree");

  if (degrees[0].innerHTML === "C") {
    degrees.forEach((element) => {
      element.innerHTML = "F";
    });
    temps.forEach((element) => {
      let num = Number(element.innerHTML);
      let degFahr = Math.round(1.8 * num + 32);
      element.innerHTML = degFahr;
    });
  }
}
let fahrenheit = document.getElementById("fahrenheit");
fahrenheit.addEventListener("click", changeDegreeToFahrenheit);
