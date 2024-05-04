import React from 'react';
import './StudentTable.css';

const studentsData = [
  { studentNumber: "2020100101", name: "김철수" },
  { studentNumber: "2020110202", name: "이영희" },
  { studentNumber: "2020120303", name: "박민지" },
  { studentNumber: "2020130404", name: "정수빈" },
  { studentNumber: "2020140505", name: "홍길동" },
  { studentNumber: "2020150606", name: "이지은" },
  { studentNumber: "2020160707", name: "김민수" },
  { studentNumber: "2020170808", name: "박영희" },
  { studentNumber: "2020180909", name: "최철수" },
  { studentNumber: "2020191010", name: "장영희" },
  { studentNumber: "2020201111", name: "한민지" },
  { studentNumber: "2020211212", name: "송수빈" },
  { studentNumber: "2020221313", name: "강길동" },
  { studentNumber: "2020231414", name: "윤지은" },
  { studentNumber: "2020241515", name: "이민수" },
  { studentNumber: "2020251616", name: "정영희" },
  { studentNumber: "2020261717", name: "신철수" },
  { studentNumber: "2020271818", name: "김영희" },
  { studentNumber: "2020281919", name: "장민지" },
  { studentNumber: "2020292020", name: "황수빈" },
];

// 학생 데이터를 그룹으로 나누는 함수
function groupStudents(students, groupSize) {
  const groups = [];
  let currentGroup = [];
  for (let i = 0; i < students.length; i++) {
    currentGroup.push(students[i]);
    if (currentGroup.length === groupSize) {
      groups.push(currentGroup);
      currentGroup = [];
    }
  }
  // 마지막 그룹이 groupSize보다 작을 수 있으므로 남은 학생들을 마지막 그룹에 추가
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  return groups;
}

// 학생 데이터를 그룹으로 나눔 (예: 한 팀당 4명)
const teams = groupStudents(studentsData, 4);

function StudentTable() {
  return (
    <div className="student-table-container">
      {/* 그룹별로 테이블을 두 열로 배치하여 보여줌 */}
      <div className="student-table-row">
        {teams.map((team, index) => (
          <div key={index} className="student-table-column">
            <h3>팀 {index + 1}</h3>
            <table>
              <thead>
                <tr>
                  <th>팀 번호</th>
                  <th>학번</th>
                  <th>이름</th>
                </tr>
              </thead>
              <tbody>
                {team.map((student, studentIndex) => (
                  <tr key={studentIndex}>
                    <td>{index + 1}</td> {/* 수정된 부분 */}
                    <td>{student.studentNumber}</td>
                    <td>{student.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
export default StudentTable;
