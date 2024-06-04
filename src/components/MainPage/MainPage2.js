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
import { el } from 'date-fns/locale';

function MainPage2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [name_main, setName_main] = useState("홍길동");
  const [userToken_main, setUserToken_main] = useState('0123456789');
  const [accessToken_main, setAccessToken_main] = useState('');
  const [lecture_name, setLectureName] = useState("객체지향 프로그래밍");
  const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

  // 로그인 관련
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = new URLSearchParams(window.location.search).get('name');
  const usertoken = new URLSearchParams(window.location.search).get('usertoken');
  const access_token = new URLSearchParams(window.location.search).get('access_token');
  // 로그인 관련 끝

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    if (usertoken) {
      console.log(`Fetching user information with usertoken: ${usertoken}`);
      axios.get(`http://localhost:8080/user?usertoken=${usertoken}`)
        // if (userId) {
        //   console.log(`Fetching user information with userId: ${userId}`);
        //   axios.get(`${API_BASE_URL}/user?userId=${userId}`)
        .then(response => {
          console.log(response);
          console.log('User data fetched:', response.data); // 응답 데이터 확인
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
          setLoading(false);
        });
    } else {
      console.log('No usertoken found in URL');
      setLoading(false);
    }

    if (username && usertoken && access_token) {
      setName_main(username);
      localStorage.setItem('name_main', username);
      console.log("storing UN success", username);

      setUserToken_main(usertoken);
      localStorage.setItem('userToken_main', usertoken);
      console.log("storing UT success", usertoken);

      setAccessToken_main(access_token);
      localStorage.setItem('accessToken_main', access_token);
      console.log("storing AT success", access_token);
    }

    const storedName = localStorage.getItem('name_main');
    const storedUserToken = localStorage.getItem('userToken_main');
    const storedAccessToken = localStorage.getItem('accessToken_main');
    
    if (storedName&&storedUserToken&&storedAccessToken) {
      setName_main(storedName);
      console.log('gathering Name success');

      setUserToken_main(storedUserToken);
      console.log('gathering UT success');

      setAccessToken_main(storedAccessToken);
      console.log('gathering AT success');
    }
  }, [username, usertoken, access_token]);

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  // const sendClassName = async () => {
  //   try {
  //     await axios.post(`${API_BASE_URL}/${token}/participate`, new URLSearchParams({ lectureName: lecture_id }));
  //     // 성공적으로 강의가 추가된 후, 강의 목록을 새로 고침
  //     const updatedLectures = await axios.get(`${API_BASE_URL}/${token}/lectures`);
  //     setLectures(updatedLectures.data);  // 강의 목록을 업데이트
  //   } catch (error) {
  //     console.error('클래스 ID를 전달하는 데 실패했습니다:', error);
  //   }
  // };

  const renderClassComponents = () => {
    return DummyClass.Data.slice(0, count).map((item, index) => (
      <ClassComponent key={index} lectureData={item} />
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <button className='siteName_button'>
            ✔ Checkoders
            {/* 온클릭하면 메인페이지 */}
          </button>
        </div>
        <div className='midBlank'></div>
        <div className='logOut'>
          <button className='logOut_button' onClick={kakaoLogout}>
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
                이름: {name_main}
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