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

  // 학생 데이터를 팀으로 나누는 함수
  function groupStudentsByTeam(students) {
    const teams = {};
    students.forEach(student => {
      const teamNumber = student.team;
      if (!teams[teamNumber]) {
        teams[teamNumber] = [];
      }
      teams[teamNumber].push(student);
    });
    return teams;
  }

  // 학생 데이터를 팀별로 나눔
  const teams = groupStudentsByTeam(studentsData);

  return (
    data && data.length > 0 ? (
      <div className="student-table-container">
        {/* tableName 표시 */}
        <h2>{tableName}</h2>
        {/* 팀별로 테이블을 두 열로 배치하여 보여줌 */}
        <div className="student-table-row">
          {Object.keys(teams).map((teamNumber, index) => (
            <div key={index} className="student-table-column">
              <h3>팀 {teamNumber}</h3>
              <table>
                <thead>
                  <tr>
                    <th>팀 번호</th>
                    <th>학번</th>
                    <th>이름</th>
                  </tr>
                </thead>
                <tbody>
                  {teams[teamNumber].map((student, studentIndex) => (
                    <tr key={studentIndex}>
                      <td>{teamNumber}</td>
                      <td>{student.number}</td>
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
