//Global Variables
var breweryList = document.querySelector("#brewery-container");
var city;

// Function to store city name
function storeCity() {
  var cityInput = document.querySelector("#city-input");
  city = cityInput.value;
  localStorage.setItem("cityName", city);
}

// Function to remove child elements upon fetch
function removeBreweryList() {
  var currentBreweryListItems =
    document.getElementsByClassName("brewery-list-item");
  while (currentBreweryListItems.length > 0) {
    currentBreweryListItems[0].parentNode.removeChild(
      currentBreweryListItems[0]
    );
  }
}

// Fetch and display breweries in chosen city's area
function displayBreweries() {
  city = localStorage.getItem("cityName").replace(" ", "_");
  var breweryUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city;
  fetch(breweryUrl, {})
    .then(function (response) {
      removeBreweryList(); // call the removeBreweryList() function here
      return response.json();
    })
    .then(function (breweryData) {
      console.log(breweryData);
      for (let i = 0; i < breweryData.length; i++) {
        var breweryListItem = document.createElement("li"); // create a new element for each brewery
        breweryListItem.classList.add("brewery-list-item");
        breweryListItem.textContent = breweryData[i].name;
        breweryList.appendChild(breweryListItem);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
