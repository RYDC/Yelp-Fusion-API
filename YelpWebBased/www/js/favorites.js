var dofavorites = function() {
    //Clear the Work Space
    let workarea = document.getElementById("content");
    workarea.innerHTML = "";

    //Create container for business
    let ul = document.createElement("ul");
    ul.classList = "list-group";
    ul.id = "ul"
    workarea.appendChild(ul);

    var username = sessionStorage.getItem("username");
    var user_data = localStorage.getItem(username);
    user_data = JSON.parse(user_data);
    //console.log(user_data.favorites.length);
    //console.log(user_data);
    if(user_data == null){
        console.log("Favorites not yet initialized");
    }else {
        for(let i = 0;i<user_data.favorites.length;i++)
        {
            var id = user_data.favorites[i];
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            var url = "https://api.yelp.com/v3/businesses/"+id;
            console.log(url);
            xmlYelpRequest(proxyurl + url,onFavoriteSuccess,onFavoriteFailure);
        }
    }
}

function onFavoriteSuccess(data){
    let ul = document.getElementById("ul");
    console.log(data);

    //Create container for business
    let li = document.createElement("li");
    li.classList = "list-group-item";
    ul.appendChild(li);
                
    //Header
    let h2 = document.createElement("h2");
    h2.innerHTML = data.name;
    li.appendChild(h2);

    //Container for Image and Map
    let container = document.createElement("div");
    container.classList = "d-flex";
    li.appendChild(container);

    //Business Image
    let img = document.createElement("img");
    img.classList = "listviewImage";
    img.src = data.image_url;
    container.appendChild(img);

    //Insert a <br> tag
    let br = document.createElement('br');
    li.appendChild(br);

    //Container for Favorite and Ratings
    let container2 = document.createElement("div");
    container2.classList = "d-flex";
    li.appendChild(container2);

    //Favorite Button
    let button = document.createElement("button");
    //button.id = data.businesses[i].id;
    button.setAttribute("id",data.id);
    button.onclick = favoriteItem;
    button.classList = "btn btn-danger"
    container2.appendChild(button);

    let favIcon = document.createElement("icon");
    favIcon.classList = "fa fa-heart";
    button.appendChild(favIcon);

    //Rating
    let rating = document.createElement("p");
    for(let counter = data.rating;counter>0;counter--){
        //console.log(counter);
        let span = document.createElement("span");
        if(counter>1){
                span.classList = "fa fa-star checked"
        }else if(counter>0.5){
                span.classList = "fa fa-star-half"
        }else {
                //console.log("nostar");
        }
        rating.append(span);
}
    rating.classList+= "paddingtop";
    container2.appendChild(rating);

    //Creating Map
    let mapDiv = document.createElement('div');
    li.append(mapDiv);
    mapDiv.style.display = "none"
    let map = new Gmap(data.coordinates.latitude,data.coordinates.longitude,14,175,175,data.location.display_address);
    container.appendChild(map);

    //Address
    let address = document.createElement("p");
    address.innerHTML = "Address: "+data.location.display_address;
    li.appendChild(address);

    //Phone
    let phone = document.createElement("p");
    phone.innerHTML = "Phone: " + data.display_phone;
    li.appendChild(phone);

    //If Else to determine if a business is closed/open
    let openClosed = document.createElement("p");
    if(data.is_closed == false){
            openClosed.style.color = "green";
            openClosed.innerHTML = "Open";
    }else {
            openClosed.style.color = "Red";
            openClosed.innerHTML = "Closed";
    }
    li.appendChild(openClosed);

}

function onFavoriteFailure(){
    console.log("Favorite request failed");
}