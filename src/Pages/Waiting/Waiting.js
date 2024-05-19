import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Waiting() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  //
  /*useEffect(async()=>{
    await axios.get('api/code=${code}')
    .then((response) => {
      console.log('kakaoLogin');
      console.log(response.data.data.token);
      console.log(response.data.data.userEmail);
    })
    .catch((error) => {
      console.log('kakaoLogin Failed');
    });
    navigate('/Main');
  }, []);*/

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`api/code=${code}`);
            console.log('kakaoLogin');
            console.log(response.data.data.token);
            console.log(response.data.data.userEmail);
            navigate('/Main');
        } catch (error) {
            console.log('kakaoLogin Failed');
            navigate('/Main');
          }
    };

    fetchData();
}, [code, navigate]);

  return (
    <div>
      로그인을 기다리는 페이지입니다.
    </div>
  );
}

export default Waiting;