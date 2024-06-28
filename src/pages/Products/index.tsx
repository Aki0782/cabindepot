import React, { useState } from "react";
import "./index.scss";

import { Input, ProductCard } from "../../components";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
        {Array.from({ length: 30 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
