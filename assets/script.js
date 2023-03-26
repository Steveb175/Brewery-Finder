//Global Variables
var Putting = document.getElementById("Spaces");
// Function to remove child elements upon fetch
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
    .then(function (response) {
      removeBreweryDivs(); // call the removeBreweryList() function here
      return response.json();
    })
    .then(function (breweryData) {
      console.log(breweryData);
      for (let i = 0; i < breweryData.length; i++) {
        var breweryDiv = document.createElement("div");
        breweryDiv.classList.add(
          "brewery-div",
          "card",
          "has-background-warning-light",
          "m-4"
        );

        // New variables for element creation and adding classes
        var cardContentDiv = document.createElement("div");
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content");
        cardContentDiv.classList.add("card-content");
        var UList = document.createElement("div");
        var AddyDiv = document.createElement("div");
        var breweryName = document.createElement("p");
        breweryName.classList.add("brewery-name");
        var breweryAddressLine1 = document.createElement("div");
        breweryAddressLine1.classList.add("brewery-address-line1");
        var breweryAddressLine2 = document.createElement("div");
        breweryAddressLine2.classList.add("brewery-address-line2");
        var breweryPhone = document.createElement("p");
        var breweryUrlItem = document.createElement("p");
        var breweryUrl = document.createElement("a");
        breweryPhone.classList.add("brewery-phone");
        // Changing text content for these new variables
        breweryName.textContent = breweryData[i].name;
        breweryName.classList.add("brewery-name", "is-size-4");
        breweryAddressLine1.textContent = breweryData[i].street;
        breweryAddressLine2.textContent =
          breweryData[i].city +
          ", " +
          breweryData[i].state +
          " " +
          breweryData[i].postal_code.slice(0, 5);
        breweryPhone.textContent = breweryData[i].phone;
        var phoneNum = breweryData[i].phone;
        if (breweryData[i].phone !== null) {
          var phoneNum = breweryData[i].phone;
          var formattedPhoneNum =
            "(" +
            phoneNum.slice(0, 3) +
            ") " +
            phoneNum.slice(3, 6) +
            "-" +
            phoneNum.slice(6, 10);
          breweryPhone.textContent = formattedPhoneNum;
        }
        breweryUrl.textContent = breweryData[i].website_url;
        breweryUrl.href = breweryData[i].website_url;
        // Appending these new variables to the HTML so that they are visible
        breweryUrlItem.appendChild(breweryUrl);
        UList.appendChild(breweryName);
        AddyDiv.appendChild(breweryAddressLine1);
        AddyDiv.appendChild(breweryAddressLine2);
        UList.appendChild(AddyDiv);
        UList.appendChild(breweryPhone);
        UList.appendChild(breweryUrlItem);
        contentDiv.appendChild(UList);
        cardContentDiv.appendChild(contentDiv);
        breweryDiv.appendChild(cardContentDiv);
        Putting.appendChild(breweryDiv);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
// Function to display weather icon and pull temperature
function showWeather() {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=4f532c03f12a6d8603036fbfb4f2b105&units=imperial";
  var cityInput = document.querySelector("#city-input");
  city = cityInput.value;
  fetch(weatherUrl, {})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //spit out the weather to the appropriate place. data.main.temp + "°F"
      var iconUrl =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png";
      function changeBackground() {
        document.body.style.background = `#f3f3f3 url(${iconUrl}) no-repeat right top fixed`;
        document.body.style.backgroundPosition = "right 0px top 270px";
      }
      changeBackground();
      var Temp = document.querySelector("#temp");
      Temp.textContent = data.main.temp + "°F";
      console.log(data);
    });
}

var searchBtn = document.getElementById("city-search-btn");
searchBtn.addEventListener("click", function () {
  displayBreweries();
  showWeather();
});

// Enter key event listener
var cityInput = document.querySelector("#city-input");
cityInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});
