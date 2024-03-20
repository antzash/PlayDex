import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { FaMinus } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, updateGameStatus } =
    useContext(WishlistContext);

  const getPlatformString = (platforms) => {
    if (platforms && platforms.length > 0) {
      const platformStr = platforms
        .map((each) => each.platform.name)
        .join(", ");
      if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
      }
      return platformStr;
    }
    return "";
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-green-700 font-bold text-left my-8">
        Wishlist
      </h1>
      <div className="md:grid md:grid-cols-1 lg:grid-cols-1 gap-10 mt-5">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="relative bg-green-700 rounded-lg group cursor-pointer flex flex-row justify-start items-start h-full"
          >
            <img
              src={item.background_image}
              alt={item.name}
              className="w-[300px] h-[150px] rounded-l-lg object-cover"
            />
            <div className="p-2 flex flex-col justify-start">
              <h2 className="text-[25px] text-black font-bold">{item.name}</h2>
              <p className="p-2 text-[15px] text-white font-light">
                {getPlatformString(item.parent_platforms)}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  className={`px-3 py-1 text-[16px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out ${
                    item.status === "Not Bought"
                      ? "bg-yellow-500"
                      : "bg-green-900"
                  }`}
                  onClick={() => updateGameStatus(item.id, "Not Bought")}
                >
                  Not Bought
                </button>
                <button
                  className={`px-3 py-1 text-[16px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out ${
                    item.status === "Played" ? "bg-cyan-500" : "bg-green-900"
                  }`}
                  onClick={() => updateGameStatus(item.id, "Played")}
                >
                  Played
                </button>
                <button
                  className={`px-3 py-1 text-[16px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out ${
                    item.status === "Repeat" ? "bg-lime-500" : "bg-green-900"
                  }`}
                  onClick={() => updateGameStatus(item.id, "Repeat")}
                >
                  Repeat
                </button>
                <button
                  className={`px-3 py-1 text-[16px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out ${
                    item.status === "Wait for Sale"
                      ? "bg-rose-500"
                      : "bg-green-900"
                  }`}
                  onClick={() => updateGameStatus(item.id, "Wait for Sale")}
                >
                  Wait for Sale
                </button>
                <button
                  className={`px-3 py-1 text-[16px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out ${
                    item.status === "Not My Thing"
                      ? "bg-red-700"
                      : "bg-green-900"
                  }`}
                  onClick={() => updateGameStatus(item.id, "Not My Thing")}
                >
                  Not My Thing
                </button>
              </div>
            </div>
            <button
              className="absolute bottom-0 right-0 mb-2 mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              onClick={() => removeFromWishlist(item.id)}
            >
              <FaMinus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
