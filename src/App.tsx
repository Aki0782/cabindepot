import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Orders from "./pages/Orders/Orders";
import Overview from "./pages/Overview";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="" element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="invoices" element={<Overview />} />
          <Route path="contacts" element={<Overview />} />
          <Route path="assets" element={<Overview />} />
          <Route path="users" element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
