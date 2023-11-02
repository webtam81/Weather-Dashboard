//VARIABLES
let latitude;
let longitude;
let searchInput;
let geocodedLocation;

let queryURL;
let geocodingURL;

let generatedLocations = new Array(); //array to store results of initial location search
let locationsArray = []; //array to hold stored locations
let selectedCity = [];

let searchHistoryEl = $('#history');
let searchBtn = $('#search-button');

//FUNCTIONS
//add location to side bar
function addLocation () {
    //add this to array...........??? what?
    if (searchInput == '') {
        return;
    } else {
        locationsArray.push(searchInput); //update this to selectedCity
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
            newButton.addClass('location');
            //attributes for lat/long required
            newButton.text(locationsArray[i]);
            searchHistoryEl.append(newButton);
        }
    }
}

//save array to local storage
function saveLocations () {
    //save locations to localstorage
    localStorage.setItem('savedlocations',JSON.stringify(locationsArray));
}

//get array from local storage
function getLocations () {
    //get locations from localstorage
    if (localStorage.getItem('savedlocations')) {
        locationsArray = JSON.parse(localStorage.getItem('savedlocations'));
    }
}

//generate list of locations that match search
function generateLocations() {
    generatedLocations = [];
    geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=10&appid=d1812ca69b57b9e8fd8ff23d673f0f07'

    fetch(geocodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data); //TODO rm
            console.log(data.length); //TODO rm
            
            //if (data.length > 1) {
                for (i = 0; i < data.length; i++) {
                    //generatedLocations.push(data[i].name + ',' + data[i].state + ',' + data[i].country)
                    generatedLocations.push([data[i].name, data[i].state, data[i].country, data[i].lat, data[i].lon]);
                }
                console.log(generatedLocations);
                //do some stuff for user to select the right one
                //console.log(generatedLocations);
                //selectedLocation = generatedLocations[0]; //temporary
            //}
           // else {
                //go straight to geocode. do not pass go. do not collect £200
            //    selectedLocation = data[0].name + ',' + data[0].state + ',' + data[0].country;
                geocodeLocation();
           // }
           
        })
        .catch(function (error) {
            console.error(`This location has not been recognised, please try again.`, error);
        });
}

function chooseCity() {
    //
}

function geocodeLocation() {
    console.log('selected city:' + selectedCity);
    latitude = generatedLocations[0][3];
    longitude = generatedLocations[0][4];
    queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=d1812ca69b57b9e8fd8ff23d673f0f07';
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data2) {

        console.log('weather data:' + data2);
    
    })
    .catch(function (error) {
        console.error(`ERRRRRORRRRRRR!!!!!!!!!!!!`, error);
    });
}


//EVENT LISTENERS
//search button - generate location list
searchBtn.on('click', function() {
    event.preventDefault();
    searchInput = $('#search-input').val().trim();
    //console.log(`You searched ${searchInput}`); //TODO rm
    //TODO replace spaces with underscores or percentage 20 thing
    generateLocations();
    
    //move these somewhere else
    //geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + geocodedLocation + '&limit=10&appid=d1812ca69b57b9e8fd8ff23d673f0f07';
    //geocodeLocation ();
    //onsole.log(`Geocoding URL: ${geocodingURL}`); //TODO rm
    
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