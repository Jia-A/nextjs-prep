"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
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
  if(loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
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
      {totalProducts > 10 &&       <div className="cursor-pointer flex gap-2 flex-wrap">
        <span
          className={`px-5 py-4 border border-amber-300 font-bold hover:bg-amber-100 ${
            page === 1 && "hidden"
          }`}
          onClick={() => setPage(page - 1)}
          key={"prev"}
        >
          Prev
        </span>
        {[...Array(Math.ceil(totalProducts / 10))].map((_, i) => {
          return (
            <span
              className={`px-5 py-4 border border-amber-300 hover:bg-amber-100 ${
                page === i + 1 && "bg-amber-200"
              }`}
              onClick={() => setPage(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          );
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
      </div> }

    </div>
  );
};

export default Pagination;
