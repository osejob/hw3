let updateWidget = function(data) {

  console.log("Got weather data: ", data)
  // YOUR CODE GOES HERE
  let temp = $("#weather p")
  temp.html("It is " + Math.round(data.main.temp) + " degrees outside")

  let city = $("#weather h4")
  city.html(data.name)

  let image = $("#weather img")
  jQuery(image).attr('src', "http://openweathermap.org/img/w/" + data.weather[0].icon +".png")
  // HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.

}



let getWeather = function(info) {

  let latitude = info.coords.latitude.toFixed(4)
  let longitude = info.coords.longitude.toFixed(4)


  // let latitude = '48.8566';
  // let longitude = '2.3522';
  let apiKey = 'fad13ca22af87754cadeaf2ec94e01e9'; // REPLACE THIS VALUE with your own key.

  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let handlePosition = function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
}

let link = jQuery("#get_forecast")
link.on("click", handlePosition);


////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
