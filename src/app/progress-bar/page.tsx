"use client";
import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const [value, setValue] = useState(0);
  const [percent, setPercent] = useState(value);

useEffect(() => {
  const interval = setInterval(() => {
    setValue((prev) => {
      if (prev >= 100) {
        clearInterval(interval); // stop when 100 reached
        return prev;
      }
      return prev + 1;
    });
  }, 100);

  return () => clearInterval(interval); // cleanup on unmount
}, []);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(value, 0)));
  }, [value]);
  return (
    <div className="flex mt-10 flex-col items-center h-screen">
      <span className="mb-5">Progress bar</span>
      <div className="relative w-1/2 h-[30px] bg-blue-100 rounded-lg flex overflow-hidden">
        <span className="absolute w-full text-center self-center z-2">
          {percent}%
        </span>
        <div
          className="absolute h-full w-full bg-blue-500"
          style={{
            transform: `scaleX(${percent / 100})`,
            transformOrigin: "left",
            transition: "transform 0.3s ease",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
