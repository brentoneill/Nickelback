var templates = {};

templates.cWeather = [
  "<div class='cur-weather'>",
    "<h1><%= name %></h1>",
    "<h6><%= coord.lat %>&#176;, <%= coord.lon %>&#176;</h4>",
    "<h4><% print(setDate()) %></h4>",
    "<div class='weather-info'>",
      "<i class='wi <% print(setIcon(weather[0].id)) %>'></i>",
      "<span><% print(main.temp.toFixed(0)) %>&#176;F</span>",
    "</div>",
    "<h4><%= weather[0].description %></h4>",
    "<div class='sun-info'>",
      "<i class='wi wi-sunrise'></i><span><% print(moment.unix(sys.sunrise).fromNow()) %></span>",
      "<br />",
      "<i class='wi wi-sunset'></i><span><% print(moment.unix(sys.sunset).fromNow()) %></span>",
    "</div>",
  "</div>"
].join("");


templates.traffic = [
    "<span><%= TRAFFICITEMDESCRIPTION[0].content %></span>"
].join("");
