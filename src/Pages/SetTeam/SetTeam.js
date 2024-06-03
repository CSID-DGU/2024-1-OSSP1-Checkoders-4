import '../Foundation/Foundation.css';
import './SetTeam.css';
import { useState, useEffect } from 'react';
import StudentTable from './StudentTable/StudentTable';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import stuData from './StudentTable/student_data.json';

function SetTeam() {
  const location = useLocation();
  const lecture_name = location.state?.lecture_name || '강의명 없음';
  const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;
  
  let [tableName, changeTable] = useState('실습 팀');
  let [team_num, changeTeamNum] = useState('');
  let [table_data, changeTableData] = useState([]);

  let [student_per_group, changeSPG] = useState('');
  // let [new_group_name, changeNGN] = useState('');
  
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
        //changeTableData(null);, 배정된 팀이 없는 경우
        changeTableData(stuData.sData);
      });
  }

  const navigate = useNavigate();
  const handleSiteName = () => {
    navigate('/Main');
  }

  const handleTeamSubmit = (event) => { // 배정 버튼 누르면, 팀 이름과 인원 수 전송
    axios.post(`${API_BASE_URL}/팀 배정 주소`, {
      data:
        student_per_group
    })
      .then((response) => {
        // 요청 성공 시 실행되는 코드
        fetchData();
        console.log("전달 성공");
      })
      .catch(error => {
        fetchData();
        // 요청 실패 시 실행되는 코드
        console.log("전달 실패");
      });
  }

  useEffect(() => {
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const kakaoLogout = () => { // 카카오 로그아웃을 위한 함수, post 요청을 통해 accessToken을 보내 토큰을 만료시켜 로그아웃함
    // const accessToken_main = localStorage.getItem('accessToken_main');
    // //const accessToken_main = '8FF_3A_k1jjn6a3dvsHOPhvpT3maVxJgAAAAAQo9c5oAAAGPxKDi4sc_xW4TVk05';
    // axios({
    //   method: 'POST',
    //   url: 'https://kapi.kakao.com/v1/user/logout',
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Authorization": `Bearer ${accessToken_main}`
    //   },
    // })
    //   .then((response) => { // 로그아웃 성공 시 메인페이지로 이동되야함
    //     console.log("logout 성공");
    //     console.log(response.id);
    //     localStorage.clear();
    //     navigate('/');
    //   })
    //   .catch(error => {
    //     console.log("logout 실패");
    //     //navigate('/');
    //   });
        navigate('/');
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
                    <StudentTable data={table_data} tableName={tableName} />
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
