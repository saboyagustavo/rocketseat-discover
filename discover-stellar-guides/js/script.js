window.addEventListener('load', init);
let
  studentOutput,
  teacherOutput,
  gradeOutput,
  attendanceOutput,
  gradesOutput;

async function init() {
  DOM.mapOutputs();
  const data = await API.get('http://127.0.0.1:5555/reports');

  if (data) {
    DOM.renderReportInfo(data);
  }
}

const DOM = {
  mapOutputs() {
    studentOutput = document.getElementById('student');
    teacherOutput = document.getElementById('teacher');
    gradeOutput = document.getElementById('grade');
    attendanceOutput = document.getElementById('attendance');
    gradesOutput = document.getElementById('grades');
  },

  renderReportInfo(data) {
    const student = data.students.find(student => (student.id === 1));
    studentOutput.innerText = `${student.first_name} ${student.last_name}`;


    const teacher = data.teacher;
    if (teacher.gender === 'F') teacher.title = 'Ms.';
    if (teacher.gender === 'M') teacher.title = 'Mr.';
    teacherOutput.innerText = `${teacher.title} ${teacher.first_name} ${teacher.last_name}`;

    const grade = data.grade;
    switch (grade) {
      case 1:
        gradeOutput.innerText = `${grade}st`;
        break;
      case 2:
        gradeOutput.innerText = `${grade}nd`;
        break;
      case 3:
        gradeOutput.innerText = `${grade}rd`;
        break;
      default:
        gradeOutput.innerText = `${grade}th`;
        break;
    }

    const attendance = student.attended * 100 / data.days;
    attendanceOutput.innerText = `${attendance.toFixed(2)}%`;
  },

};

const API = {
  get: async (path) => {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = response;
      return await data.json();
    } catch (error) {
      return console.error({ 'Error': error });
    }
  }
};

