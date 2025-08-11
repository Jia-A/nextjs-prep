"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.floor(totalProducts / 10);
  console.log("Total Pages", totalPages);
  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotalProducts(data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const getVisiblePages = (page, maxVisiblePages = 5) => {
    if (totalPages <= maxVisiblePages) {
        console.log("inside if")
      const pages = [...Array(totalPages)].map((_, i) => i);
      console.log(pages);
      return pages;
    }
    const pages = [];
    const numMiddlePages = maxVisiblePages - 2;
    let startPage = Math.max(2, page - Math.ceil(numMiddlePages / 2));
    console.log("StartPage",startPage);
    let endPage = startPage + numMiddlePages - 1;
    console.log("EndPage",endPage);

    if (endPage >= totalPages) {
        console.log("inside if 2")
      endPage = totalPages - 1;
      startPage = endPage - numMiddlePages + 1;
      console.log("Adjusted StartPage", startPage);
      console.log("Adjusted EndPage", endPage);
    }

    pages.push(1);
    if (startPage > 2) {
        console.log("inside if 3")
      pages.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < (totalPages - 1)) {
        console.log("inside if 4")
      pages.push("...");
    }
    pages.push(totalPages);
    console.log("Final Pages", pages);  
    return pages;
  };

  const visiblePages =  getVisiblePages(page, 5)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">Loading...</div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <div
            key={product?.id}
            className="p-2 flex flex-col items-center gap-2 bg-amber-50"
          >
            <div className="relative w-52 h-52">
              <Image
                src={product?.thumbnail}
                alt="Product thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <span>{product?.title}</span>
          </div>
        ))}
      </div>
      {totalProducts > 10 && (
        <div className="cursor-pointer flex gap-1 flex-wrap">
          <span
            className={`px-5 py-4 border border-amber-300 font-bold hover:bg-amber-100 ${
              page === 1 && "hidden"
            }`}
            onClick={() => setPage(page - 1)}
            key={"prev"}
          >
            Prev
          </span>
          {totalPages && visiblePages.map((i, index)=> {
            console.log("i", i);
            return i === "..." ? (
                <span
              className={`px-5 py-4 border border-amber-300 hover:bg-amber-100`}
              key={i+index}
            >
              {i}
            </span>
            ) : <span
              className={`px-5 py-4 border border-amber-300 hover:bg-amber-100 ${
                page === Number(i) && "bg-amber-200"
              }`}
              onClick={() => setPage(Number(i))}
              key={i}
            >
              {Number(i)}
            </span>
          })}
          <span
            className={`px-5 py-4 border border-amber-300 font-bold hover:bg-amber-100 ${
              page === Math.ceil(totalProducts / 10) && "hidden"
            }`}
            onClick={() => setPage(page + 1)}
            key={"next"}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
