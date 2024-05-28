import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../MainPage/Foundation.css';
import './StudentQListPage.css';
import { FaUserCircle } from "react-icons/fa";
import '../DetailPage/DetailPage.js';
import QListComponent from './QListComponent.js';
import DummyQList from './DummyQList.json';


function StudentQListPage() {
  const location = useLocation();
  const team_member = location.state?.team_member || '팀원 이름 없음';
  const lecture_name = location.state?.lecture_name || '강의명 없음';

  const [qList, setQList] = useState([]);

  useEffect(() => {
    setQList(DummyQList.Data); // JSON 데이터를 상태로 설정
  }, []);

  return (
    <div className="Foundation">
      <div className='topCover'>
        <div className='siteName'>
          <button className='siteName_button'>
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

          <div className="stud-info">
            <FaUserCircle style={{width: '3vw'}}/>
            <div className="stud-name">
              <span>{team_member}</span>
            </div>
          </div>

          <div className="qlist-bottom-box">
            <div className="q-container">
              <div className="q-container-title">
                출제한 문제
              </div>

              <div className="q-container-box">
                    {qList.map(q => (
                      <QListComponent key={q.q_name} q_name={q.q_name} q_problem={q.q_problem} />
                    ))}

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentQListPage;