import React, { useEffect, useState } from "react";
import GenreList from "../Components/GenreList";
import GlobalApi from "../Services/GlobalApi";
import Banner from "../Components/Banner";
import GamesByGenreId from "../Components/GamesByGenreId";

function Home() {
  const [allGamesList, setAllGamesList] = useState([]);
  const [gamesListbyGenres, setGameListbyGenres] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("Action");
  const [currentGameIndex, setCurrentGameIndex] = useState(0); // New state for the current game index

  useEffect(() => {
    getAllGamesList();
    getGameListbyGenreId(4);
  }, []);

  const getAllGamesList = () => {
    GlobalApi.getAllGames.then((resp) => {
      setAllGamesList(resp.data.results);
    });
  };

  const getGameListbyGenreId = (id) => {
    GlobalApi.getGamesbyGenreID(id).then((resp) => {
      console.log("Game List by GenreId", resp.data.results);
      setGameListbyGenres(resp.data.results);
    });
  };

  // Function to handle next game
  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % allGamesList.length);
  };

  // Function to handle previous game
  const handlePreviousGame = () => {
    setCurrentGameIndex(
      (prevIndex) => (prevIndex - 1 + allGamesList.length) % allGamesList.length
    );
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
            <div className="flex justify-between mt-4">
              <button onClick={handlePreviousGame} className="mb-4">
                Previous
              </button>
              <button onClick={handleNextGame} className="mb-4">
                Next 
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
