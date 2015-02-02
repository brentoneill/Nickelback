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
    $('.weather-wrapper section').prepend(compiled(weatherData));
    console.log("Weather rendered");
  },

};

var api = "http://api.openweathermap.org/data/2.5/weather?"
var apiKey = "&APPID=459dfc9f4200fb31cae0cf9241a46733";

navigator.geolocation.getCurrentPosition(success);
function success(position) {
 $('.loader').fadeOut(200, function(){
   $(this).remove();
   $('.controls').removeClass('hidden');
   $('.minimize').removeClass('hidden');
 });
 var lat = position.coords.latitude;
 var lon = position.coords.longitude;
 lon = parseFloat(lon.toFixed(4));
 lat =  parseFloat(lat.toFixed(4));

 // lat is accessible inside "success", we can write out the variable here:
 var apiURL = api + "lat=" +  lat + "&" + "lon=" + lon +"&units=imperial" + apiKey;
 var localWeather = $.getJSON(apiURL, function(data){
  wPage.renderCWeather(data);
  console.log(data);

  lat = data.coord.lat;
  lon = data.coord.lon;

  var mapOptions = {
   draggable: false,
   scrollwheel: false,
   panControl: false,
   zoom: 10,
   center: new google.maps.LatLng(lat, lon),
   disableDefaultUI: true,
   mapTypeId: google.maps.MapTypeId.HYBRID
  }
  var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
 });
}

$(document).ready(function(){
  $( "#draggable" ).draggable({ handle: ".minimize" });
  wPage.init();

  function initializeAutoComplete() {
    var options = {
         types: ['(cities)'],
      componentRestrictions: {country: "us"}
     };
    var input = document.getElementById('citySearch');
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      console.log(place);
      var lat = place.geometry.location.k;
      var lon = place.geometry.location.D;
      lat = parseFloat(lat.toFixed(3));
      lon = parseFloat(lon.toFixed(3));
      console.log(lat);
      console.log(lon);
      var apiURL = api + "lat=" +  lat + "&" + "lon=" + lon +"&units=imperial" + apiKey;
      var localWeather = $.getJSON(apiURL, function(data){
      wPage.renderCWeather(data);
      console.log(data);
      $('.cur-weather').remove();
      wPage.renderCWeather(data);
      $('.gm-style').remove();

      lat = data.coord.lat;
      lon = data.coord.lon;

      var mapOptions = {
       draggable: false,
       scrollwheel: false,
       panControl: false,
       zoom: 10,
       center: new google.maps.LatLng(lat, lon),
       disableDefaultUI: true,
       mapTypeId: google.maps.MapTypeId.HYBRID
      }
      var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
     });
   });

  }
  google.maps.event.addDomListener(window, 'load', initializeAutoComplete);

  $('.minimize').on('click', 'i.fa', function(){
    $('.weather-wrapper').toggleClass('shrink');
    $('.weather-wrapper').css('padding-top','20px;');
    $('section').toggleClass('hidden');
    $('.controls').toggleClass('hidden');
  });
});
