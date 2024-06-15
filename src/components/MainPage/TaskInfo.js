// import './MainPage2.css';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaRegClock } from "react-icons/fa";
// import { AiFillCalendar } from "react-icons/ai";
// import './ClassComponent.js';
// import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import

// function TaskInfo() {

//       const [assignments, setAssignments] = useState([]);
//       const [deadlines, setDeadlines] = useState([]);
//       const [title, setTitle] = useState(''); // title 상태 추가
//       const [loading, setLoading] = useState(true);
//       const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;
//       const storedUserToken = localStorage.getItem('userToken_main');

//       useEffect(() => {
//         axios.get(`${API_BASE_URL}/${storedUserToken}/mainpage`) // 일단 경로 mainpage로 적어둠
//             .then(response => {
//                 // response.data는 API 응답에 따라 조정해야 할 수 있습니다.
//                 setAssignments(response.data); // 과제 데이터 저장
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching deadlines:', error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Loading deadlines...</div>;
//     }
        
//       // 가장 임박한 deadline 찾기
//       const closestAssignment = assignments.reduce((acc, current) => {
//         const currentDate = new Date(current.deadline);
//         const now = new Date();
//         return currentDate > now && (!acc || currentDate < new Date(acc.deadline)) ? current : acc;
//     }, null);

//     if (!closestAssignment) {
//         return <div>No upcoming deadlines.</div>;
//     }

//     const deadlineDate = new Date(closestAssignment.deadline);
//     const now = new Date();
//     const timeDiff = deadlineDate - now;
//     const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));


//     return (
//         <div>
//           <div className="main-box">
//             <div className="main-header" style={{ backgroundColor: "#FFE4E1" }}>
//               <span style={{ marginLeft: '2vw', fontSize: '2.2vh', color: 'red', marginTop: '3vh'}}>D-{daysRemaining}</span>
//               <p style={{ marginLeft: '2vw', color: "black", marginTop: '1vh' }}>실습과제 안내</p>
//             </div>
//             <div className="main-content">
//               <div className="main-schedule">
//                 {/* <AiFillCalendar className="icon-margin" />
//                 <span>화요일 4/17</span> */}
//                 <FaRegClock className="icon-margin" style={{marginLeft: '2vw'}}/>
//                 <span> 마감 기한 : {deadlineDate.toLocaleDateString()}</span>
//               </div>

//               <div className="main-task-name">
//                 <span style={{ color: "#F12222", fontWeight: "bold", marginTop: '1vh' }}>{closestAssignment.title}</span>
//               </div>
//               <Link to="/detail" className="to-detailpage-button" style={{ backgroundColor: "black", marginTop: '2vh' }}>과제 보러가기</Link>
//             </div>
            
//               {/* <button className="detail-button">자세히 보기</button> */}
//             </div>
//           </div>
//     )
// }

// export default TaskInfo;

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