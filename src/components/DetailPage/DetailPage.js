import React from 'react';
import './DetailPage.css'; // DetailPage의 스타일 파일 import
import Foundation from '../MainPage/Foundation.js';
import '../StudentQListPage/StudentQListPage.js';
import { BsPencilSquare } from "react-icons/bs";
import DoughnutChart from './DoughnutChart';
import {useNavigate} from 'react-router-dom';

function DetailPage(){

  const navigate = useNavigate();

  function moveToStudentQList(){
    navigate('/studentqlist');
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
          <div className="class-info">
            <BsPencilSquare style={{width: '3vw'}}/>
            <div className="class-name">
              <span>객체지향프로그래밍_03</span>
            </div>
          </div>

          <div className="bottom-box">
            <div className="bottom-box-sidebar">
              <button className="side-bar">
                <div style={{margin: '1vh', color: 'white', fontWeight: 'bold'}}>문제출제</div>
              </button>
              <button className="side-bar">
                <div style={{margin: '1vh', color: 'white', fontWeight: 'bold'}}>팀 배정</div>
              </button>
              <div>
                <button className="side-bar" style={{boxShadow: '0 4 0'}}>
                  <div style={{margin: '1vh', color: 'white', fontWeight: 'bold'}}>팀원 목록</div>
                </button>
                <div className="team-container">
                  <button className="team-name" onClick={moveToStudentQList}>
                    <div>홍길동</div>
                  </button>
                  <button className="team-name" onClick={moveToStudentQList}>
                    박성훈
                  </button>
                  <button className="team-name" onClick={moveToStudentQList}>
                    김철수
                  </button>
                  <button className="team-name" onClick={moveToStudentQList}>
                    최유민
                  </button>
                </div>
              </div>
              
            </div>

            <div className="task-q-container">
              <div className="task-container-title">
                과제
              </div>
              <div className="task-container">
                <div className="task" >
                  <div className="task-font">
                    밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와..
                      <button className="button-style">View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와..
                    <button className="button-style">View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    다음 조건을 만족시키는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와 그에 해당..
                    <button className="button-style" style={{color: 'red'}}>Done</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                  다음 조건을 만족시키는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와 그에 해당..
                  <button className="button-style" style={{color: 'red'}}>Done</button>
                  </div>
                </div>
              </div>

              <div className="task-container-title" style={{backgroundColor: '#FFAE35'}}>
                학생들이 출제한 문제
              </div>
              <div className="task-container" style={{ backgroundColor: '#FFF9E9'}}>
              <div className="task" >
                  <div className="task-font">
                    밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와..
                    <button className="button-style">View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와..
                    <button className="button-style">View Details</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                    다음 조건을 만족시키는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와 그에 해당..
                    <button className="button-style" style={{color: 'red'}}>Done</button>
                  </div>
                </div>
                <div className="task" >
                  <div className="task-font">
                  다음 조건을 만족시키는 삼각형 클래스를 작성하고, 두 삼각형의 넓이와 그에 해당..
                  <button className="button-style" style={{color: 'red'}}>Done</button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className= "chart-container-title">
                과제 현황
              </div>
              <div className= "chart-container">
                <DoughnutChart />
              </div>
                
            </div>


          </div>


        </div>
      </div>
    </div>
    );
  }


export default DetailPage;