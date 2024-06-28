import React from "react";
import "./index.scss";

interface Order {
  order: string;
  date: string;
  customer: string;
  payment: string;
  total: string;
  delivery: string;
  items: string;
  fulfillment: string;
}

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Items</th>
            <th>Fulfillment</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.order}</td>
              <td>{order.date}</td>
              <td>{order.customer}</td>
              <td>
                <span className={`status ${order.payment.toLowerCase()}`}>{order.payment}</span>
              </td>
              <td>{order.total}</td>
              <td>{order.delivery}</td>
              <td>{order.items}</td>
              <td>
                <span className={`status ${order.fulfillment.toLowerCase()}`}>{order.fulfillment}</span>
              </td>
              {/* <td>...</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
