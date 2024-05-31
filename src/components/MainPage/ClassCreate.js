import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiFillPlusCircle } from "react-icons/ai";
import ClassSearch from './ClassSearch.js';
import axios from 'axios';

function ClassCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [lecture_name, setLecture_name] = useState("");
  const [lecture_id, setLectureId] = useState("");
  const [optionType, setOptionType] = useState(0); // 0은 lecture, 1은 study
  const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;
  const [type, setType] = useState('');

  const [lectureName, setLectureName] = useState('');
  const [course, setCourse] = useState('');
  const token = localStorage.getItem('id_token');

  const sendLectureData = async (event) => {
    //event.preventDefault(); // 폼이 제출될 때 페이지가 새로 고침되는 기본 동작을 막음
    if (optionType === 0) {
      setCourse('0');
    } else {
      setCourse('1');
    }
    if (lecture_name) {
      setLectureName(lecture_name);
    }
    axios.post(`${API_BASE_URL}/${token}/createlecture`, 
    new URLSearchParams({
      lectureName: lectureName,
      course: course
    }))
    //axios.post(`http://localhost:8080/${token}/createlecture?lectureName=${lectureName}&course=${course}`)
    .then((response) => {
      console.log("post 성공");
    })
    .catch(error => {
      console.log("post 실패");
    });
  };

  const openModal = () => {
    setIsOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsOpen(false); // 모달을 닫기 위해 모달 상태를 false로 변경합니다.
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    content: {
      width: "25vw",
      height: "60vh",
      margin: "auto",
      borderRadius: "4px",
      boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    },
  };

  const fetchClassId = async () => {
    try {
      const response = await axios.get(`/class`);
      setLectureId(response.data.lecture_id);
      console.log(response.data); // 서버 응답 로깅
      // 여기서 받아온 데이터를 상태에 저장하거나 다른 로직을 실행할 수 있습니다.
    } catch (error) {
      console.error('클래스 ID를 가져오는데 실패했습니다:', error);
    }
  };

  return (
    <div>
      <button onClick={openModal} style={{ border: 'none', backgroundColor: 'white' }}>
        <AiFillPlusCircle style={{ width: '6vw', height: '6vh', color: '#FFAE35' }} />
      </button>

      <Modal ariaHideApp={false}
        isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div style={{ height: '5vh', borderBottom: '1.5px solid black' }}>
          <h2>클래스 등록</h2>
        </div>

        <div>
          <h4 style={{ marginBottom: '1vh' }}>강의명 입력</h4>
        </div>

        <div>
          <input name="lecture_name"
            value={lecture_name}
            placeholder="Type here"
            onChange={(e) => {
              setLecture_name(e.target.value);
            }}
            style={{ height: '4vh' }} />
        </div>

        <div>
          <div style={{ marginTop: '3vh' }}>
            <label>
              <input type="radio" value="lecture" checked={optionType === 0}
                onChange={() => setOptionType(0)} /> lecture
            </label>
            <label style={{ marginLeft: '2vw' }}>
              <input type="radio" value="study" checked={optionType === 1}
                onChange={() => setOptionType(1)} /> study
            </label>
          </div>
        </div>

        <button onClick={async () => {
          await fetchClassId();
          await sendLectureData();
        }} style={{
          width: '13.5vw', height: '5vh', backgroundColor: 'black',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh', borderRadius: '4px'
        }}>
          <h4 style={{ color: 'white', fontWeight: 'bold' }}>클래스 등록</h4>
        </button>
        <button onClick={closeModal} style={{
          width: '24vw', height: '6vh', backgroundColor: '#FFB23F',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh', border: 'none', borderRadius: '4px'
        }}>
          <h4 style={{ color: 'white', fontWeight: 'bold' }}>확인</h4>
        </button>
      </Modal>
    </div>
  );
}

export default ClassCreate;