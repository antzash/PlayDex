// Import necessary React hooks and components
import React, { useEffect, useState, useContext } from "react";
import GenreList from "../Components/GenreList";
import GlobalApi from "../Services/GlobalApi";
import Banner from "../Components/Banner";
import GamesByGenreId from "../Components/GamesByGenreId";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { WishlistContext } from "../Context/WishlistContext";
import Modal from "../Components/Modal";

function Home() {
  // State for all games list, games list by genres, selected genre name, and current game index
  const [allGamesList, setAllGamesList] = useState([]);
  const [gamesListbyGenres, setGameListbyGenres] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("Action");
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const { isModalOpen, toggleModal } = useContext(WishlistContext);

  // Use context to access addToWishlist function
  const { addToWishlist } = useContext(WishlistContext);

  // Effect to fetch all games and games by genre ID on component mount
  useEffect(() => {
    getAllGamesList();
    getGameListbyGenreId(4);
  }, []);

  // Function to fetch all games
  const getAllGamesList = () => {
    GlobalApi.getAllGames().then((resp) => {
      setAllGamesList(resp.data.results);
    });
  };

  // Function to fetch games by genre ID
  const getGameListbyGenreId = (id) => {
    GlobalApi.getGamesbyGenreID(id).then((resp) => {
      setGameListbyGenres(resp.data.results);
    });
  };

  // Functions to navigate through games
  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % allGamesList.length);
  };

  const handlePreviousGame = () => {
    setCurrentGameIndex(
      (prevIndex) => (prevIndex - 1 + allGamesList.length) % allGamesList.length
    );
  };

  // Function to add current game to wishlist
  const handleAddToWishlist = () => {
    const gameToAdd = allGamesList[currentGameIndex];
    if (gameToAdd) {
      addToWishlist(gameToAdd);
    }
  };

  // Render the home page with genre list, banner, and games by genre ID
  return (
    <div className="grid grid-cols-4 px-5">
      <div className="h-full hidden md:block">
        <GenreList
          genreId={(id) => getGameListbyGenreId(id)}
          selectedGenreName={(name) => setSelectedGenreName(name)}
        />
      </div>
      <div className="col-span-4 md:col-span-3">
        {allGamesList?.length > 0 && gamesListbyGenres.length > 0 ? (
          <div>
            <Banner gameBanner={allGamesList[currentGameIndex]} />
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousGame}
                className="text-white mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110 bg-green-600 rounded-full p-2"
              >
                <MdNavigateBefore className="text-2xl" />
              </button>
              <button
                className="mb-4 bg-green-700 text-[15px] text-white p-3 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 bg-green-600 rounded-full p-2"
                onClick={handleAddToWishlist}
              >
                Add to Wishlist
              </button>
              <button
                onClick={handleNextGame}
                className="text-white mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110 bg-green-600 rounded-full p-2"
              >
                <MdNavigateNext className="text-2xl" />
              </button>
            </div>
            <GamesByGenreId
              gameList={gamesListbyGenres}
              selectedGenreName={selectedGenreName}
            />
          </div>
        ) : null}
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="text-left">
          <h2 className="text-[20px] text-green-700 font-bold mb-2">
            Game Added Successfully!
          </h2>
          <hr />
          <p className="mt-5 text-[15px] text-black">
            Your game has been successfully added to your wishlist.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
