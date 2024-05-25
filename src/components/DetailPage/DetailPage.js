import React, { useState } from 'react';
import './DetailPage.css'; // DetailPage의 스타일 파일 import
import Foundation from '../MainPage/Foundation.js';
import '../StudentQListPage/StudentQListPage.js';
import { BsPencilSquare } from "react-icons/bs";
import DoughnutChart from './DoughnutChart';
import { useNavigate, useLocation } from 'react-router-dom';
import MainPage2 from '../MainPage/MainPage2.js';

function DetailPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const lecture_name = location.state?.lecture_name || '강의명 없음';
  const [team_member1, setTeamMember1] = useState("박성훈");
  const [team_member2, setTeamMember2] = useState("최유민");
  const [team_member3, setTeamMember3] = useState("홍길동");
  const [team_member4, setTeamMember4] = useState("김철수");
  const [hw_name, setHwName] = useState("다음 조건에 맞는 코드를 작성하고 분석하시오. blablablablablablablabla");
  const [q_name, setQName] = useState("[학생들이 출제한 문제 제목]. blablablablablablablablablabla");

  const handleSiteName = () => {
    navigate('/Main');
  }

  function handleTeamMemberClick(memberName, lectureName) {
    navigate('/studentqlist', { state: { team_member: memberName, lecture_name: lectureName } });
  }

  function moveToSetAssign(lectureName) {
    navigate('/SetAssign', { state: { lecture_name: lectureName } });
  }
  function moveToSetTeam(lectureName) {
    navigate('/SetTeam', { state: { lecture_name: lectureName } });
  }
  function moveToSubmitAssign(lectureName) {
    navigate('/SubmitAssign', { state: { lecture_name: lectureName } });
  } // 이동 추가 + onClick={moveToSubmitAssign}
  return (
    <div className="Foundation">
      <div className='topCover'>
        <div className='siteName'>
          <button className='siteName_button' onClick={handleSiteName}>
            ✔ Checkoders
            {/* 온클릭하면 메인페이지 */}
          </button>
        </div>
        <div className='midBlank'>

        </div>
        <div className='logOut'>
          <button className='logOut_button'>
            Logout🔓
            {/* 온클릭하면 로그아웃 후 로그인 페이지 */}
          </button>
        </div>
      </div>
      <div className='bottomBox'>
        <div>
          <div className="class-info">
            <BsPencilSquare style={{ width: '3vw' }} />
            <div className="class-name">
              <span>{lecture_name}</span>
            </div>
          </div>

          <div className="bottom-box">
            <div className="bottom-box-sidebar">
              <button className="side-bar"
                onClick={() => moveToSetAssign(lecture_name)}>
                <div style={{ margin: '1vh', color: 'white', fontWeight: 'bold' }}>문제출제</div>
              </button>
              <button className="side-bar"
                onClick={() => moveToSetTeam(lecture_name)}>
                <div style={{ margin: '1vh', color: 'white', fontWeight: 'bold' }}>팀 배정</div>
              </button>
              <div>
                <button className="side-bar" style={{ boxShadow: '0 4 0' }}>
                  <div style={{ margin: '1vh', color: 'white', fontWeight: 'bold' }}>팀원 목록</div>
                </button>
                <div className="team-container">
                  <button className="team-name" onClick={() => handleTeamMemberClick(team_member1, lecture_name)}>
                    {team_member1}
                  </button>
                  <button className="team-name" onClick={() => handleTeamMemberClick(team_member2, lecture_name)}>
                    {team_member2}
                  </button>
                  <button className="team-name" onClick={() => handleTeamMemberClick(team_member3, lecture_name)}>
                    {team_member3}
                  </button>
                  <button className="team-name" onClick={() => handleTeamMemberClick(team_member4, lecture_name)}>
                    {team_member4}
                  </button>
                </div>
              </div>

            </div>

            <div className="task-q-container">
              <div className="task-container-title">
                과제
              </div>
              <div className="task-container">
                <div className="task" >
                  <div className="task-font">
                    {hw_name}
                    <button className="button-style"
                      onClick={() => moveToSubmitAssign(lecture_name)}>
                      View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    {hw_name}
                    <button className="button-style"
                      onClick={() => moveToSubmitAssign(lecture_name)}>
                      View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    {hw_name}
                    <button className="button-style" style={{ color: 'red' }}>Done</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    {hw_name}
                    <button className="button-style" style={{ color: 'red' }}>Done</button>
                  </div>
                </div>
              </div>

              <div className="task-container-title" style={{ backgroundColor: '#FFAE35' }}>
                학생들이 출제한 문제
              </div>
              <div className="task-container" style={{ backgroundColor: '#FFF9E9' }}>
                <div className="task" >
                  <div className="task-font">
                    {q_name}
                    <button className="button-style"
                      onClick={() => moveToSubmitAssign(lecture_name)}>
                      View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    {q_name}
                    <button className="button-style"
                      onClick={() => moveToSubmitAssign(lecture_name)}>
                      View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    {q_name}
                    <button className="button-style" style={{ color: 'red' }}>Done</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    {q_name}
                    <button className="button-style" style={{ color: 'red' }}>Done</button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="chart-container-title">
                과제 현황
              </div>
              <div className="chart-container">
                <DoughnutChart />
              </div>

            </div>


          </div>


        </div>
      </div>
    </div>
  );
}


export default DetailPage;