import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiFillPlusCircle } from "react-icons/ai";
import ClassSearch from './ClassSearch.js';
import axios from 'axios';

function ClassCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [lecture_name, setLecture_name] = useState("");
  const [lectureId, setLectureId] = useState("");
  const [lectureMadeBy, setLectureMadeBy] = useState("");

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

  const fetchClassId = async () => {
    try {
      // 예시 URL과 요청, 실제 URL 및 요청 방법에 따라 조정이 필요할 수 있습니다.
      const response = await axios.get('https://localhost:8080//class');
      setLectureId(response.data.lecture_id);
      console.log(response.data); // 서버 응답 로깅
      // 여기서 받아온 데이터를 상태에 저장하거나 다른 로직을 실행할 수 있습니다.
    } catch (error) {
      console.error('클래스 ID를 가져오는데 실패했습니다:', error);
    }
  };

  const sendLectureData = async (id, madeBy) => {
    try {
      const postData = {
        lecture_id: id,
        lecture_madeby: madeBy,
        //fetchClassID 함수로 ID 받고 나서 클래스를 생성하면 사용자의 ID를 서버에게 보내줘야 함.
      };
      const response = await axios.post('http://localhost:8080//class/update', postData);
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('데이터를 서버에 보내는데 실패했습니다:', error);
    }
  };
  

  return (
    <div>
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
        <button onClick={async () => {await fetchClassId();}} style={{width: '13.5vw', height: '5vh', backgroundColor: 'black', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh', borderRadius: '4px'}}>
          <h4 style={{color: 'white', fontWeight: 'bold'}}>클래스 등록</h4> 
        </button>

        <div>
          <h4 style = {{marginTop: '3vh'}}>코드 확인</h4>
          <p style = {{marginTop: '2vh'}}>{lectureId || 'ID가 없습니다'}</p>
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