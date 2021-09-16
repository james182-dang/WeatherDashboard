// DOM elements
let citySearchBtn = $("#citySearchBtn");

// Base functionality

function citySearch() {

    let citySearchValue = $("#citySearchBar").val().trim();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue + "&appid=2f0eea858680841d20a1b82aaa9fa729")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            let responseHeader = document.querySelector("#response-header");
            responseHeader.innerHTML = "<h2>" + citySearchValue + "</h2>";

        })
}











// Event listeners
citySearchBtn.on("click", citySearch);