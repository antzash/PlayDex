import React, { useEffect } from "react";

// Banner takes prop gamebanner to display name and image. This prop is passed to Home.jsx.

function Banner({ gameBanner }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 p-10 bg-gradient-to-t from-green-900 to transparent w-full rounded-lg">
        <h2 className="text-[24px] text-white font-bold mb-3  ">
          {gameBanner.name}
        </h2>
      </div>
      <img
        src={gameBanner.background_image}
        className="md: h-[600px] w-full object-cover rounded-lg "
      />
    </div>
  );
}

export default Banner;
