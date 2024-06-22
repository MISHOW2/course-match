/*export function displayResults(courses) {
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
    link.textContent = `${course.university} - ${course.course} (APS: ${course.aps})`;
    listItem.appendChild(link);
    resultsList.appendChild(listItem);
  });
}*/

