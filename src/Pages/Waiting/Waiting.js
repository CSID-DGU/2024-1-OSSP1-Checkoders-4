import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import data from "./data.json"; // 여기
import data2 from "./data2.json"

const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

function Waiting() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');  // code 가져오는 문장

  const handleData = (response_id, response_nickname) => {
    navigate('/Main', { state: { id: response_id, nickname: response_nickname } });
  };

  useEffect(() => {
    const fetchData = () => {
      axios.post(`${API_BASE_URL}/login`, {
        code: code
      })
        .then((response) => {
          // 요청 성공 시 실행되는 코드
          console.log('kakaoLogin success');
          // handleData(response.data.id, response.data.nickname);
        })
        .catch(error => {
          // 요청 실패 시 실행되는 코드
          console.log('kakaoLogin fail');
          // handleData(data.myData[0].id, data.myData[0].nickname);
        });
    };

    fetchData();
  });

  return (
    <div>
      로그인을 기다리는 페이지입니다.<br/>
      {data.myData[0].id}<br/>
      {data.myData[0].nickname}<br/>
    </div>
  );
}

export default Waiting;
