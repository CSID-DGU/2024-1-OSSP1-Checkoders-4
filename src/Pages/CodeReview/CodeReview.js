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
  const nickname = localStorage.getItem('nickname');
  
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
  let [userName, changeUserName] = useState('');
  let [cData, change_cData] = useState([]);
  let [comment, change_comment] = useState('');

  const fetchData = () => {
    changeUserName(nickname);
    // GET 요청 보내기
    axios.get(`/코드리뷰주소`)
      .then((response) => {
        // 요청 성공 시 실행되는 코드
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
        change_source(codereview_data.code[0].source);
        change_gpt_feedback(codereview_data.gpt[0].gpt_feedback)
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

  const handleChange_comment = (event) => {
    change_comment(event.target.value);
  };

  const postComment = () => {
    axios.post('/댓글등록주소', {
      user_name: userName,
      comment: comment
    })
    .then((response) => {
      // 성공적으로 댓글이 등록되었을 때 실행할 코드
      console.log("댓글이 성공적으로 등록되었습니다.");
      change_cData(response.chat);
    })
    .catch((error) => {
      // 댓글을 등록하는 과정에서 에러가 발생했을 때 실행할 코드
      console.error("댓글을 등록하는 중 에러가 발생했습니다:", error);
    });
  };
  

  const handleSubmitComment = () => {
    postComment();
    // 댓글 등록 후 입력 창 초기화
    change_comment('');
  };
  

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
                        <textarea className='textBox' placeholder='댓글을 남겨보세요'value ={comment} onChange = {handleChange_comment}></textarea>
                      </div>
                      <div className='buttonArea'>
                        <button className='postButton' onClick={handleSubmitComment}>
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
