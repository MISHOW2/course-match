// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRFlz8x6m9KBBdlaW1lQxYAVqzOSEWmBE",
  authDomain: "course-match-96a3b.firebaseapp.com",
  projectId: "course-match-96a3b",
  storageBucket: "course-match-96a3b.appspot.com",
  messagingSenderId: "1097720599878",
  appId: "1:1097720599878:web:c75df7333891b24c534147",
  measurementId: "G-C4HGH7RW4Q",
  databaseURL: "https://course-match-96a3b-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = 'en';
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Show message function
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (messageDiv) {
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
      messageDiv.style.opacity = 0;
    }, 4000);
  }
}

// Event listener for Google Sign-In
const googleLogin = document.querySelector('.js-google-login');
if (googleLogin) {
  googleLogin.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        console.error(`Error during sign-in: ${error.code} - ${error.message}`);
        alert(`Error during sign-in: ${error.message}`);
      });
  });
}

// Event listener for email/password sign-up
const signUpButton = document.getElementById('submitSignUp');
if (signUpButton) {
  signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          firstName: firstName,
          lastName: lastName
        };
        return setDoc(doc(db, "users", user.uid), userData);
      })
      .then(() => {
        showMessage('Account Created Successfully', 'signUpMessage');
        setTimeout(() => {
          window.location.href = 'login.html';
        }); 
      })
      .catch((error) => {
        console.error("Error creating user or writing document:", error);
        const errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
          showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } else {
          showMessage(`Unable to create user: ${errorMessage}`, 'signUpMessage');
        }
      });
  });
}

// Event listener for email/password sign-in
const signInButton = document.getElementById('submitSignIn');
if (signInButton) {
  signInButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        showMessage('Login is successful', 'signInMessage');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 4000); // 4-second delay before redirecting to dashboard
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        const errorMessage = error.message;
        if (error.code === 'auth/wrong-password') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        } else if (error.code === 'auth/user-not-found') {
          showMessage('Account does not exist', 'signInMessage');
        } else {
          showMessage(`Unable to login: ${errorMessage}`, 'signInMessage');
        }
      });
  });
}

// Toggle between login and registration forms
const showRegisterButton = document.getElementById("show-register");
const showLoginButton = document.getElementById("show-login");

if (showRegisterButton) {
  showRegisterButton.addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    document.getElementById("form-instruction").textContent = "Please register your details";
  });
}

if (showLoginButton) {
  showLoginButton.addEventListener("click", () => {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("form-instruction").textContent = "Welcome to CourseMatch! Please sign in with:";
  });
}
