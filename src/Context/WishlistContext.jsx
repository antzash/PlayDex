import React, { createContext, useState } from "react";

// create a new context for wishlist
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // initialise wishlist state
  const [wishlist, setWishlist] = useState([]);

  // function to add item to wishlist
  const addToWishlist = (item) => {
    if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  // function to remove
  const removeFromWishlist = (itemId) => {
    setWishlist(wishlist.filter((item) => item.id !== itemId));
    console.log("Game Removed from Wishlist:", itemId);
  };
  // function to check if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlist.some((item) => item.id === itemId);
  };

  // Function to udpate the game status
  const updateGameStatus = (gameId, newStatus) => {
    setWishlist(
      wishlist.map((game) =>
        game.id === gameId ? { ...game, status: newStatus } : game
      )
    );
  };

  // provdie wishlist state and functions to child components
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
