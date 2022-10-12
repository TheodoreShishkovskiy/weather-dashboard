// All javascript for the weather dashboard

// Creates a function to coller all user input and display their weather search history
function findWeather(){
searchedCity = document.getElementById("userEntry").value;
searchHistory = getInfo();
var findCity = $("<section>")
findCity.attr('id', searchedCity)
findCity.text(searchedCity)
findCity.addClass("h4")

if ( searchHistory.includes(searchedCity) === false){
  $(".history").append(findCity)
}
$(".subtitle").attr("style", "display:inline")
addInfo(searchedCity);
};

// These two will add event listeners to the search and its history

// Search History
$(".history").on('click', function(event){ 
  event.preventDefault();
  $(".subtitle").attr("style", "display: inline")
  document.getElementById("userEntry").value = event.target.id;
  getWeather();
});
// Search Button
document.getElementById("searchButton").addEventListener('click', findWeather);
document.getElementById("searchButton").addEventListener('click', getWeather);

// Function created to get weather from the API, so that the weather gets its data then gets displayed

function getWeather(){
  $(".five-day").empty();
  $(".city").empty()
  searchedCity = document.getElementById("userEntry").value;
  // Setting all the variables for the rest of the funtion
  var countryLocation = "US";
  var cityLocation = searchedCity;
  var longitude;
  var latitude;
  var cityChosen = $("<h>")
  cityChosen.addClass("h3")
  var temp = $("<section>")
  var humidity = $("<section>")
  var wind = $("<section>")
  var uvIndex = $("<section>")
  var icon = $("<img>")
  icon.addClass("icon");
  var dateTime = ("<section>")
// Appending all the data into the html
$(".city").addClass("list-group")
$(".city").append(cityChosen)
$(".city").append(dateTime)
$(".city").append(icon)
$(".city").append(temp)
$(".city").append(wind)
$(".city").append(humidity)
$(".city").append(uvIndex)

// Introducing the API information into the function
var geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityLocation + "," + countryLocation + "&limit=5&appid=b38f9c4580f09f982820d3be56b001de"
fetch(geoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    longitude = data[0].lon;
    latitude = data[0].lat;
    var forecastURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=b38f9c4580f09f982820d3be56b001de";
    fetch(forecastURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        forecastIcon = data.current.weather[0].icon;
        imgAPI = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
        icon.attr('src', imgAPI)
        cityChosen.text(cityLocation);
        var date = new Date(data.current.dt * 1000);
        dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");
        
        temp.text("Temperature: " + data.current.temp + "F");
        humidity.text("Humidity " + data.current.humidity + "%");
        wind.text("Wind Speed: " + data.current.wind_speed + "mph");
        
        // UV Index information
        var heat = $("<section>")
        uvIndex.text("UV Index : ");
        heat.text(data.current.heat)
        uvIndex.append(heat)
        uvIndex.addClass("d-flex")
        if (data.current.heat < 3){
          heat.attr("style", "background-color : green; color : black; margin-left : 7px")
        } else if (data.current.heat < 6){
          heat.attr("style", "background-color : yellow; color : black; margin-left : 7px")
        } else if (data.current.heat < 8){
          heat.attr("style", "background-color : orange; color : black; margin-left : 7px")
        } else if (data.current.heat < 11){
          heat.attr("style", "background-color : red; color : black; margin-left : 7px")
        } else {
          heat.attr("style", "background-color : purple; color : black; margin-left : 7px")
        }
        // Using the data from above and using it to display the data for the five day weather forecast
        for (var i = 1; i < 6; i++){
          var forecastContainer = $("<section>")
          this["futureDate" + i] = $("<h>")
          this["futureIcon" + i] = $("<img>")
          this["futureTemp" + i] = $("<section>")
          this["futureWind" + i] = $("<section>")
          this["futureHumidity" + i] = $("<section>")
          this["forecastDay" + i] = new Date(data.daily[i].dt *1000);
          (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
          (this["futureTemp" + i]).text("Temperature: " + data.daily[i].temp.day + "F");
          (this["futureWind" + i]).text("Wind Speed: " + data.daily[i].wind_speed + "mph");
          (this["futureHumidity" + i]).text("Humidity: " + data.daily[i].humidity + "%");
          (this["forecastIcon" + i]) = data.daily[i].weather[0].icon;
          DateimgAPI = "https://openweathermap.org/img/wn/" + (this["forecastIcon" + i]) + "png";
          (this["futureIcon" + i]).attr('src', DateimgAPI)
          // Appends all the data from API and functions into the forecast display
          $("five-day").append(forecastContainer)
          forecastContainer.append(this["futureDate" + i]);
          forecastContainer.append(this["futureIcon" + i]);
          forecastContainer.append(this["futureTemp" + i]);
          forecastContainer.append(this["futureWind" + i]);
          forecastContainer.append(this["futureHumidity" + i]);
          forecastContainer.addClass("weather-card")
        }
      })
  })
}

// Next few functions will store/add info to local storage
function getInfo() {
  var list = localStorage.getItem("city");
  if (list !== null){
    newList = JSON.parse(list);
    return newList;
  } else {
    newList = [];
  }
  return newList;
}

function addInfo (n) {
  var addList = getInfo();
  if (searchHistory.includes(searchedCity) === false){
    addList.push(n);
  }
  localStorage.setItem("city", JSON.stringify(addList));
};

// Function created to render recent history
function renderInfo() {
  var searchHistory = getInfo();
  for (var i = 0; i < searchHistory.length; i++){
    var searchedCity = searchHistory[i];
    var findCity = $("<section>")
    findCity.attr('id', searchedCity)
    findCity.text(searchedCity)
    findCity.addClass("h4")
    $(".history").append(findCity)
  }
};

renderInfo();