import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Orders from "./pages/Orders/Orders";
import Overview from "./pages/Overview";
import Products from "./pages/Products";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="" element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="contacts" element={<Overview />} />
          <Route path="assets" element={<Overview />} />
          <Route path="users" element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
