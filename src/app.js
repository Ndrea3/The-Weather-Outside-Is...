function showTemp(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#desc");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerhtml = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.main.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f98ba7e599adf93cd93e20273e395b25";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Frankford&appid=${apiKey}&units=metric`;
console.log(apiURL);

axios.get(apiURL).then(showTemp);
