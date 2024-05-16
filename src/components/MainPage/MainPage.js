import React, {useState, useEffect} from 'react';
import './MainPage.css';
import Header from './Header';
import TaskCalendar from './TaskCalendar.js';
import TaskInfo from './TaskInfo.js';
import logo from '../동국대로고.png';
//import LectureList from './LectureList.js';
import { FaUser, FaRegClock } from "react-icons/fa";
import { AiOutlineHome, AiFillCalendar } from "react-icons/ai";
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import

function MainPage() {
  // const [lectureData, setLectureData] = useState([]);

  // useEffect(() => {
  //     // LectureList.json 파일을 불러와 lectureData state에 저장
  //     fetch('../db/LectureListinfo.json')
  //         .then(response => response.json())
  //         .then(data => setLectureData(data))
  //         .catch(error => console.error('Error fetching lecture data:', error));
  // }, []);

  return (
   <div>
    <Header />
    <div className="main-page">
     <div className="main-page-title">
      <div className="icon-container">
        <AiOutlineHome className="home-icon" />
      </div>
      <div className="text-container">
        <h1 className="title-text">메인 페이지</h1>
      </div>
      <div className="outer-box">
        <div className="inner-box">
          <div className="icon-container">
            {/*<FaUser className="user-icon" />*/}
            <img src={logo} alt="동국대로고" style={{ width: '7vw', height: 'auto' }} />
          </div>
          <div className="user-info">
            <p className="name">이름: 홍길동</p>
          </div>
        </div>
      </div>
     </div>
     <div className= "task-calendar">
       <TaskCalendar />
     </div>
     <div className= "task-info">
       <TaskInfo />
     </div>
     <div className="classes-section">
        <div className="classes-header">
          <span>현재 진행중인 클래스</span>
        </div>
        <div className="class-box-container">

          {/* {lectureData.map((lecture, index) => (
                        <LectureList key={index} lectureList={lecture} />
            ))} */}

          <div className="class-box">
            <div className="class-header">
              <span>객체지향 프로그래밍_03</span>
              <p className="professor-name">한인</p>
            </div>
            <div className="class-content">
              <div className="schedule">
                <AiFillCalendar className="calendar-icon" />
                <span>월요일</span>
                <FaRegClock className="clock-icon" />
                <span>01:00 PM - 03:00 PM</span>
              </div>
              <div className="second-schedule">
                <span>목요일</span>
                <FaRegClock className="clock-icon" />
                <span>03:00 PM - 05:00 PM</span>
              </div>

              <div className="percent-wrapper">
                <p className="attendance-rate">출석률</p>
                <p className="percent">100%</p>
              </div>
              <div className="percent-wrapper">
                <p className="assignment-submission">과제 제출</p>
                <p className="percent">100%</p>
              </div>
              <Link to="/detail" className="detail-button">자세히 보기</Link>
              {/* <button className="detail-button">자세히 보기</button> */}
            </div>
          </div>

          <div className="class-box">
            <div className="class-header">
              <span>심화프로그래밍_01</span>
              <p className="professor-name">윤성림</p>
            </div>
            <div className="class-content">

              <div className="schedule">
                <AiFillCalendar className="calendar-icon" />
                <span>월요일</span>
                <FaRegClock className="clock-icon" />
                <span>09:00 AM - 11:00 AM</span>
              </div>
              <div className="second-schedule">
                <span>수요일</span>
                <FaRegClock className="clock-icon" />
              <span>09:00 AM - 11:00 AM</span>
              </div>

              <div className="percent-wrapper">
                <p className="attendance-rate">출석률</p>
                <p className="percent">100%</p>
              </div>
              <div className="percent-wrapper">
                <p className="assignment-submission">과제 제출</p>
                <p className="percent">100%</p>
              </div>
              <Link to="/detail" className="detail-button">자세히 보기</Link>
              {/* <button className="detail-button">자세히 보기</button> */}
            </div>
          </div>

          <div className="class-box">
            <div className="class-header">
              <span>기초프로그래밍_01</span>
              <p className="professor-name">윤성림</p>
            </div>
            <div className="class-content">
              <div className="schedule">
                <AiFillCalendar className="calendar-icon" />
                <span>화요일</span>
                <FaRegClock className="clock-icon" />
                <span>10:00 AM - 12:00 PM</span>
              </div>
              <div className="second-schedule">
                <span>목요일</span>
                <FaRegClock className="clock-icon" />
              <span>10:00 AM - 12:00 PM</span>
              </div>

              <div className="percent-wrapper">
                <p className="attendance-rate">출석률</p>
                <p className="percent">100%</p>
              </div>
              <div className="percent-wrapper">
                <p className="assignment-submission">과제 제출</p>
                <p className="percent">100%</p>
              </div>
              <Link to="/detail" className="detail-button">자세히 보기</Link>
              {/* <button className="detail-button">자세히 보기</button> */}
            </div>
          </div>

          <div className="class-box">
            <div className="class-header">
              <span>데이터베이스_01</span>
              <p className="professor-name">이우진</p>
            </div>
            <div className="class-content">
              <div className="schedule">
                <AiFillCalendar className="calendar-icon" />
                <span>화요일</span>
                <FaRegClock className="clock-icon" />
                <span>02:00 PM - 04:00 PM</span>
              </div>
              <div className="second-schedule">
                <span>목요일</span>
                <FaRegClock className="clock-icon" />
              <span>02:00 PM - 04:00 PM</span>
              </div>

              <div className="percent-wrapper">
                <p className="attendance-rate">출석률</p>
                <p className="percent">100%</p>
              </div>
              <div className="percent-wrapper">
                <p className="assignment-submission">과제 제출</p>
                <p className="percent">100%</p>
              </div>
              <Link to="/detail" className="detail-button">자세히 보기</Link>
              {/* <button className="detail-button">자세히 보기</button> */}
            </div>
          </div>

        </div>
     </div>
    </div>
   </div>
  );
}

export default MainPage;
