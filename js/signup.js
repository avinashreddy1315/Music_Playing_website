//setting a firebase with website
/* const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyDni7ini6tdktMdddYhGcce6Dm3sBbZ0kQ",
    authDomain: "spotify-autentication-cc7c6.firebaseapp.com",
    projectId: "spotify-autentication-cc7c6",
    storageBucket: "spotify-autentication-cc7c6.appspot.com",
    messagingSenderId: "1093634966700",
    appId: "1:1093634966700:web:e9495203e0844d7949cb09",
    measurementId: "G-MFCWCC79KC"
 });
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const database = firebaseApp.database(); */


var c = 0;
var email = document.getElementById('email').value;
var password = document.getElementById("password").value;

var user_name = document.querySelector("#name").value;


function progressbarchange() {
    var fill_bar = document.getElementById("filler-bar");
    if (c == 1) {
        fill_bar.style.width = "50%";
    }
    if (c == 2) {
        fill_bar.style.width = "100%";
    }
}


function checkemail() {
   email = document.getElementById('email').value;
    //console.log(email);
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    let result = regex.test(email);
    //console.log(result);
    //condtion to check if email is empty
    if (email == "") {
        document.getElementById("error-msg").innerHTML = "This email is invalid. Make sure it's written like example@email.com";
        document.querySelector(".btn-next").disabled = true;
    }
    else {
        document.querySelector(".btn-next").disabled = false;
    }
    //to check if the its is a valid email r not
   if (result) {
        document.querySelector(".btn-next").disabled = false;
        document.getElementById("error-msg").innerHTML = "";
    }
    else {
        document.getElementById("error-msg").innerHTML = "This email is invalid. Make sure it's written like example@email.com";
        document.querySelector(".btn-next").disabled = true;
    }
}


function next_step_to_password() {
    email = document.getElementById('email').value;
    if (email == "") {
        document.getElementById("error-msg").innerHTML = "This email is invalid. Make sure it's written like example@email.com";
        document.getElementById("email").focus();
    }
    else {
        document.getElementById("email-form").style.display = "none";
        document.querySelector(".sign-up-form-password").style.display = "block";
        document.querySelector(".password-form").style.display = "block";
        c++;
        progressbarchange();

    }
}



//to check the password
function checkpassword() {
    password = document.getElementById("password").value;
    let regex = /^(?![0-9])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    let result = regex.test(password);
    //console.log(password);
    
    //to check if the password is empty r not
    if (password == "") {
        document.querySelector(".btn-next-to-yourself").disabled = true;
        document.getElementById("password").focus();
        var span = document.querySelectorAll(".password_requirment");
        span.forEach(function(span){
            span.style.color= "red";
        })
        var imgs = document.querySelectorAll(".circle-check");
        imgs.forEach(function(imgs){
            imgs.src = "../images/circle_cancel.svg"
        })
        
        
    }
    else {
        document.querySelector(".btn-next-to-yourself").disabled = false;
        var span = document.querySelectorAll(".password_requirment");
        span.forEach(function(span){
            span.style.color= "#1fdf64";
        })

        
    }

    //to check if password is meeting the requirement r not
    if (result) {
        document.querySelector(".btn-next-to-yourself").disabled = false;
        var imgs = document.querySelectorAll(".circle-check");
        imgs.forEach(function(imgs){
            imgs.src = "../images/circle_check.svg"
        })
    }
    else {
        var span = document.querySelectorAll(".password_requirment");
        span.forEach(function(span){
            span.style.color= "red";
        })
        document.querySelector(".btn-next-to-yourself").disabled = true;
        var imgs = document.querySelectorAll(".circle-check");
        imgs.forEach(function(imgs){
            imgs.src = "../images/circle_cancel.svg"
        })
    }
}


function next_step_to_yourself() {
    var password = document.getElementById("password").value;
    if (password == "") {
        document.getElementById("password").focus();
    }
    else {
        document.querySelector(".password-form").style.display = "none";
        document.querySelector(".sign-up-form-yourself").style.display = "block";
        c++;
        progressbarchange();

    }
}


function goback() {
    document.querySelector(".sign-up-form-password").style.display = "none";
    document.querySelector("#email-form").style.display = "block";
    document.querySelector("#email-form").style.display = "flex";
    c--;
    progressbarchange();
}

function gobacktopassword() {
    document.querySelector(".sign-up-form-yourself").style.display = "none";
    document.querySelector(".password-form").style.display = "block";
    c--;
    progressbarchange();
}

function checkname(){
    user_name = document.querySelector("#name").value;
    console.log(user_name);
    let error = document.querySelector("#error-msg-name");
    if(user_name == ""){
        error.innerHTML = " Please Enter Your Name";
        error.style.display = "block"
        document.getElementById("finalbtn").disabled= true;
    }
    else{
        error.style.display = "none"
        document.getElementById("finalbtn").disabled= false;
    }
}

/*

//sing up function

function signup(){
    //lets get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById("password").value;
    user_name = document.querySelector("#name").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up 
            //Declare user variable
            var user = auth.currentUser;
            
            //Addthis user to firebase Database
            var database_ref = database.ref();

            //create user data
            var user_data = {
                email : email,
                Name : user_name,
                last_login :Date.now()
            }

            database_ref.child('users/' + user.uid).set(user_data);
            console.log("user created");
            window.location.replace("main.html");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage.slice(9, -29));
            document.getElementById("error-msg2").innerHTML = errorMessage.slice(9, -29);
        });
}


*/
