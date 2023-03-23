//Global Variables
var breweryList = document.querySelector("#brewery-container");
var breweryAddresses = document.querySelector("#brewery-addresses");
var city;

// Function to store city name
// function storeCity() {
//   localStorage.setItem("cityName", city);
// }

// Function to remove child elements upon fetch
function removeBreweryList() {
  var currentBreweryListItems = document.getElementsByClassName(
    "brewery-list-item"
  );
  while (currentBreweryListItems.length > 0) {
    currentBreweryListItems[0].parentNode.removeChild(
      currentBreweryListItems[0]
    );
  }
}

function removeBreweryAddresses() {
  var currentAddressListItems = document.getElementsByClassName(
    "address-list-item"
  );
  while (currentAddressListItems.length > 0) {
    currentAddressListItems[0].parentNode.removeChild(
      currentAddressListItems[0]
    );
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
      removeBreweryList(); // call the removeBreweryList() function here
      removeBreweryAddresses(); //and addresses
      return response.json();
    })
    .then(function(breweryData) {
      console.log(breweryData);
      for (let i = 0; i < breweryData.length; i++) {
        var breweryDiv = document.createElement("div");
        breweryDiv.classList.add("brewery-div");
        for (let i = 0; i < breweryData.length; i++) {
          var breweryName = document.createElement("li");
          var breweryAddress = document.createElement("li");
          var breweryPhone = document.createElement("li");
          breweryName.textContent = breweryData[i].name;
          breweryAddress.textContent = breweryData[i].street;
          breweryPhone.textContent = breweryData[i].phone;
          breweryDiv.appendChild(breweryName);
          breweryDiv.appendChild(breweryAddress);
          breweryDiv.appendChild(breweryPhone);
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
