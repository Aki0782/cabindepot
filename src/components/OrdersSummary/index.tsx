import React from "react";

import "./index.scss";

type OrdersSummaryProps = {
  label: string;
  value: string;
};

const OrdersSummary: React.FC<OrdersSummaryProps> = ({ label, value }) => {
  return (
    <div className="orders-summary">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default OrdersSummary;
