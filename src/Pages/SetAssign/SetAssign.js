import axios from 'axios';
import '../Foundation/Foundation.css'
import './SetAssign.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SetAssign() {
  let [lectureName, changeLecture] = useState
    ('객체지향 프로그래밍_03');
  let [executionResult, setExecutionResult] = useState('컴파일 결과');

  const fetchData = () => {
    // GET 요청 보내기
    Promise.all([
      axios.get('/api/compile')

    ])
      .then(([response1]) => {
        // 요청 성공 시 실행되는 코드
        changeLecture(response1.data);
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        changeLecture('객체지향 프로그래밍_03(요청실패)');
      });
  }

  useEffect(() => {
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    fetchData();
  }, []);

  // textarea 변수
  const [contents, setContents] = useState({
    content1: '',
    content2: '',
    content3: '',
    content4: ''
  });

  // 컴파일 관련
  const handleCompile = () => {
    // 서버로 데이터를 전송하는 코드
    axios.post('/api/compile', contents.content6)
      .then(response => {
        // 전송 성공
        setExecutionResult(response.data.executionResult);
      })
      .catch(error => {
        // 전송 실패
        setExecutionResult('컴파일 결과(요청실패)');
      });
  };

  // 제출 관련
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContents({ ...contents, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버로 데이터를 전송하는 코드
    axios.post('api/submit', contents)
      .then(response => {
        // 전송 성공
        navigate('/detail')
      })
      .catch(error => {
        // 전송 실패
        navigate('/detail')
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
            📖 {lectureName}
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
                  <textarea name="content1" value={contents.content1} onChange={handleChange} className='problemNameTextArea' placeholder='제목을 입력하세요.' ></textarea>
                </div>
              </div>
              <div className='problemExplanation'>
                <div className='problemExplanaitonCover'>
                  문제내용
                </div>
                <div className='problemExplanationContent'>
                  <textarea name="content2" value={contents.content2} onChange={handleChange} className='problemExplanationTextArea' placeholder='문제 내용을 입력하세요.'></textarea>
                </div>
              </div>
              <div className='problemInputs'>
                <div className='getInputData'>
                  <div className='inputIndicate'>
                    입력 데이터:
                  </div>
                  <div className='inputDataBox'>
                    <textarea name="content3" value={contents.content3} onChange={handleChange} className='inputBox' placeholder='ex) 
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
                    <textarea name="content4" value={contents.content4} onChange={handleChange} className='inputBox' placeholder='ex)
                      1
                      2
                      1
                      2
                      2'>
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
