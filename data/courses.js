let courses = [
  {
    name: 'IT',
    qualifications: {
      maths: 60,
      physics: 60,
      computerScience: 60,
      english: 60
    }
  },
  {
    name: 'Teaching',
    qualifications: {
      english: 50,
      maths: 50,
      history: 50,
      education: 50
    }
  },
  {
    name: 'BIOTECH',
    qualifications: {
      biology: 60,
      chemistry: 60,
      maths: 50,
      english: 50
    }
  },
  {
    name: 'Engineering',
    qualifications: {
      maths: 70,
      physics: 70,
      chemistry: 60,
      english: 65
    }
  },
  {
    name: 'Medicine',
    qualifications: {
      biology: 75,
      chemistry: 70,
      physics: 65,
      english: 60
    }
  },
  {
    name: 'Business Administration',
    qualifications: {
      maths: 55,
      economics: 60,
      businessStudies: 60,
      english: 70
    }
  },
  {
    name: 'Computer Science',
    qualifications: {
      maths: 65,
      physics: 60,
      computerScience: 65,
      english: 65
    }
  },
  {
    name: 'Law',
    qualifications: {
      english: 75,
      history: 60,
      socialStudies: 60,
      maths: 50
    }
  },
  {
    name: 'Economics',
    qualifications: {
      maths: 60,
      economics: 70,
      businessStudies: 60,
      english: 70
    }
  },
  {
    name: 'Nursing',
    qualifications: {
      biology: 70,
      chemistry: 60,
      english: 60,
      healthScience: 65
    }
  },
  {
    name: 'Architecture',
    qualifications: {
      maths: 65,
      physics: 60,
      art: 60,
      english: 65
    }
  },
  {
    name: 'Agriculture',
    qualifications: {
      biology: 70,
      chemistry: 60,
      maths: 50,
      english: 60
    }
  },
  {
    name: 'Environmental Science',
    qualifications: {
      biology: 65,
      chemistry: 60,
      geography: 70,
      english: 60
    }
  },
  {
    name: 'Social Work',
    qualifications: {
      english: 65,
      sociology: 60,
      psychology: 60,
      history: 50
    }
  },
  {
    name: 'Journalism',
    qualifications: {
      english: 75,
      history: 60,
      socialStudies: 60,
      mediaStudies: 60
    }
  },
  {
    name: 'Graphic Design',
    qualifications: {
      art: 70,
      computerScience: 55,
      maths: 50,
      english: 60
    }
  },
  {
    name: 'Marketing',
    qualifications: {
      businessStudies: 65,
      economics: 60,
      maths: 55,
      english: 65
    }
  },
  {
    name: 'Hospitality Management',
    qualifications: {
      businessStudies: 60,
      geography: 55,
      maths: 50,
      english: 60
    }
  },
  {
    name: 'Accounting',
    qualifications: {
      maths: 65,
      businessStudies: 60,
      economics: 60,
      english: 65
    }
  },
  {
    name: 'Pharmacy',
    qualifications: {
      chemistry: 70,
      biology: 65,
      maths: 60,
      english: 60
    }
  },
  {
    name: 'Dentistry',
    qualifications: {
      biology: 70,
      chemistry: 65,
      physics: 60,
      english: 65
    }
  },
  {
    name: 'Veterinary Science',
    qualifications: {
      biology: 70,
      chemistry: 65,
      physics: 60,
      english: 60
    }
  },
  {
    name: 'Geology',
    qualifications: {
      geology: 70,
      chemistry: 60,
      physics: 60,
      english: 60
    }
  },
  {
    name: 'Psychology',
    qualifications: {
      psychology: 70,
      biology: 60,
      english: 70,
      sociology: 55
    }
  },
  {
    name: 'Education Management',
    qualifications: {
      education: 65,
      maths: 55,
      english: 65,
      businessStudies: 60
    }
  },
  {
    name: 'Public Administration',
    qualifications: {
      english: 65,
      history: 60,
      socialStudies: 60,
      maths: 50
    }
  },
  {
    name: 'Sociology',
    qualifications: {
      sociology: 70,
      english: 60,
      history: 60,
      psychology: 55
    }
  },
  {
    name: 'Anthropology',
    qualifications: {
      anthropology: 70,
      sociology: 60,
      history: 60,
      english: 65
    }
  },
  {
    name: 'Fine Arts',
    qualifications: {
      art: 70,
      history: 55,
      english: 60,
      socialStudies: 55
    }
  },
  {
    name: 'Culinary Arts',
    qualifications: {
      homeEconomics: 70,
      chemistry: 55,
      maths: 50,
      english: 60
    }
  },
  {
    name: 'Physics',
    qualifications: {
      physics: 70,
      maths: 70,
      chemistry: 60,
      english: 60
    }
  },
  {
    name: 'Chemistry',
    qualifications: {
      chemistry: 70,
      physics: 65,
      maths: 60,
      english: 60
    }
  },
  {
    name: 'Biochemistry',
    qualifications: {
      chemistry: 70,
      biology: 65,
      maths: 60,
      english: 60
    }
  },
  {
    name: 'Microbiology',
    qualifications: {
      biology: 70,
      chemistry: 60,
      maths: 55,
      english: 60
    }
  },
  {
    name: 'Mathematics',
    qualifications: {
      maths: 70,
      physics: 65,
      computerScience: 55,
      english: 60
    }
  },
  {
    name: 'Statistics',
    qualifications: {
      maths: 70,
      statistics: 65,
      economics: 55,
      english: 60
    }
  },
  {
    name: 'Actuarial Science',
    qualifications: {
      maths: 75,
      economics: 70,
      statistics: 65,
      english: 65
    }
  },
  {
    name: 'Civil Engineering',
    qualifications: {
      maths: 70,
      physics: 70,
      chemistry: 60,
      english: 65
    }
  },
  {
    name: 'Electrical Engineering',
    qualifications: {
      maths: 75,
      physics: 75,
      computerScience: 65,
      english: 65
    }
  },
  {
    name: 'Mechanical Engineering',
    qualifications: {
      maths: 70,
      physics: 70,
      chemistry: 60,
      english: 65
    }
  },
  {
    name: 'Chemical Engineering',
    qualifications: {
      maths: 75,
      chemistry: 75,
      physics: 70,
      english: 65
    }
  },
  {
    name: 'Petroleum Engineering',
    qualifications: {
      maths: 75,
      chemistry: 75,
      physics: 70,
      english: 65
    }
  },
  {
    name: 'Aerospace Engineering',
    qualifications: {
      maths: 75,
      physics: 75,
      chemistry: 60,
      english: 65
    }
  },
  {
    name: 'Biomedical Engineering',
    qualifications: {
      maths: 70,
      biology: 70,
      physics: 60,
      english: 65
    }
  },
  {
    name: 'Mining Engineering',
    qualifications: {
      maths: 70,
      geology: 70,
      physics: 65,
      english: 65
    }
  },
  {
    name: 'Urban Planning',
    qualifications: {
      geography: 70,
      maths: 60,
      sociology: 60,
      english: 60
    }
  },
  {
    name: 'Real Estate',
    qualifications: {
      businessStudies: 65,
      maths: 55,
      economics: 60,
      english: 65
    }
  }
];



function determineQualifiedCourses(studentMarks) {
  let qualifiedCourses = [];

  for (let course of courses) {
    let qualifies = true;
    for (let subject in course.qualifications) {
      // Check if student has marks for each required subject
      if (studentMarks[subject] < course.qualifications[subject]) {
        qualifies = false;
        break; // No need to check further subjects for this course
      }
    }
    if (qualifies) {
      qualifiedCourses.push(course.name);
    }
  }

  return qualifiedCourses;
}

// Example usage:
const studentMarks = {
  maths: 65,
  physics: 60,
  chemistry: 55,
  english: 70,
  biology: 60,
  computerScience: 65,
  history: 60,
  economics: 60,
  businessStudies: 60,
  geography: 55,
  sociology: 60,
  psychology: 55,
  art: 60,
  mediaStudies: 60,
  homeEconomics: 60,
  healthScience: 65,
  education: 55,
  socialStudies: 55,
  statistics: 60,
  geology: 60,
  anthropology: 65
};

const qualifiedCourses = determineQualifiedCourses(studentMarks);
console.log("Qualified Courses:", qualifiedCourses);
