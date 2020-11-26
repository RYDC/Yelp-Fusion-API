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
    usernameInput.id = "username";
    usernameInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    usernameInput.placeholder = "Username";
    container.appendChild(usernameInput);

    //Password Input
    let passwordInput = document.createElement("input");
    passwordInput.id = "password";
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
    usernameInput.id = "username";
    usernameInput.classList = "form-control col-sm-2 d-flex justify-content-center";
    usernameInput.placeholder = "Username";
    container.appendChild(usernameInput);

    //Password Input
    let passwordInput = document.createElement("input");
    passwordInput.id = "password"
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

function serverSignUp() {//Request a Sign Up through API
    console.log("Starting Server Sign Up");
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var url = "https://lamp.cse.fau.edu/~dbenne11/whendiagram/add_user.php?username="+username+"&pw="+password //Kudos to Daniel for providing an alternative to OAuth
    console.log(url);
    xmlRequest(url,onGoodSignUpRequest,onBadSignUpRequest);
}

function serverSignIn() {//Request a Sign In through API
    console.log("Starting Server Sign In");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = "https://lamp.cse.fau.edu/~dbenne11/whendiagram/login.php?username="+username+"&pw="+password;
    console.log(url);
    xmlRequest(url,onGoodSignInRequest,onBadSignInRequest);
}

function onGoodSignInRequest(data) {//Handler for a good signin request
    console.log("Good Sign In Detected");
    console.log(data.login);
    if(data.login == "success"){
        let workarea = document.getElementById("currentuser");
        workarea.innerHTML = ""
        let p = document.createElement("p");
        if(document.getElementById("username") != ""){
        p.innerHTML = document.getElementById("username").value;
        }else {
            p.innerHTML = document.getElementById("username").value;
        }
        workarea.appendChild(p);
        dosearch();
    }else {
        alert("Bad Login");
    }
}

function onGoodSignUpRequest(data){//Handler for a good signup request
    console.log("Good Request");
    console.log(data.account_creation);
    if(data.account_creation == "success"){
        serverSignIn();
    }else {
        alert("Error: Make sure your password is 9 or more characters");
    }
}

function onBadSignUpRequest(){//Handler for a bad signup request
    console.log("Bad SignUpRequest");
}

function onBadSignInRequest(){//Handler for a good signin request
    console.log("Bad SignInRequest");
}

function signOut(){
    let workarea = document.getElementById("currentuser");
    workarea.innerHTML = ""
    dohome();
}