import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Main from "./Pages/Main/Main";
import Foundation from "./Pages/Foundation/Foundation";
import SubmitAssign from "./Pages/SubmitAssign/SubmitAssign";
import SetAssign from "./Pages/SetAssign/SetAssign";
import SetTeam from "./Pages/SetTeam/SetTeam"
import StudentProblem from "./Pages/StudentProblem/StudentProblem"
import CodeReview from "./Pages/CodeReview/CodeReview"
import StudentTable from "./Pages/SetTeam/StudentTable/StudentTable";
// 페이지 만들때마다 라우터에 추가해야함
import Practice from "./Practice/Practice";

function Routing() {
  return (
    <div className="Routing">
      <BrowserRouter>
        <Routes>
          <Route exact path = '/' element = {<App />} />
          <Route exact path = '/Main' element = {<Main />} />
          <Route exact path = '/Foundation' element = {<Foundation />} />
          <Route exact path = '/SubmitAssign' element = {<SubmitAssign />} />
          <Route exact path = '/SetAssign' element = {<SetAssign />} />
          <Route exact path = '/SetTeam' element = {<SetTeam />} />
          <Route exact path = '/StudentProblem' element = {<StudentProblem />} />
          <Route exact path = '/CodeReview' element = {<CodeReview />} />
          <Route exact path = '/StudentTable' element = {<StudentTable />} />

          <Route exact path = '/Practice' element = {<Practice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
