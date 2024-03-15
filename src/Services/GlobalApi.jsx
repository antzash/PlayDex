import axios from "axios";

const key = "6473ecf3a1234e8c8dd26ad6d2794e6e";
const axiosCreate = axios.create({
  baseURL: "https://api.rawg.io/api/",
});

const getGenreList = axiosCreate.get("/genres?key=" + key);

const getAllGames = axiosCreate.get("/games?key=" + key);
const getGamesbyGenreID = (id) =>
  axiosCreate.get("games?key=" + key + "&genres=" + id);

export default {
  getGenreList,
  getAllGames,
  getGamesbyGenreID,
};
