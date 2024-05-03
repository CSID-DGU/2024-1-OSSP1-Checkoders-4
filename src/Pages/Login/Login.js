import React, { useState, useEffect } from 'react';
import './Login.css';
import kakaologo from './Images/kakao_logo.png';

function Login() {
  const REST_API_KEY = '7e00d3c02083b9c1b801d4984fcbddda' //REST API KEY
  const REDIRECT_URI = 'http://localhost:3000/Main' //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  return (
    <div id="container">
      <div id="project">
        Check your Code!
      </div>
      <div id="benefits">
        Quick Result
        <br />
        Convenience features
        <br />
        Integrated management
      </div>
      <div id="induction_comment">
        Experience it right here,
        <br />
        right now!
      </div>
      <div id="kakao_login">
        <button onClick={handleLogin}>
          <img src={kakaologo} />
          카카오 로그인
        </button>

      </div>
      <div id="developers">
        OSS project
        <br />
        Developed by Checkoders
        <br />
        MS Kim, JS Choi, JW Kim, JS Park, YS Han
      </div>
    </div>
  );
}

export default Login;
