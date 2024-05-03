import './Foundation.css';

function Foundation() {
  return (
    <div className="Foundation">
      <div className='topCover'>
        <div className='siteName'>
          <button className='siteName_button'>
            ✔ Checkoders
            {/* 온클릭하면 메인페이지 */}
          </button>
        </div>
        <div className='midBlank'>

        </div>
        <div className='logOut'>
          <button className='logOut_button'>
            Logout🔓
            {/* 온클릭하면 로그아웃 후 로그인 페이지 */}
          </button>
        </div>
      </div>
      <div className='bottomBox'>
        <div className='leftBlank'>

        </div>
        <div className='midCore'>
          <div className='lecture'>

          </div>
          <div className='mainContent'>

          </div>
        </div>
        <div className='rightBlank'>

        </div>
      </div>
    </div>
  );
}

export default Foundation;
