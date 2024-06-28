import React from "react";

import "./orders.scss";
import { OrdersTable, OrdersSummary } from "../../components";

const Orders = () => {
  const orders = [
    {
      order: "#1002",
      date: "11 Feb, 2024",
      customer: "Wade Warren",
      payment: "Pending",
      total: "$20.00",
      delivery: "N/A",
      items: "2 items",
      fulfillment: "Unfulfilled"
    },
    {
      order: "#1004",
      date: "13 Feb, 2024",
      customer: "Esther Howard",
      payment: "Success",
      total: "$22.00",
      delivery: "N/A",
      items: "3 items",
      fulfillment: "Fulfilled"
    }
    // Add more orders here
  ];

  return (
    <div className="ordersContainer">
      <h1 className="title">Orders</h1>
      <div className="orderHeader">
        <OrdersSummary label="Total Orders:" value="32" />
        <OrdersSummary label="Orders over time:" value="300" />
        <OrdersSummary
          label="Total Revenue:"
          value={`${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(3000)}`}
        />
      </div>
      <div className="ordersList">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default Orders;
