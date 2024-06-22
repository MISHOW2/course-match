import { logout } from "./dashboard.js";
import { toggleMenu } from "./toogle-menu.js";

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

  fetch('./data/university_courses.json')
    .then(response => response.json())
    .then(data => {
      const qualifiedCourses = [];

      data.universities.forEach(university => {
        university.courses.forEach(course => {
          const requirements = course.subject_requirements;
          let qualifies = true;

          for (const [subject, minMark] of Object.entries(requirements)) {
            if (studentMarks[subject] < minMark) {
              qualifies = false;
              break;
            }
          }

          if (qualifies) {
            qualifiedCourses.push({
              university: university.name,
              course: course.name,
              link: course.apply_link
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

function displayResults(courses) {
  const resultsList = document.getElementById('results-list');
  resultsList.innerHTML = '';

  if (courses.length === 0) {
    resultsList.innerHTML = '<li>No courses found matching your qualifications.</li>';
    return;
  }

  courses.forEach(course => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = course.link;
    link.textContent = `${course.university} - ${course.course}`;
    listItem.appendChild(link);
    resultsList.appendChild(listItem);
  });
}


console.log("localStorage loggedInUserId:", localStorage.getItem('loggedInUserId')); 

logout();