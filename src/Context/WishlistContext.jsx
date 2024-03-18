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
      setWishlist([...wishlist, item]);
      await addGameToAirtable(item);
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
  const updateGameStatus = async (gameId, newStatus) => {
    // Assuming you have a way to find the game object by its ID
    const game = wishlist.find((item) => item.id === gameId);
    if (game) {
      // Update the game's status in your local state
      setWishlist(
        wishlist.map((item) =>
          item.id === gameId ? { ...item, status: newStatus } : item
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
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
