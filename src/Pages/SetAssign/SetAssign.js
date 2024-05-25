import axios from 'axios';
import '../Foundation/Foundation.css'
import './SetAssign.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SetAssign() {
  const location = useLocation();
  const lecture_name = location.state?.lecture_name || '강의명 없음';
  
  let [q_name, change_q_name] = useState('');  // 문제명
  let [q_deadline, change_q_deadline] = useState('');
  let [q_problem, change_q_problem] = useState(''); // 문제 내용
  let [q_test, change_q_test] = useState(''); // 입력 예제 전부
  let [q_test_answer, change_q_test_answer] = useState(''); // 출력 예제 전부
  let [q_test1, change_q_test1] = useState(''); // 입력 예제1
  let [q_test2, change_q_test2] = useState(''); // 입력 예제2
  let [q_test3, change_q_test3] = useState(''); // 입력 예제3
  let [q_test4, change_q_test4] = useState(''); // 입력 예제4
  let [q_test5, change_q_test5] = useState(''); // 입력 예제5
  let [q_test_answer1, change_q_test_answer1] = useState(''); // 출력 예제1
  let [q_test_answer2, change_q_test_answer2] = useState(''); // 출력 예제2
  let [q_test_answer3, change_q_test_answer3] = useState(''); // 출력 예제3
  let [q_test_answer4, change_q_test_answer4] = useState(''); // 출력 예제4
  let [q_test_answer5, change_q_test_answer5] = useState(''); // 출력 예제5
  let [q_madeby, change_q_madeby] = useState(''); // 출제자

  const { userData } = location.state || {};


  // 없애야 할 수 있음
  const fetchData = () => {
    // GET 요청 보내기
    axios.get(`/lecture_name`)
      .then((response) => {
        // 요청 성공 시 실행되는 코드
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
      });
  }

  useEffect(() => {
    //change_q_madeby(userData.nickname); // 페이지 로딩될 때, 유저 정보를 madeby에 저장
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    fetchData();
  }, []);
  // 제출 관련
  const handleChange_q_name = (event) => {
    change_q_name(event.target.value);
  }
  const handleChange_q_problem = (event) => {
    change_q_problem(event.target.value);
  }
  const handleChange_q_test = (event) => {
    const test_value = event.target.value;
    change_q_test(test_value); // textarea 값 업데이트
    // 개행 문자를 기준으로 문자열을 분할하여 배열로 저장
    const q_test_Array = test_value.split('\n');
    change_q_test1(q_test_Array[0] || '');
    change_q_test2(q_test_Array[1] || '');
    change_q_test3(q_test_Array[2] || '');
    change_q_test4(q_test_Array[3] || '');
    change_q_test5(q_test_Array[4] || '');
  };
  const handleChange_q_test_anwser = (event) => {
    const test_answer_value = event.target.value;
    change_q_test_answer(test_answer_value); // textarea 값 업데이트
    // 개행 문자를 기준으로 문자열을 분할하여 배열로 저장
    const q_test_answer_Array = test_answer_value.split('\n');
    change_q_test_answer1(q_test_answer_Array[0] || '');
    change_q_test_answer2(q_test_answer_Array[1] || '');
    change_q_test_answer3(q_test_answer_Array[2] || '');
    change_q_test_answer4(q_test_answer_Array[3] || '');
    change_q_test_answer5(q_test_answer_Array[4] || '');
  }
  const handleChange_q_deadline = (event) => {
    change_q_deadline(event.target.value);
  }

  const navigate = useNavigate();
  const handleSubmit = (event) => { // 문제 정보 전달
    axios.post(`/class/{classid}/add`, {
      data:
        q_name, q_problem,
      q_test1, q_test_answer1,
      q_test2, q_test_answer2,
      q_madeby,
      q_test3, q_test4, q_test5,
      q_test_answer3, q_test_answer4, q_test_answer5,
      q_deadline
    })
      .then((response) => {
        // 요청 성공 시 실행되는 코드
        navigate('/detail');
        console.log("제출 성공");
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        navigate('/detail');
        console.log("제출 실패");
      });
  };

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
            📖 {lecture_name}
          </div>
          <div className='mainContent'>
            <div className='tabCover'>

            </div>
            <div className='assignInfo'>
              <div className='problemName'>
                <div className='problemNameSpace'>
                  문제 제목:
                </div>
                <div className='problemNameInputSpace'>
                  <textarea name="content1" value={q_name} onChange={handleChange_q_name} className='problemNameTextArea' placeholder='제목을 입력하세요.' ></textarea>
                </div>
              </div>
              <div className='problemExplanation'>
                <div className='problemExplanaitonCover'>
                  문제내용
                </div>
                <div className='problemExplanationContent'>
                  <textarea name="content2"
                    value={q_problem}
                    onChange={handleChange_q_problem} className='problemExplanationTextArea' placeholder='문제 내용을 입력하세요.'></textarea>
                </div>
              </div>

              <div className='problemInputs'>
                <div className='getInputData'>
                  <div className='inputIndicate'>
                    입력 데이터:
                  </div>
                  <div className='inputDataBox'>
                    <textarea name="content3"
                      value={q_test}
                      onChange={handleChange_q_test} className='inputBox'
                      placeholder='ex) 
                    2 3 4 5
                    10 8 7 13
                    20 10 15 12
                    8 7 10 19
                    4 5 3 7'>
                    </textarea>
                  </div>
                </div>
                <div className='getExpectedAnswer'>
                  <div className='inputIndicate'>
                    예상 답안:
                  </div>
                  <div className='inputDataBox'>
                    <textarea name="content4"
                      value={q_test_answer}
                      onChange={handleChange_q_test_anwser} className='inputBox'
                      placeholder='ex)
                      1
                      2
                      1
                      2
                      2'>
                    </textarea>
                  </div>
                </div>
                <div className='getDeadline'>
                  <div className='inputIndicate'>
                    제출 기한:
                  </div>
                  <div className='inputDataBox'>
                    <textarea name="content5"
                      value={q_deadline}
                      onChange={handleChange_q_deadline} className='inputBox'
                      placeholder='ex) 240630'>
                    </textarea>
                  </div>
                </div>

              </div>
              <div className='problemClosing'>
                <div className='buttons'>
                  <button className='setProblemsubmitButton' onClick={handleSubmit}>제출</button>
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
