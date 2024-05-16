import './Foundation.css';
import './MainPage2.css';
import './CalendarStyle.css';
import { AiOutlineHome, AiFillCalendar, AiFillPlusCircle } from "react-icons/ai";
import {FaRegClock } from "react-icons/fa";
import React from 'react';
import logo from '../동국대로고.png';
import TaskCalendar from './TaskCalendar.js';
import TaskInfo from './TaskInfo.js';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import


function MainPage2() {
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
      <div className='bottomBox' style={{flexDirection: 'column'}}>
        
        <div className='Main-name'>
          <AiOutlineHome className="home-icon" />
          메인페이지
        </div>

        <div className="main-bottom-box">
            <div className="main-container">
               <div className="main-container-title">
                  현재 진행중인 클래스
                  <div style={{marginRight: '5%', width: '6vw'}}>
                    <AiFillPlusCircle />
                  </div>
               </div> 
               <div className="main-container-box">
                  <div className="main-box">
                     <div className="main-header">
                        <span style={{ marginLeft: '2vw', fontSize: '2.2vh'}}>객체지향프로그래밍_03</span>
                        <span style={{marginLeft: '2vw', color: '#9A9A9A'}}>윤성림</span>
                     </div>
                     <div className="main-content">
                        <div className="main-schedule">
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="main-schedule" style={{marginTop: '0.5vw'}}>
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="rate-container">
                            <div className="attendence-rate">
                                <span>출석률</span>
                                <span style={{marginLeft: '4vw', color: 'blue'}}>100%</span>
                            </div>

                            <div className="attendence-rate">
                                <span>과제 제출</span>
                                <span className="rate-percent" style={{color: 'green'}}>100%</span>
                            </div>
                        </div>

                        <Link to="/detail" className="to-detailpage-button">자세히 보기</Link>
                     </div>
                  </div>

                  <div className="main-box">
                     <div className="main-header">
                        <span style={{ marginLeft: '2vw', fontSize: '2.2vh'}}>객체지향프로그래밍_03</span>
                        <span style={{marginLeft: '2vw', color: '#9A9A9A'}}>윤성림</span>
                     </div>
                     <div className="main-content">
                        <div className="main-schedule">
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="main-schedule" style={{marginTop: '0.5vw'}}>
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="rate-container">
                            <div className="attendence-rate">
                                <span>출석률</span>
                                <span style={{marginLeft: '4vw', color: 'blue'}}>100%</span>
                            </div>

                            <div className="attendence-rate">
                                <span>과제 제출</span>
                                <span className="rate-percent" style={{color: 'green'}}>100%</span>
                            </div>
                        </div>

                        <Link to="/detail" className="to-detailpage-button">자세히 보기</Link>
                     </div>
                  </div>

                  <div className="main-box">
                     <div className="main-header">
                        <span style={{ marginLeft: '2vw', fontSize: '2.2vh'}}>객체지향프로그래밍_03</span>
                        <span style={{marginLeft: '2vw', color: '#9A9A9A'}}>윤성림</span>
                     </div>
                     <div className="main-content">
                        <div className="main-schedule">
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="main-schedule" style={{marginTop: '0.5vw'}}>
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="rate-container">
                            <div className="attendence-rate">
                                <span>출석률</span>
                                <span style={{marginLeft: '4vw', color: 'blue'}}>100%</span>
                            </div>

                            <div className="attendence-rate">
                                <span>과제 제출</span>
                                <span className="rate-percent" style={{color: 'green'}}>100%</span>
                            </div>
                        </div>

                        <Link to="/detail" className="to-detailpage-button">자세히 보기</Link>
                     </div>
                  </div>

                  <div className="main-box">
                     <div className="main-header">
                        <span style={{ marginLeft: '2vw', fontSize: '2.2vh'}}>객체지향프로그래밍_03</span>
                        <span style={{marginLeft: '2vw', color: '#9A9A9A'}}>윤성림</span>
                     </div>
                     <div className="main-content">
                        <div className="main-schedule">
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="main-schedule" style={{marginTop: '0.5vw'}}>
                          <AiFillCalendar className="icon-margin"/>
                          <span>월요일</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="rate-container">
                            <div className="attendence-rate">
                                <span>출석률</span>
                                <span style={{marginLeft: '4vw', color: 'blue'}}>100%</span>
                            </div>

                            <div className="attendence-rate">
                                <span>과제 제출</span>
                                <span className="rate-percent" style={{color: 'green'}}>100%</span>
                            </div>
                        </div>

                        <Link to="/detail" className="to-detailpage-button">자세히 보기</Link>
                     </div>
                  </div>

               </div>
            </div>
            <div className="name-calendar-container">
                <div className="name-container">
                    <div className="name-logo-container">
                      이름: 홍길동
                      <img src={logo} alt="동국대로고" style={{ width: '6vw', height: 'auto'}} />
                    </div>
                </div>

                <div className= "main-task-calendar">
                   <TaskCalendar className="react-calendar"/>
                </div>
                <div className= "main-task-info">
                   <TaskInfo />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default MainPage2;