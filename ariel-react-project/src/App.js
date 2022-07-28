import { Routes, Route } from "react-router-dom";
import Header from './components/Header.js';
import Homepage from '../src/pages/Homepage.js';
import Login from '../src/pages/Login.js';
import Loading from '../src/components/Loading';
import React, { useState } from "react";
function App() {
  const [isLoad, setLoad] = useState(false);
  const openLoading=()=>{
    setLoad(true);
  }
  const closeLoading=()=>{
    setLoad(false);
  }
  return (
<div className="content-card">
    <Header/>
    <div className="main-content">
    <Routes>
    <Route path="/" element={<Homepage loadingHandler={{open:openLoading,close:closeLoading}}/>} />
    <Route path="/login" element={<Login loadingHandler={{open:openLoading,close:closeLoading}}/>} />
    </Routes>
    </div>
    {isLoad?<Loading/>:null}
</div>
  );
}

export default App;
