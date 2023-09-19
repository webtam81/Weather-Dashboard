//VARIABLES
let latitude;
let longitude;
let queryURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=d1812ca69b57b9e8fd8ff23d673f0f07';
let searchInput;
let searchBtn = $('#search-button');
//let locationsArray = ['Birmingham', 'Toronto', 'Aberdeen']; //TODO change to empty
let locationsArray = [];
let searchHistoryEl = $('#history');

//FUNCTIONS
//add location to side bar
function addLocation () {
    //add this to array
    locationsArray.push(searchInput);
    console.log(locationsArray);
    //create button
    let newButton = $('<button>');
    newButton.addClass('location');
    newButton.text(searchInput);
    searchHistoryEl.append(newButton);
    saveLocations ();
}

//render locations already in array
function renderLocations () {
    getLocations ();
    console.log(locationsArray);
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


//EVENT LISTENERS
//search button
//TODO - generate lat/long
searchBtn.on('click', function() {
    event.preventDefault();
    searchInput = $('#search-input').val();
    console.log(`You searched ${searchInput}`); //TODO rm
    
    //create button from this and add to aside
    addLocation (); 
});

//TODO

//DONE

//NOTES
//query url needs latitude and longitude. city name will be entered on the web page. use api to translate city to lat/lond and put in variables for this url
//searched cities go in left column and creates a button
//when these buttons are clicked the weather info goes in the right
//store it all in local storage

//TESTS / TEMP
renderLocations ();