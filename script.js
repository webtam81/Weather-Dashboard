//VARIABLES
let latitude;
let longitude;
let queryURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=d1812ca69b57b9e8fd8ff23d673f0f07';
let searchInput;
let searchBtn = $('#search-button');
let locations = ['Birmingham', 'Toronto', 'Aberdeen']; //TODO change to empty
let searchHistoryEl = $('#history');

//FUNCTIONS
function addLocation () {

}

function renderLocations () {
    console.log(locations);
    if (locations.length < 1) {
        return;
    } else {
        for (let i = 0; i < locations.length; i++) {
            let newButton = $('<button>');
            newButton.addClass('location');
            newButton.text(locations[i]);
            searchHistoryEl.append(newButton);
        }
    }
}

function saveLocations () {
    //save locations to localstorage
}

function getLocations () {
    //get locations from localstorage
}


//EVENT LISTENERS
searchBtn.on('click', function() {
    event.preventDefault();
    searchInput = $('#search-input').val();
    console.log(`You searched ${searchInput}`);
    //add this to local storage
    //create button from this and add to aside
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