import React from "react";
import { useOutletContext } from "react-router";

const Overview: React.FC = () => {
  const name = useOutletContext<string>();

  return <div>{name}</div>;
};

export default Overview;
