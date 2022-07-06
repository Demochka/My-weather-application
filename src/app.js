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

// Formatting days for the forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// Display forecast (Template and real data)
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        ` 
       <div class="col-2">            
         <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
           <div>
              <img 
               src="http://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png"
               alt=""
               width="40" 
              />
           </div>
              <div class="day-temp">
                <span class="temp-max">
                  <strong>${Math.round(forecastDay.temp.max)}° 
                  </strong>
                </span>

                <span class="temp-min">${Math.round(forecastDay.temp.min)}°
                </span>
              </div>           
         </div>             
`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

// Display the city name and the current temperature of the chosen city on the page after the user submits the form
// Input City

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a7a6a78ae810e285d28f951849e2e5c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let currentTemp = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city-id");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  console.log(response.data);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "a7a6a78ae810e285d28f951849e2e5c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-text-input");
  searchCity(inputCity.value);
}

searchCity("Kyiv");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Convert the temperature to Fahrenheit and // Convert the temperature to Celsius

function changeToFahrenheit(event) {
  event.preventDefault();
  tempCelsius.classList.remove("active");
  tempFahrenheit.classList.add("active");
  let tempElement = document.querySelector("#current-temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  tempCelsius.classList.add("active");
  tempFahrenheit.classList.remove("active");
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}
let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", changeToCelsius);

let celsiusTemp = null;

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
