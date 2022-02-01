var apiKey = "c2714403f6df43a525a25ab5790ea1a4";

var getWeatherDataByCity = function (city, state, country) {

    var geocodingApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&appid=" + apiKey;
    // we have to get coordinates first, then get weather data
    // we will use fetch promise chaining to do this
    fetch(geocodingApiUrl) // request coordinates

        // Check if response is OK and if it is, load response as json
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject("Geocoding API did not return a response 200.");
            }
        })

        // Check if we recieved geo coding data back and if we did, make a request to OneCall API
        .then(geo => {
            if (geo != "" && geo != null) {
                return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + geo[0].lat + "&lon=" + geo[0].lon + "&units=imperial&appid=" + apiKey)
            } else {
                return Promise.reject("Geocoding API returned an empty or null array.");
            }
        })

        // Check if response is OK and if it is, load response as json
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject("OneCall API did not return a response 200.");
            }
        })

        // check if we recieved weather data back and if we did, display it to user
        .then(weather => {
            if (weather != "" && weather != null) {
                return displayWeatherData(city, weather);
            }
        })

        // if we encounter errors above, this catch block will run
        .catch(function (error) {
            console.log(error);
        });
}

var displayWeatherData = function (city, weather) {
    console.log(
        "Current Weather Data: " +
        "\nCity Name: " + city +
        "\nTempurature: " + weather.current.temp + " \xB0F" +
        "\nWind Speed: " + weather.current.wind_speed + " MPH" +
        "\nHumidity: " + weather.current.humidity + "%" +
        "\nUV Index: " + weather.current.uvi +
        "\n\n")


    console.log("Five Day Forecast: ")
    // API data returns today's weather in the zeroth position, so we set i = 1 to get the forcast starting tomorrow
    for (var i = 1; i < 6; i++) {
        // API data returns the date in Unix seconds, but JavaScript date requires milliseconds, so need to * 1000
        var day = new Date(weather.daily[i].dt * 1000)
        console.log(
            //JavaScript Date returns 0 for January, so need to add 1 to the month
            "\nDate: " + (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear() +
            "\nTemp: " + weather.daily[i].temp.day +
            "\nWind: " + weather.daily[i].wind_speed +
            "\nHumidity: " + weather.daily[i].humidity +
            "\nCloudiness " + weather.daily[i].clouds)
    }
}

getWeatherDataByCity("Sacramento", "CA", "US");
