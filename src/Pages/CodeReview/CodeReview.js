import '../Foundation/Foundation.css'
import './CodeReview.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import chat_data from './chat.json'
import codereview_data from './codereview.json'
const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;


function CodeReview() {
  // 유저 정보 변수 시작
  const [userName, setUserName] = useState();
  const [userToken, setUserToken] = useState();
  // 유저 정보 변수 끝

  // 페이지 이동 시 사용할 과목 변수 시작
  const [className, setClassName] = useState();
  const [classToken, setClassToken] = useState("1");
  const [classMaker, setClassMaker] = useState();
  const [classMakerToken, setClassMakerToken] = useState();
  // 페이지 이동 시 사용할 과목 변수 끝

  // 과제 번호 변수 시작 
  const [assignmentToken, setAssignmentToken] = useState("10");
  // 과제 번호 변수 끝

  // 팀 번호 변수 시작
  const [teamToken, setTeamToken] = useState("1");
  // 팀 번호 변수 끝

  let [hw_name, change_hw_name] = useState('실습 과제2');
  let [hw_problem, change_hw_problem] = useState('밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.')
  let [hw_test1, change_hw_test1] = useState('18'); // 입력 예제1
  let [hw_test_answer1, change_hw_test_answer1] = useState('12'); // 출력 예제1
  let [source, change_source] = useState('printf("Hello World!");');
  let [gpt_feedback, change_gpt_feedback] = useState('GPT가 작성한 피드백 내용');
  let [cData, change_cData] = useState([]);
  let [comment, change_comment] = useState('');

  const setUserData = () => {
    setUserName(localStorage.getItem('name_main'));
    setUserToken(localStorage.getItem('userToken_main'));
    console.log("유저 데이터 확인(유저이름): ", localStorage.getItem('name_main'));
    console.log("유저 데이터 확인(유저토큰): ", localStorage.getItem('userToken_main'));
  }

  const setClassData = () => {
    setClassName(localStorage.getItem('className'));
    setClassToken(localStorage.getItem('classToken'));
    setClassMaker(localStorage.getItem('classMaker'));
    setClassMakerToken(localStorage.getItem('classMakerToken'));
    console.log("클레스 데이터 확인(과목명): ", localStorage.getItem('className'));
    console.log("클레스 데이터 확인(과목토큰): ", localStorage.getItem('classToken'));
    console.log("클레스 데이터 확인(과목생성자): ", localStorage.getItem('classMaker'));
    console.log("클레스 데이터 확인(과목생성자토큰): ", localStorage.getItem('classMakerToken'));
  }

  const setAssignmentData = () => {
    // setAssignmentToken(localStorage.getItem('assignmentToken'));
    console.log("과제 번호 확인(과제번호): ", localStorage.getItem('assignmentToken'));
  }

  const setTeamData = () => {
    // setTeamToken(localStorage.getItem('teamToken'));
    console.log("팀 번호 확인(팀번호): ", localStorage.getItem('teamToken'));
  }

  useEffect(() => {
    fetchData();
    setUserData();
    setClassData();
    // setAssignmentData();
    // setTeamData();
    console.log("시각: ", new Date().toISOString());
  }, []);

  const fetchData = () => {
    //axios.get(`${API_BASE_URL}/api/review/${assignmentToken}`)
    axios.get(`${API_BASE_URL}/api/review/10`)
      .then((response) => {
        console.log("코드 리뷰 데이터(성공): ", response.data);
        change_hw_name(localStorage.getItem("assignmentTitle"));
        change_hw_problem(response.data.description);
        change_hw_test1(response.data.hw_test1);
        change_hw_test_answer1(response.data.hw_test_answer1);
        change_source(response.data.answer_text);
        change_gpt_feedback(response.data.gpt_feedback);
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        console.log("코드 리뷰 데이터(실패): ", error)
        change_source(codereview_data.code[0].source);
        change_gpt_feedback(codereview_data.gpt[0].gpt_feedback)
        change_cData(cData);
      });

    axios.get(`${API_BASE_URL}/api/chat/1`)
      .then((response) => {
        console.log("채팅 가져오기 성공: ", response.data);
      })
      .catch(error => {
        console.log("채팅 가져오기 실패: ", error);
      });
  }

  const navigate = useNavigate();
  const handleSiteName = () => {
    navigate('/Main');
  }

  const handleChange_comment = (event) => {
    change_comment(event.target.value);

  };

  const postComment = () => {
    const currTime = new Date().toISOString();
    console.log("토큰: ", userToken);
    console.log("팀토큰: ", teamToken);
    console.log("문제토큰: ", assignmentToken);
    console.log("댓글내용: ", comment);
    console.log("제출시간: ", currTime);

    axios.post(`${API_BASE_URL}/api/chat`, {
      senderToken: userToken,
      teamId: teamToken,
      answerId: assignmentToken,
      content: comment,
      timestamp: currTime
    })
      .then((response) => {
        // 성공적으로 댓글이 등록되었을 때 실행할 코드
        console.log("댓글이 성공적으로 등록되었습니다.");
        console.log("제출 성공: ", response);
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

  const kakaoLogout = () => { // 카카오 로그아웃을 위한 함수, post 요청을 통해 accessToken을 보내 토큰을 만료시켜 로그아웃함
    const accessToken_main = localStorage.getItem('accessToken_main');
    axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${accessToken_main}`
      },
    })
      .then((response) => { // 로그아웃 성공 시 메인페이지로 이동되야함
        console.log("logout 성공");
        console.log(response);
        console.log(response.data.id);
        localStorage.clear();
        navigate('/');
      })
      .catch(error => {
        console.log("logout 실패");
      });
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
          <button className='logOut_button' onClick={kakaoLogout}>
            Logout🔓
            {/* 온클릭하면 로그아웃 후 로그인 페이지 */}
          </button>
        </div>
      </div>
      <div className='bottomBox'>
        <div className='leftBlank'></div>
        <div className='midCore'>
          <div className='lecture'>
            📖 {className}
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
                        {hw_test1}<br />
                      </div>
                      <div className='CodeReviewOutputExample' style={{ whiteSpace: 'pre-line' }}>
                        <p>출력 예제</p>
                        {hw_test_answer1}<br />
                      </div>
                    </div>
                  </div>

                </div>
                <div className='contentCode'>
                  <div className='codeCover'>
                    제출 코드
                  </div>
                  <div className='codeResponse'>
                    {source}
                  </div>
                </div>
              </div>
              <div className='feedback'>
                <div className='gptFeedback'>
                  <div className='gptCover'>
                    GPT Feedback
                  </div>
                  <div className='gptContent'>
                    {gpt_feedback}
                  </div>
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
                        <textarea className='textBox' placeholder='댓글을 남겨보세요' value={comment} onChange={handleChange_comment}></textarea>
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
    </div >
  );
}

export default CodeReview;
