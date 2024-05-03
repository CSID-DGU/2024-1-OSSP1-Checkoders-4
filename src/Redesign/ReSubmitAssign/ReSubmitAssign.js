import './ReSubmitAssign.css';
import '../Foundation/Foundation.css';
import { useState } from 'react';

function ReSubmitAssign() {
  let[lectureName, changeLecture] = useState('객체지향 프로그래밍_03');

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
        <div className='leftBlank'>

        </div>
        <div className='midCore'>
          <div className='lecture'>
            📖 {lectureName}
          </div>
          <div className='mainContent'>
            <div className='tabCover'>
              
            </div>
            <div className='assignInfo'>
              <div className='assignContent'>
                <div className='problem'>
                  문제 내용
                </div>
                <div className='problemInfo'>
                  <p>받아올 과제명</p>
                  <p>받아올 과제 내용</p>
                  <p>받아올 처리조건</p>
                  <p>받아올 처리조건 내용</p>
                  <p>받아올 실험결과</p>
                  <p>받아올 실험결과 내용</p>
                </div>
              </div>
              <div className='submitContent'>
                <div className='solving'>
                  문제 풀이
                </div>
                <div className='solvingInfo'>
                  <textarea className='solvingBox' placeholder="풀이를 입력하세요."></textarea>
                </div>
              </div>
              <div className='initializer'>
                <button className='initButton'>
                  {/* 온클릭하면 박스 내용 초기화해야함 */}
                  소스코드 초기화
                </button>
              </div>
              <div className='actions'>
                <button className='compileButton'>
                  {/* 온클릭하면 컴파일 해야함 */}
                  컴파일
                </button>
                <button className='submitButton'>
                  {/* 온클릭하면 제출해야됨 */}
                  제출
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='rightBlank'>

        </div>
      </div>
    </div>
  );
}

export default ReSubmitAssign;
