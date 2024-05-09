import { Route, Routes, useNavigate } from 'react-router-dom';
import './Main.css';
import Foundation from '../Foundation/Foundation';
import SubmitAssign from '../SubmitAssign/SubmitAssign';
import SetAssign from '../SetAssign/SetAssign';
import SetTeam from '../SetTeam/SetTeam'
import StudentProblem from '../StudentProblem/StudentProblem'
import CodeReview from '../CodeReview/CodeReview';

function Main() {
  const navigate = useNavigate();
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
  function moveToStudentProblem() {
    navigate('/StudentProblem');
  }
  function moveToCodeReview(){
    navigate('/CodeReview')
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
          <button id='Foundation' onClick={moveToFoundation}>토대</button>
          <button id='SubmitAssign' onClick={moveToSubmitAssign}>제출 페이지</button>
          <button id='SetAssign' onClick={moveToSetAssign}>출제 페이지</button>
          <button id='SetTeam' onClick={moveToSetTeam}>팀배정 페이지</button>
          <button id='StudentProblem' onClick={moveToStudentProblem}>학생별 문제 출제 페이지</button>
          <button id='CodeReview' onClick={moveToCodeReview}>코드 리뷰 페이지</button>
          
        </div>
      </div>

      <Routes>
        <Route path="/Foundation" element={<Foundation />}></Route>
        <Route path="/SubmitAssign" element={<SubmitAssign />}></Route>
        <Route path="/SetAssign" element={<SetAssign />}></Route>
        <Route path="/SetTeam" element={<SetTeam />}></Route>
        <Route path="/StudentProblem" element={<StudentProblem />}></Route>
        <Route path="/CodeReview" element={<CodeReview />}></Route>
      </Routes>
    </div>
  );
}

export default Main;
