import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.idMeal === recipe.idMeal);
      if (exists) {
        return prev.filter((item) => item.idMeal !== recipe.idMeal);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (id) => favorites.some((item) => item.idMeal === id);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addRecentSearch = (term) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (t) => t.toLowerCase() !== term.toLowerCase(),
      );
      return [term, ...filtered].slice(0, 5); // keep last 5
    });
  };

  const clearRecentSearches = () => setRecentSearches([]);

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        darkMode,
        toggleDarkMode,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
