var owmAPI = "dda279cb1f7efed58ec2990eb5510e89";
var currentCity = "";
var lastCity = "";

var handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

var showCurrentWeather = (event) =>{
  let city = $('weather-search').val();
  currentCity = $('weather-search').val();
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
  fetch(queryURL)
  .then(handleErrors)
  .then((response) => {
    saveCity(city);
    $('weather-error').text("");
    let weatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    renderCities();
    getWeatherForecast(event);
    $('#header-title').text(response.name);
    let weatherCurrentHTML =
    <h3>${response.name} <img src="${currentWeatherIcon}"></h3>
    <ul class="list-unstyled">
      <li>Temperature: ${response.main.temp}&#8457;</li>
      <li>Humidity: ${response.main.humidity}%</li>
      <li>Wind Speed: ${response.wind.speed} MPH</li>
    </ul>`;
    $('weather-current').html(weatherCurrentHTML);
    
  })
}