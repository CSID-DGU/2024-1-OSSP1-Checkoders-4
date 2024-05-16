import React from 'react';
import '../MainPage/Foundation.css';
import './StudentQListPage.css';
import { FaUserCircle } from "react-icons/fa";

function StudentQListPage() {
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

          <div className="stud-info">
            <FaUserCircle style={{width: '3vw'}}/>
            <div className="stud-name">
              <span>홍길동</span>
            </div>
          </div>

          <div className="qlist-bottom-box">
            <div className="q-container">
              <div className="q-container-title">
                출제한 문제
              </div>

              <div className="q-container-box">
                <div className="q-field">
                  <div className="q-field-title">
                    밑변과 높이 필드를 가지는...
                  </div>
                  <div className="q-field-content">
                    밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.
                  </div>
                </div>

                <div className="q-field">
                  <div className="q-field-title">
                    밑변과 높이 필드를 가지는...
                  </div>
                  <div className="q-field-content">
                    밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.
                  </div>
                </div>

                <div className="q-field">
                  <div className="q-field-title">
                    밑변과 높이 필드를 가지는...
                  </div>
                  <div className="q-field-content">
                    밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentQListPage;