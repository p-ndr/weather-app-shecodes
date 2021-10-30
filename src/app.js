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
  if (now.getMinutes() < 10) {
    minute.innerHTML = `0${now.getMinutes()}`;
  } else {
    minute.innerHTML = now.getMinutes();
  }
  if (now.getHours() < 10) {
    hour.innerHTML = `0${now.getHours()}`;
  } else {
    hour.innerHTML = now.getHours();
  }
}

// getting the location
let apiKey = "2405521babf79c19f0fb38e819429c5f";
let units = "";
let city = "Tehran";

//getting the forcast. used inside the functions, not separately.
function getForecast(coords, units) {
  let deg = "";
  if (units === "metric") {
    deg = "C";
  } else {
    deg = "F";
  }
  let latitude = coords.lat;
  let longitude = coords.lon;
  let callApiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=currently,hourly,minutely,alerts&appid=${apiKey}&units=${units}`;

  axios.get(callApiForecast).then(function (response) {
    let forecasts = document.querySelectorAll(".forecast");
    let dailyForecast = response.data.daily;
    var counter = 1;
    forecasts.forEach((element) => {
      element.innerHTML = `${formatDay(
        new Date(dailyForecast[counter].dt * 1000).getDay()
      )}
      <br />
      <img src="http://openweathermap.org/img/wn/${
        dailyForecast[counter].weather[0].icon
      }@2x.png"/>
      <br />
      <span class="temperature-block">
        <span class="max">
          <span class="temp">${Math.round(
            dailyForecast[counter].temp.max
          )}</span> °<span class="degree">${deg}</span>
        </span>
        &emsp;
        <span class="min">
          <span class="temp">${Math.round(
            dailyForecast[counter].temp.min
          )}</span> °<span class="degree">${deg}</span>
        </span>
      </span>`;
      counter = counter + 1;
    });
  });
}

// default location is my own city.
function defaultWeatherInfo() {
  units = "metric";
  let defaultWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
    getForecast(response.data.coord, units);
  });
}

// one time call.
defaultWeatherInfo();

// retrieves live weather from openweathermap api.
function retrieveWeatherInfo(event) {
  event.preventDefault();
  city = document.getElementById("search-bar");
  city = city.value;
  let weatherAPIMetric = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
    getForecast(response.data.coord, units);
  });
}
//retrieve live weather
let seek = document.getElementById("weather-form");
seek.addEventListener("submit", retrieveWeatherInfo);

// retrieves live weather information based on the user's location. A little tipsy.
function showCurrentLocationInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    let geoLocationAPIMetric = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
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
      getForecast(position.coords, units);
    });
  });
}
// adds event to the current location button.
let current = document.getElementById("current-loc");
current.addEventListener("click", showCurrentLocationInfo);

// changes the degrees from fahrenheit to celsius
function changeDegreeToCelsius(event) {
  event.preventDefault();
  let temps = document.querySelectorAll(".temp");
  let degrees = document.querySelectorAll(".degree");
  if (degrees[0].innerHTML === "F") {
    units = "metric";
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

// changes degree from celsius to fahrenheit
function changeDegreeToFahrenheit(event) {
  event.preventDefault();
  let temps = document.querySelectorAll(".temp");
  let degrees = document.querySelectorAll(".degree");
  if (degrees[0].innerHTML === "C") {
    units = "imperial";
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
