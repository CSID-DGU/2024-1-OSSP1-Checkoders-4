import '../Foundation/Foundation.css';
import './SetTeam.css';
import { useState, useEffect } from 'react';
import StudentTable from './StudentTable/StudentTable';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import stuData from './StudentTable/sData.json';
import stuData2 from './StudentTable/sData2.json';
const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

function SetTeam() {
  const location = useLocation();
  // 유저 정보 변수 시작
  const [userName, setUserName] = useState();
  const [userToken, setUserToken] = useState();
  // 유저 정보 변수 끝

  // 페이지 이동 시 사용할 과목 변수 시작
  const [className, setClassName] = useState();
  const [classToken, setClassToken] = useState();
  const [classMaker, setClassMaker] = useState();
  const [classMakerToken, setClassMakerToken] = useState();
  // 페이지 이동 시 사용할 과목 변수 끝

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

  useEffect(() => {
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    // fetchData();
    fetchData();
    setUserData();
    setClassData();
  }, []);

  let [tableName, changeTable] = useState('실습 팀');
  let [team_num, changeTeamNum] = useState('');
  let [table_data, changeTableData] = useState(null);

  let [student_per_group, changeSPG] = useState('');

  const fetchData = () => {
    // GET 요청 보내기
    axios.get(`${API_BASE_URL}/팀배정api`, {
      params: {
        team_num: team_num
      }
    })
      .then((response) => {
        // 요청 성공 시 실행되는 코드
        changeTableData(response.data);
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        console.log('테이블 데이터 요청 실패');
      });
  }

  const navigate = useNavigate();
  const handleSiteName = () => {
    navigate('/Main');
  }

  const handleTeamSubmit = (event) => { // 배정 버튼 누르면, 팀 이름과 인원 수 전송
    axios({
      method: 'POST',
      url: `${API_BASE_URL}/${classToken}/assign`,
      params: new URLSearchParams({
        teamSize: student_per_group
      })
    })
      .then((response) => {
        // 요청 성공 시 실행되는 코드
        changeTableData(response);
        fetchData();
        console.log(response);
        console.log("전달 성공");
      })
      .catch(error => {
        if (Math.random() < 0.5) {
          changeTableData(stuData.sData);
        } else {
          changeTableData(stuData2.sData);
        }
        // changeTableData(stuData.sData);
        // changeTableData(stuData2.sData);
        fetchData();
        // 요청 실패 시 실행되는 코드
        console.log("전달 실패");
      });
  }

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
              <div className='teamSetting'>
                <div className='teamCover'>
                  팀 배정
                </div>
                <div className='inputTeamInfo'>
                  <div className='teamNumber'>
                    <div className='indicateNumber'>
                      팀원 수:
                    </div>
                    <div className='getNumber'>
                      <textarea className='numberBox'
                        value={student_per_group}
                        onChange={(e) => changeSPG(e.target.value)}
                        placeholder="팀원 수를 입력하세요.">
                      </textarea>
                    </div>
                  </div>
                  <div className='finishButton'>
                    <button className='makeTeam' onClick={handleTeamSubmit}>
                      팀 배정
                    </button>
                  </div>
                </div>
              </div>
              <div className='currentTeamState'>
                <div className='stateCover'>
                  배정 현황
                </div>
                <div className='showTeamState'>
                  <div className='showTable'>
                    {table_data === null ? (
                      <div className="no-team-message">
                        팀을 생성해 그룹 활동을 시작하세요.
                      </div>
                    ) : (
                      <StudentTable data={table_data} tableName={tableName} />
                    )}

                    {/* <StudentTable data={table_data} tableName={tableName} /> */}
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

export default SetTeam;
