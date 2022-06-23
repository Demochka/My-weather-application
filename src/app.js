// Display current time

function displayDate(time) {
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

  let day = days[time.getDay()];
  let month = months[time.getMonth()];
  let date = time.getDate();
  let year = time.getFullYear();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;
}

let now = new Date();
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = displayDate(now);

// Add a search engine, display the city name on the page after the user submits the form

// function showCity(event) {
// event.preventDefault();
// let searchInput = document.querySelector("#search-text-input");

// let h1 = document.querySelector("h1");
// h1.innerHTML = searchInput.value;
// }

// let form = document.querySelector("#search-form");
// form.addEventListener("submit", showCity);

// Display a fake temperature (i.e 23) in Celsius and add a link to convert it to Fahrenheit.
// When clicking on it, it should convert the temperature to Fahrenheit and back to Celsius.

// function changeToFahrenheit(event) {
// event.preventDefault();
// let tempUnit = document.querySelector("#currentTemp");
// tempUnit.innerHTML = Math.round((23 * 9) / 5 + 32);}

// let tempFahrenheit = document.querySelector("#fahrenheit");
// tempFahrenheit.addEventListener("click", changeToFahrenheit);

// function changeToCelsius(event) {
// event.preventDefault();
// let tempUnit = document.querySelector("#currentTemp");
// tempUnit.innerHTML = Math.round((73 - 32) / 1.8);}
// let tempCelsius = document.querySelector("#celsius");
// tempCelsius.addEventListener("click", changeToCelsius);

// Display the city name and the current temperature of the chosen city on the page after the user submits the form
// Input City

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = inputCity.value;
  let apiKey = "a7a6a78ae810e285d28f951849e2e5c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showTemperature(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let city = document.querySelector("#city-id");
  city.innerHTML = response.data.name;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

// Add a Current Location button. When clicking on it, it uses
// the Geolocation API to get your GPS coordinates and display the city and current temperature using the OpenWeather API.

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a7a6a78ae810e285d28f951849e2e5c3";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
