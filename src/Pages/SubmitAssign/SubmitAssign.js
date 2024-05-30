import '../Foundation/Foundation.css'
import './SubmitAssign.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import p_data from './problem_data.json'

function SubmitAssign() {
  const location = useLocation();
  const lecture_name = location.state?.lecture_name || '강의명 없음';
  const nickname = localStorage.getItem('nickname');
  
  let [hw_name, change_hw_name] = useState('실습 과제2');
  let [hw_problem, change_hw_problem] = useState('밑변과 높이 필드를 가지는 삼각형 클래스를 작성하고, 두 삼각형의 밑변과 높이를 입력 받아 넓이를 비교하시오.')
  let [hw_test1, change_hw_test1] = useState('');
  let [hw_test_answer1, change_hw_test_answer1] = useState('');
  let [submit_source, change_submit_source] = useState('');
  let [submitter, change_submitter] = useState('');

  const fetchData = () => {
    // GET 요청 보내기
    Promise.all([
      axios.get(`/제출페이지주소`)
    ])
      .then((response) => {
        // 요청 성공 시 실행되는 코드
        change_hw_name(response.data.hw_name);
        change_hw_problem(response.data.hw_problem);
        change_hw_test1(response.data.hw_test1);
        change_hw_test_answer1(response.data.hw_answer1);

      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        change_hw_name(p_data.hw[0].hw_name);
        change_hw_problem(p_data.hw[0].hw_problem);
        change_hw_test1(p_data.hw[0].hw_test1);
        change_hw_test_answer1(p_data.hw[0].hw_test_answer1);
      });
  }

  useEffect(() => {
    change_submitter(nickname);
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  // 초기화 관련
  const clearTextArea = () => {
    // textarea 내용을 초기화하기 위해 상태 변수 업데이트
    change_submit_source('');
  };

  // 제출 관련
  const navigate = useNavigate();
  const handleSubmit = () => {
    change_submitter('제출자 이름');  // 제출자 바꿔야함
    // 서버로 데이터를 전송하기 위해 axios를 사용하여 POST 요청 보내기
      axios.post(`/class/{classid}/{문제번호}`,
        new URLSearchParams({ 
          submit_source: submit_source,
          submitter: submitter 
        }))
      .then(response => {
        // 특정 페이지로 이동
        navigate('/detail');
        console.log("제출 성공")
      })
      .catch(error => {
        // 전송 실패 시의 처리
        navigate('/detail');
        console.log("제출 실패")
      });
  };

  const handleSiteName = () => {
    navigate('/Main');
  }

  const kakaoLogout = () => { // 카카오 로그아웃을 위한 함수, post 요청을 통해 accessToken을 보내 토큰을 만료시켜 로그아웃함
    const accessToken = localStorage.getItem('accessToken');
    //const accessToken = '8FF_3A_k1jjn6a3dvsHOPhvpT3maVxJgAAAAAQo9c5oAAAGPxKDi4sc_xW4TVk05';
    axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => { // 로그아웃 성공 시 메인페이지로 이동되야함
        console.log("logout 성공");
        console.log(response.id);
        navigate('/');
      })
      .catch(error => {
        console.log("logout 실패");
        //navigate('/');
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
            📖 {lecture_name}
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
                  <p>{hw_name}</p>
                  <p>{hw_problem}</p>
                  <div className='IOExample'>
                    <div className='InputExample' style={{ whiteSpace: 'pre-line' }}>
                      <p>입력 예제</p>
                      <p>{hw_test1}</p>
                    </div>
                    <div className='OutputExample' style={{ whiteSpace: 'pre-line' }}>
                      <p>출력 예제</p>
                      <p>{hw_test_answer1}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='submitContent'>
                <div className='solving'>
                  문제 풀이
                </div>
                <div className='solvingInfo'>
                  <textarea className='solvingBox' value={submit_source} onChange={(e) => change_submit_source(e.target.value)} placeholder="풀이를 입력하세요."></textarea>
                </div>
              </div>
              <div className='additionalContent'>
                <div className='buttonAction'>
                  <div className='initializer'>
                    <button className='initButton' onClick={clearTextArea}>
                      {/* 온클릭하면 박스 내용 초기화해야함 */}
                      소스코드 초기화
                    </button>
                  </div>
                  <div className='actions'>
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
