function formatDate(date) {
  let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let weekDay = weekDays[now.getDay()];

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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let day = date.getDate();
  return `${weekDay}, ${month} ${day}, ${year}  ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Wed", "Thurs", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `   <div class="daily-weather col-2">
        <div class="daily-forecast-day">${day}</div>
            <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42"
            />
            <div class="daily-forecast-temp">
              <span class="daily-forecast-temp-max">18°</span>
              <span class="daily-forecast-temp-min"> 12°</span>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let now = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(now);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#desc");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let tempMaxElement = document.querySelector("#dailyHigh");
  tempMaxElement.innerHTML = Math.round(response.data.main.temp_max);
  let tempLowElement = document.querySelector("#dailyLow");
  tempLowElement.innerHTML = Math.round(response.data.main.temp_min);
  let dailyFeelsLikeElement = document.querySelector("#dailyFeelsLike");
  dailyFeelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}.png`
  );

  displayForecast();

  celciusTemp = response.data.main.temp;
  dailyMaxTemp = response.data.main.temp_max;
  dailyMinTemp = response.data.main.temp_min;
  feelsLikeTemp = response.data.main.feels_like;
}
function search(city) {
  let apiKey = "f98ba7e599adf93cd93e20273e395b25";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
//global variable 1
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  celcLink.classList.remove("active");
  fahrLink.classList.add("active");
  let fahrTemp = Math.round((celciusTemp * 9) / 5 + 32);
  currentTemp.innerHTML = fahrTemp;
  dailyHigh.innerHTML = Math.round((dailyMaxTemp * 9) / 5 + 32);
  dailyLow.innerHTML = Math.round((dailyMinTemp * 9) / 5 + 32);
  dailyFeelsLike.innerHTML = Math.round((feelsLikeTemp * 9) / 5 + 32);
}
function showCelcTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let dailyHigh = document.querySelector("#dailyHigh");
  let dailyLow = document.querySelector("#dailyLow");
  let dailyFeelsLike = document.querySelector("#dailyFeelsLike");
  celcLink.classList.add("active");
  fahrLink.classList.remove("active");
  currentTemp.innerHTML = Math.round(celciusTemp);
  dailyHigh.innerHTML = Math.round(dailyMaxTemp);
  dailyLow.innerHTML = Math.round(dailyMinTemp);
  dailyFeelsLike.innerHTML = Math.round(feelsLikeTemp);
}

//global variable 3
let celciusTemp = null;
//global variable 5
let dailyMaxTemp = null;
//global variable 6
let dailyMinTemp = null;
//global variable 7
let feelsLikeTemp = null;

//global variable 2
let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", showFahrTemp);

//global variable 4
let celcLink = document.querySelector("#celc-link");
celcLink.addEventListener("click", showCelcTemp);

search("Quinte West");
