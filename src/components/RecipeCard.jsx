import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiClock, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

export default function RecipeCard({ recipe, index = 0 }) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const isFav = isFavorite(recipe.idMeal);

  // Generate a random time and rating since API doesn't provide it
  const time = React.useMemo(() => Math.floor(Math.random() * 45) + 15, []);
  const rating = React.useMemo(
    () => (Math.random() * 1.5 + 3.5).toFixed(1),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full"
    >
      <Link
        to={`/recipe/${recipe.idMeal}`}
        className="block relative aspect-[4/3] overflow-hidden shrink-0"
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width="400"
          height="300"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(recipe);
        }}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-sm hover:scale-110 transition-transform z-10"
      >
        <FiHeart
          className={`text-lg md:text-xl ${isFav ? "fill-orange-500 text-orange-500" : "text-slate-400"}`}
        />
      </button>

      <div className="p-3 md:p-5 flex flex-col flex-grow">
        <div className="hidden sm:flex flex-wrap items-center gap-1 md:gap-2 mb-2">
          {recipe.strCategory && (
            <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 rounded-full">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 rounded-full line-clamp-1">
              {recipe.strArea}
            </span>
          )}
        </div>

        <Link to={`/recipe/${recipe.idMeal}`} className="mb-auto">
          <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white line-clamp-2 md:line-clamp-1 break-words group-hover:text-orange-500 transition-colors mb-2 md:mb-3 leading-tight md:leading-normal">
            {recipe.strMeal}
          </h3>
        </Link>

        <div className="flex items-center justify-between text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0">
          <div className="flex items-center gap-1 md:gap-1.5">
            <FiClock className="text-orange-500 text-xs md:text-base" />
            <span>{time}m</span>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5">
            <FiStar className="text-orange-500 fill-orange-500 text-xs md:text-base" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
