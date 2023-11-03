//VARIABLES
const today = dayjs();

let latitude;
let longitude;
let searchInput; //input from search box

let queryURL; 
let geocodingURL;

let generatedLocation = []; //array to hold location name, lat, long
let locationsArray = []; //array to hold stored locations
let forecastData; //all forecast data from api
let forecastDataArray = []; //new array for selected forecast data for current day

let searchHistoryEl = $('#history');
let searchBtn = $('#search-button');
let todayEl = $('#today');
let forecastEl = $('#forecast');

//FUNCTIONS
//add location to side bar
function addLocation () {
    if (($.inArray(searchInput, locationsArray)) === 0) { 
        return; 
    }
    else {
        locationsArray.unshift(searchInput); 
        //create button and add to side bar
        let newButton = $('<button>');
        newButton.addClass('location btn btn-secondary')
        .text(searchInput)
        .attr('value',searchInput);
        searchHistoryEl.prepend(newButton);
        saveLocations ();
    }
}

//render locations already in array
function renderLocations () {
    getLocations ();
    if (locationsArray.length < 1) {
        return;
    } else {
        for (let i = 0; i < locationsArray.length; i++) {
            let newButton = $('<button>');
            newButton.addClass('location btn btn-secondary')
            .attr('value',locationsArray[i])
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
    fetch(geocodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            generatedLocation.push(data[0].name, data[0].state, data[0].country, data[0].lat, data[0].lon);
            geocodeLocation();
            addLocation();
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
    //console.log(forecastData); todo RM

    //populate todays forecast array
    //0: Date, 1: City, 2: Icon of weather conditions, 4: Weather condition for alt text, 5: temperature rounded to 2 dp, 5: humidity, 6: wind speed
    forecastDataArray[0] = forecastData.city.name;
    forecastDataArray[1] = today.format('D/M/YYYY');
    forecastDataArray[2] = forecastData.list[0].weather[0].icon;
    forecastDataArray[3] = forecastData.list[0].weather[0].main;
    forecastDataArray[4] = Math.round(((parseInt(forecastData.list[0].main.temp) - 273.15) + Number.EPSILON) * 100) / 100;
    forecastDataArray[5] = forecastData.list[0].main.humidity;
    forecastDataArray[6] = forecastData.list[0].wind.speed;

    console.log(forecastDataArray); //TODO rm

    //Get the midday results for next 5 days and put them into a new array 'fiveDayArray'
    let futureData = forecastData.list;
    let fiveDayArray = [];

    for (let j = 0; j < futureData.length; j++) {
        let weatherTime = futureData[j].dt_txt;
        weatherTimeHr = parseInt(dayjs(weatherTime).format('H'));

        if (weatherTimeHr === 12) {
            fiveDayArray.push(futureData[j]);
        }
    console.log(fiveDayArray);//TODO rm
    }

    let fiveDayForecastArray = [];
    //0: Date, 1: Icon of weather conditions, 2: Weather condition for alt text, 3: temperature, 4: wind, 5: humidity
    for (let k = 0; k < fiveDayArray.length; k++) {
        fiveDayForecastArray.push([dayjs(fiveDayArray[k].dt_txt).format('D/M/YYYY'),
        fiveDayArray[k].weather[0].icon,
        fiveDayArray[k].weather[0].main,
        Math.round(((parseInt(fiveDayArray[k].main.temp) - 273.15) + Number.EPSILON) * 100) / 100,
        fiveDayArray[k].wind.speed,
        fiveDayArray[k].main.humidity])
    }

    console.log(fiveDayForecastArray);

    //generate html for 5 day array
    for (let n = 0; fiveDayForecastArray.length; n++) {
        let newBlockEl = $('<article>');
        let weatherImg = $('<img>');
        weatherImg.attr('src','https://openweathermap.org/img/wn/'+fiveDayForecastArray[n][1]+'.png')
        .attr('alt',fiveDayForecastArray[n][2])
        newBlockEl.addClass('col')
        .append('<h4>' + fiveDayForecastArray[n][0]+ '</h4>')
        .append(weatherImg)
        .append('<p>Temp: ' + fiveDayForecastArray[n][3]+ '\xB0C</p>')
        .append('<p>Wind: ' + fiveDayForecastArray[n][4]+ 'm/s')
        .append('<p>Humidity: ' + fiveDayForecastArray[n][5]+ '%</p>');
        forecastEl.append(newBlockEl);
    }
}

//EVENT LISTENERS
//search button - generate location list
searchBtn.on('click', function() {
    event.preventDefault();
    searchInput = $('#search-input').val().trim();
    searchInputCleaned = searchInput.replace(/ /g, '%20');

    if (searchInput === '' || searchInput === undefined || searchInput === null) {
        console.log('no location entered');
        return;
    } 
    else {
        generateLocation();
    }
});

//re-search button


//TODO
//when buttons are clicked the weather info goes in the right

//TESTS / TEMP
renderLocations ();