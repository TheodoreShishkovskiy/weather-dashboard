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
    return response.json();
})
.then((response) => {
    saveCity(city);
    $('weather-error').text("");
    let weatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    let currentTime = response.dt;
    let currentTimeZone = response.timezone;
    let currentTimeHours = currentTimeZone / 60 / 60;
    let currentMoment = moment.unix(currentTime).utc().utcOffset(currentTimeHours);
    renderCities();
    getWeatherForecast(event);
    $('#header-title').text(response.name);
    let weatherCurrentHTML = `
    <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")} <img src="${weatherIcon}"></h3>
    <ul class="list-unstyled">
      <li>Temperature: ${response.main.temp}&#8457;</li>
      <li>Humidity: ${response.main.humidity}%</li>
      <li>Wind Speed: ${response.wind.speed} MPH</li>
    </ul>`;
  $('weather-current').html(weatherCurrentHTML);
  })
}

var getWeatherForecast = (event) => {
  let city = $('#weather-search').val();
  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
  fetch(queryURL)
  .then(handleErrors)
  .then((response) => {
    return response.json();
  })
  .then((response) =>{
    let weatherCurrentHTML =`
    <h2>The Five Day Forecast:</h2>
    <div id="weatherForecastUl" class="d-inline-flex flex-wrap ">`;
    for (let i = 0; i < response.list.length; i++) {
      let dailyData = response.list[i];
      let dailyTime = dailyData.dt;
      let timeZone = response.city.timezone;
      let timeZoneHours = timeZone / 60 / 60;
      let thisMomemnt = moment.unix(dailyTime).utc().utcOffset(timeZoneHours)
      let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
      if (thisMomemnt.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
        weatherCurrentHTML += `
        <main class="weather-card card m-2 p0">
          <ul class="list-unstyled p-3">
            <li>${thisMoment.format("MM/DD/YY")}</li>
            <li class="weather-icon"><img src="${iconURL}"></li>
            <li>Temp: ${dayData.main.temp}&#8457;</li>
            <br>
            <li>Humidity: ${dayData.main.humidity}%</li>
          </ul>
        </main>`;
      }
    }
    weatherCurrentHTML += `</main>`;
    $('#weather-forecast').html(weatherCurrentHTML);
  })
}

var saveCity = (differentCity) => {
  let cityExists = false;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === differentCity) {
      cityExists = true;
      break;
    }
  }
  if (cityExists === false) {
    localStorage.setItem('cities' + localStorage.length, newCity);
  }
}