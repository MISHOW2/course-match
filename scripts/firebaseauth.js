import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRFlz8x6m9KBBdlaW1lQxYAVqzOSEWmBE",
  authDomain: "course-match-96a3b.firebaseapp.com",
  projectId: "course-match-96a3b",
  storageBucket: "course-match-96a3b.appspot.com",
  messagingSenderId: "1097720599878",
  appId: "1:1097720599878:web:c75df7333891b24c534147",
  measurementId: "G-C4HGH7RW4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
  const signUp = document.getElementById('submitSignUp');
  const signIn = document.getElementById('submitSignIn');

  signUp.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Sign up button clicked');
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    console.log(`Sign up with: ${email}, ${password}, ${firstName}, ${lastName}`);

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User created successfully');
        const user = userCredential.user;
        const userData = {
          email: email,
          firstName: firstName,
          lastName: lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        return setDoc(docRef, userData);
      })
      .then(() => {
        console.log('User data written to Firestore');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error("Error creating user or writing document:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode}`);
        console.log(`Error message: ${errorMessage}`);
        if (errorCode === 'auth/email-already-in-use') {
          showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } else {
          showMessage(`Unable to create user: ${errorMessage}`, 'signUpMessage');
        }
      });
  });

  signIn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Sign in button clicked');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(`Sign in with: ${email}, ${password}`);

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in successfully');
        showMessage('Login is successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode}`);
        console.log(`Error message: ${errorMessage}`);
        if (errorCode === 'auth/wrong-password') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        } else if (errorCode === 'auth/user-not-found') {
          showMessage('Account does not exist', 'signInMessage');
        } else {
          showMessage(`Unable to login: ${errorMessage}`, 'signInMessage');
        }
      });
  });

  const showRegisterButton = document.getElementById("show-register");
  const showLoginButton = document.getElementById("show-login");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const formInstruction = document.getElementById("form-instruction");

  showRegisterButton.addEventListener("click", function () {
    console.log('Show register form');
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    formInstruction.textContent = "Please register your details";
  });

  showLoginButton.addEventListener("click", function () {
    console.log('Show login form');
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    formInstruction.textContent = "Welcome to CourseMatch! Please sign in with:";
  });
});
