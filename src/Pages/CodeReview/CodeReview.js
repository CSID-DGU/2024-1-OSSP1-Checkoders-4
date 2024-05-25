import '../Foundation/Foundation.css'
import './CodeReview.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import chat_data from './chat.json'
import codereview_data from './codereview.json'

function CodeReview() {
  const location = useLocation();
  const lecture_name = location.state?.lecture_name || '강의명 없음';

  let [hw_name, change_hw_name] = useState('실습 과제2');
  let [hw_problem, change_hw_problem] = useState('밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.')
  let [hw_test1, change_hw_test1] = useState(''); // 입력 예제1
  let [hw_test2, change_hw_test2] = useState(''); // 입력 예제2
  let [hw_test3, change_hw_test3] = useState(''); // 입력 예제3
  let [hw_test4, change_hw_test4] = useState(''); // 입력 예제4
  let [hw_test5, change_hw_test5] = useState(''); // 입력 예제5
  let [hw_test_answer1, change_hw_test_answer1] = useState(''); // 출력 예제1
  let [hw_test_answer2, change_hw_test_answer2] = useState(''); // 출력 예제2
  let [hw_test_answer3, change_hw_test_answer3] = useState(''); // 출력 예제3
  let [hw_test_answer4, change_hw_test_answer4] = useState(''); // 출력 예제4
  let [hw_test_answer5, change_hw_test_answer5] = useState(''); // 출력 예제5
  let [source, change_source] = useState('printf("Hello World!");');
  let [gpt_feedback, change_gpt_feedback] = useState('GPT가 작성한 피드백 내용');
  let [userName, changeUserName] = useState('이영희');
  let [cData, change_cData] = useState([]);


  const fetchData = () => {
    // GET 요청 보내기
    axios.get(`/코드리뷰주소`)
      .then((response) => {
        // 요청 성공 시 실행되는 코드
        // changeLecture(response.data.lecture_name);
        change_hw_name(response.data.hw_name);
        change_hw_problem(response.data.problem);
        change_hw_test1(response.data.test1);
        change_hw_test2(response.data.test2);
        change_hw_test3(response.data.test3);
        change_hw_test4(response.data.test4);
        change_hw_test5(response.data.test5);
        change_hw_test_answer1(response.data.test_answer1);
        change_hw_test_answer2(response.data.test_answer2);
        change_hw_test_answer3(response.data.test_answer3);
        change_hw_test_answer4(response.data.test_answer4);
        change_hw_test_answer5(response.data.test_answer5);
        change_source(response.data.source);
        change_gpt_feedback(response.data.gpt_feedback);
        change_cData(response.chat);
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        change_hw_name('실습 과제2(요청실패)');
        change_hw_name(codereview_data.hw[0].hw_name);
        change_hw_problem(codereview_data.hw[0].hw_problem);
        change_hw_test1(codereview_data.hw[0].hw_test1);
        change_hw_test2(codereview_data.hw[0].hw_test2);
        change_hw_test3(codereview_data.hw[0].hw_test3);
        change_hw_test4(codereview_data.hw[0].hw_test4);
        change_hw_test5(codereview_data.hw[0].hw_test5);
        change_hw_test_answer1(codereview_data.hw[0].hw_test_answer1);
        change_hw_test_answer2(codereview_data.hw[0].hw_test_answer2);
        change_hw_test_answer3(codereview_data.hw[0].hw_test_answer3);
        change_hw_test_answer4(codereview_data.hw[0].hw_test_answer4);
        change_hw_test_answer5(codereview_data.hw[0].hw_test_answer5);
        change_source(
          `import java.util.Scanner;

public class Practice {
  public static void main() {
    Scanner oInDev = new Scanner(System.in); // 스캐너 선언
    int iOut;

    System.out.println("값을 입력하세요");
    iOut = oInDev.nextInt();
    iOut = iOut * iOut + 1;
    System.out.println("계산 값: " + iOut);
  }
}`);
        change_gpt_feedback(
          `1. 주석 추가: 코드를 이해하기 쉽도록 주석을 추가하는 것이 좋습니다. 특히 클래스와 메서드의 역할, 변수의 용도 등을 설명하는 주석은 유용합니다.
          2. 입력 오류 처리: 사용자가 잘못된 입력을 할 경우 프로그램이 오류 없이 계속 실행되지만 예외 처리를 추가하여 이를 방지할 수 있습니다.
          (요청실패)`)
        changeUserName('이영희(요청실패)');
        change_cData(cData);
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
            📖 {lecture_name}
          </div>
          <div className='mainContent'>
            <div className='tabCover'>

            </div>
            <div className='assignInfo'>
              <div className='problemContent'>
                <div className='contentArea'>
                  <div className='contentCover'>
                    문제 내용
                  </div>
                  <div className='contentExplanation'>
                    <p>{hw_name}</p>
                    <p>{hw_problem}</p>
                    <div className='CodeReviewIOExample'>
                      <div className='CodeReviewInputExample' style={{ whiteSpace: 'pre-line' }}>
                        <p>입력 예제</p>
                        <p>
                          {hw_test1}<br />
                          {hw_test2}<br />
                          {hw_test3}<br />
                          {hw_test4}<br />
                          {hw_test5}
                        </p>
                      </div>
                      <div className='CodeReviewOutputExample' style={{ whiteSpace: 'pre-line' }}>
                        <p>출력 예제</p>
                        <p>
                          {hw_test_answer1}<br />
                          {hw_test_answer2}<br />
                          {hw_test_answer3}<br />
                          {hw_test_answer4}<br />
                          {hw_test_answer5}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
                <div className='contentCode'>
                  <div className='codeCover'>
                    제출 코드
                  </div>
                  <div className='codeResponse'>
                    <SyntaxHighlighter language="java">
                      {source}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
              <div className='feedback'>
                <div className='gptFeedback'>
                  <div className='gptCover'>GPT Feedback</div>
                  <div className='gptContent' style={{ whiteSpace: 'pre-line' }}>{gpt_feedback}</div>
                </div>
                <div className='teamFeedback'>
                  <div className='feedCover'>Comment</div>
                  <div className='feedContent'>
                    <div className='comments'>
                      <div className='one_comment'>
                        <ul>
                          {chat_data.map((item, index) => (
                            <li key={index}>
                              <p>{item.name}</p>
                              <p>{item.comment}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className='addComment'>
                      <div className='userName'>
                        {userName}
                      </div>
                      <div className='inputTextBox'>
                        <textarea className='textBox' placeholder='댓글을 남겨보세요'></textarea>
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
