// global variables used further in the funnctions
// OpenWeatherMap API code is included on the first line of this index.js
var owmAPI = "788d5638d7c8e354a162d6c9747d1bdf";
var searchedCity = "";
var lastSearchedCity = "";

// This function is added to handle any errors that may occur within the js

var handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// Function built to use the owmAPI and return the weather/timezone and save it into json

var showCurrentWeather = (event) =>{
  let city = $('weather-search').val();
  searchedCity = $('weather-search').val();
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + owmAPI;
  fetch(queryURL)
  .then(handleErrors)
  .then((response) => {
    return response.json();
})
.then((response) => {
    saveCity(city);
    $('#weather-error').text("");
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
      <li>Wind Speed: ${response.wind.speed} MPH</li>
      <li>Humidity: ${response.main.humidity}%</li>
    </ul>`;
  $('#weather-current').html(weatherCurrentHTML);
  })
}

// This allows the user to search up any city on the webpage and be able to see the five day forecast as displayed
// All weather info comes from the owmAPI meanwhile the time comes from the this moment function

var getWeatherForecast = (event) => {
  let city = $('#weather-search').val();
  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&=" + owmAPI;
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
      let timeZoneHours = timeZone / 3600;
      let thisMomemnt = moment.unix(dailyTime).utc().utcOffset(timeZoneHours)
      let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
        if (thisMomemnt.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
          weatherCurrentHTML += `
          <main class="weather-card card m-2 p0">
            <ul class="list-unstyled p-3">
              <li>${thisMoment.format("MM/DD/YY")}</li>
              <br>
              <li class="weather-icon"><img src="${iconURL}"></li>
              <br>
              <li>Temp: ${dailyData.main.temp}&#8457;</li>
              <br>
              <li>Humidity: ${dailyData.main.humidity}%</li>
            </ul>
          </main>`;
        }
    }
    weatherCurrentHTML += `</main>`;
    $('#weather-forecast').html(weatherCurrentHTML);
  })
}

// This function should save the searched cities into localStorage

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

// a function added to render the cities that are searched and will research the last city if the newly searched one does not appear
// The default city for the webpage is set to Charlotte (in most cases should be Charlotte, NC)

var renderCities = () => {
  $('#weather-results').empty();
  if (localStorage.length===0){
    if (lastSearchedCity){
      $('#weather-search').attr("value", lastSearchedCity);     
    } else {
      $('#weather-search').attr("value", "Charlotte");
    }
  } else {
    let cityKey = "cities"+(localStorage.length-1);
    lastSearchedCity = localStorage.getItem(cityKey);
    $('#weather-search').attr("value", lastSearchedCity);
    for (let i = 0; i < localStorage.length; i++) {
      let city = localStorage.getItem("cities" + i);
      let cityElement;
      if (searchedCity===""){
        searchedCity=lastSearchedCity;
      }
      if (city === searchedCity) {
        cityElement = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
      } else {
          cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
      }
      $('#weather-results').prepend(cityElement);
    }
    if (localStorage.length>0) {
      $('#weather-clear').html($('<a id="weather=clear" href="#">clear</a>'));
    } else {
      $('#weather-clear').html('');
    }
  }
}

// On-click functions added so that when the search button is pressed the city value is entered into the API and the owmAPI should give the weather details of searched city

$('#weather-button').on("click", (event) => {
event.preventDefault();
searchedCity = $('#weather-search').val();
showCurrentWeather(event);
});

$('#weather-results').on("click", (event) => {
  event.preventDefault();
  $('#weather-search').val(event.target.textContent);
  searchedCity=$('#weather-search').val();
  showCurrentWeather(event);
});

$('#weather-clear').on("click", (event) => {
  localStorage.clear();
  renderCities;
});

// last two call in order for the js to function with the rest of the application

renderCities();

showCurrentWeather();