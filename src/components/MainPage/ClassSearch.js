import { FaSearch } from "react-icons/fa";
import Modal from 'react-modal';
import React, { useState } from 'react';
import ClassCreate from './ClassCreate.js';
import axios from 'axios';

function ClassSearch({ incrementCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lecture_id, setLecture_id] = useState("");
  const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;
  const token = localStorage.getItem('id_token');

  const sendClassId = async () => { //클래스 검색하기 누르면 서버로 클래스 ID와 사용자 ID 전송
    try {
      const response = await axios.post(`${API_BASE_URL}/class`, {lecture_id});
      console.log(response.data); // 서버 응답 로깅
      // 여기서 받아온 데이터를 상태에 저장하거나 다른 로직을 실행할 수 있습니다.
    } catch (error) {
      console.error('클래스 ID를 전달하는 데 실패했습니다:', error);
    }
  };

  // const sendClassId = async () => { //클래스 검색하기 누르면 서버로 클래스 ID와 사용자 ID 전송
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/${token}/participate`, 
  //     URLSearchParams(
  //       {
  //         lectureName: lectureName
  //       }));
  //     console.log(response.data); // 서버 응답 로깅
  //     // 여기서 받아온 데이터를 상태에 저장하거나 다른 로직을 실행할 수 있습니다.
  //     // 만든 사람, course 여부
  //   } catch (error) {
  //     console.error('클래스 ID를 전달하는 데 실패했습니다:', error);
  //   }
  // };

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
      height: "35vh",
      margin: "auto",
      borderRadius: "4px",
      boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    },
  };

  return (
    <div>
      <button onClick={openModal} style={{ border: 'none', backgroundColor: 'white' }}>
        <FaSearch style={{ width: '5vw', height: '5vh', color: '#3D70F5' }} />
      </button>

      <Modal ariaHideApp={false}
      isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div style={{ height: '5vh', borderBottom: '1.5px solid black' }}>
          <h2>클래스 검색</h2>
        </div>

        <div>
          <h4>강의명 입력</h4>
        </div>

        <div>
          <input name="lecture_id"
            value={lecture_id}
            placeholder="Type here"
            onChange={(e) => {
              setLecture_id(e.target.value);
            }}
            style={{ height: '4vh' }} />
        </div>
        <button onClick={() => {sendClassId(); incrementCount();}} style={{
          width: '24vw', height: '6vh', backgroundColor: 'black',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5vh'
        }}>
          <h4 style={{ color: 'white', fontWeight: 'bold' }}>클래스 검색하기</h4>
        </button>
      </Modal>
    </div>
  );
}

export default ClassSearch;
