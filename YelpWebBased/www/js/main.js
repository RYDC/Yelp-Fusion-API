document.addEventListener("DOMContentLoaded", function(){
    dohome();
    document.getElementById('signout').addEventListener('click', signOut, false);
    document.getElementById('search').addEventListener('click', dosearch, false);
});

function xmlRequest(url,onSuccess,onFailure){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          onSuccess(JSON.parse(this.responseText));        
        }
        else if(this.readyState == 4){
            onFailure(this.status);
        }
      };

    request.open("GET", url, true);
    request.send();
    
}

function xmlYelpRequest(url,onSuccess,onFailure){
    var request = new XMLHttpRequest();
    var apikey =  "YFEeJv16VGhUxHisZ-7xc6JGmAWFZbJJf2XGA61NYrIn-pxd-n_i0NXzWcAohSZ0UQh2nx47JMvYHtBzhcP7hen0vnkvpvYGpAz2YJgCRFhwuXYbJEauUFYckmunX3Yx";

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          onSuccess(JSON.parse(this.responseText));        
        }
        else if(this.readyState == 4){
            onFailure(this.status);
        }
      };

    request.open("GET", url, true);
    request.setRequestHeader("Authorization", "Bearer " + apikey);
    request.send();
    
}