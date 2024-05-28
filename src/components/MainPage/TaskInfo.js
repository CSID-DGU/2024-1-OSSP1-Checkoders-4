import './MainPage2.css';
import React from 'react';
import { FaRegClock } from "react-icons/fa";
import { AiFillCalendar } from "react-icons/ai";
import './ClassComponent.js';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import

function TaskInfo(props) {
    return (
        <div>
          <div className="main-box">
            <div className="main-header" style={{ backgroundColor: "#FFE4E1" }}>
              <span style={{ marginLeft: '2vw', fontSize: '2.2vh', color: 'red', marginTop: '3vh'}}>D-3</span>
              <p style={{ marginLeft: '2vw', color: "black", marginTop: '1vh' }}>실습과제 안내</p>
            </div>
            <div className="main-content">
              <div className="main-schedule">
                <AiFillCalendar className="icon-margin" />
                <span>화요일 4/17</span>
                <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                <span> 11:59 PM</span>
              </div>

              <div className="main-task-name">
                <span style={{ color: "#F12222", fontWeight: "bold", marginTop: '1vh' }}>{props.lecture_name}</span>
              </div>
              <Link to="/detail" className="to-detailpage-button" style={{ backgroundColor: "black", marginTop: '2vh' }}>과제 보러가기</Link>
            </div>
            
              {/* <button className="detail-button">자세히 보기</button> */}
            </div>
          </div>
    )
}

export default TaskInfo;