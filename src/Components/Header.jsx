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
        src={logo}
        width={60}
        height={60}
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex bg-slate-200 p-2 w-full mx-5 rounded-full items-center">
        <CiSearch />
        <input
          type="text"
          placeholder="Search Games"
          className="px-2 bg-transparent outline-none"
        />
      </div>
      <div>
        <IoHeart
          className="text-red-500 text-4xl p-1 rounded-full bg-slate-100"
          onClick={() => {
            setToggle(!toggle);
            navigate("/wishlist"); // Navigate to Wishlist page on click
          }}
        />
      </div>
      <div>
        {theme == "light" ? (
          <GoSun
            className="text-black text-4xl mx-2 p-1.5 rounded-full bg-slate-100 cursor-pointer"
            onClick={() => {
              setTheme("dark");
              localStorage.setItem("theme", "dark");
            }}
          />
        ) : (
          <FaMoon
            className="text-black text-4xl mx-2 p-1.5 rounded-full bg-slate-100 cursor-pointer"
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
