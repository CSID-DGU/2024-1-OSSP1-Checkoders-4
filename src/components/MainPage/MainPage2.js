import './Foundation.css';
import './MainPage2.css';
import './CalendarStyle.css';
import { AiOutlineHome } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../동국대로고.png';
import TaskCalendar from './TaskCalendar.js';
import TaskInfo from './TaskInfo.js';
import ClassCreate from './ClassCreate.js';
import ClassSearch from './ClassSearch.js';
import ClassComponent from './ClassComponent.js';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import
import axios from 'axios';

function MainPage2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("홍길동");
  const [lecture_name, setLectureName] = useState("객체지향 프로그래밍");

  // 로그인 관련
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = new URLSearchParams(window.location.search).get('userId');
  // 로그인 관련 끝

  const [count, setCount] = useState(() => {
    // 로컬 스토리지에서 count 값을 불러오거나 기본값으로 0 설정
    const savedCount = localStorage.getItem('count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  }); // count 상태 추가

  console.log('userId from URL:', userId); // 추가된 로그

  if (userId) {
    console.log(`Fetching user information with userId: ${userId}`);
    axios.get(`http://localhost:8080/user?userId=${userId}`)
      .then(response => {
        console.log('User data fetched:', response.data); // 응답 데이터 확인
        setUser(response.data);
        setLoading(false);
        setNickname(user.nickname);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
        setLoading(false);
      });
  } else {
    console.log('No userId found in URL');
    setLoading(false);
  }
  // 로그인 관련
  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count], [userId]);

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (!user) {
    return <div>No user information found.</div>;
  }
  // 로그인 관련 끝

  // count를 업데이트하는 함수
  const incrementCount = () => {
    setCount(count + 1);
  };

  // ClassComponent를 count 수만큼 렌더링
  const renderClassComponents = () => {
    return [...Array(count)].map((_, i) => <ClassComponent key={i} />);
  };

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
      <div className='bottomBox' style={{ flexDirection: 'column' }}>

        <div className='Main-name'>
          <AiOutlineHome className="home-icon" />
          메인페이지
          <ClassCreate />
          <ClassSearch incrementCount={incrementCount} />
        </div>

        <div className="main-bottom-box">
          <div className="main-container">

            <div className="main-container-title">
              현재 진행중인 클래스
              {/* <PopUp /> */}
            </div>
            <div className="main-container-box">
              {/*count값에 맞게 for문 돌리고 데이터에서 받아온 lecture_name, lecture_madeby 가져와서 
                  ClassComponent에서 쓰도록 하기*/}
              {renderClassComponents()}
            </div>

          </div>
          <div className="name-calendar-container">
            <div className="name-container">
              <div className="name-logo-container">
                이름: {nickname}
                <img src={logo} alt="동국대로고" style={{ width: '6vw', height: 'auto' }} />
              </div>
            </div>

            <div className="main-task-calendar">
              <TaskCalendar className="react-calendar" />
            </div>
            <div className="main-task-info">
              <TaskInfo lecture_name={lecture_name} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MainPage2;