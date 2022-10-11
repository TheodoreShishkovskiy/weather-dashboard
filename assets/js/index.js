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

addInfo(searchedCity)
};

// These two will add event listeners to the search and its history
// Search History
$(".history").on('click', function(event){ 
  event.preventDefault();
  $(".subtitle").attr("style", "display: inline")
  document.getElementById("userEntry").value = event.target.id;
  getWeather();
})
// Search Button
document.getElementById("searchButton").addEventListener('click', findWeather);
document.getElementById("searchButton").addEventListener('click', getWeather);
