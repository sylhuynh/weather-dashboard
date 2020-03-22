var apiKey = "84a64c01cc6ad7d818bbc8727e5ba52f";

// when user clicks on the search button
$("#search-btn").on("click", function(event){
    // prevent th btn from trying to submit the form
    event.preventDefault();
    // get the value of the input field and assign to variable
    var searchTerm = $("#search-bar").val().trim();
    //add searchTerm to the queryUrl 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey;
    
// use ajax call to retrieve data from weather API with users input
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    
});




});

   // create var for the response if need be (ex. response.data/ response.docs)
    // create response var for currenttemperature, currenthumidity, wind speed, UV index, currentDate, currentweathercasticon

    //create 1 bootstrap card that loops through the 5 day forecast (bands activity 11 & activity 13 unit 6)
        // create a container
        // create div with card class and class that changes background color to blue
            // create h1 with date and append to the div
            // create h2 with temp and append to the div
            // create h3 with humidity and append to the div
    
    // search history list
        // jQuery listen to document activity
        // document.addeventListener("click", INSERT CITY NAME, INSERT FUNCTION NAME)
        // need to get from local storage


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
