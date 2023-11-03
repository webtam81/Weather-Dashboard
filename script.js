//VARIABLES
const today = dayjs();

let latitude;
let longitude;
let searchInput;

let queryURL;
let geocodingURL;

let generatedLocation = []; //array to hold location name, lat long
let locationsArray = []; //array to hold stored locations
let forecastData; //forecast data from api
let forecastDataArray = []; //new array for selected forecast data

let searchHistoryEl = $('#history');
let searchBtn = $('#search-button');

//FUNCTIONS
//add location to side bar
function addLocation () {
    if (searchInput == '') {
        return;
    } else {
        //TODO check if location alread in array. don't add it if it is but do search it
        locationsArray.push(searchInput); 
        //create button and add to side bar
        let newButton = $('<button>');
        newButton.addClass('location');
        newButton.text(searchInput);
        searchHistoryEl.prepend(newButton);
        saveLocations ();
    }
}

//render locations already in array
function renderLocations () {
    getLocations ();
    //console.log(locationsArray);
    if (locationsArray.length < 1) {
        return;
    } else {
        for (let i = 0; i < locationsArray.length; i++) {
            let newButton = $('<button>');
            newButton.addClass('location')
            .attr('value',locationsArray[i])
            //attributes for lat/long required
            newButton.text(locationsArray[i]);
            searchHistoryEl.append(newButton);
        }
    }
}

//save locations array to local storage
function saveLocations () {
    localStorage.setItem('savedlocations',JSON.stringify(locationsArray));
}

//get locations from localstorage and put them into locationsArray
function getLocations () {
    if (localStorage.getItem('savedlocations')) {
        locationsArray = JSON.parse(localStorage.getItem('savedlocations'));
    }
}

//generate matched location
function generateLocation() {
    generatedLocation = [];
    geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=1&appid=d1812ca69b57b9e8fd8ff23d673f0f07'
    //console.log(geocodingURL);//todo rm
    fetch(geocodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data); //TODO rm
            //console.log(data.length); //TODO rm
            generatedLocation.push(data[0].name, data[0].state, data[0].country, data[0].lat, data[0].lon);
            //console.log(generatedLocation);
            geocodeLocation();
        })
        .catch(function (error) {
            console.error(`This location has not been recognised, please try again.`, error);
        });
}

function geocodeLocation() {
    latitude = generatedLocation[3];
    longitude = generatedLocation[4];
    queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=d1812ca69b57b9e8fd8ff23d673f0f07';
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecastData = data;
            generateForecast();
    })
    .catch(function (error) {
        console.error(`Error finding location`, error);
    });
}

function generateForecast() {
    console.log(forecastData);

    //The city name
    //The date
    //An icon representation of weather conditions
    //The temperature
    //The humidity
    //The wind speed

    let forecastCity = '';
    let forecastDate = today;
    let forecastWeather = '';
    let forecastHumidity = '';




    //forecastDataArray[0][1] = forecastData.city.name;

    console.log(forecastData.city.name);
    console.log(today.format('D/M/YYYY'));
    console.log(forecastData.list[0].weather[0].icon)
    console.log(forecastData.list[0].weather[0].main)
    console.log(forecastData.list[0].main.humidity)
    console.log(forecastData.list[0].main.humidity)
    console.log(forecastData.list[0].wind.speed)

    //console.log(forecastDataArray);

        //The date
    //An icon representation of weather conditions
    //The temperature
    //The humidity

    let futureData;

}

//EVENT LISTENERS
//search button - generate location list
searchBtn.on('click', function() {
    event.preventDefault();
    searchInput = $('#search-input').val().trim();
    searchInputCleaned = searchInput.replace(/ /g, '%20');
    //console.log(`You searched ${searchInput}`); //TODO rm
    //TODO replace spaces with underscores or percentage 20 thing
    generateLocation();
    
    //create button from this and add to aside
    addLocation (); // do I want this here?
});

//re-search button

//separate 

//TODO
//error checking for Cities??

//DONE
//searched cities go in left column and creates a button

//NOTES
//query url needs latitude and longitude. city name will be entered on the web page. use api to translate city to lat/lond and put in variables for this url
//when these buttons are clicked the weather info goes in the right
//store it all in local storage


//TESTS / TEMP
renderLocations ();