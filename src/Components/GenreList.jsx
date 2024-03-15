import React, { useEffect, useState } from "react";
import GlobalApi from "../Services/GlobalApi";

function GenreList({ genreId, selectedGenreName }) {
  const [genreList, setGenreList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getGenreList();
  }, []);

  const getGenreList = () => {
    GlobalApi.getGenreList.then((resp) => {
      console.log(resp.data.results);
      setGenreList(resp.data.results);
    });
  };

  return (
    <div>
      <h2 className="text-[30px] font-bold dark:text-white">Genres</h2>
      {genreList.map((item, index) => (
        <div
          key={index}
          className={`group flex gap-2 items-center mb-2 cursor-pointer hover:bg-green-700 p-2 rounded-lg transition ease-in-out duration-300 hover:dark:bg-green-700 ${
            activeIndex === index ? "bg-green-700 dark:bg-green-700" : null
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
