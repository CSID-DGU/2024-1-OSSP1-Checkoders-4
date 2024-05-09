import './App.css';
import React from 'react';
import MainPage2 from './components/MainPage/MainPage2'; // MainPage 컴포넌트를 import
import DetailPage from './components/DetailPage/DetailPage'; // 자세한 페이지 컴포넌트 import
import StudentQListPage from './components/StudentQListPage/StudentQListPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<MainPage2/>}> </Route>
          <Route path={"/detail"} element={<DetailPage/>}> </Route>
          <Route path={"/studentqlist"} element={<StudentQListPage/>}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
