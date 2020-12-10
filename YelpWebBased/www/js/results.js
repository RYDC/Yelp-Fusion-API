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

                //Business Image
                let img = document.createElement("img");
                img.classList = "listviewImage";
                img.src = data.businesses[i].image_url;
                li.appendChild(img);
                
                //Header
                let h2 = document.createElement("h2");
                h2.innerHTML = data.businesses[i].name;
                li.appendChild(h2);

                //Favorite Button
                let button = document.createElement("button");
                //button.id = data.businesses[i].id;
                button.setAttribute("id",data.businesses[i].id);
                button.onclick = favoriteItem;
                button.innerHTML = "Favorite";
                li.appendChild(button);

                //Rating
                let rating = document.createElement("p");
                rating.innerHTML = data.businesses[i].rating+"/5";
                li.appendChild(rating);



        }
        
}

function favoriteItem() {//Favorite an item and unfavorite an item
        var username = sessionStorage.getItem("username");
        var id = this.getAttribute("id");
        var user_data = localStorage.getItem(username);
        //console.log(user_data);
        let isAdded = false; //Checker to see if an item is already favorited
        
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