import React, { useContext, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { WishlistContext } from "../Context/WishlistContext";
import SuccessModal from "./SuccessModal";
import { fetchGamesFromAirtable } from "../Services/AirtableBase";
import ErrorModal from "./ErrorModal";

function GamesByGenreId({ gameList, selectedGenreName }) {
  const { addToWishlist } = useContext(WishlistContext); // function from WishlistCotext to add game to Wishlist UI
  const [isModalOpen, setIsModalOpen] = useState(false); // new state for errorModal (named Modal)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // New state for SuccessModal

  const handleAddtoWishlist = async (item) => {
    // called when user adds game to wishlist
    const existingGames = await fetchGamesFromAirtable(); //checks if game is in airtable
    const isGameInAirtable = existingGames.some(
      (game) => game.name === item.name
    );

    if (!isGameInAirtable) {
      addToWishlist(item);
      console.log("Game added to wishlist", item);
      setIsSuccessModalOpen(true); // Open SuccessModal
    } else {
      console.log("Game is already in Airtable");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false); // Close SuccessModal
  };

  return (
    <div>
      <h2 className="text-[40px] text-green-700 font-bold text-left my-4">
        {selectedGenreName}
      </h2>
      <hr className="mb-2" />
      <ErrorModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white rounded-xl">
          <h2 className="text-[27px] font-semibold text-red-700">
            Game already in the wishlist
          </h2>
          <hr />
          <p className="mt-4 text-[15px] text-black">
            This game is already in the wishlist. Try adding other games or view
            your wishlist to see what games you have already addded!
          </p>
        </div>
      </ErrorModal>
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal}>
        <div className="bg-white rounded-xl">
          <h2 className="text-[27px] font-semibold text-green-700">
            Game Added to Wishlist!
          </h2>
          <p className="mt-4 text-[15px] text-black">
            This game has been added to your wishlist!
          </p>
        </div>
      </SuccessModal>
      <div className="md:grid md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5">
        {gameList.map((item) => {
          const platformStr = useMemo(() => {
            const str = item.parent_platforms
              .map((each) => each.platform.name)
              .join(", ");
            return str.length > 30 ? str.substring(0, 30) + "..." : str;
          }, [item.parent_platforms]);

          return (
            <div
              key={item.id}
              className="relative bg-green-600 rounded-lg group hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between h-full"
            >
              <div>
                <img
                  src={item.background_image}
                  alt={item.name}
                  className="lazy h-[200px] w-full rounded-t-lg object-cover bg-green-900"
                  loading="lazy"
                />
                <h2 className="text-[20px] text-black font-bold p-2">
                  {item.name}
                </h2>
              </div>
              <div className="text-[10px] text-white font-light p-2">
                {platformStr}
              </div>
              <button
                className="absolute bottom-0 right-0 mb-2 mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={() => handleAddtoWishlist(item)}
              >
                <FaPlus />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(GamesByGenreId);
