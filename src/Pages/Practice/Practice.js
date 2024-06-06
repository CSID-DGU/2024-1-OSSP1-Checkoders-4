import './Practice.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
const API_BASE_URL = process.env.REACT_APP_LOCAL_API_BASE_URL;

// Function to fetch data
const fetchDataFromMainpage = async (storedUserToken) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_BASE_URL}/${storedUserToken}/mainpage`,
    });
    console.log("mainpage 데이터 가져오기 성공1");
    console.log("mainpage 확인중:", response);
    return response;
  } catch (error) {
    console.log("mainpage 데이터 가져오기 실패1");
    throw error;
  }
};

// const fetchDataFromGetLectures = async (storedUserToken) => {
//   try {
//     const response = await axios({
//       method: 'GET',
//       url: `${API_BASE_URL}/${storedUserToken}/getlectures`,
//     });
//     console.log("getlectures 데이터 가져오기 성공1");
//     console.log("getlectures 확인중:", response);
//     return response;
//   } catch (error) {
//     console.log("getlectures 데이터 가져오기 실패1");
//     throw error;
//   }
// };

const fetchDataFromParticipate = async (storedUserToken) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/${storedUserToken}/participate`,
      params: new URLSearchParams({
        lectureName: `자료구조`
      })
    });
    console.log("participate 데이터 가져오기 성공1");
    console.log("participate 확인중:", response);

    return response;
  } catch (error) {
    console.log("participate 데이터 가져오기 실패1");
    throw error;
  }
};

function Practice() {
  const storedName = localStorage.getItem('name_main');
  const storedUserToken = localStorage.getItem('userToken_main');
  const storedAccessToken = localStorage.getItem('accessToken_main');

  const [dataMainpage, setDataMainpage] = useState(null);
  const [dataGetLectures, setDataGetLectures] = useState(null);
  const [dataParticipate, setDataParticipate] = useState(null);

  const [error, setError] = useState(null);
  const [dataStructure, setDataStructure] = useState(null);
  const [dataStructureStudy, setDataStructureStudy] = useState(null);
  const [nonEmptyNames, setNonEmptyNames] = useState([]);

  useEffect(() => {
    if (storedUserToken) {
      fetchDataFromMainpage(storedUserToken)
        .then((response) => {
          setDataMainpage(response.data);
          // // 조건에 맞는 항목을 찾기
          // const filteredNames1 = response.data.lectures
          //   .filter(lecture => lecture.name === '자료구조')
          //   .map(lecture => lecture.name);
          // setDataStructure(filteredNames1);

          // const filteredNames2 = response.data.lectures
          //   .filter(lecture => lecture.name === '자료구조스터디')
          //   .map(lecture => lecture.name);
          // setDataStructureStudy(filteredNames2);
          // // setDataStructureStudy(response.data.lectures);

          // // name이 존재하는 항목을 찾기
          // const filteredNames = response.data.lectures
          //   .filter(lecture => lecture.name)
          //   .map(lecture => lecture.name);
          // setNonEmptyNames(filteredNames);
        })
        .catch((error) => {
          setError(error);
        });

      // if (storedUserToken) {
      //   fetchDataFromGetLectures(storedUserToken)
      //     .then((response) => {
      //       setDataGetLectures(response.data);
      //       // console.log(response.data);
      //     })
      //     .catch((error) => {
      //       setError(error);
      //     });
      // }

      if (storedUserToken) {
        fetchDataFromParticipate(storedUserToken)
          .then((response) => {
            setDataParticipate(response.data);
            // console.log(response.data);
          })
          .catch((error) => {
            setError(error);
          });
      }
    }
  }, [storedUserToken]);

  return (
    <div className="Practice">
      이름: {storedName}<br />
      유저 토큰: {storedUserToken}<br />
      어세스 토큰: {storedAccessToken}<br /><br />

      mainpage에서 받아오는 데이터: <br />{JSON.stringify(dataMainpage)}<br /><br />
      {/* 자료구조: {dataStructure}<br />
      자료구조스터디: {dataStructureStudy}<br /> */}
      {/* name이 존재하는 항목들: <br />{nonEmptyNames.join(', ')}<br /><br /> */}

      {/* getlectures에서 받아온 데이터: <br />{JSON.stringify(dataGetLectures)}<br /><br /> */}

      participate에서 받아온 데이터: <br />{JSON.stringify(dataParticipate)}<br /><br />

    </div>
  );
}

export default Practice;
