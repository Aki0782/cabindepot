import React from "react";

import "./index.scss";

interface SparePart {
  accessName: string;
  photo: string;
  partNumber: string;
  notes: string;
  webDescription: string;
}

interface SparePartsTableProps {
  data: SparePart[];
}

const ProductTable: React.FC<SparePartsTableProps> = ({ data }) => {
  return (
    <table className="productTable">
      <thead>
        <tr>
          <th className="table-head">Item Name</th>
          <th className="table-head">Photo</th>
          <th className="table-head">Part #</th>
          <th className="table-head">Notes</th>
          <th className="table-head">Web Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((part, index) => (
          <tr key={index}>
            <td className="table-cell">{part.accessName}</td>
            <td className="table-cell">
              <img className="table-img" src={part.photo} alt="Part" />
            </td>
            <td className="table-cell">{part.partNumber}</td>
            <td className="table-cell">{part.notes}</td>
            <td className="table-cell">{part.webDescription}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
