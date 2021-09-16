// DOM elements
let citySearchBtn = $("#citySearchBtn");

// Base functionality

function citySearch() {

    let citySearchValue = $("#citySearchBar").val().trim();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&units=imperial&appid=2f0eea858680841d20a1b82aaa9fa729")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {

            let lon = response.coord.lon;
            let lat = response.coord.lat;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=2f0eea858680841d20a1b82aaa9fa729")
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {

                    let responseHeader = document.querySelector("#response-header");
                    responseHeader.innerHTML = "<h2>" + citySearchValue + "</h2>";
        
                    let weatherDetails = document.createElement("div");
                    weatherDetails.id = 'details';
                    weatherDetails.className = 'details';
        
                    responseHeader.appendChild(weatherDetails);
        
                    let detailsDiv = document.createElement("div")
        
                    let temp = response.current.temp;
                    let wind = response.current.wind_speed;
                    let humidity = response.current.humidity;
                    let uvi = response.current.uvi;
        
        
        
                    detailsDiv.innerHTML = "<h2> Temp: " + temp + "</h2>" +
                    "<br />" + 
                    "<h2> Wind Speed: " + wind + "</h2>" + 
                    "<br />" +
                    "<h2> Humidity: " + humidity + "</h2>" +
                    "<br />" +
                    "<h2> UV Index: " + uvi + "</h2>";
                    
                    weatherDetails.appendChild(detailsDiv);

                })

        })
}











// Event listeners
citySearchBtn.on("click", citySearch);