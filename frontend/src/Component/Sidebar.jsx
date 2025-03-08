import React, { useContext } from "react";
import { FaBox, FaShoppingCart, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContextProvider";  

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  if (!theme) return <div>Loading Theme...</div>;

  // Updated paths to match admin routes
  const menuItems = [
    { 
      name: "Dashboard", 
      icon: <FaTachometerAlt />, 
      path: "/admin-dashboard" 
    },
    { 
      name: "Orders", 
      icon: <FaShoppingCart />, 
      path: "/admin-orders" 
    },
    { 
      name: "Customers", 
      icon: <FaUsers />, 
      path: "/admin-users" 
    },
    { 
      name: "Products", 
      icon: <FaBox />, 
      path: "/admin-products" // यहाँ Products का लिंक है
    },
  ];

  return (
    <div className={`fixed inset-0 md:w-64 w-14 h-screen px-4 py-6 bg-${theme === "dark" ? "gray-900" : "gray-100"} 
      text-${theme === "dark" ? "white" : "gray-900"} transition-all duration-300`}>

      {/* Logo */}
      <h1 className="text-xl font-bold hidden md:block mt-4 text-center text-blue-600 italic">
        Jewelry Shop
      </h1>

      {/* Menu Items */}
      <ul className="flex flex-col mt-6 text-lg">
        {menuItems.map(({ name, icon, path }) => (
          <li key={name} className="mb-2">
            <NavLink
              to={path}
              end // Add this for exact matching
              className={({ isActive }) =>
                `flex items-center py-3 px-3 rounded-md transition-all duration-200
                ${isActive ? "bg-blue-600 text-white shadow-lg" : "hover:bg-blue-500 hover:text-white"}`}>
              <span className="text-xl">{icon}</span>
              <span className="hidden md:inline ml-3">{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
