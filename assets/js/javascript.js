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
        
        
        
                    detailsDiv.innerHTML = "<h2> Temp: " + temp + "&#176F</h2>" +
                    "<br />" + 
                    "<h2> Wind Speed: " + wind + " MPH</h2>" + 
                    "<br />" +
                    "<h2> Humidity: " + humidity + "%</h2>" +
                    "<br />" +
                    "<h2> UV Index: " + uvi + "</h2>";
                    
                    weatherDetails.appendChild(detailsDiv);

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

                            for(let i = 0; i <= 4; i++) {
                                let dailyDate = response.list[i].dt;
                                let dailyTemp = response.list[i].main.temp;
                                let dailyWind = response.list[i].wind.speed;
                                let dailyHum = response.list[i].main.humidity;

                                

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
                            }
        
                        })


                })

        })
}











// Event listeners
citySearchBtn.on("click", citySearch);