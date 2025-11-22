import { useState } from "react";
import WebcamView from "./pages/WebcamView";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>This is the entrance
    <a className="flex m-4 text-xl text-black animate-bounce" href = "/webcam">using webcam by using frontend </a>
    <BrowserRouter>
    
    <Routes>
    <Route path="/webcam" element={<WebcamView />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
