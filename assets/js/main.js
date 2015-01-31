var api = "http://api.openweathermap.org/data/2.5/weather"
var fapi = "http://api.openweathermap.org/data/2.5/forecast/daily"
var apiKey = "&APPID=459dfc9f4200fb31cae0cf9241a46733";

var apiCity = "?q=Charleston,us";

navigator.geolocation.getCurrentPosition(success);
function success(position) {
 var lat = position.coords.latitude;
 var lon = position.coords.longitude;
 lon = parseFloat(lon.toFixed(4));
 lat =  parseFloat(lat.toFixed(4));
 // lat is accessible inside "success", we can write out the variable here:
 console.log(lon);
 console.log(lat);
}
var curW = api + apiCity + apiKey;
// var curH = fapi + apiCity + apiKey;
var curF = fapi + apiCity + "&cnt=5" + "&mode=json"+ apiKey;

var cData = $.getJSON(curW, function(data){
  console.log(data);
})
// var hData = $.getJSON(test, function(data){
//   console.log(data);
// })
var fData = $.getJSON(curF, function(data){

});

var page = {

  init: function() {
    page.initStyling();
    page.initEvents();
    console.log("Page initialized!");
  },
  initStyling: function() {

  },
  initEvents: function() {

  },
  rendercdWeather: function(weatherData) {
    var compiled = _.template(template.cWeather);
    $('section').append(weatherData);
  }

}
