import '../Foundation/Foundation.css'
import './CodeReview.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CodeReview() {
  let [lectureName, changeLecture] = useState('객체지향 프로그래밍_03');
  let [assignTitle, changeAssignTitle] = useState('실습 과제2');
  let [assignExplanation, changeAssignExplanation] = useState('밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.')
  let [assignLimitation, changeAssignLimitation] = useState('기본 생성자 사용, 조건문 사용');
  let [assignResult, changeAssignResult] = useState('삼각형 2가 더 넓습니다!');

  let [gptFeedback, changeGptFeedback] = useState('GPT가 작성한 피드백 내용')

  let[userName, changeUserName] = useState('이영희');


  const fetchData = () => {
    // GET 요청 보내기
    Promise.all([
      axios.get('api/data1'),
      axios.get('api/data2'),
      axios.get('api/data3'),
      axios.get('api/data4'),
      axios.get('api/data5'),
      axios.get('api/data6'),
      axios.get('api/data7')
    ])
      .then(([response1, response2, response3, response4, response5, response6, response7]) => {
        // 요청 성공 시 실행되는 코드
        changeLecture(response1.data);
        changeAssignTitle(response2.data);
        changeAssignExplanation(response3.data);
        changeAssignLimitation(response4.data);
        changeAssignResult(response5.data);
        changeGptFeedback(response6.data);
        changeUserName(response7.data);
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        changeLecture('객체지향 프로그래밍_03(요청실패)');
        changeAssignTitle('실습 과제2(요청실패)');
        changeAssignExplanation('밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.(요청실패)');
        changeAssignLimitation('기본 생성자 사용, 조건문 사용(요청실패)');
        changeAssignResult('삼각형 2가 더 넓습니다!(요청실패)');
        changeGptFeedback(
          '1. 주석 추가: 코드를 이해하기 쉽도록 주석을 추가하는 것이 좋습니다. 특히 클래스와 메서드의 역할, 변수의 용도 등을 설명하는 주석은 유용합니다.\n2. 입력 오류 처리: 사용자가 잘못된 입력을 할 경우 프로그램이 오류 없이 계속 실행되지만 예외 처리를 추가하여 이를 방지할 수 있습니다.\n 3. 변수명: 변수명은 코드를 이해하는 데 도움이 되도록 명확하고 의미 있는 이름으로 지어야 합니다.예를 들어, iBase, iHeight는 base, height로 변경하여 가독성을 높일 수 있습니다.\n 4. 매직 넘버 사용: 숫자 1, 2, 0은 코드에서 직접적으로 사용되어 있습니다.이 숫자들은 코드를 읽는 사람에게 의미를 전달하지 않습니다.이러한 숫자를 상수로 정의하고 사용하는 것이 가독성을 향상시킬 수 있습니다.\n 5. 리팩토링: 비교하는 부분을 메서드로 추출하여 코드의 재사용성을 높일 수 있습니다.(요청실패)')
        changeUserName('이영희(요청실패)');
      });
  }

  useEffect(() => {
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const navigate = useNavigate();
  const handleSiteName = () => {
    navigate('/Main');
  }

  return (
    <div className="Foundation">
      <div className='topCover'>
        <div className='siteName'>
          <button className='siteName_button' onClick={handleSiteName}>
            ✔ Checkoders
            {/* 온클릭하면 메인페이지 */}
          </button>
        </div>
        <div className='midBlank'>

        </div>
        <div className='logOut'>
          <button className='logOut_button' >
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
              <div className='problemContent'>
                <div className='contentCover'>
                  문제 내용
                </div>
                <div className='contentExplanation'>
                  <p>{assignTitle}</p>
                  <p>{assignExplanation}</p>
                  <p>처리조건</p>
                  <p>{assignLimitation}</p>
                  <p>실행결과</p>
                  <p>{assignResult}</p>
                </div>
              </div>
              <div className='feedback'>
                <div className='gptFeedback'>
                  <div className='gptCover'>GPT Feedback</div>
                  <div className='gptContent'>{gptFeedback}</div>
                </div>
                <div className='teamFeedback'>
                  <div className='feedCover'>Comment</div>
                  <div className='feedContent'>
                    <div className='comments'>
                      <div className='one_comment'>
                        <div className='writerName'>
                          홍길동
                        </div>
                        <div className='writerComment'>
                          홍길동이 작성한 댓글
                        </div>
                        <div className='writerName'>
                          김철수
                        </div>
                        <div className='writerComment'>
                          김철수가 작성한 댓글
                        </div>
                      </div>
                    </div>
                    <div className='addComment'>
                      <div className='userName'>
                        {userName}
                        </div>
                      <div className='inputTextBox'>
                        <textarea className='textBox'  placeholder='댓글을 남겨보세요'></textarea>
                      </div>
                      <div className='buttonArea'>
                        <button className='postButton'>
                          등록
                        </button>

                      </div>
                    </div>
                  </div>
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

export default CodeReview;
