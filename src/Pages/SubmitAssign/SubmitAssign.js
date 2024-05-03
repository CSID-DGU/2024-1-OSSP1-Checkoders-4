import './SubmitAssign.css';

function SubmitAssign() {
  return (
    <div className="SubmitAssign">
      <div id="left_sidebar">
        <div id="project_name">
          Checkoders
        </div>
        <div id="bar_menu">
          <button id="lecture_detail" className="button">
            강좌 자세히 보기 (공통)
          </button>
          <br />
          <button id="set_exam" className="button">
            문제 출제 (공통)
          </button>
          <br />
          <button id="assign_situation" className="button">
            제출 현황 (공통)
          </button>
          <br />
          <button id="submit_assign" className="button">
            과제 제출 (학생)
          </button>
          <br />
          <button id="team_split" className="button">
            팀 배정 (교수)
          </button>
        </div>
      </div>

      <div id="right_contents">
        <div id="upper_bar">
          Checkoders
        </div>
        <div id="class_name">
          객체지향 프로그래밍_03
        </div>
        <div id="main_content">
          <div id="design">
            과목명 가져와야댐
          </div>
          <div id="problem">
            <div id="problem_content">
              <div id="problem_content_upperbar">
                문제 내용
              </div>
              <div id="real_problem_content">
                <p>받아올 과제명</p>
                <p>받아올 과제 내용</p>
                <p>받아올 처리조건</p>
                <p>받아올 처리조건 내용</p>
                <p>받아올 실험결과</p>
                <p>받아올 실험결과 내용</p>
              </div>
            </div>
            <div id="empty_space"></div>
            <div id="problem_solving">
              <div id="problem_solving_upperbar">
                문제 풀이
              </div>
              <div id="real_problem_solving">
                <textarea id="solving_text" placeholder="풀이를 입력하세요."></textarea>
              </div>
            </div>
            <div id="select_button">
              <button id="compile_answer">
                컴파일
              </button>
              <button id="submit_answer">
                제출
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>

  );
}

export default SubmitAssign;
