import React, { useRef, useState } from "react";
import "./index.scss";

import { Input, ProductTable } from "../../components";
// import WebScraper from "../../components/Scrape/Scrape";

const Products = () => {
  const zoomedImageRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const data = [
    {
      accessName: "Cinderella PCB Fuse",
      photo: "url_to_photo1.jpg",
      partNumber: "100010",
      notes: "Used for main PCBs",
      webDescription: "Cinderella PCB Fuse for main PCBs",
      img: "https://www.thecabindepot.ca/cdn/shop/files/61SgeFUgEbL._US1300_700x700.jpg?v=1719604763"
    },
    {
      accessName: "Ash Container Insert - Flat",
      photo: "url_to_photo2.jpg",
      partNumber: "100014",
      notes: "Fits with 100715 and 102060 ash containers",
      webDescription:
        "Insert for ash container, flat bottom. Fits Cinderella Comfort, Gas, Freedom, Jubilee, Premium, and Classic produced from 2006.",
      img: " https://www.thecabindepot.ca/cdn/shop/files/61zBABp8d1L._US1300_700x700.jpg?v=1719604763"
    },
    {
      accessName: "Ash Container Stop Bracket",
      photo: "url_to_photo3.jpg",
      partNumber: "100017",
      notes: "Welded on side of ash container PN#100715",
      webDescription:
        "Ash container stop bracket, stainless steel. Requires welding to replace. Used on Cinderella Classic, Comfort, and Freedom produced up to beginning of 2023.",
      img: "https://www.thecabindepot.ca/cdn/shop/files/811wqgPk_1L._US1200_700x700.jpg?v=1719604763"
    }
    // Add more data as per the PDF...
  ];

  const zoomHandler = (imgURL: string) => {
    setImageUrl(imgURL);
  };

  const handleClickOutside = () => {
    // if (zoomedImageRef.current && !zoomedImageRef.current.contains(event.target as Node)) {
    setImageUrl("");
    // }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
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
          <ProductTable zoomHandler={zoomHandler} data={data} />
        </div>
        {/* <WebScraper /> */}
      </div>
      {imageUrl && (
        <div onClick={handleClickOutside} className="zoomedImage" ref={zoomedImageRef}>
          <img src={imageUrl} alt="" />
        </div>
      )}
    </>
  );
};

export default Products;
