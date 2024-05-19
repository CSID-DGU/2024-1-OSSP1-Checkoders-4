import '../Foundation/Foundation.css'
import './SetTeam.css';
import { useState, useEffect } from 'react';
import StudentTable from './StudentTable/StudentTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SetTeam() {
  let [lectureName, changeLecture] = useState('객체지향 프로그래밍_03');
  let [tableName, changeTable] = useState('실습 팀');

  const fetchData = () => {
    // GET 요청 보내기
    Promise.all([
      axios.get('api/data1')
    ])
      .then(([response1]) => {
        // 요청 성공 시 실행되는 코드
        changeLecture(response1.data);
      })
      .catch(error => {
        // 요청 실패 시 실행되는 코드
        changeLecture('객체지향 프로그래밍_03');
      });
  }

  const navigate = useNavigate();
  const handleSiteName = () => {
    navigate('/Main');
  }

  useEffect(() => {
    // 페이지가 로딩될 때 데이터를 받아오는 함수 호출
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

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
              <div className='teamSetting'>
                <div className='teamCover'>
                  팀 배정
                </div>
                <div className='inputTeamInfo'>
                  <div className='teamName'>
                    <div className='indicateName'>
                      목록 이름:
                    </div>
                    <div className='getName'>
                      <textarea className='nameBox' placeholder="목록 이름을 입력하세요."></textarea>
                    </div>
                  </div>
                  <div className='teamNumber'>
                    <div className='indicateNumber'>
                      팀원 수:
                    </div>
                    <div className='getNumber'>
                      <textarea className='numberBox' placeholder="팀원 수를 입력하세요.">
                      </textarea>
                    </div>
                  </div>
                  <div className='finishButton'>
                    <button className='makeTeam'>
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
                  <div className='teamTable'>
                    <div className='tableCover'>
                      <div className='tableName'>
                        {tableName}
                      </div>
                    </div>
                  </div>
                  <div className='showTable'>
                    <StudentTable />
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
