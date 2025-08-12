"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    console.log(page);
    const response = await fetch(
      `https://dummyjson.com/products?limit=${page * 10}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotalProducts(data.total);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const throttle = (cbFunc, delay) => {
    let last = 0;
    
    return (...args) => {
        const now = new Date().getTime();
      if (now - last >= delay) {
        cbFunc(...args);
        last = now;
      }
    };
  };

  const handleScroll = () => {
    console.log(
      window.innerHeight,
      document.documentElement.scrollTop,
      document.documentElement.offsetHeight
    );
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight &&
      !loading &&
      products.length < totalProducts
    ) {
      fetchProducts();
    }
  };

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 500);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);
  return (
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
  );
};

export default InfiniteScroll;
