/*const firebaseApp = firebase.initializeApp({
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

var email;
var password;


//condition tocheck if email input
function checkemail() {
    email = document.getElementById('email').value;
    console.log(email);
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    let result = regex.test(email);
    console.log(result);
    //condtion to check if email is empty
    if (email == "") {
        document.getElementById("error-msg1").innerHTML = "please enter email address";
        document.getElementById("error-msg1").style.display = "block";
        document.querySelector("#sign-in-btn").disabled = true;
        
    }
    else {
        //to check if the its is a valid email r not
        if (result) {
            document.getElementById("error-msg1").style.display = "none";
            document.querySelector("#sign-in-btn").disabled = true;
        }
        else {
            document.getElementById("error-msg1").style.display = "block";
            document.getElementById("error-msg1").innerHTML = "please enter valid email address";
            document.querySelector("#sign-in-btn").disabled = true;
        }
    }

}



//condition to check password 
//to check the password
function checkpassword() {
    password = document.getElementById("password").value;
    console.log(password);

    //to check if the password is empty r not
    if (password == "") {
        document.querySelector("#sign-in-btn").disabled = true;
        document.getElementById("password").focus();
        document.getElementById("error-msg2").innerHTML = "please enter password";
        document.getElementById("error-msg2").style.display = "block";
    }
    else {
        document.querySelector("#sign-in-btn").disabled = false;
        document.getElementById("error-msg2").style.display = "none";
    }

}

/*
function login() {
    //get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up 
            //Declare user variable
            var user = auth.currentUser;

            //Addthis user to firebase Database
            var database_ref = database.ref();

            //create user data
            var user_data = {
                last_login :Date.now()
            }

            database_ref.child('users/' + user.uid).update(user_data);
            console.log("you succesfully logined");
            window.location.replace("main.html");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

*/