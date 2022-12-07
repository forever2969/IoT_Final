import './App.css';
import {Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import React,{useEffect} from 'react';

function App() {
  
  return (
    <>
      <Routes>
          {/* <Route path="/splash" element={<SplashPage/>} /> */}
          <Route path="/" element={<MainPage/>} />
      </Routes>
    </>
  );
}

export default App;
