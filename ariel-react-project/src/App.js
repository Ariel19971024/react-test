import { Routes, Route } from "react-router-dom";
import Header from './components/Header.js';
import Homepage from '../src/pages/Homepage.js';
import Login from '../src/pages/Login.js';
function App() {
  return (
<div className="content-card">
    <Header/>
    <div className="main-content">
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<Login />} />
    </Routes>
    </div>
</div>
  );
}

export default App;
