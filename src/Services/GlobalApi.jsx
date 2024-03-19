import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const axiosCreate = axios.create({
  baseURL: "https://api.rawg.io/api/",
});

const getGenreList = axiosCreate.get("/genres?key=" + key);

const getAllGames = () => {
  return axiosCreate.get("games?key=" + key);
};
const getGamesbyGenreID = (id) =>
  axiosCreate.get("games?key=" + key + "&genres=" + id);

export default {
  getGenreList,
  getAllGames,
  getGamesbyGenreID,
};
