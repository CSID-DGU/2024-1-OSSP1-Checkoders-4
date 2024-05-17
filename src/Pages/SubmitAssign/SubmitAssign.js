import '../Foundation/Foundation.css'
import './SubmitAssign.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SubmitAssign() {
  let [lectureName, changeLecture] = useState('객체지향 프로그래밍_03');
  let [assignTitle, changeAssignTitle] = useState('실습 과제2');
  let [assignExplanation, changeAssignExplanation] = useState('밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.')
  let [assignLimitation, changeAssignLimitation] = useState('기본 생성자 사용, 조건문 사용');
  let [assignResult, changeAssignResult] = useState('삼각형 2가 더 넓습니다!');
  let [compileResult, changeCompileResult] = useState('컴파일 결과')
  const fetchData = () => {
    // GET 요청 보내기
    Promise.all([
      axios.get('api/data1'),
      axios.get('api/data2'),
      axios.get('api/data3'),
      axios.get('api/data4'),
      axios.get('api/data5'),
      axios.get('api/data6')

    ])
      .then(([response1, response2, response3, response4, response5, response6]) => {
        // 요청 성공 시 실행되는 코드
        changeLecture(response1.data);
        changeAssignTitle(response2.data);
        changeAssignExplanation(response3.data);
        changeAssignLimitation(response4.data);
        changeAssignResult(response5.data);
        changeCompileResult(response5.data);
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        changeLecture('객체지향 프로그래밍_03(요청실패)');
        changeAssignTitle('실습 과제2(요청실패)');
        changeAssignExplanation('밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.(요청실패)');
        changeAssignLimitation('기본 생성자 사용, 조건문 사용(요청실패)');
        changeAssignResult('삼각형 2가 더 넓습니다!(요청실패)');
        changeCompileResult('컴파일 결과(요청실패)');
      });
  }

  useEffect(() => {
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  // 초기화 관련
  const [solvingValue, setSolvingValue] = useState('');
  const clearTextArea = () => {
    // textarea 내용을 초기화하기 위해 상태 변수 업데이트
    setSolvingValue('');
  };

  // 제출 관련
  const navigate = useNavigate();
  const handleSubmit = () => {
    // 서버로 데이터를 전송하기 위해 axios를 사용하여 POST 요청 보내기
    axios.post('api/submit', { data: solvingValue })
      .then(response => {
        // 특정 페이지로 이동
        // history.push('/Main');
        navigate('/detail')
      })
      .catch(error => {
        // 전송 실패 시의 처리
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
              <div className='assignContent'>
                <div className='problem'>
                  문제 내용
                </div>
                <div className='problemInfo'>
                  <p>{assignTitle}</p>
                  <p>{assignExplanation}</p>
                  <p>처리조건</p>
                  <p>{assignLimitation}</p>
                  <p>실행결과</p>
                  <p>{assignResult}</p>
                </div>
              </div>
              <div className='submitContent'>
                <div className='solving'>
                  문제 풀이
                </div>
                <div className='solvingInfo'>
                  <textarea className='solvingBox' value={solvingValue} onChange={(e) => setSolvingValue(e.target.value)} placeholder="풀이를 입력하세요."></textarea>
                </div>
              </div>
              <div className='additionalContent'>
                <div className='compileResponse'>
                  <div className='compileCover'>
                    컴파일 결과
                  </div>
                  <div className='compileResponseText'>
                    {compileResult}
                  </div>
                </div>
                <div className='buttonAction'>
                  <div className='initializer'>
                    <button className='initButton' onClick={clearTextArea}>
                      {/* 온클릭하면 박스 내용 초기화해야함 */}
                      소스코드 초기화
                    </button>
                  </div>
                  <div className='actions'>
                    <button className='compileButton'>
                      {/* 온클릭하면 컴파일 해야함 */}
                      컴파일
                    </button>
                    <button className='submitButton' onClick={handleSubmit}>
                      {/* 온클릭하면 제출해야됨 */}
                      제출
                    </button>
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

export default SubmitAssign;
