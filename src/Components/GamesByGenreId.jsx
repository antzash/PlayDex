import React, { useContext, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { WishlistContext } from "../Context/WishlistContext";
import Modal from "./Modal";
import { fetchGamesFromAirtable } from "../Services/AirtableBase";
import ErrorModal from "./ErrorModal";

function GamesByGenreId({ gameList, selectedGenreName }) {
  const { addToWishlist } = useContext(WishlistContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleAddtoWishlist = async (item) => {
    const existingGames = await fetchGamesFromAirtable();
    const isGameInAirtable = existingGames.some(
      (game) => game.name === item.name
    );

    if (!isGameInAirtable) {
      addToWishlist(item);
      console.log("Game added to wishlist", item);
    } else {
      console.log("Game is already in Airtable");
      setModalMessage("Game is already in Wishlist!");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ErrorModal isOpen={isModalOpen} onClose={closeModal}>
        <p>{modalMessage}</p>
      </ErrorModal>
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
