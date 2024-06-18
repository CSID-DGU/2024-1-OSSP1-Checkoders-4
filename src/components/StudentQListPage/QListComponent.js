import './StudentQListPage.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function QListComponent({ q_name, q_problem }) {
    const location = useLocation();
    const navigate = useNavigate();
    const lecture_name = location.state?.lecture_name || '강의명 없음';

    function moveToCodeReview(lectureName) {
        navigate('/CodeReview', { state: { lecture_name: lectureName } });
    }


    return (
        <div className="q-field">
            <button className="q-field-title"
                style={{ backgroundColor: "white", border: "1.5px solid white" }}
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