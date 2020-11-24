var signedIn = false;
var username = ""
var password = ""
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
    usernameInput.id = "usernameSignUp";
    usernameInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    usernameInput.placeholder = "Username";
    container.appendChild(usernameInput);

    //Password Input
    let passwordInput = document.createElement("input");
    passwordInput.id = "passwordSignUp";
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
    usernameInput.id = "usernameSignIn";
    usernameInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    usernameInput.placeholder = "Username";
    container.appendChild(usernameInput);

    //Password Input
    let passwordInput = document.createElement("input");
    passwordInput.id = "passwordSignIn"
    passwordInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    passwordInput.placeholder = "Password";
    container2.appendChild(passwordInput);

    let signInButton2 = document.createElement("button");
    signInButton2.classList = "btn btn-primary"
    signInButton2.id = "signIn2"
    signInButton2.innerHTML = "Sign In"
    container3.appendChild(signInButton2);

    document.getElementById('signIn2').addEventListener('click', serverSignIn(), false);
}

function serverSignUp() {
    console.log("Starting Server Sign Up");
    var password = document.getElementById("passwordSignUp").value;
    var username = document.getElementById("usernameSignUp").value;
    var url = "https://lamp.cse.fau.edu/~dbenne11/whendiagram/add_user.php?username="+username+"&pw="+password //Kudos to Daniel for providing an alternative to OAuth
    console.log(url);
    xmlRequest(url,onGoodSignUpRequest,onBadSignUpRequest);
}

function serverSignIn() {
    console.log("Starting Server Sign In");
    if(document.getElementById("usernameSignUp").value != ""){
        username = document.getElementById("usernameSignUp").value;
    }else {
        username = document.getElementById("usernameSignIn").value;
    }

    if(document.getElementById("usernameSignUp").value != ""){
        password = document.getElementById("passwordSignUp").value;
    }else {
        password = document.getElementById("passwordSignIn").value;
    }  

    var url = "https://lamp.cse.fau.edu/~dbenne11/whendiagram/login.php?username="+username+"&pw="+password;
    console.log(url);
    xmlRequest(url,onGoodSignInRequest,onBadSignInRequest);
}

function onGoodSignUpRequest(data){
    console.log("Good Request");
    console.log(data.account_creation);
    if(data.account_creation == "success"){
        serverSignIn();
    }else {
        console.log("Bad Sign Up Request");
    }
}

function onBadSignUpRequest(){
    console.log("Bad Request");
}

function onGoodSignInRequest(data) {
    console.log("Good Sign In Detected");
    console.log(data.login);
    if(data.login == "success"){
        let workarea = document.getElementById("currentuser");
        let p = document.createElement("p");
        if(document.getElementById("usernameSignUp") != ""){
        p.innerHTML = document.getElementById("usernameSignUp").value;
        }else {
            p.innerHTML = document.getElementById("usernameSignIn").value;
        }
        workarea.appendChild(p);
    }else {
        console.log("Bad Login");
    }
}

function onBadSignInRequest(){
    console.log("Bad SignInRequest");
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