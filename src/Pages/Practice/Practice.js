import './Practice.css';
import { useLocation } from 'react-router-dom';

function Practice() {
  const location = useLocation();
  const id = location.state?.id || '에러1';
  const nickname = location.state?.nickname || '에러2';
  return (
    <div className="Practice">
      asdf<br/>
      {id}<br/>
      {nickname}
    </div>
  );
}

export default Practice;
