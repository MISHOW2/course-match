// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth();
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();

// Get the Google Sign-In button element
const googleLogin = document.querySelector('.js-google-login');

// Add click event listener to the Google Sign-In button
googleLogin.addEventListener("click", function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Get the signed-in user info
      const user = result.user;
      console.log(user);

      // Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error during sign-in: ${errorCode} - ${errorMessage}`);
      
      // Optionally display the error message to the user
      alert(`Error during sign-in: ${errorMessage}`);
    });
});

signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else if (errorCode === 'auth/user-not-found') {
        showMessage('Account does not exist', 'signInMessage');
      } else {
        showMessage('Unable to login', 'signInMessage');
      }
    });
});

const showRegisterButton = document.getElementById("show-register");
const showLoginButton = document.getElementById("show-login");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formInstruction = document.getElementById("form-instruction");

showRegisterButton.addEventListener("click", function () {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  formInstruction.textContent = "Please register your details";
});

showLoginButton.addEventListener("click", function () {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  formInstruction.textContent = "Welcome to CourseMatch! Please sign in with:";
});
