var doresults = function(data) {//Print the Results of the search
        //Clear the Work Space
        let workarea = document.getElementById("content");
        workarea.innerHTML = "";
        console.log(data.businesses[0].alias);
        console.log(data.businesses.length);
        
        //Create container for business
        let ul = document.createElement("ul");
        ul.classList = "list-group";
        workarea.appendChild(ul);
        
        for(var i = 0;i<data.businesses.length;i++){
                //Create container for business
                let li = document.createElement("li");
                li.classList = "list-group-item";
                ul.appendChild(li);

                //Header
                let h2 = document.createElement("h2");
                h2.innerHTML = data.businesses[i].name;
                li.appendChild(h2);

                //Container for Image and Map
                let container = document.createElement("div");
                container.classList = "d-flex";
                li.appendChild(container);

                //Business Image
                let img = document.createElement("img");
                img.classList = "listviewImage";
                img.src = data.businesses[i].image_url;
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
                button.setAttribute("id",data.businesses[i].id);

                var username = sessionStorage.getItem("username");
                var user_data = localStorage.getItem(username);
                if(user_data!= null){
                        user_data = JSON.parse(user_data);
                        //console.log("Entered1");
                        //console.log(user_data.favorites.length);
                        for(var j = 0; j <= user_data.favorites.length;j++){  //Matching System to check if an item is favorited
                                //console.log(user_data.favorites[j]+ " and " + data.businesses[i].id);
                                //console.log("Entered2");
                                if(user_data.favorites[j] == data.businesses[i].id){
                                        button.classList = "btn btn-danger";
                                        //console.log("match");
                                        break;
                                }else {
                                        button.classList = "btn";
                                }
                        }
                        //console.log("Entered3");
                }else {
                        button.classList = "btn";
                }
                button.onclick = favoriteItem;
                container2.appendChild(button);

                let favIcon = document.createElement("icon");
                favIcon.classList = "fa fa-heart";
                button.appendChild(favIcon);

                //Insert NBSP
                let NBSP = document.createElement("p");
                NBSP.innerHTML = "&nbsp;";
                container2.appendChild(NBSP);

                //Rating System
                let rating = document.createElement("p");
                for(let counter = data.businesses[i].rating;counter>0;counter--){
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

                let mapDiv = document.createElement('div');//Map
                li.append(mapDiv);
                mapDiv.style.display = "none"
                let map = new Gmap(data.businesses[i].coordinates.latitude,data.businesses[i].coordinates.longitude,15,175,175,data.businesses[i].location.display_address);
                container.appendChild(map);

                let address = document.createElement("p");
                address.innerHTML = "Address: "+data.businesses[i].location.display_address;
                li.appendChild(address);

                let phone = document.createElement("p");
                phone.innerHTML = "Phone: " + data.businesses[i].display_phone;
                li.appendChild(phone);

                let openClosed = document.createElement("p");
                if(data.businesses[i].is_closed == false){
                        openClosed.style.color = "green";
                        openClosed.innerHTML = "Open";
                }else {
                        openClosed.style.color = "Red";
                        openClosed.innerHTML = "Closed";
                }
                li.appendChild(openClosed);

        }
        
}

function favoriteItem() {//Favorite an item and unfavorite an item
        var username = sessionStorage.getItem("username");
        var id = this.getAttribute("id");
        //this.setAttribute("class","btn btn-danger");
        var user_data = localStorage.getItem(username);
        //console.log(user_data);
        let isAdded = false; //Checker to see if an item is already favorited
        if(this.getAttribute("class") == "btn btn-danger"){
                this.setAttribute("class","btn");
        }else {
                this.setAttribute("class","btn btn-danger");
        }
        
        if (user_data == null) {
                user_data = {favorites: []}
            }
        else {
                user_data = JSON.parse(user_data);
        }

        //console.log(user_data);
        for(var i = 0;i<user_data.favorites.length;i++){
                if(user_data.favorites[i] == id){
                        user_data.favorites.splice(i,1);
                        isAdded = true;
                }
        }
        if(isAdded == false){
        user_data.favorites.push(id);
        }
        user_data = JSON.stringify(user_data);
        localStorage.setItem(username, user_data);
}