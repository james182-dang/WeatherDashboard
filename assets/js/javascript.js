// DOM elements
let citySearchBtn = $("#citySearchBtn");

// Base functionality

function citySearch() {

    // Have user input fill in API URL, retrieves lat and lon data to pass in to next API
    let citySearchValue = $("#citySearchBar").val().trim();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&units=imperial&appid=2f0eea858680841d20a1b82aaa9fa729")
        
        // Parse it!
        .then(function(response) {
            return response.json();
        })
        // Retrieve lat and lon and pass that into next API to retrieve more specific weather data
        .then(function(response) {

            let lon = response.coord.lon;
            let lat = response.coord.lat;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=2f0eea858680841d20a1b82aaa9fa729")
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {

                    //Dynamically update HTML to display city searched
                    let responseHeader = document.querySelector("#response-header");
                    let date = new Date();
                    responseHeader.innerHTML = "<h2>" + citySearchValue + " " + date + "</h2>";
        
                    // retrieve current days weather information, create containers
                    let weatherDetails = document.createElement("div");
                    weatherDetails.id = 'details';
                    weatherDetails.className = 'details';
        
                    responseHeader.appendChild(weatherDetails);
        
                    let detailsDiv = document.createElement("div")
        
                    let temp = response.current.temp;
                    let wind = response.current.wind_speed;
                    let humidity = response.current.humidity;
                    let uvi = response.current.uvi;
        
        
        
                    detailsDiv.innerHTML = "<p> Temp: " + temp + "&#176F</p>" +
                    "<br />" + 
                    "<p> Wind Speed: " + wind + " MPH</p>" + 
                    "<br />" +
                    "<p> Humidity: " + humidity + "%</p>" +
                    "<br />" +
                    "<p> UV Index: " + uvi + "</p>";
                    
                    // Append current information to parent div for display
                    weatherDetails.appendChild(detailsDiv);

                    // Pass city searched into 5 day weather forecast API
                    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchValue + "&units=imperial&appid=2f0eea858680841d20a1b82aaa9fa729")
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(response) {

                            let fiveDayContainer = document.querySelector("#fiveDayContainer");

                            let futureDetails = document.createElement("div");
                            futureDetails.id = 'futureDetails';
                            futureDetails.className = 'container';

                            fiveDayContainer.appendChild(futureDetails);

                            let dailyDetails = document.createElement("div");
                            dailyDetails.className = "row"

                            //For loop incrementing by 8 to retrieve daily data (API checks every 3 hours), create a card for each
                            for(let i = 0; i <= 32; i += 8) {
                                let dailyDateData = response.list[i].dt;
                                let dailyDate = new Date(dailyDateData * 1000);
                                let dailyTemp = response.list[i].main.temp;
                                let dailyWind = response.list[i].wind.speed;
                                let dailyHum = response.list[i].main.humidity;
                                let weatherIcon = response.list[i].weather.icon;

                                

                                let dailyContainer = document.createElement("div");
                                dailyContainer.className = "col-sm card";

                                let dailyContainerCard = document.createElement("div");
                                dailyContainerCard.className = "card-body";

                                let dailyContainerCardDate = document.createElement("h5");
                                dailyContainerCardDate.className = "card-title";
                                dailyContainerCardDate.innerHTML = dailyDate;

                                let dailyContainerCardInfo = document.createElement("p");
                                dailyContainerCardInfo.className = "card-text";
                                dailyContainerCardInfo.innerHTML = "<p class='card-text'> Temp: " + dailyTemp + "&#176F" +
                                "<br />" + 
                                "Wind: " + dailyWind + " MPH" +
                                "<br />" +
                                "Humidity: " + dailyHum + "%</p>";

                                dailyContainerCard.appendChild(dailyContainerCardDate);
                                dailyContainerCard.appendChild(dailyContainerCardInfo);
                                dailyContainer.appendChild(dailyContainerCard);
                                dailyDetails.appendChild(dailyContainer);
                                futureDetails.appendChild(dailyDetails);
                            };
        
                        })


                })

        })
};











// Event listeners
citySearchBtn.on("click", citySearch);