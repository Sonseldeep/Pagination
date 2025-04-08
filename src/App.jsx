import js from "@eslint/js";

import { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const App = () => {
  return (
    <div className="flex justify-center">
      <div className=" max-w-[750px]">
        <h1>Pagination</h1>
        <Pagination />
      </div>
    </div>
  );
};

export default App;
