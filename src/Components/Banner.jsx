import React, { useEffect } from "react";

// function component definition, takes a prop gameBanner passed down to Home.jsx
function Banner({ gameBanner }) {
  // empty useeffect with empty function and dependency array to take effect once component mounts
  useEffect(() => {}, []);

  return (
    <div className="relative">
      <div className="absolute bottom-0 p-10 bg-gradient-to-t from-green-900 to transparent w-full rounded-lg">
        <h2 className="text-[24px] text-white font-bold mb-3  ">
          {gameBanner.name}
        </h2>
      </div>
      <img
        src={gameBanner.background_image}
        className="md: h-[400px] w-full object-cover rounded-lg "
      />
    </div>
  );
}

export default Banner;
