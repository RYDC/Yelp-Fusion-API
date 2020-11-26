var dosearch = function(){ //Generate The Elements of the Search Page
        //Clear the Work Space
        let workarea = document.getElementById("content");
        workarea.innerHTML = "";

        //Create a container for input elements
        let container = document.createElement("div");
        container.classList = "d-flex justify-content-center marginLeftAndRight";
        workarea.appendChild(container);

        //Service Input
        let serviceInput = document.createElement("input");
        serviceInput.classList = "form-control col-sm-2";
        serviceInput.placeholder = "food, takeout, delivery, home services";
        container.appendChild(serviceInput);

        //Location Input
        let locationInput = document.createElement("input");
        locationInput.classList = "form-control col-sm-2";
        locationInput.id = "locationInput";
        locationInput.placeholder = "city, zip";
        container.appendChild(locationInput);

        //Locate Button
        let locateBtn = document.createElement("button");
        locateBtn.id = "locateBtn";
        locateBtn.classList = "btn btn-light btn-outline-secondary"
        container.appendChild(locateBtn);

        let locateIcon = document.createElement("icon");
        locateIcon.classList = "fa fa-map-marker";
        locateBtn.appendChild(locateIcon);

        //Insert a <br> tag
        let br = document.createElement('br');
        workarea.appendChild(br);

        //Create a container for the search button
        let container2 = document.createElement("div");
        container2.classList = "d-flex justify-content-center";
        workarea.appendChild(container2);

        //Search Button
        let searchBtn = document.createElement("button");
        searchBtn.classList = "btn btn-outline-primary my-2 my-sm-0 d-flex justify-content-center";
        searchBtn.innerHTML = "Search"
        container2.appendChild(searchBtn);

        document.getElementById('locateBtn').addEventListener('click', getLocation, false);
}

function getLocation() {
        console.log("We made it in here");
        navigator.geolocation.getCurrentPosition(onLocationSuccess,onLocationError,{
        enableHighAccuracy: true,
        timeout: 30000}
     );
}

function onLocationSuccess(p){
        console.log("We made it in here 2");
        var lon = p.coords.longitude;
        var lat = p.coords.latitude; 
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyACAhJEtzavzYcAVGOcompcN3l4syWO-nk";
        console.log(url);
        xmlRequest(url,onLocationSuccess2,onLocationError2);
    };
    
function onLocationError(e){
        alert("Error getting location");
    }

function onLocationSuccess2(data) {
        console.log("We made it in here 3");
        let string = data.results[0].formatted_address;
        console.log(string);
        let input = document.getElementById("locationInput");
        input.value = string;
}

function onLocationError2(){
        console.log("Failed");
}
    