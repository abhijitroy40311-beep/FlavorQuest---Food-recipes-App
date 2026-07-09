import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiHome,
  FiGrid,
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode, toggleDarkMode, favorites } = useAppContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const sanitizedQuery = searchQuery
      .replace(/[^\w\s-]/gi, "")
      .trim()
      .substring(0, 50);
    if (sanitizedQuery) {
      navigate(`/search?q=${encodeURIComponent(sanitizedQuery)}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const navLinks = [
    { to: "/", icon: <FiHome />, text: "Home" },
    { to: "/categories", icon: <FiGrid />, text: "Categories" },
    { to: "/favorites", icon: <FiHeart />, text: "Favorites" },
    { to: "/random", icon: <FiSearch />, text: "Surprise Me" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Chefist
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-orange-500"
                      : "text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400"
                  }`
                }
              >
                {link.icon}
                {link.text}
                {link.to === "/favorites" && favorites.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                aria-label="Search recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-orange-500 text-sm transition-all outline-none text-slate-900 dark:text-white"
              />
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
            </form>
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="p-2 text-slate-600 dark:text-slate-300 relative w-10 h-10 flex items-center justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <FiX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <FiMenu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <form onSubmit={handleSearch} className="relative mb-4 mt-2">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  aria-label="Search recipes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 dark:text-white"
                />
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
              </form>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-orange-50 dark:bg-orange-900/20 text-orange-500"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {link.icon}
                  {link.text}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
