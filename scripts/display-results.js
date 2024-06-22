export function displayResults(courses) {
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
}


export function calcAps(calculateAPS){
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
}