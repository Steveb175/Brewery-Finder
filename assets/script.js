//Global Variables

// Function to remove child elements upon fetch
function removeBreweryList() {
  var currentBreweryListItems = document.getElementsByClassName("brewery-div");
  while (currentBreweryListItems.length > 0) {
    currentBreweryListItems[0].parentNode.removeChild(
      currentBreweryListItems[0]
    );
  }
}

function removeBreweryDivs() {
  var currentBrewDiv = document.getElementsByClassName("brewery-div");
  while (currentBrewDiv.length > 0) {
    currentBrewDiv[0].parentNode.removeChild(currentBrewDiv[0]);
  }
}
// Fetch and display breweries in chosen city's area
function displayBreweries() {
  var cityInput = document.querySelector("#city-input");
  city = cityInput.value;
  // city = localStorage.getItem("cityName").replace(" ", "_");
  var breweryUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city;

  fetch(breweryUrl, {})
    .then(function(response) {
      removeBreweryDivs(); // call the removeBreweryList() function here

      return response.json();
    })
    .then(function(breweryData) {
      console.log(breweryData);
      for (let i = 0; i < breweryData.length; i++) {
        var breweryDiv = document.createElement("div");
        breweryDiv.classList.add("brewery-div");
        for (let i = 0; i < breweryData.length; i++) {
          var UList = document.createElement("ul");
          var breweryName = document.createElement("li");
          var breweryAddress = document.createElement("li");
          var breweryPhone = document.createElement("li");
          breweryName.textContent = breweryData[i].name;
          breweryAddress.textContent = breweryData[i].street;
          breweryPhone.textContent = breweryData[i].phone;
          UList.appendChild(breweryName);
          UList.appendChild(breweryAddress);
          UList.appendChild(breweryPhone);
          breweryDiv.appendChild(UList);
        }
      }
    })
    .catch(function(error) {
      console.error(error);
    });
}

function showWeather() {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=4f532c03f12a6d8603036fbfb4f2b105";
  var cityInput = document.querySelector("#city-input");
  city = cityInput.value;
  fetch(weatherUrl, {})
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //spit out the weather to the appropriate place. data.main.temp + "°F"
      console.log(data);
    });
}
var searchBtn = document.getElementById("city-search-btn");
searchBtn.addEventListener("click", displayBreweries);
searchBtn.addEventListener("click", showWeather);

//<script>
// function myFunction() {
//   document.body.style.background = "#f3f3f3 url('img_tree.png') no-repeat right top";
// }
// </script>
