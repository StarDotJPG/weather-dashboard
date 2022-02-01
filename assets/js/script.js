var apiKey = "c2714403f6df43a525a25ab5790ea1a4";



var getWeatherData = function () {
    // format the open weather api url
    var oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=38.5816&lon=121.4944&appid=" + apiKey;
console.log("Calling: " + oneCallApiUrl);

    // make a request to the url
    fetch(oneCallApiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                alert('Error: city was not found');
            }
        })
        .catch(function (error) {
            alert("Unable to connect to Open Weather API");
        });
};


getWeatherData();