import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Main from "./Pages/Main/Main";
import SubmitAssign from "./Pages/SubmitAssign/SubmitAssign";
import SetAssign from "./Pages/SetAssign/SetAssign";


function Routing() {
  return (
    <div className="Routing">
      <BrowserRouter>
        <Routes>
          <Route exact path = '/' element = {<App />} />
          <Route exact path = '/Main' element = {<Main />} />
          <Route exact path = '/SubmitAssign' element = {<SubmitAssign />} />
          <Route exact path = '/SetAssign' element = {<SetAssign />} />


        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default Routing;
