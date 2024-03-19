// Import necessary React hooks and components
import React, { useEffect, useState, useContext } from "react";
import GenreList from "../Components/GenreList";
import GlobalApi from "../Services/GlobalApi";
import Banner from "../Components/Banner";
import GamesByGenreId from "../Components/GamesByGenreId";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { WishlistContext } from "../Context/WishlistContext";

function Home() {
  // State for all games list, games list by genres, selected genre name, and current game index
  const [allGamesList, setAllGamesList] = useState([]);
  const [gamesListbyGenres, setGameListbyGenres] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("Action");
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

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
