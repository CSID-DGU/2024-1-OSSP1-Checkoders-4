import '../Foundation/Foundation.css'
import './SetAssign.css';
import { useState } from 'react';

function SetAssign() {
  let [lectureName, changeLecture] = useState('객체지향 프로그래밍_03');

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
        <div className='leftBlank'></div>
        <div className='midCore'>
          <div className='lecture'>
            📖 {lectureName}
          </div>
          <div className='mainContent'>
            <div className='tabCover'>

            </div>
            <div className='assignInfo'>
              <div className='problemName'>
                <div className='problemNameSpace'>
                  문제 이름:
                </div>
                <div className='problemNameInputSpace'>
                  <textarea className='problemNameTextArea' placeholder='제목을 입력하세요.' ></textarea>
                </div>
              </div>
              <div className='problemExplanation'>
                <div className='problemExplanaitonCover'>
                  문제내용
                </div>
                <div className='problemExplanationContent'>
                  <textarea className='problemExplanationTextArea' placeholder='문제 내용을 입력하세요.'></textarea>
                </div>
              </div>
              <div className='problemInputs'>
                <div className='inputIndicate'>
                  테스트 케이스:
                </div>
                <div>
                  <textarea className='inputBox' placeholder='ex) 
                2'></textarea>
                </div>
                <div className='inputIndicate'>
                  입력 데이터:
                </div>
                <div>
                  <textarea className='inputBox' placeholder='ex) 
                2 3 4 5
                4 5 3 7'></textarea>
                </div>
                <div className='inputIndicate'>
                  예상 답안:
                </div>
                <div>
                  <textarea className='inputBox' placeholder='ex) 
                1
                2'></textarea>
                </div>
              </div>
              <div className='problemCode'>
                <div className='prblemCodeCover'>
                  예제 코드
                </div>
                <div className='problemCodeContent'>
                  <textarea className='problemCodeTextArea' placeholder='예제 코드를 입력하세요.'></textarea>
                </div>
              </div>
              <div className='problemClosing'>
                <div className='executionResult'>
                  <div className='excutionResultCover'>실행 결과</div>
                  <div className='excutionResultContent'>실행 </div>
                </div>
                <div className='buttons'>
                  <button className='setProblemcompileButton'>컴파일</button>
                  <button className='setProblemsubmitButton'>제출</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='rightBlank'></div>
      </div>
    </div>
  );
}

export default SetAssign;
