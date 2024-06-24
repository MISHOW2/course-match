import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
        window.location.href = "html/dashboard.html";
      })
      .catch((error) => {
        console.error(`Error during sign-in: ${error.code} - ${error.message}`);
        alert(`Error during sign-in: ${error.message}`);
      });
  });
}

// Handle the Forgot Password modal
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.getElementsByClassName("close")[0];
const resetPasswordForm = document.getElementById("forgotPasswordForm");

if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    forgotPasswordModal.style.display = "block";
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    forgotPasswordModal.style.display = "none";
  });
}

window.onclick = function(event) {
  if (event.target == forgotPasswordModal) {
    forgotPasswordModal.style.display = "none";
  }
};

if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const resetEmail = document.getElementById("resetEmail").value;

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        showMessage("Password reset email sent successfully", "resetPasswordMessage");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        showMessage(`Error: ${error.message}`, "resetPasswordMessage");
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
        showMessage('Registration successful!', 'signUpMessage');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      })
      .catch((error) => {
        console.error("Error during sign-up:", error);
        showMessage(`Error: ${error.message}`, 'signUpMessage');
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
          window.location.href = 'html/dashboard.html';
        }, 2000); // 2-second delay before redirecting to dashboard
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


