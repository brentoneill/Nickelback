


// var curW = api + apiCity + apiKey;
// var curH = fapi + apiCity + apiKey;
// var curF = fapi + apiCity + "&cnt=5" + "&mode=json"+ apiKey;
//
// var cData = $.getJSON(curW, function(data){
//   console.log(data);
// })
// var hData = $.getJSON(test, function(data){
//   console.log(data);
// })
// var fData = $.getJSON(curF, function(data){
//
// });

var wPage = {

  init: function() {
    wPage.initStyling();
    wPage.initEvents();
    console.log("Page initialized!");
  },
  initStyling: function() {

  },
  initEvents: function() {

  },
  renderCWeather: function(weatherData,index,array) {
    var compiled = _.template(templates.cWeather);
    console.log(compiled(weatherData));
    $('.weather-wrapper section').prepend(compiled(weatherData));
    console.log("Weather rendered");
  },

};

var api = "http://api.openweathermap.org/data/2.5/weather?"
var fapi = "http://api.openweathermap.org/data/2.5/forecast/daily"
var apiKey = "&APPID=459dfc9f4200fb31cae0cf9241a46733";
var apiCity = "q=Mt.Pleasant,us"

navigator.geolocation.getCurrentPosition(success);
function success(position) {
 var lat = position.coords.latitude;
 var lon = position.coords.longitude;
 lon = parseFloat(lon.toFixed(2));
 lat =  parseFloat(lat.toFixed(2));
 // lat is accessible inside "success", we can write out the variable here:
 console.log(lon);
 console.log(lat);


 var apiURL = api + "lat=" +  lat + "&" + "lon=" + lon +"&units=imperial";
 console.log(apiURL);
 var localWeather = $.getJSON(apiURL, function(data){
  wPage.renderCWeather(data);
  console.log(data);
 });
}

$(document).ready(function(){
  wPage.init();
});
