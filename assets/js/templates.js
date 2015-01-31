var templates = {};

templates.cWeather = [
  "<h1><%= name %>, <%= sys.country %></h1>",
  "<h4>Coordinates: <%= coord.lat %>&#176;, <%= coord.lon %>&#176;</h4>",
  "<h4><% print(setDate()) %></h4>",
  "<i class=<% setIcon(weather[0].id) %></span>",
  "<span><% print(main.temp.toFixed(0)) %> &#176;F</span>",
  "<h3><%= weather[0].description %></h3>",
].join("");
