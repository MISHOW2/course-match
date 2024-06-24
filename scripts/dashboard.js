import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { toggleMenu } from "./toggle-menu.js";

toggleMenu();

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
const db = getFirestore();


onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  const welcomeMessageElement = document.getElementById('welcomeMessage');
  
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          welcomeMessageElement.innerText = `Welcome ${userData.firstName}`;
        } else {
          console.log("No document found matching ID");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    if (user) {
      // User is logged in with Google (user object is present)
      welcomeMessageElement.innerText = "Welcome to CourseMatch";
    } else {
      console.log("No user is logged in");
    }
  }
});
  
export function logout() {
  document.addEventListener('DOMContentLoaded', (event) => {
    const logoutButton = document.getElementById('logout');

    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
          .then(() => {
            window.location.href = '../index.html';
          })
          .catch((error) => {
            console.error('Error Signing out:', error);
          });
      });
    } else {
      console.error('Logout button not found!');
    }
  });
}

logout();

// Optional: Add console logs for debugging
console.log("Script loaded"); // Check if script is loaded
console.log("localStorage loggedInUserId:", localStorage.getItem('loggedInUserId'));

document.addEventListener("DOMContentLoaded", () => {
  const universitySelect = document.getElementById("university");
  const facultySelect = document.getElementById("faculty");
  const courseSelect = document.getElementById("course");
  const resultContainer = document.getElementById('result-container');

  let data;

  fetch("../data/universities.json")
    .then(response => response.json())
    .then(json => {
      data = json.universities;
    })
    .catch(error => console.error("Error loading JSON data:", error));

  universitySelect.addEventListener("change", () => {
    const selectedUniversity = universitySelect.value;

    facultySelect.innerHTML = '<option value="">Select Faculty</option>';
    courseSelect.innerHTML = '<option value="">Select Course</option>';
    facultySelect.disabled = true;
    courseSelect.disabled = true;

    if (selectedUniversity) {
      const university = data.find(u => u.name === selectedUniversity);

      if (university) {
        university.faculties.forEach(faculty => {
          const option = document.createElement("option");
          option.value = faculty.name;
          option.textContent = faculty.name;
          facultySelect.appendChild(option);
        });

        facultySelect.disabled = false;
      }
    }
  });

  facultySelect.addEventListener("change", () => {
    const selectedUniversity = universitySelect.value;
    const selectedFaculty = facultySelect.value;

    courseSelect.innerHTML = '<option value="">Select Course</option>';
    courseSelect.disabled = true;

    if (selectedUniversity && selectedFaculty) {
      const university = data.find(u => u.name === selectedUniversity);

      if (university) {
        const faculty = university.faculties.find(f => f.name === selectedFaculty);

        if (faculty) {
          faculty.courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course.name;
            option.textContent = course.name;
            courseSelect.appendChild(option);
          });

          courseSelect.disabled = false;
        }
      }
    }
  });

  document.getElementById('marks-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const subject1 = document.getElementById('subject1').value;
    const mark1 = parseInt(document.getElementById('mark1').value, 10);
    const subject2 = document.getElementById('subject2').value;
    const mark2 = parseInt(document.getElementById('mark2').value, 10);
    const subject3 = document.getElementById('subject3').value;
    const mark3 = parseInt(document.getElementById('mark3').value, 10);
    const subject4 = document.getElementById('subject4').value;
    const mark4 = parseInt(document.getElementById('mark4').value, 10);
    const subject5 = document.getElementById('subject5').value;
    const mark5 = parseInt(document.getElementById('mark5').value, 10);
    const subject6 = document.getElementById('subject6').value;
    const mark6 = parseInt(document.getElementById('mark6').value, 10);
    const subject7 = document.getElementById('subject7').value;
    const mark7 = parseInt(document.getElementById('mark7').value, 10);

    const studentMarks = {
      [subject1]: mark1,
      [subject2]: mark2,
      [subject3]: mark3,
      [subject4]: mark4,
      [subject5]: mark5,
      [subject6]: mark6,
      [subject7]: mark7,
    };

    const calculateAPS = (marks) => {
      let aps = 0;
      Object.values(marks).forEach(mark => {
        if (mark >= 80) aps += 7;
        else if (mark >= 70) aps += 6;
        else if (mark >= 60) aps += 5;
        else if (mark >= 50) aps += 4;
        else if (mark >= 40) aps += 3;
        else if (mark >= 30) aps += 2;
        else aps += 1;
      });
      return aps;
    };

    const studentAPS = calculateAPS(studentMarks);
    const selectedUniversity = universitySelect.value;
    const selectedFaculty = facultySelect.value;
    const selectedCourse = courseSelect.value;

    const university = data.find(u => u.name === selectedUniversity);
    const faculty = university.faculties.find(f => f.name === selectedFaculty);
    const course = faculty.courses.find(c => c.name === selectedCourse);

    if (course) {
      const requirements = course.requirements;
      let qualifies = true;

      for (const [subject, minMark] of Object.entries(requirements.subject_requirements)) {
        if (studentMarks[subject] < minMark) {
          qualifies = false;
          break;
        }
      }

      if (qualifies && studentAPS >= requirements.aps) {
        displayResult(true, course.name, requirements.apply_link, requirements.aps);
      } else {
        displayResult(false, course.name, requirements.apply_link, requirements.aps);
      }
    }
  });

  function displayResult(qualifies, courseName, applyLink, requiredAPS) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    const resultMessage = document.createElement('p');
    if (qualifies) {
      resultMessage.textContent = `You qualify for the ${courseName} course. Your APS meets the required APS of ${requiredAPS}.`;
      const applyButton = document.createElement('button');
      applyButton.textContent = 'Apply Now';
      applyButton.onclick = () => window.open(applyLink, '_blank');
      resultContainer.appendChild(resultMessage);
      resultContainer.appendChild(applyButton);
    } else {
      resultMessage.textContent = `You do not qualify for the ${courseName} course. Your APS does not meet the required APS of ${requiredAPS}.`;
      resultContainer.appendChild(resultMessage);
    }
  }
});
