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

    //Business Image
    let img = document.createElement("img");
    img.classList = "listviewImage";
    img.src = data.image_url;
    li.appendChild(img);
                
    //Header
    let h2 = document.createElement("h2");
    h2.innerHTML = data.name;
    li.appendChild(h2);

    //Favorite Button
    let button = document.createElement("button");
    //button.id = data.businesses[i].id;
    button.setAttribute("id",data.id);
    button.onclick = favoriteItem;
    button.classList = "btn btn-danger"
    li.appendChild(button);

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
    li.appendChild(rating);

    /*let mapDiv = document.createElement('div');
    li.append(mapDiv);
    mapDiv.style.display = "none"
    let map = new Gmap(data.coordinates.latitude,data.coordinates.longitude,14,250,250);
    li.appendChild(map);*/

}

function onFavoriteFailure(){
    console.log("Favorite request failed");
}