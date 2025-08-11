// "use client";
// import React, { useState } from "react";
// import { carouselMockData } from "../mockData/carouselMockData";
// import Image from "next/image";

// const Carousel = () => {
//   const [current, setCurrent] = useState(0);


//   const prevButton = () => {
//     console.log("bye")
//     setCurrent(
//       (prev) => (prev - 1 + carouselMockData.length) % carouselMockData.length
//     );
//   };

//   const nextButton = () => {
//     console.log("hi")
//     setCurrent((prev) => (prev + 1) % carouselMockData.length);
//   };


//   return (
//     <div className="carousel relative w-full overflow-hidden">
//         <button onClick={prevButton}>Prev</button>
//         <button onClick={nextButton}>Next</button>
//       <div
//         className="carousel-container flex gap-5 transition-transform duration-500"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {carouselMockData.length > 0 &&
//           carouselMockData.map((image) => {
//             return (
//               // <Image src={image} key={image} alt="Carousel Image"/>
//               <span key={image}>{image}</span>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default Carousel;

"use client";
import React, { useState } from "react";

const images = [
  { url: "https://picsum.photos/id/1015/300/150" },
  { url: "https://picsum.photos/id/1024/250/150" },
  { url: "https://picsum.photos/id/1024/320/150" },
  { url: "https://picsum.photos/id/1015/300/150" },
  { url: "https://picsum.photos/id/1024/320/150" },
];

export default function SimpleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgWidths, setImgWidths] = useState([]);

  const handleImgLoad = (index, e) => {
    const newWidths = [...imgWidths];
    newWidths[index] = e.target.offsetWidth;
    setImgWidths(newWidths);
  };

  const getTranslateX = () => {
    return imgWidths.slice(0, currentIndex).reduce((acc, w) => acc + w, 0) || 0;
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={{ width: "600px", overflow: "hidden", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          transition: "transform 0.3s ease",
          transform: `translateX(-${getTranslateX()}px)`,
        }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={`Slide ${idx + 1}`}
            onLoad={(e) => handleImgLoad(idx, e)}
            style={{ flexShrink: 0, userSelect: "none" }}
          />
        ))}
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button onClick={goToPrev} style={{ marginRight: 10 }}>
          Prev
        </button>
        <button onClick={goToNext}>Next</button>
      </div>
    </div>
  );
}
