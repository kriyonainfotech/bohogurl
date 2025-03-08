import { useState } from "react";
import { FaSearch, FaRegUser, FaShoppingBag, FaBars, FaTimes, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 relative">
        {/* Left Section: Hamburger (Mobile) + Desktop Menu */}
        <div className="flex items-center md:flex-1">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Menu (Left Side) */}
          <div className="hidden md:flex gap-6 font-medium ml-4 font-[Karla]">
            <a href="/" className="hover:text-gray-900 text-[#151313]">
              HOME
            </a>
            <a href="/collections" className="hover:text-gray-900 text-[#151313]">
              OUR COLLECTIONS
            </a>
            <a href="/products" className="hover:text-gray-900 text-[#151313]">
              PRODUCTS
            </a>
          </div>
        </div>

        {/* Center Logo (Absolute Positioning for Perfect Center) */}
        <div
          style={{ fontFamily: "Cormorant SC" }}
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-[30px] tracking-wide font-serif cursor-pointer"
          onClick={() => navigate("/")}
        >
          BOHO GURL
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-4 text-gray-700 md:flex-1 justify-end">
          {/* Search Icon */}
          <div className="hidden md:block">
            {isSearchOpen ? (
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border-b-2 border-gray-500 text-lg outline-none"
                autoFocus
              />
            ) : (
              <FaSearch
                onClick={() => setIsSearchOpen(true)}
                className="text-xl cursor-pointer hover:text-gray-900"
              />
            )}
          </div>

          {/* Mobile Search */}
          <FaSearch
            onClick={() => setIsSearchOpen(true)}
            className="text-xl cursor-pointer hover:text-gray-900 md:hidden"
          />

          {/* Search Overlay */}
          {isSearchOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
              <div className="relative w-4/5 md:w-1/3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-3 border-b-2 border-gray-500 text-lg outline-none w-full"
                  autoFocus
                />
                <button
                  className="absolute right-2 top-3 text-gray-700 hover:text-black"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
          )}

          {/* User, Wishlist, Cart */}
          <FaRegUser
            className="hidden md:block text-xl cursor-pointer hover:text-gray-900"
            onClick={() => navigate("/login")}
          />
          <FaRegHeart
            className="text-xl cursor-pointer hover:text-gray-900"
            onClick={() => navigate("/wishlist")}
          />
          <div className="relative cursor-pointer">
            <FaShoppingBag
              className="text-xl cursor-pointer hover:text-gray-900"
              onClick={() => navigate("/cart")}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start z-50">
          <div className="flex justify-left border-b-2 w-full py-4 space-x-6">
            <FaRegUser
              className="text-xl cursor-pointer hover:text-gray-900 ml-5 bg-red-200 rounded-full text-[25px] p-1"
              onClick={() => navigate("/userprofile")}
            />
            <p className="font-[Lato]">Hii, User</p>
          </div>
          <a
            href="/"
            className="block py-3 px-6 w-full hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HOME
          </a>
          <a
            href="/collections"
            className="block py-3 px-6 w-full hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            OUR COLLECTIONS
          </a>
          <a
            href="/products"
            className="block py-3 px-6 w-full hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            PRODUCTS
          </a>
          {/* Login Button for Mobile */}
          <button
            className="block py-3 px-6 w-full text-left hover:bg-gray-100"
            onClick={() => {
              navigate("/login");
              setIsMobileMenuOpen(false);
            }}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}