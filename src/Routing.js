import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Main from "./Pages/Main/Main";
import SubmitAssign from "./Pages/SubmitAssign/SubmitAssign";
import SetAssign from "./Pages/SetAssign/SetAssign";
import Foundation from "./Redesign/Foundation/Foundation";
import ReSubmitAssign from "./Redesign/ReSubmitAssign/ReSubmitAssign";

// 페이지 만들때마다 라우터에 추가해야함

function Routing() {
  return (
    <div className="Routing">
      <BrowserRouter>
        <Routes>
          <Route exact path = '/' element = {<App />} />
          <Route exact path = '/Main' element = {<Main />} />
          <Route exact path = '/SubmitAssign' element = {<SubmitAssign />} />
          <Route exact path = '/SetAssign' element = {<SetAssign />} />
          <Route exact path = '/Foundation' element = {<Foundation />} />
          <Route exact path = '/ReSubmitAssign' element = {<ReSubmitAssign />} />


        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default Routing;
