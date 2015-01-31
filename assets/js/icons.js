var setIcon = function(id) {
    console.log("Setting icon");
    // if statement for weather icons

    var icon = "";


    //thunderstorms
    if (id == 200 || id == 201 || id == 202 || id == 210 || id == 211 || id == 212 || id == 221 || id == 230 || id == 231 || id == 232) {
        icon = "wi-thunderstorm";
    }
    //drizzle
    else if (id == 300 || id == 301 || id == 302 || id == 310 || id == 311 || id == 312 || id == 313 || id == 314 || id == 321) {
        icon = "wi-sprinkle";
    }
    //rain
    else if (id == 500 || id == 501 || id == 502 || id == 503 || id == 504 ) {
        icon = "wi-day-rain";
    }
    //freezing rain
    else if (id == 511) {
        icon = "wi-day-sleet";
    }
    //rain
    else if (id == 520 || id == 521 || id == 522 || id == 531) {
        icon = "wi-sprinkle";
    }
    //snow
    else if (id == 600 || id == 601 || id == 602 || id == 611 || id == 612 || id == 615 || id == 616 || id == 620 || id == 621 || id == 622) {
        icon = "wi-day-sleet";
    }
    //atmosphere
    else if (id == 701 || id == 711 || id == 721 || id == 731 || id == 741 || id == 751 || id == 761 || id == 762 || id == 771 || id == 781) {
        icon = "wi-windy";
    }
    //sun/clouds
    else if (id == 800) {
        icon = "wi-day-sunny";
    }
    else if (id == 801) {
        icon = "wi-day-sunny-overcast";
    }
    else if (id == 802) {
        icon = "wi-cloud";
    }
    else if (id == 803) {
        icon = "wi-cloudy";
    }
    else if (id == 804) {
        icon = "wi-cloudy";
    }
    //extreme
    else if (id == 900) {
        icon ="wi-tornado";
    }
    else if (id == 901) {
        icon ="wi-day-storm-showers";
    }
    else if (id == 902) {
        icon ="wi-hurricane";
    }
    else if (id == 903) {
        icon ="wi-snowflake-cold";
    }
    else if (id == 904) {
        icon ="wi-hot";
    }
    else if (id == 905) {
        icon ="wi-windy";
    }
    else if (id == 906) {
        icon ="wi-hail";
    }

    //additional

    else if (id == 951) {
        icon ="wi-day-sunny";
    }
    else if (id == 952) {
        icon ="wi-day-windy";
    }
    else if (id == 953) {
        icon ="wi-day-windy";
    }
    else if (id == 954) {
        icon ="wi-day-windy";
    }
    else if (id == 955) {
        icon ="wi-day-windy";
    }
    else if (id == 956) {
        icon ="wi-day-windy";
    }
    else if (id == 957) {
        icon ="wwi-strong-wind";
    }
    else if (id == 958) {
        icon ="wi-strong-wind";
    }
    else if (id == 959) {
        icon ="wi-strong-wind";
    }
    else if (id == 960) {
        icon ="wi-day-storm-showers";
    }
    else if (id == 961) {
        icon ="wi-day-thunderstorm";
    }
    else if (id == 962) {
        icon ="wi-hurricane";
    }
    console.log(icon);
    return icon;
};
