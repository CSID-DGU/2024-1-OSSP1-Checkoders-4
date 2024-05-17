import { FaSearch } from "react-icons/fa";
import Modal from 'react-modal';
import React, { useState } from 'react';
import ClassCreate from './ClassCreate.js';

function ClassSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [lecture_id, setLecture_id] = useState("");
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
      {/* <button onClick={()=> setModalIsOpen(true)}>Modal Open</button>
      <Modal isOpen={true}>
        This is Modal content
        <button onClick={()=> setModalIsOpen(false)}>Modal Open</button>
      </Modal> */}

      <button onClick={openModal} style={{ border: 'none', backgroundColor: 'white' }}>
        <FaSearch style={{ width: '5vw', height: '5vh', color: '#3D70F5' }} />
      </button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
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
        <button onClick={closeModal} style={{
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
