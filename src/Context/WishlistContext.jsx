import React, { createContext, useState, useEffect } from "react";
import {
  addGameToAirtable,
  fetchGamesFromAirtable,
  removeGameFromAirtable,
  updateGameStatusInAirtable,
} from "../Services/AirtableBase";

// create a new context for wishlist
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // initialise wishlist state
  const [wishlist, setWishlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const loadGames = async () => {
      const games = await fetchGamesFromAirtable();
      setWishlist(games);
    };

    loadGames();
  }, []);

  // function to add item to wishlist
  const addToWishlist = async (item) => {
    if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      const updatedItem = { ...item, status: "Not Bought" };
      setWishlist([...wishlist, updatedItem]);
      await addGameToAirtable(updatedItem);
      toggleModal(); // Toggle the modal to open it
    } else {
      setErrorMessage("Game is already in wishlist");
    }
  };

  // function to remove item from wishlist
  const removeFromWishlist = async (itemId) => {
    // Find the game in the wishlist by its ID
    const gameToRemove = wishlist.find((item) => item.id === itemId);

    if (gameToRemove) {
      // Remove the game from the local wishlist state
      setWishlist(wishlist.filter((item) => item.id !== itemId));

      // Remove the game from Airtable
      await removeGameFromAirtable(gameToRemove.id);

      console.log("Game Removed from Wishlist:", itemId);
    } else {
      console.error("Game not found in wishlist:", itemId);
    }
  };

  // function to check if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlist.some((item) => item.id === itemId);
  };

  // Function to update the game status
  const updateGameStatus = async (itemId, newStatus) => {
    // Assuming you have a way to find the game object by its ID
    const game = wishlist.find((item) => item.id === itemId);
    if (game) {
      // Update the game's status in your local state
      setWishlist(
        wishlist.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );
      // Update the game's status in Airtable
      await updateGameStatusInAirtable(game.id, newStatus);
      console.log(
        `Game status updated in Airtable: ${game.id}, New Status: ${newStatus}`
      );
    } else {
      console.error(`Game not found in wishlist: ${gameId}`);
    }
  };

  // provide wishlist state and functions to child components
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        updateGameStatus,
        isModalOpen, // Add the modal visibility state
        toggleModal, // Add the function to toggle the modal
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
