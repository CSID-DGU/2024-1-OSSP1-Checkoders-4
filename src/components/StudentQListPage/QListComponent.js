import './StudentQListPage.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function QListComponent({ q_name, q_problem }) {
// function QListComponent({ q_name, q_problem, q_token }) {
    const location = useLocation();
    const navigate = useNavigate();
    const lecture_name = location.state?.lecture_name || '강의명 없음';

    function moveToCodeReview() {
        const isMySelf = false;
        localStorage.setItem("mySelf", isMySelf);
        navigate('/CodeReview',);
    }


    return (
        <div className="q-field">
            <button className="q-field-title"
                style={{ backgroundColor: "white", border: "1.5px solid white" }}
                onClick={() => moveToCodeReview()}>
                {q_name}
            </button>
            <div className="q-field-content">
                {q_problem}
            </div>
        </div>
    );
}

export default QListComponent;