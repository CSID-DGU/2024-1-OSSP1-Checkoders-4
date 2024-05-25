import React, { useState, useEffect } from 'react';
import './StudentTable.css';

function StudentTable({ data, tableName }) {
  const [studentsData, setStudentsData] = useState([]);

  // 'data' prop이 변경될 때 상태를 업데이트하기 위해 useEffect 사용
  useEffect(() => {
    if (data) {
      setStudentsData(data);
    }
  }, [data]);

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

  return (
    data && data.length > 0 ? (
      <div className="student-table-container">
        {/* tableName 표시 */}
        <h2>{tableName}</h2>
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
                      <td>{index + 1}</td>
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
    ) : null
  );
}

export default StudentTable;
