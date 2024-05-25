import './StudentQListPage.css';
import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function QListComponent() {
    const [q_name, setQName] = useState("밑변과 높이 제목");
    const [q_problem, setQProblem] = useState("[문제 내용] 밑변과 높이 필드를 가지는~~~~");
    const location = useLocation();
    const navigate = useNavigate();
    const lecture_name = location.state?.lecture_name || '강의명 없음';

    function moveToCodeReview(lectureName) {
        navigate('/CodeReview', { state: { lecture_name: lectureName } });
      }


    return (
    <div className="q-field">
        <button className="q-field-title"
        style = {{backgroundColor: "white", border: "1.5px solid white"}}
        onClick={() => moveToCodeReview(lecture_name)}>
            {q_name}
        </button>
        <div className="q-field-content">
            {q_problem}
        </div>
    </div>
    );
}

export default QListComponent;