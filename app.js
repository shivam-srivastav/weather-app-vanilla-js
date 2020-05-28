// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature-value p");
const desc = document.querySelector(".temperature-description p");
const locationP = document.querySelector(".location p");
const notification = document.querySelector(".notification");
console.log(icon);
//App Data
const weather = {};
// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

weather.temperature = {
  unit: "celsius",
};

//Checkif browser supports geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notification.style.display = "block";
  notification.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//set user's Position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}
//showing error when there is issue with geo location
function showError(error) {
  notification.style.display = "block";
  notification.innerHTML = `<p>${error.message}</p>`;
}

//get weather from api provider
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (res) {
      let data = res.json();
      return data;
    })
    .then(function (data) {
      console.log(data);
      console.log(weather);
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.description = data.weather[0].description;
    })
    .then(function () {
      displayWeather();
    });
}

//Display weather

function displayWeather() {
  icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  desc.innerHTML = `${weather.description}`;
  locationP.innerHTML = `${weather.city}, ${weather.country}`;
}

//function C to F
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

//when user click on the tempreture element
temp.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;
  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    temp.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
