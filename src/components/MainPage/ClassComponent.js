import './MainPage2.css';
import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { AiFillCalendar } from "react-icons/ai";
import {FaRegClock} from "react-icons/fa";
import DummyClass from './DummyClass.json';


function ClassComponent({ lectureData }) {
    const { lecture_name, lecture_madeby } = lectureData;
    const [lecture_date1, setLectureDate1] = useState("월요일");
    const [lecture_date2, setLectureDate2] = useState("수요일");

    const location = useLocation();
    const navigate = useNavigate();

    function moveToDetail(lectureName){
        navigate('/detail', { state: { lecture_name: lectureName } });
  }

    return( 
                <div className="main-box">
                    <div className="main-header">
                        <span style={{ marginLeft: '2vw', fontSize: '2.2vh'}}>{lecture_name}</span>
                        <span style={{marginLeft: '2vw', color: '#9A9A9A'}}>{lecture_madeby}</span>
                    </div>
                    <div className="main-content">
                        <div className="main-schedule">
                          <AiFillCalendar className="icon-margin"/>
                          <span>{lecture_date1}</span>
                          <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
                          <span>01:00 PM - 03:00 PM</span>
                        </div>

                        <div className="main-schedule" style={{marginTop: '0.5vw'}}>
                          <AiFillCalendar className="icon-margin"/>
                          <span>{lecture_date2}</span>
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

                        <button
                            onClick={() => moveToDetail(lecture_name)}
                            className="to-detailpage-button" // className을 Link 컴포넌트에 직접 적용
                            >자세히 보기</button>
                    </div>
                </div>
    );
}

export default ClassComponent;