import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { FaMinus } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  console.log("Current wishlist:", wishlist);

  const getPlatformString = (platforms) => {
    const platformStr = platforms.map((each) => each.platform.name).join(", ");
    if (platformStr.length > 30) {
      return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Wishlist</h1>
      <div className="md:grid md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="relative bg-green-600 rounded-lg group hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between h-full"
          >
            <img
              src={item.background_image}
              alt={item.name}
              className="h-[200px] w-full rounded-t-lg object-cover bg-green-900"
            />
            <h2 className="text-[20px] text-black font-bold p-2">
              {item.name}
            </h2>
            <p className="text-[10px] text-white font-light p-2">
              {getPlatformString(item.parent_platforms)}
            </p>
            {/* Add other game details as needed */}
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
