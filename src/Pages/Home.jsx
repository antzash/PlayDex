import React, { useEffect, useState, useContext } from "react";
import GenreList from "../Components/GenreList";
import GlobalApi from "../Services/GlobalApi";
import Banner from "../Components/Banner";
import GamesByGenreId from "../Components/GamesByGenreId";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { WishlistContext } from "../Context/WishlistContext"; // Import WishlistContext

function Home() {
  const [allGamesList, setAllGamesList] = useState([]);
  const [gamesListbyGenres, setGameListbyGenres] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("Action");
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const { addToWishlist } = useContext(WishlistContext); // Use WishlistContext

  useEffect(() => {
    getAllGamesList();
    getGameListbyGenreId(4);
  }, []);

  const getAllGamesList = () => {
    GlobalApi.getAllGames().then((resp) => {
      setAllGamesList(resp.data.results);
    });
  };

  const getGameListbyGenreId = (id) => {
    GlobalApi.getGamesbyGenreID(id).then((resp) => {
      setGameListbyGenres(resp.data.results);
    });
  };

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % allGamesList.length);
  };

  const handlePreviousGame = () => {
    setCurrentGameIndex(
      (prevIndex) => (prevIndex - 1 + allGamesList.length) % allGamesList.length
    );
  };

  // Function to handle adding a game to the wishlist
  const handleAddToWishlist = () => {
    const gameToAdd = allGamesList[currentGameIndex];
    if (gameToAdd) {
      addToWishlist(gameToAdd);
    }
  };

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
    </div>
  );
}

export default Home;
