import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiFillPlusCircle } from "react-icons/ai";
import ClassSearch from './ClassSearch.js';
import axios from 'axios';

function ClassCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [lecture_name, setLecture_name] = useState("");
  const [lecture_id, setLectureId] = useState("");
  const [lecture_madeby, setLectureMadeBy] = useState("");
  const [optionType, setOptionType] = useState(0); // 0은 lecture, 1은 study
  const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

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
      height: "60vh",
      margin: "auto",
      borderRadius: "4px",
      boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    },
  };

  const fetchClassId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/class`);
      setLectureId(response.data.lecture_id);
      console.log(response.data); // 서버 응답 로깅
      // 여기서 받아온 데이터를 상태에 저장하거나 다른 로직을 실행할 수 있습니다.
    } catch (error) {
      console.error('클래스 ID를 가져오는데 실패했습니다:', error);
    }
  };

  const sendLectureData = async () => {
    try {
      const postData = {
        lecture_name: lecture_name,
        lecture_madeby: lecture_madeby,
        option_type: optionType,
        //fetchClassID 함수로 ID 받고 나서 클래스를 생성하면 사용자의 ID, 강의명을 서버에게 보내줘야 함.
      };
      const response = await axios.post(`${API_BASE_URL}/class`, postData);
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

      <Modal ariaHideApp={false}
      isOpen={isOpen} onRequestClose = {closeModal} style={customStyles}>
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

        <div>
          <div style={{marginTop: '3vh'}}>
            <label>
              <input type="radio" value="lecture" checked={optionType === 0}
                onChange={() => setOptionType(0)}/> lecture
            </label>
            <label style={{marginLeft: '2vw'}}>
              <input type="radio" value="study" checked={optionType === 1}
                onChange={() => setOptionType(1)}/> study
            </label>
          </div>
        </div>

        <button onClick={async () => {await fetchClassId();
          await sendLectureData();
        }} style={{width: '13.5vw', height: '5vh', backgroundColor: 'black', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1vh', borderRadius: '4px'}}>
          <h4 style={{color: 'white', fontWeight: 'bold'}}>클래스 등록</h4> 
        </button>

        <div>
          <h4 style = {{marginTop: '3vh'}}>코드 확인</h4>
          <p style = {{marginTop: '2vh'}}>{lecture_id || 'Class ID가 없습니다.'}</p>
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