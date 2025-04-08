import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { PAGE_SIZE } from "./constant";
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    return json.products;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });

  if (isPending) return "Loading....";
  if (error) return "An error has occurred: " + error.message;

  const totalProducts = data.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };
  const goToNextPage = () => {
    //  always have to get previous state and chnage that previous state never do currentPage + 1
    setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return !data.length ? (
    <h1>Data Not Found</h1>
  ) : (
    <>
      {/* create the array list  n length  */}
      <div className="pagination-number-array-list flex justify-center hover:cursor-pointer">
        <button
          disabled={currentPage === 0}
          onClick={() => goToPrevPage()}
          className="sm:mr-2  border-1 bg-amber-100 sm:p-2 hover:scale-90"
        >
          ⬅️
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            onClick={() => handlePageChange(n)}
            className={`sm:mr-2  border-1 bg-amber-100 sm:p-2 hover:scale-90 ${
              n === currentPage ? "bg-blue-400" : "border-1 bg-amber-100"
            }`}
            key={n}
          >
            {" "}
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === noOfPages - 1}
          onClick={() => goToNextPage()}
          className="sm:mr-2  border-1 bg-amber-100 sm:p-2 hover:scale-90"
        >
          ➡️
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {/* showing only 10 products on page using slice in mapping */}
        {data.slice(start, end).map((p) => (
          <ProductCard
            key={p.id}
            image={p?.thumbnail}
            title={p?.title}
            price={p?.price}
            category={p?.category}
          />
        ))}
      </div>
    </>
  );
};

export default Pagination;
