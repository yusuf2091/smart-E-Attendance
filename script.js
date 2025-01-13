// Data storage for students and attendance
let students = [];
let attendance = {};

// DOM elements
const studentNameInput = document.getElementById("student-name");
const studentIdInput = document.getElementById("student-id");
const addStudentBtn = document.getElementById("add-student-btn");
const studentList = document.getElementById("student-list");
const attendanceReportList = document.getElementById("attendance-report-list");

// Add student
addStudentBtn.addEventListener("click", () => {
  const name = studentNameInput.value.trim();
  const id = studentIdInput.value.trim();

  if (name && id) {
    students.push({ name, id });
    attendance[id] = { present: 0, total: 0 };
    updateStudentList();
    studentNameInput.value = "";
    studentIdInput.value = "";
  } else {
    alert("Please enter both name and ID");
  }
});

// Update student list for marking attendance
function updateStudentList() {
  studentList.innerHTML = "";
  students.forEach((student) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${student.name} (ID: ${student.id})
      <button onclick="markPresent('${student.id}')">Mark Present</button>
    `;
    studentList.appendChild(li);
  });

  updateAttendanceReport();
}

// Mark a student as present
function markPresent(studentId) {
  attendance[studentId].present += 1;
  attendance[studentId].total += 1;

  updateAttendanceReport();
  highlightMarked(studentId);
}

// Highlight student after marking present
function highlightMarked(studentId) {
  const buttons = studentList.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.onclick.toString().includes(studentId)) {
      button.parentElement.classList.add("marked");
      setTimeout(() => {
        button.parentElement.classList.remove("marked");
      }, 1000);
    }
  });
}

// Update attendance report
function updateAttendanceReport() {
  attendanceReportList.innerHTML = "";
  students.forEach((student) => {
    const { id, name } = student;
    const { present, total } = attendance[id];
    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

    const li = document.createElement("li");
    li.textContent = `${name} (ID: ${id}) - Attendance: ${present}/${total} (${percentage}%)`;
    attendanceReportList.appendChild(li);
  });
}
