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
        locationInput.placeholder = "city, zip";
        container.appendChild(locationInput);

        //Locate Button
        let locateBtn = document.createElement("button");
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
}