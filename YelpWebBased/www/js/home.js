var signedIn = false;
var dohome = function(){ //Generate The UI Of The Home Page
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

    //Insert NBSP
    let NBSP = document.createElement("p");
    NBSP.innerHTML = "&nbsp;";
    container.appendChild(NBSP);

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

    document.getElementById("favorites").disabled = true;
    document.getElementById("search").disabled = true;
    document.getElementById("signout").disabled = true;
}
