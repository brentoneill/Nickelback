var wPage = {

  init: function() {
    wPage.initStyling();
    wPage.initEvents();
  },
  initStyling: function() {

  },
  initEvents: function() {

  },
  renderCWeather: function(weatherData,index,array) {
    var compiled = _.template(templates.cWeather);
    $('.weather-wrapper section').prepend(compiled(weatherData));
  },
  renderTraffic: function(trafficItem, index, array) {
    var compiled = _.template(templates.traffic);
    $('.traffic-ticker section p').prepend(compiled(trafficItem));
  },
  renderAllTraffic: function(trafficData){
    _.each(trafficData.TRAFFIC_ITEM, wPage.renderTraffic);
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

  lat = data.coord.lat;
  lon = data.coord.lon;

  var mapOptions = {
   scrollwheel: false,
   zoom: 10,
   disableDefaultUI: true,
   center: new google.maps.LatLng(lat, lon),
   mapTypeId: google.maps.MapTypeId.HYBRID
  }
  var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  //Show logo
  setTimeout(function() {
      $('.logo').removeClass('hidden').addClass('animated tada');
  }, 1000);
 });
};




////DO STUFF WHEN THE DOM HAS LOADED!////
$(document).ready(function(){
  //Make box draggable
  $( "#draggable" ).draggable({ handle: ".minimize" });
  //Initialize the weather
  wPage.init();
  //Set up function to change weather on autocomplete changes
  function initializeAutoComplete() {
    var options = {
       types: ['(cities)'],
       componentRestrictions: {country: "us"}
     };
    //Sets up the autocomplete on the input box
    var input = document.getElementById('citySearch');
    var autocomplete = new google.maps.places.Autocomplete(input);
    //Function to run when the autocomplete input has a place change
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry.location.A;
      var lon = place.geometry.location.F;

      //parse the lat and lon to 3 decimal places
      lat = parseFloat(lat.toFixed(3));
      lon = parseFloat(lon.toFixed(3));
      //translate Lat and Lon in to a bounding box -- for traffic API

      //Creating the URL for the api Call
      var apiURL = api + "lat=" +  lat + "&" + "lon=" + lon +"&units=imperial" + apiKey;

      //get JSON technique to retrieve data
      var localWeather = $.getJSON(apiURL, function(data) {
        $('.cur-weather').remove();
        //Switch name of data to the name from the autocomplete object
        data.name = place.formatted_address;
        wPage.renderCWeather(data);
        $('.gm-style').remove();
        //Set latitude and longitude
        lat = data.coord.lat;
        lon = data.coord.lon;
        //Set the options for the map background
        var mapOptions = {
           scrollwheel: false,
           zoom: 10,
           disableDefaultUI: true,
           center: new google.maps.LatLng(lat, lon),
           mapTypeId: google.maps.MapTypeId.HYBRID
        }
        //Create map and add traffic layer to map
        var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        var bounds = map.getBounds();
        var ne = bounds.getNorthEast(); // LatLng of the north-east corner
        var sw = bounds.getSouthWest();
        nw = new google.maps.LatLng(ne.lat(), sw.lng());
        se = new google.maps.LatLng(sw.lat(), ne.lng());
     });
     ////////////////////
     //Get traffic data//
     ////////////////////
     //Get bounding box from Google Place object
     console.log(place)
     newBBox = "&bbox=" + place.geometry.viewport.ya.j + "," + place.geometry.viewport.ra.j + ";" + place.geometry.viewport.ya.A + "," + place.geometry.viewport.ra.A;

     tConfig = {
       base: "http://traffic.cit.api.here.com/traffic/6.1/incidents.json?",
       bbox: newBBox,
       appID: "&app_id=2tvvsmnmOtXFsVaYHEnm",
       appCODE: "&app_code=t6iD973-SYhi0MLtjvBM4g",
       act: "&status=active",
       results: "&maxresults=5"
     }
     //Remove old traffic data
     $('.marquee span').remove();
     //Get new traffic data
     $.ajax({
         url: tConfig.base + tConfig.bbox + tConfig.appID + tConfig.appCODE + tConfig.act + tConfig.results + "&jsoncallback=?",
         type:'GET',
         dataType: 'JSON',
         crossDomain:true,
         success: function (data) {
           console.log( tConfig.base + tConfig.bbox + tConfig.appID + tConfig.appCODE + tConfig.act + tConfig.results);
           //Render new traffic for area
           console.log(data);
           data = data.TRAFFIC_ITEMS;
           console.log(data);
           wPage.renderAllTraffic(data);
         },
         error: function (error) {
           console.log(error);
           console.log( tConfig.base + tConfig.bbox + tConfig.appID + tConfig.appCODE + tConfig.act + tConfig.results);
         }

       });
     });
  }

  //Initialize the autocomplete listener
  //Listens for a change of input by user
  google.maps.event.addDomListener(window, 'load', initializeAutoComplete);

  //Minimize weather wrapper on click of minimize button
  $('.minimize').on('click', 'i.fa', function(){
    $('.weather-wrapper').toggleClass('shrink');
    $('.weather-wrapper').css('padding-top','20px;');
    $('.weather-wrapper section').toggleClass('hidden');
    $('.controls').toggleClass('hidden');
  });


});
