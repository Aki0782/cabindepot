import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Akhil...</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
