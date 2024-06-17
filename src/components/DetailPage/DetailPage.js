import React, { useState, useEffect } from 'react';
import './DetailPage.css'; // DetailPage의 스타일 파일 import
import Foundation from '../MainPage/Foundation.js';
import '../StudentQListPage/StudentQListPage.js';
import { BsPencilSquare } from "react-icons/bs";
import DoughnutChart from './DoughnutChart';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainPage2 from '../MainPage/MainPage2.js';
// import homeworkData from './DummyHW.json';
// main 도전

function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  //const course = location.state?.course || 'none course';
  const course = localStorage.getItem('course');
  const lecture_name = localStorage.getItem('className');

  const [teamMembers, setTeamMembers] = useState([]);

  const [homeworks, setHomeworks] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);  // 권한 확인을 위한 상태
  const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

  let [lectureId, change_lectureId] = useState();             // 추가한 변수 240605/0137
  const storedUserToken = localStorage.getItem('userToken_main');   // 추가한 변수 240605/0137

  // 도넛차트 변수 시작
  const correctHwCount = homeworks.filter(hw => hw.correct).length;
  const incorrectHwCount = homeworks.length - correctHwCount;
  const correctQuestionCount = questions.filter(question => question.correct).length;
  const incorrectQuestionCount = questions.length - correctQuestionCount;
  const totalCorrect = correctHwCount + correctQuestionCount;
  const totalIncorrect = incorrectHwCount + incorrectQuestionCount;
  // 도넛 차트 변수 끝

  useEffect(() => {
    const storedName = localStorage.getItem('name_main');
    change_lectureId(localStorage.getItem('classToken'));
    change_lectureId(localStorage.getItem('classToken'));
    const lectureMadeBy = location.state?.lecture_madeby; // 강의 생성자 정보 가져오기

    console.log('storedName:', storedName, 'lectureMadeBy:', lectureMadeBy);

    if (storedName === lectureMadeBy) {
      setIsAdmin(true);
    }
  }, [location.state]);
  // 06/07 0105 수정


  useEffect(() => {
    const fetchLectureDetails = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const response = await axios.get(`${API_BASE_URL}/${storedUserToken}/${lectureId}/lecturepage`);
        setTeamMembers(response.data.teamMembers); // 서버로부터 받은 팀원 데이터로 상태 업데이트
        console.log('팀원 이름 불러오기 성공')
        setLoading(false); // 데이터 로딩 완료
      } catch (error) {
        console.error('Failed to fetch lecture details:', error);
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchLectureDetails();
  }, [API_BASE_URL, storedUserToken, lectureId]); // 의존성 배열에 API_BASE_URL, storedUserToken, lectureId 추가


  useEffect(() => {
    axios.get(`${API_BASE_URL}/${storedUserToken}/${lectureId}/lecturepage`)
      .then(response => {
        const assignments = response.data.task.concat(response.data.exercise);
        console.log('서버로부터 받은 과제, 문제 데이터:', response.data);
        console.log('구분자');
        setHomeworks(assignments.filter(assignment => assignment.problem === '0'));
        setQuestions(assignments.filter(assignment => assignment.problem === '1'));
        console.log(response.data); //  출력, 240616_14:37
        console.log('구분자2');
        console.log(homeworks); //  출력, 240616_14:37
        console.log(questions); //  출력, 240616_14:37

        setLoading(false); // 데이터 로딩 완료
      })
      .catch(error => {
        console.error('과제 데이터를 가져오는 데 실패:', error);
        setLoading(false); // 데이터 로딩 완료
      });
  }, [API_BASE_URL, storedUserToken, lectureId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSiteName = () => {
    navigate('/Main');
  }

  function moveToSetAssign(lectureName) {
    navigate('/SetAssign', { state: { lecture_name: lectureName } });
  }

  function moveToSetTeam(lectureName) {
    navigate('/SetTeam', { state: { lecture_name: lectureName } });
  }

  function moveToSubmitAssign(assignmentId, correct, title) {
    localStorage.setItem("assignmentTitle", title);
    if(correct){
      navigate('/CodeReview');
    }
    else{
      localStorage.setItem('assignmentToken', assignmentId)
      navigate('/SubmitAssign');
    }
  } // 이동 추가 + onClick={moveToSubmitAssign}

  const kakaoLogout = () => { // 카카오 로그아웃을 위한 함수, post 요청을 통해 accessToken을 보내 토큰을 만료시켜 로그아웃함
    const accessToken_main = localStorage.getItem('accessToken_main');
    axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${accessToken_main}`
      },
    })
      .then((response) => { // 로그아웃 성공 시 메인페이지로 이동되야함
        console.log("logout 성공");
        console.log(response);
        console.log(response.data.id);
        localStorage.clear();
        navigate('/');
      })
      .catch(error => {
        console.log("logout 실패");
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
                onClick={() => moveToSetAssign(lecture_name, course)}>
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
                    <button className="team-name" key={member.id}>
                      {member.name}
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
                      {hw.title}
                      <button className={`button-style ${hw.correct ? 'button-done' : ''}`} onClick={() => moveToSubmitAssign(hw.assignmentId, hw.correct, hw.title)}>
                        {hw.correct ? "Done" : "View Details"}
                      </button>
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
                      {question.title}
                      <button className={`button-style ${question.correct ? 'button-done' : ''}`} onClick={() => moveToSubmitAssign(question.assignmentId, question.correct, question.title)}>
                        {question.correct ? "Done" : "View Details"}
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
              <DoughnutChart correct={totalCorrect} incorrect={totalIncorrect} />
              </div>

            </div>


          </div>


        </div>
      </div>
    </div>
  );
}


export default DetailPage;