//VARIABLES
let latitude;
let longitude;
let searchInput;
let geocodedLocation;

let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=d1812ca69b57b9e8fd8ff23d673f0f07';
let geocodingURL;

let searchBtn = $('#search-button');
//let locationsArray = ['Birmingham', 'Toronto', 'Aberdeen']; //TODO change to empty
let locationsArray = [];
let searchHistoryEl = $('#history');

//FUNCTIONS
//add location to side bar
function addLocation () {
    //add this to array
    if (searchInput == '') {
        return;
    } else {
        locationsArray.push(searchInput);
        //console.log(locationsArray); //TODO rm
        //create button and add to side bar
        let newButton = $('<button>');
        newButton.addClass('location');
        newButton.text(searchInput);
        searchHistoryEl.append(newButton);
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


function geocodeLocation () {
    fetch(geocodingURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {

    console.log(data);

    console.log(data.length);

    geocodedLocation = data[0].name + ',' + data[0].state + ',' + data[0].country;

    if (data.length > 1) {
        //put them in an array
    }
    else {
        //select this result
    }
    

    //let geoResult = 
    //new array for possible geocode options
    //populate an autopopulate.....? Or a dropdown.....?

   /*let geocodeResultsArray;   
    for (let i = 0; i < data.length; i++) {
          //geocodeResultsArray.push(data.name)
    }
    console.log(geocodeResultsArray);*/
    })
    .catch(function (error) {
        console.error(`This location has not been recognised, please try again.`, error);
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
    c//onsole.log(`Geocoding URL: ${geocodingURL}`); //TODO rm
    
    //create button from this and add to aside
    addLocation (); 
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