import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import { ThemeContext } from "./Context/ThemeContext";
import Wishlist from "./Pages/Wishlist";
import { WishlistProvider } from "./Context/WishlistContext";
import Home from "./Pages/Home";

function App() {
  // State for theme
  const [theme, setTheme] = useState("light");

  // Effect to set theme from local storage on component mount
  useEffect(() => {
    setTheme(
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
    );
  }, []);

  // Main component that provides theme context and wraps the app with WishlistProvider
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${theme} ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        } min-h-screen`}
      >
        <WishlistProvider>
          {" "}
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;
