import React, { useState, useEffect } from 'react';
import './DetailPage.css'; // DetailPage의 스타일 파일 import
import Foundation from '../MainPage/Foundation.js';
import '../StudentQListPage/StudentQListPage.js';
import { BsPencilSquare } from "react-icons/bs";
import DoughnutChart from './DoughnutChart';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainPage2 from '../MainPage/MainPage2.js';
import homeworkData from './DummyHW.json';
import qData from './DummyQ.json';
import teamData from './DummyTeam.json';


function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const lecture_name = location.state?.lecture_name || '강의명 없음';
  const [teamMembers, setTeamMembers] = useState([]);
  const [homeworks, setHomeworks] = useState(homeworkData.Data);
  const [questions, setQuestions] = useState(qData.Data);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);  // 권한 확인을 위한 상태
  const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

  useEffect(() => {
    setTeamMembers(teamData.Data); // DummyTeam.json에서 팀원 데이터 로드
    const currentNickname = localStorage.getItem('nickname'); // 로컬 스토리지에서 nickname 가져오기
    const lectureMadeBy = location.state?.lecture_madeby; // 강의 생성자 정보 가져오기

    setIsAdmin(currentNickname === lectureMadeBy); // 권한 확인
  }, []);
  
  useEffect(() => {
    axios.get(`${API_BASE_URL}/homeworks`)
      .then(response => {
        setHomeworks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch homeworks:', error);
        setLoading(false);
      });

    axios.get(`${API_BASE_URL}/questions`)
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch questions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }



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

  const kakaoLogout = () => { // 카카오 로그아웃을 위한 함수, post 요청을 통해 accessToken을 보내 토큰을 만료시켜 로그아웃함
    const accessToken = localStorage.getItem('accessToken');
    //const accessToken = '8FF_3A_k1jjn6a3dvsHOPhvpT3maVxJgAAAAAQo9c5oAAAGPxKDi4sc_xW4TVk05';
    axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => { // 로그아웃 성공 시 메인페이지로 이동되야함
        console.log("logout 성공");
        console.log(response.id);
        localStorage.clear();
        navigate('/');
      })
      .catch(error => {
        console.log("logout 실패");
        //navigate('/');
      });
  }
  
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
          <button className='logOut_button' onClick={kakaoLogout}>
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
              {isAdmin && (
                <button className="side-bar"
                  onClick={() => moveToSetTeam(lecture_name)}>
                  <div style={{ margin: '1vh', color: 'white', fontWeight: 'bold' }}>팀 배정</div>
                </button>
              )}
              <div>
                <button className="side-bar" style={{ boxShadow: '0 4 0' }}>
                  <div style={{ margin: '1vh', color: 'white', fontWeight: 'bold' }}>팀원 목록</div>
                </button>
                <div className="team-container">
                  {teamMembers.map(member => (
                    <button className="team-name" key={member.id} onClick={() => handleTeamMemberClick(member.nickname, lecture_name)}>
                      {member.nickname}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="task-q-container">
              <div className="task-container-title">
                과제
              </div>

              <div className="task-container">
                {homeworks.map((hw, index) => (
                  <div className="task" key={index}>
                    <div className="task-font">
                    {hw.hw_name.length > 30 ? `${hw.hw_name.substring(0, 30)}...` : hw.hw_name}
                      <button className="button-style"
                        onClick={() => moveToSubmitAssign(lecture_name)}>
                        View Details</button>
                    </div>
                  </div>
                ))}
              </div>


              <div className="task-container-title" style={{ backgroundColor: '#FFAE35' }}>
                학생들이 출제한 문제
              </div>
              <div className="task-container" style={{ backgroundColor: '#FFF9E9' }}>
                {questions.map((question, index) => (
                  <div className="task" key={index}>
                    <div className="task-font">
                      {question.q_name.length > 30 ? `${question.q_name.substring(0, 30)}...` : question.q_name}
                      <button className="button-style" onClick={() => moveToSubmitAssign(lecture_name)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
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