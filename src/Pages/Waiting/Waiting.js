import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import response_ex from "./login_dummy_data.json";

const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

function Waiting() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const handleData = (response_id, response_nickname) => {
    navigate('/Practice', { state: { id: response_id, nickname: response_nickname } });
  };

  useEffect(() => {
    const fetchData = () => {
      axios.post(`${API_BASE_URL}/login`, {
        code: code
      })
        .then((response) => {
          // 요청 성공 시 실행되는 코드
          console.log('kakaoLogin success');
          handleData(response.data.id, response.data.nickname);
        })
        .catch(error => {
          // 요청 실패 시 실행되는 코드
          console.log('kakaoLogin fail');
          // changeTmp(response_ex.id);
          // handleData(response_ex.id, response_ex.nickname);
        });
    };

    fetchData();
  }, [code]);

  return (
    <div>
      로그인을 기다리는 페이지입니다.
      {response_ex.id}
      공백이 생기나
    </div>
  );
}

export default Waiting;
