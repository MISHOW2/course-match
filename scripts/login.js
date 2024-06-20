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
