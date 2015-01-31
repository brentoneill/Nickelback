var templates = {};

templates.cWeather = [
  "<div class='cur-weather'>",
    "<h1><%= name %>, <%= sys.country %></h1>",
    "<h6><%= coord.lat %>&#176;, <%= coord.lon %>&#176;</h4>",
    "<h4><% print(setDate()) %></h4>",
    "<i class='wi <% print(setIcon(weather[0].id)) %>'></i>",
    "<span><% print(main.temp.toFixed(0)) %> &#176;F</span>",
    "<h4><%= weather[0].description %></h4>",
  "</div>"
].join("");
