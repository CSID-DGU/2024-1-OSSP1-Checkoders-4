import './StudentQListPage.css';
import React, {useState} from 'react';

function QListComponent() {
    const [q_name, setQName] = useState("밑변과 높이 제목");
    const [q_problem, setQProblem] = useState("[문제 내용] 밑변과 높이 필드를 가지는~~~~");

    return (
    <div className="q-field">
        <div className="q-field-title">
            {q_name}
        </div>
        <div className="q-field-content">
            {q_problem}
        </div>
    </div>
    );
}

export default QListComponent;