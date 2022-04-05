import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./views/main";
import MainEng from "./views/main_Eng";
import StarsVeiw from "./views/starView";
import StarsVeiwEng from "./views/starView_Eng";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/eng" element={<MainEng />} />
        <Route path="/stars" element={<StarsVeiw />} />
        <Route path="/stars/eng" element={<StarsVeiwEng />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
