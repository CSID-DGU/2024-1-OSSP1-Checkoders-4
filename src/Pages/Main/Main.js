import { Route, Routes, useNavigate } from 'react-router-dom';
import './Main.css';
import SetAssign from '../SetAssign/SetAssign'
import SubmitAssign from '../SubmitAssign/SubmitAssign'

function Main() {
  // const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  function moveToSetAssignPage() {
    navigate('/SetAssign');
  }
  function moveToSubmitAssignPage() {
    navigate('/SubmitAssign');
  }
  return (
    <div className="Main">
      <div id='first_row'>
        축하합니다! 로그인 성공
      </div>
      <div id='second_row'>
        메인 페이지 구현 필요
      </div>
      <div id='third_row'>
        <div className='moveButtons'>
          <button id='moveToSetAssign' onClick={moveToSetAssignPage}>과제 출제</button >
          <button id='moveToSubmitAssign' onClick={moveToSubmitAssignPage}>과제 제출</button>
        </div>
      </div>

      <Routes>
        <Route path="/SetAssign" element={<SetAssign />}></Route>
        <Route path="/SubmitAssign" element={<SubmitAssign />}></Route>
      </Routes>
    </div>
  );
}

export default Main;
