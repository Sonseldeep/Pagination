import js from "@eslint/js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ProductCard = ({ image, title, price, category }) => {
  return (
    <div className="product-card p-5 m-5 w-[200px] hover:scale-90 justify-center items-center">
      <img className="object-cover rounded-lg" src={image} alt={title} />
      <span className="title font-semibold">{title}</span>
      <h1 className="font-semibold mt-1">$ {price}</h1>
      <h1 className="font-semibold mt-1">{category}</h1>
    </div>
  );
};

const PAGE_SIZE = 10;

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    return json.products;
  };

  const { isPending, error, data } = useQuery({
    queryKey: "products",
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
    <div className="flex justify-center">
      <div className=" max-w-[750px]">
        <h1>Pagination</h1>

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
      </div>
    </div>
  );
};

export default App;
