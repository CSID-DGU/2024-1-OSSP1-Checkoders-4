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
import axios from 'axios';
import DummyClass from './DummyClass.json';

function MainPage2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("홍길동");
  const [user_id, setUser_id] = useState('0123456789');
  const [accessToken, setAccessToken] = useState('');
  const [lecture_name, setLectureName] = useState("객체지향 프로그래밍");

  // 로그인 관련
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = new URLSearchParams(window.location.search).get('userId');
  // 로그인 관련 끝

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  console.log('userId from URL:', userId);

  useEffect(() => {
    if (userId) {
      console.log(`Fetching user information with userId: ${userId}`);
      axios.get(`http://localhost:8080/user?userId=${userId}`)
        .then(response => {
          console.log('User data fetched:', response.data); // 응답 데이터 확인
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
          setLoading(false);
        });
    } else {
      console.log('No userId found in URL');
      setLoading(false);
    }
  }, [userId]);
  
  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);
  
  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setUser_id(user.id_token);
      setAccessToken(user.accessToken);
      localStorage.setItem('nickname', user.nickname);
      localStorage.setItem('id_token', user.id_token);
      localStorage.setItem('accessToken', user.accessToken);
    }
  }, [user]);
  
  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    const storedIDToken = localStorage.getItem('id_token');
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedNickname && storedIDToken) {
      setNickname(storedNickname);
      setUser_id(storedIDToken);
      console.log('storing success');
    }
    else{
      console.log('storing fail');
    }
    if(storedAccessToken){
      console.log('accessToken success');
      setAccessToken(storedAccessToken);
    }
    else{
      console.log('accessToken fail');
    }
  }, []);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const renderClassComponents = () => {
    return DummyClass.Data.slice(0, count).map((item, index) => (
      <ClassComponent key={index} lectureData={item}/>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Foundation">
      <div className='topCover'>
        <div className='siteName'>
          <button className='siteName_button'>
            ✔ Checkoders
            {/* 온클릭하면 메인페이지 */}
          </button>
        </div>
        <div className='midBlank'></div>
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
            </div>
            <div className="main-container-box">
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
              <TaskCalendar />
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
