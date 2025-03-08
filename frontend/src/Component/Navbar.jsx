import React, { useContext } from "react";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContextProvider"; // ✅ Fix Import Path
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate(); // Initialize useNavigate

  if (!themeContext) {
    console.error("ThemeContext is not available in Navbar. Make sure ThemeContextProvider is wrapped in App.js");
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove user token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 px-6 py-3 flex items-center justify-between 
        shadow-md z-50 transition-all duration-300 
        ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}
    >
      {/* Dashboard Title */}
      <h1 className="text-xl font-bold">📊 Dashboard</h1>

      {/* Right Section (Theme Toggle + Logout) */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2 text-lg p-2 rounded-md transition-all duration-300 
              hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
          <span className="hidden sm:inline">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* Logout Button */}
        <button
          className="flex items-center space-x-2 text-lg p-2 rounded-md transition-all duration-300 
              hover:bg-red-100 text-red-500 dark:hover:bg-red-800 dark:text-red-300"
          onClick={handleLogout} // Call handleLogout on click
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;