import { logout } from "./dashboard.js";
import { toggleMenu } from "./toggle-menu.js";
import { displayResults } from "./display-results.js";

toggleMenu();

document.getElementById('marks-form').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('hello');
  
  // Get form data
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

  // Calculate APS
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

  fetch('./data/university_courses.json')
    .then(response => response.json())
    .then(data => {
      const qualifiedCourses = [];

      data.universities.forEach(university => {
        university.courses.forEach(course => {
          const requirements = course.subject_requirements;
          let qualifies = true;

          // Check subject requirements
          for (const [subject, minMark] of Object.entries(requirements)) {
            if (studentMarks[subject] < minMark) {
              qualifies = false;
              break;
            }
          }

          // Check APS requirements
          if (qualifies && studentAPS >= course.aps) {
            qualifiedCourses.push({
              university: university.name,
              course: course.name,
              link: course.apply_link,
              aps: course.aps
            });
          }
        });
      });

      // Display results in console
      console.log('Qualified Courses:', qualifiedCourses);

      // Display results in HTML
      displayResults(qualifiedCourses);
    })
    .catch(error => console.error('Error fetching university courses:', error));
});

displayResults(courses);

console.log("localStorage loggedInUserId:", localStorage.getItem('loggedInUserId')); 

logout();
