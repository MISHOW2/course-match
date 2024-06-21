import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




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
const auth=getAuth();
const db=getFirestore();

onAuthStateChanged(auth, (user)=>{
  const loggedInUserId=localStorage.getItem('loggedInUserId');
  if(loggedInUserId){
      console.log(user);
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
          if(docSnap.exists()){
              const userData=docSnap.data();
              document.getElementById('loggedInUserName').innerText=userData.firstName;
              document.getElementById('loggedUserEmail').innerText=userData.email;
              document.getElementById('loggedUserLName').innerText=userData.lastName;
    console.log(userData);
          }
          else{
              console.log("no document found matching id")
          }
      })
      .catch((error)=>{
          console.log("Error getting document");
      })
  }
  else{
      console.log("User Id not Found in Local storage")
  }
})

const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click',()=>{
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
  .then(()=>{
      window.location.href='login.html';
  })
  .catch((error)=>{
      console.error('Error Signing out:', error);
  })
})
// Optional: Add console logs for debugging
console.log("Script loaded"); // Check if script is loaded
console.log("localStorage loggedInUserId:", localStorage.getItem('loggedInUserId')); 

document.getElementById('toggle-menu').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('close-menu').addEventListener('click', function() {
  document.getElementById('sidebar').classList.remove('open');
});