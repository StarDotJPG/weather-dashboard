var apiKey = "c2714403f6df43a525a25ab5790ea1a4";

var getWeatherDataByCity = function (city, state, country) {

    var geocodingApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&appid=" + apiKey;
    // we have to get coordinates first, then get weather data
    // we will use fetch promise chaining to do this
    fetch(geocodingApiUrl) // request coordinates

        // Check if response is OK and if it is, load response as json
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject("Geocoding API did not return a response 200.");
            }
        })

        // Check if we recieved geo coding data back and if we did, make a request to OneCallAPI
        .then(geo => {
            console.log(geo);
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

        // check if we recieved weather data back and if we did, display data in the console
        .then(weather => {
            console.log(weather);
            if (weather != "" && weather != null) {
                return console.log( 
                    "Current Weather Data: " + 
                    "\nCity Name: " + city + 
                    "\nTempurature: " + weather.current.temp + " \xB0F" +
                    "\nWind Speed: " + weather.current.wind_speed + " MPH" +
                    "\nHumidity: " + weather.current.humidity + "%" +
                    "\nUV Index: " + weather.current.uvi +
                    "\n" +
                    "Five Day Forecast: " +
                    //var d = new Date(1643745600 *1000)
                    "\nDate: " + weather.daily[1].dt +
                    "\nTemp: " + weather.daily[1].temp.day + 
                    "\nWind: " + weather.daily[1].wind_speed +
                    "\nHumidity: " + weather.daily[1].humidity +
                    "\nCloudiness " + weather.daily[1].clouds)
            }
        })

        // if we encounter errors above, this catch block will run
        .catch(function (error) {
            console.log(error);
        });
}

getWeatherDataByCity("Sacramento", "CA", "US");
