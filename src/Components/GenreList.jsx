import React, { useEffect, useState } from "react";
import GlobalApi from "../Services/GlobalApi";

// used in Home.jsx where its rendered in a div element.

function GenreList({ genreId, selectedGenreName }) {
  // both props to update GenreID when clicked and update the name
  const [genreList, setGenreList] = useState([]); // state variable to hold list of genres fetched by API. empty at first
  const [activeIndex, setActiveIndex] = useState(0); // keeps track of currently active genre index in list chosen by user

  useEffect(() => {
    getGenreList();
  }, []);

  const getGenreList = () => {
    // responsible for fetching genre list from api through GlobalApi.
    GlobalApi.getGenreList.then((resp) => {
      setGenreList(resp.data.results);
    });
  };

  return (
    <div>
      <h2 className="text-[30px] mb-5 font-bold dark:text-white">Genres</h2>
      {genreList.map((item, index) => (
        <div
          key={index}
          className={`group flex gap-2 items-center mb-2 cursor-pointer hover:bg-green-700 p-2 rounded-lg transition ease-in-out duration-300 hover:text-white  ${
            activeIndex === index
              ? "text-white bg-green-700 dark:bg-green-700"
              : null
          }`}
          onClick={() => {
            setActiveIndex(index);
            genreId(item.id);
            selectedGenreName(item.name);
          }}
        >
          <img
            src={item.image_background}
            className="w-[40px] h-[40px] object-cover rounded-lg"
          />
          <h3 className="dark:text-white text-[18px] font-medium group-hover:font-bold transition ease-in-out duration-300">
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default GenreList;
