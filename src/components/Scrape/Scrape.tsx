// src/WebScraper.tsx
import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";
import Papa from "papaparse";
import React, { useState } from "react";

import "./scrape.scss";

interface ProductData {
  brandName: string | null;
  currentTitle: string;
  productImages: string[] | null;
  // dimensions: string;
  url: string;
  size: string;
  color: string;
  productName: string;
  style: string;
  type: string;
  suggestedTitle: string;
}

const commonColorNames = [
  "white",
  "black",
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "pink",
  "brown",
  "orange",
  "grey",
  "cyan",
  "magenta",
  "lime",
  "indigo",
  "violet",
  "gold",
  "silver",
  "beige",
  "maroon",
  "navy",
  "olive",
  "teal",
  "aqua",
  "fuchsia",
  "lavender",
  "turquoise"
];

const commonColorsSet = new Set(commonColorNames);

const WebScraper: React.FC = () => {
  const [handles, setHandles] = useState<string[]>([]);
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [counts, setCounts] = useState<number>(0);
  const [fileName, setFileName] = useState("Choose a file");

  const readCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uniqueHandles = Array.from(new Set(results.data.map((row: any) => row.Handle).filter(Boolean)));

        setHandles(uniqueHandles);
      }
    });
  };

  const findCommonColorsInSentence = (sentence: string) => {
    const words = sentence.split(/\s+/);
    const colors = words.filter((word) => commonColorsSet.has(word.toLowerCase()));

    return colors;
  };

  const removeParentheses = (text: string) => {
    return text.replace(/\s*\([^)]*\)/g, "");
  };

  const removeMeasurements = (text: string) => {
    return text
      .replace(/\d+(\.\d+)?\s*(cu|CU|Cu|ft|FT|Ft|")/g, "")
      .replace(/\d+\s*(quart|QUART|Quart|cu|CU|Cu|ft|FT|Ft|")/g, "")
      .replace(/\d+\s*(V|v)/g, ""); // Adding volts (V/v) detection
  };

  const removeColors = (text: string) => {
    const words = text.split(/\s+/);
    const filteredWords = words.filter((word) => !commonColorNames.includes(word.toLowerCase()));

    return filteredWords.join(" ");
  };

  const removeBrands = (text: string, brandName: string) => {
    const words = text.split(/\s+/);
    const filteredWords = words.filter((word) => !brandName.includes(word));

    return filteredWords.join(" ");
  };

  const removeModelNumbers = (text: string) => {
    return text
      .replace(/[A-Za-z0-9-]+/g, (match) => {
        // Remove model numbers that are alphanumeric and have at least one letter and one number
        return /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(match) ? "" : match;
      })
      .replace(/\s+/g, " ")
      .trim();
  };

  const cleanLeadingCharacters = (text: string) => {
    return text
      .replace(/^-+/, "")
      .replace(/^ft\s*/i, "")
      .trim();
  };

  const extractProductName = (text: string, brand: string) => {
    let result = removeParentheses(text);

    result = removeMeasurements(result);
    result = removeColors(result);
    result = removeBrands(result, brand);
    result = removeModelNumbers(result);
    result = cleanLeadingCharacters(result);

    return result.replace("/ft", "").trim();
  };

  const fetchProductData = async (handle: string): Promise<ProductData> => {
    const url = `https://www.thecabindepot.ca/products/${handle}`;
    const regex = /\d+(\.\d+)?''\s*H\s*X\s*\d+(\.\d+)?''\s*W\s*X\s*\d+(\.\d+)?''\s*D/; //dimensions
    const sizeRegex = /\d+(\.\d+)?\s*(cu |cu\/ft|ft|pack|L|")/gi;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const description = $(".pxu-tabs .tab-panel > div").text();
      const brandName = $(".product-vendor a").text() || "";
      const currentTitle = $(".product-title").text() || "";

      // const dimensions = description.match(regex) as unknown as string;
      const size =
        description.match(regex)?.toString().toUpperCase() ||
        currentTitle?.match(sizeRegex)?.toString().toUpperCase() ||
        "";

      const productName = extractProductName(currentTitle, brandName) || "";

      const color =
        findCommonColorsInSentence(currentTitle || "")[0] || findCommonColorsInSentence(description)[0] || "";

      const productImages = $(".product-gallery--media.product-gallery--image img")
        .map((_, element) => $(element).attr("src")?.replace(/^\/\//, "") || "")
        .get();

      return {
        brandName,
        currentTitle,
        productImages,
        // dimensions: dimensions ? dimensions[0] : "[dimensions]",
        url,
        size,
        color,
        productName,
        style: "",
        type: "",
        suggestedTitle:
          `${brandName} ${size ? size : ""} ${""}  ${productName} ${color ? color : ""}`?.replace("/ft", "")
      };
    } catch (error: unknown) {
      const err = error as AxiosError;

      if (err.response && err.response.status === 404) {
        return {
          brandName: "Product not found",
          currentTitle: "",
          productImages: [""],
          // dimensions: "",
          url,
          size: "",
          color: "",
          productName: "",
          style: "",
          type: "",
          suggestedTitle: ""
        };
      }

      throw error;
    }
  };

  const scrapeData = async () => {
    const results: ProductData[] = [];

    let processedCount = 0;

    for (const handle of handles) {
      try {
        const data = await fetchProductData(handle);

        results.push(data);
      } catch (error) {
        console.error(`Error fetching data for handle: ${handle}`, error);
      } finally {
        processedCount++;
        setCounts(processedCount);
        console.log(`Processed ${processedCount} handles`);

        if (processedCount >= handles.length) {
          break;
        }
      }
    }

    setProductData(results);
  };

  // const exportToCSV = () => {
  //   const csvData = Papa.unparse(productData);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");

  //   link.setAttribute("href", url);
  //   link.setAttribute("download", "product_data.csv");
  //   link.style.visibility = "hidden";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const exportToCSV = () => {
    const formattedData = productData.map((product, index) => {
      const images = product.productImages?.map((src) => `https://${src}`).join("\r\n"); // Using \r\n for line breaks

      return {
        URL: product.url,
        "Current Title": product.currentTitle,
        Brand: product.brandName,
        Size: product.size,
        Style: product.style,
        Type: product.type,
        Product: product.productName,
        Color: product.color,
        "Suggested Title": product.suggestedTitle,
        Handler: handles[index],
        Images: images
      };
    });

    const csvData = Papa.unparse(formattedData, {
      quotes: true, // Ensures all fields are quoted
      newline: "\r\n" // Ensures proper new lines for different OS
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", "product_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="top-header">
        <div className="file-upload-wrapper">
          <input
            type="file"
            id="file-input"
            accept=".csv"
            onChange={(e) => {
              if (e.target.files) {
                setFileName(e.target.files[0].name);
                readCSV(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="file-input" className="file-upload-button">
            {fileName}
          </label>
        </div>
        <button className="scrape" onClick={scrapeData} style={{ marginRight: "10px" }}>
          Scrape Data
        </button>
        <button onClick={exportToCSV} style={{ marginRight: "10px" }}>
          Export to CSV
        </button>
        <span style={{ fontWeight: "bold" }}>
          Processed {counts} / {handles.length}
        </span>
      </div>
      <div style={{ marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: -64 }}>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>URL</th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  minWidth: "200px"
                }}
              >
                Current Title
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Brand</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Size</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Style</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Type</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
                Product
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Color</th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f2f2f2",
                  minWidth: "200px"
                }}
              >
                Suggested Title
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>
                Handler
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Images</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    {product.url}
                  </a>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.currentTitle}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.brandName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.size}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.style}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.type}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.productName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.color}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.suggestedTitle}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>/{handles[index]}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", minWidth: "100px" }}>
                  {product.productImages?.map((src, idx) => (
                    <div key={idx}>
                      <a
                        href={`https://${src}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{`image-${idx + 1}`}</a>
                      <br />
                      <br />
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebScraper;
