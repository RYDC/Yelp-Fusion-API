var signedIn = false;
var dohome = function(){ //Generate The Elements Of The Home Page
    //Clear the Work Space
    let workarea = document.getElementById("content");
    workarea.innerHTML = "";

    //Create Header
    let h2 = document.createElement("h2");
    h2.classList = "text-center";
    h2.innerHTML = "Created By Ryan Jbaili";
    workarea.appendChild(h2);

    //Insert a <br> tag
    let br = document.createElement('br');
    workarea.appendChild(br);

    //Create Div for encapsulating Sign-In
    let container = document.createElement("div");
    container.classList = "container d-flex justify-content-center";
    workarea.appendChild(container);

    // If/Else to check if the user is already signed in
    if(signedIn == false){
    //Insert Sign-in button
    let signInButton = document.createElement("button");
    signInButton.classList = "btn btn-primary"
    signInButton.id = "signIn"
    signInButton.innerHTML = "Sign In"
    container.appendChild(signInButton);

    //Insert Sign-Up button
    let signUpButton = document.createElement("button");
    signUpButton.classList = "btn btn-primary"
    signUpButton.id = "signUp"
    signUpButton.innerHTML = "Sign Up"
    container.appendChild(signUpButton);
    }else {
        console.log("Already Signed in");
    }

    document.getElementById('signIn').addEventListener('click', signIn, false);
    document.getElementById('signUp').addEventListener('click', signUp, false);
}

function signUp(){//Creates UI for signing up
    //Clear the Work Space
    let workarea = document.getElementById("content");
    workarea.innerHTML = "";

    let container = document.createElement("div");
    container.classList = "d-flex justify-content-center marginLeftAndRight";
    workarea.appendChild(container);

    let container2 = document.createElement("div");
    container2.classList = "d-flex justify-content-center marginLeftAndRight";
    workarea.appendChild(container2);

    //Insert a <br> tag
    let br = document.createElement('br');
    workarea.appendChild(br);

    let container3 = document.createElement("div");
    container3.classList = "d-flex justify-content-center marginLeftAndRight";
    workarea.appendChild(container3);

    //Username Input
    let usernameInput = document.createElement("input");
    usernameInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    usernameInput.placeholder = "Username";
    container.appendChild(usernameInput);

    //Password Input
    let passwordInput = document.createElement("input");
    passwordInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    passwordInput.placeholder = "Password";
    container2.appendChild(passwordInput);

    let signUpButton2 = document.createElement("button");
    signUpButton2.classList = "btn btn-primary"
    signUpButton2.id = "signUp2"
    signUpButton2.innerHTML = "Sign Up"
    container3.appendChild(signUpButton2);

    document.getElementById('signUp2').addEventListener('click', serverSignUp, false);
}

function signIn(){//creates UI for signing in
    //Clear the Work Space
    let workarea = document.getElementById("content");
    workarea.innerHTML = "";

    let container = document.createElement("div");
    container.classList = "d-flex justify-content-center marginLeftAndRight";
    workarea.appendChild(container);

    let container2 = document.createElement("div");
    container2.classList = "d-flex justify-content-center marginLeftAndRight";
    workarea.appendChild(container2);

    //Insert a <br> tag
    let br = document.createElement('br');
    workarea.appendChild(br);

    let container3 = document.createElement("div");
    container3.classList = "d-flex justify-content-center marginLeftAndRight";
    workarea.appendChild(container3);

    //Username Input
    let usernameInput = document.createElement("input");
    usernameInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    usernameInput.placeholder = "Username";
    container.appendChild(usernameInput);

    //Password Input
    let passwordInput = document.createElement("input");
    passwordInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    passwordInput.placeholder = "Password";
    container2.appendChild(passwordInput);

    let signInButton2 = document.createElement("button");
    signInButton2.classList = "btn btn-primary"
    signInButton2.id = "signIn2"
    signInButton2.innerHTML = "Sign In"
    container3.appendChild(signInButton2);

    document.getElementById('signIn2').addEventListener('click', serverSignIn, false);
}

function serverSignUp() {
    console.log("Starting Server Sign Up");
    var url = "https://lamp.cse.fau.edu/~dbenne11/whendiagram/add_user.php?username="+username+"&pw="+password //Kudos to Daniel for providing an alternative to OAuth
    xmlRequest(url,onGoodRequest,onBadRequest);
}

function onGoodRequest(data){
    console.log("Good Request");
    if(data.accout_creation == success){

    }else {
    
    }
}

function onBadRequest(){
    console.log("Bad Request");
}

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