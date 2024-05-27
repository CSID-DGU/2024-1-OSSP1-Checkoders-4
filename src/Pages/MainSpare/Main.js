import { Route, Routes, useNavigate } from 'react-router-dom';
import './Main.css';
import Foundation from '../Foundation/Foundation';
import SubmitAssign from '../SubmitAssign/SubmitAssign';
import SetAssign from '../SetAssign/SetAssign';
import SetTeam from '../SetTeam/SetTeam'
import CodeReview from '../CodeReview/CodeReview';
import { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;


function Main() {
  const navigate = useNavigate();
  // const code = new URL(window.location.href).searchParams.get('code');
  let [InherentID, changeIID] = useState('123');
  let [nickname, changeNickname] = useState('456');
  let [tmp, cTmp] = useState('tmp');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = new URLSearchParams(window.location.search).get('userId');

  useEffect(() => {
    console.log('userId from URL:', userId); // 추가된 로그

    if (userId) {
      console.log(`Fetching user information with userId: ${userId}`);
      axios.get(`http://localhost:8080/user?userId=${userId}`)
        .then(response => {
          console.log('User data fetched:', response.data); // 응답 데이터 확인
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
          setLoading(false);
        });
    } else {
      console.log('No userId found in URL');
      setLoading(false);
    }
  }, [userId]);

  function moveToFoundation() {
    navigate('/Foundation');
  }
  function moveToSubmitAssign() {
    navigate('/SubmitAssign');
  }
  function moveToSetAssign() {
    navigate('/SetAssign');
  }
  function moveToSetTeam() {
    navigate('/SetTeam');
  }
  function moveToCodeReview() {
    navigate('/CodeReview')
  }
  return (
    <div className="Main">
      <div id='first_row'>
        축하합니다! 로그인 성공

      </div>
      <div id='second_row'>
        메인 페이지 구현 필요<br />
        <p>이름 : {user.nickname}</p>
        <p>id : {user.id_token}</p>
        {tmp}
      </div>
      <div id='third_row'>
        <div className='moveButtons'>
          <button id='Foundation' onClick={moveToFoundation}>토대</button>
          <button id='SubmitAssign' onClick={moveToSubmitAssign}>제출 페이지</button>
          <button id='SetAssign' onClick={moveToSetAssign}>출제 페이지</button>
          <button id='SetTeam' onClick={moveToSetTeam}>팀배정 페이지</button>
          <button id='CodeReview' onClick={moveToCodeReview}>코드 리뷰 페이지</button>
        </div>
      </div>

      <Routes>
        <Route path="/Foundation" element={<Foundation />}></Route>
        <Route path="/SubmitAssign" element={<SubmitAssign />}></Route>
        <Route path="/SetAssign" element={<SetAssign />}></Route>
        <Route path="/SetTeam" element={<SetTeam />}></Route>
        <Route path="/CodeReview" element={<CodeReview />}></Route>
      </Routes>
    </div>
  );
}

export default Main;
