import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiFillPlusCircle } from "react-icons/ai";
import ClassSearch from './ClassSearch.js';

function ClassCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [lecture_name, setLecture_name] = useState("");
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

    content:{
      width: "25vw",
      height: "50vh",
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

      <button onClick = {openModal} style={{border:'none', backgroundColor: 'white'}}>
        <AiFillPlusCircle style = {{width: '6vw', height: '6vh', color: '#FFAE35'}}/>
      </button>

      <Modal isOpen={isOpen} onRequestClose = {closeModal} style={customStyles}>
        <div style={{height: '5vh', borderBottom: '1.5px solid black'}}>
          <h2>클래스 등록</h2>
        </div>

        <div>
          <h4 style = {{marginBottom: '1vh'}}>강의 입력</h4>
        </div>

        <div>
          <input name = "lecture_name"
          value = {lecture_name}
          placeholder = "Type here"
          onChange = {(e) => {
            setLecture_name(e.target.value);
          }}
          style = {{height: '4vh'}}/>

        </div>
        <button onClick={closeModal} style={{width: '13.5vw', height: '5vh', backgroundColor: 'black', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh', borderRadius: '4px'}}>
          <h4 style={{color: 'white', fontWeight: 'bold'}}>클래스 등록</h4>
        </button>

        <div>
          <h4 style = {{marginTop: '3vh'}}>코드 확인</h4>
          <p style = {{marginTop: '2vh'}}>{lecture_name}</p>
        </div>

        <button onClick={closeModal} style={{width: '24vw', height: '6vh', backgroundColor: '#FFB23F', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh', border: 'none', borderRadius: '4px'}}>
          <h4 style={{color: 'white', fontWeight: 'bold'}}>확인</h4>
        </button>
      </Modal>
    </div>
  );
}

export default ClassCreate;