import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import "./index.scss";
import { Logo, SideBar } from "../../components";

const Landing: React.FC = () => {
  const [name, setName] = useState("");

  const getCompoentName = (a: string) => {
    setName(a);
  };

  return (
    <div className="landingContainer">
      <div className="sidebar">
        <Logo />
        <SideBar getCompoentName={getCompoentName} />
      </div>
      <div className="content">
        <Outlet context={name} />
      </div>
    </div>
  );
};

export default Landing;
