import './MainPage2.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillCalendar } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";


function ClassComponent({ lectureData }) {
    // name: 과목명, madeby: 출제자 토큰, madeby_name: 출제자 이름, lectureId: 과목번호
    const { name: lecture_name, madeby: lecture_madeby_token, madeby_name: lecture_madeby, lectureId: lecture_token, course } = lectureData;
    const [lecture_date1, setLectureDate1] = useState("월요일");
    const [lecture_date2, setLectureDate2] = useState("수요일");

    const location = useLocation();
    const navigate = useNavigate();

    // 페이지 이동 시 사용할 과목 변수 시작
    // const [className, setClassName] = useState();
    // const [classToken, setClassToken] = useState();
    // const [classMaker, setClassMaker] = useState();
    // const [classMakerToken, setClassMakerToken] = useState();
    // 페이지 이동 시 사용할 과목 변수 끝

    function moveToDetail(lectureName, lectureToken, lectureMadeBy, lectureMadeByToken, course) {
        navigate('/detail', { state: { lecture_name: lectureName, lecture_madeby: lectureMadeBy, course: lectureData.course } });
        localStorage.setItem('className', lectureName);
        localStorage.setItem('classToken', lectureToken);
        localStorage.setItem('classMaker', lectureMadeBy);
        localStorage.setItem('classMakerToken', lectureMadeByToken);
        localStorage.setItem('course', course);
    }
    const headerStyle = (course === "1") ? { backgroundColor: '#FFE4E1' } : {};


    return (
        <div className="main-box">
            <div className="main-header" style={headerStyle}>
                <span style={{ marginLeft: '2vw', fontSize: '2.2vh' }}>{lecture_name}</span>
                <span style={{ marginLeft: '2vw', color: '#9A9A9A' }}>제작자 : {lecture_madeby}</span>
            </div>
            <div className="main-content">
                {/* <div className="main-schedule">
                    <AiFillCalendar className="icon-margin" />
                    <span>{lecture_date1}</span>
                    <FaRegClock className="icon-margin" style={{ marginLeft: '2vw' }} />
                    <span>01:00 PM - 03:00 PM</span>
                </div>

                <div className="main-schedule" style={{ marginTop: '0.5vw' }}>
                    <AiFillCalendar className="icon-margin" />
                    <span>{lecture_date2}</span>
                    <FaRegClock className="icon-margin" style={{ marginLeft: '2vw' }} />
                    <span>01:00 PM - 03:00 PM</span>
                </div>

                <div className="rate-container">
                    <div className="attendence-rate">
                        <span>출석률</span>
                        <span style={{ marginLeft: '4vw', color: 'blue' }}>100%</span>
                    </div>

                    <div className="attendence-rate">
                        <span>과제 제출</span>
                        <span className="rate-percent" style={{ color: 'green' }}>100%</span>
                    </div>
                </div> */}

                <button
                    onClick={() => moveToDetail(lecture_name, lecture_token, lecture_madeby, lecture_madeby_token, course)}
                    className="to-detailpage-button" // className을 Link 컴포넌트에 직접 적용
                >자세히 보기</button>
            </div>
        </div>
    );
}

export default ClassComponent;