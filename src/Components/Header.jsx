import React, { useContext, useState, useEffect } from "react";
import logo from "./../assets/Images/mainLogo.png";
import { CiSearch } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const [toggle, setToggle] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="flex items-center p-3">
      <img
        className="transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
        src={logo}
        width={60}
        height={60}
        onClick={() => {
          navigate("/");
        }}
      />
      <div
        className={`flex p-2 w-full mx-5 rounded-full items-center justify-center ${
          theme === "dark"
            ? "bg-green-700 bg-opacity-50 text-white"
            : "bg-slate-200 text-green-700"
        }`}
      >
        <span className="text-[25px] font-bold">PlayDex</span>
      </div>
      <div>
        <IoHeart
          className="text-red-500 text-4xl p-1 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
            navigate("/wishlist"); // Navigate to Wishlist page on click
          }}
        />
      </div>
      <div>
        {theme == "light" ? (
          <GoSun
            className="text-black text-4xl mx-2 p-1.5 rounded-full cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 "
            onClick={() => {
              setTheme("dark");
              localStorage.setItem("theme", "dark");
            }}
          />
        ) : (
          <FaMoon
            className="text-white text-4xl mx-2 p-1.5 rounded-full bg-black cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 "
            onClick={() => {
              setTheme("light");
              localStorage.setItem("theme", "light");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
