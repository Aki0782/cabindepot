import React, { useState } from "react";
import "./index.scss";

import { Input, ProductTable } from "../../components";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      accessName: "Cinderella PCB Fuse",
      photo: "url_to_photo1.jpg",
      partNumber: "100010",
      notes: "Used for main PCBs",
      webDescription: "Cinderella PCB Fuse for main PCBs"
    },
    {
      accessName: "Ash Container Insert - Flat",
      photo: "url_to_photo2.jpg",
      partNumber: "100014",
      notes: "Fits with 100715 and 102060 ash containers",
      webDescription:
        "Insert for ash container, flat bottom. Fits Cinderella Comfort, Gas, Freedom, Jubilee, Premium, and Classic produced from 2006."
    },
    {
      accessName: "Ash Container Stop Bracket",
      photo: "url_to_photo3.jpg",
      partNumber: "100017",
      notes: "Welded on side of ash container PN#100715",
      webDescription:
        "Ash container stop bracket, stainless steel. Requires welding to replace. Used on Cinderella Classic, Comfort, and Freedom produced up to beginning of 2023."
    }
    // Add more data as per the PDF...
  ];

  return (
    <div className="productsContainer">
      <div className="header">
        <h1>Products</h1>
        <Input
          type="text"
          onchange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          label="Search Products"
        />
        <div className="search"></div>
      </div>
      <div className="listContainer">
        <ProductTable data={data} />
      </div>
    </div>
  );
};

export default Products;
