var apiKey = "84a64c01cc6ad7d818bbc8727e5ba52f";


// create function that searches for current weather 
function searchWeather(city) {

    //add searchTerm to the queryUrl 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // use ajax call to retrieve data from weather API with users input
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //printing the entire object to the console
        console.log(response);

        // use ajax call to retrieve uv index data
        var indexUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        $.ajax({
            url: indexUVURL,
            method: "GET"
        }).then(function (UVIndex) {

            // constructing HTML containing current weather information
            // create response var for temperature, humidity, wind speed, UV index, date, icon
            var cityName = $("<h2>").text(response.name + " " + moment().format('L'));

            //retrieve icon data
            var currentWeatherIcon = response.weather[0].icon;
            // add to new img element and attach to icon url
            var newImageIcon = $("<img>");
            newImageIcon.attr("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");

            var currentTemp = $("<p>").text("Temperature: " + (((response.main.temp - 273.15) * (9 / 5) + 32).toFixed(2)) + " °F");
            var currentHumidity = $("<p>").text("Humidity: " + response.main.humidity + " %");
            var currentWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
            var currentUVIndex = $("<p>").text("UV Index: " + UVIndex.value);

            //empty the contents of the card body, append new weather content to display on page
            $(".card-body").empty();
            $(".card-body").append(cityName, currentTemp, currentHumidity, currentWindSpeed, currentUVIndex);
            // append icon to city name and date 
            $("h2").append(newImageIcon);

            // 5 day weather forecast
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (result) {

                //printing entire object to console
                console.log(result);
                //create 1 bootstrap card that loops through the 5 day forecast (bands activity 11 & activity 13 unit 6)
                var num = 1;

                for (var i = 0; i < 5; i++) {
                    // create div with card class and class that changes background color to blue
                    var newDivCard = $("<div>").attr("class", "card");
                    var newCardBody = $("<div>");
                    newCardBody.attr("class", "card-body");
                    newCardBody.attr("id", "5-day-forecast");

                    // create h2 with date and append to the div
                    var fiveDay = $("<h2>");
                    fiveDay.attr("class", "five-day");
                    fiveDay.text(moment().add(num++, 'day').calendar("MM, DD, YYYY"));

                    //retrieve icon data
                    var fiveWeatherIcon = result.list[i].weather[0].icon;
                    // add to new img element and attach to icon url
                    var newFiveImageIcon = $("<img>");
                    newFiveImageIcon.attr("src", "https://openweathermap.org/img/wn/" + fiveWeatherIcon + "@2x.png");

                    var fiveTemp = $("<p>").text("Temperature: " + (((result.list[i].main.temp - 273.15) * (9 / 5) + 32).toFixed(2)) + " °F");
                    var fiveHumidity = $("<p>").text("Humidity: " + result.list[i].main.humidity + " %");

                    //empty the contents of the new card body
                    newCardBody.empty();
                    newCardBody.append(fiveDay, fiveTemp, fiveHumidity);

                    // append icon to date 
                    fiveDay.append(newFiveImageIcon);

                    //append card body to div
                    newDivCard.append(newCardBody);

                    //append new weather content to display on page
                    $(".forecast-container").append(newDivCard);
                };

            });

        });
    });
}


// search history list
// jQuery listen to document activity
// document.addeventListener("click", INSERT CITY NAME, INSERT FUNCTION NAME)
// need to get from local storage



// when user clicks on the search button
$("#search-btn").on("click", function (event) {
    // prevent the btn from trying to submit the form
    event.preventDefault();
    // get the value of the input field and assign to variable
    var searchTerm = $("#search-bar").val().trim();

    // call upon searchCurrentWeather function while passing the searchTerm through as an argument
    searchWeather(searchTerm);

});

// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
