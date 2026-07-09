import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const { favorites } = useAppContext();

  return (
    <div className="space-y-8 min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          My Favorite Recipes
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Your saved recipes collection.
        </p>
      </div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-24 h-24 bg-orange-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <FiHeart className="text-4xl text-slate-300 dark:text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No favorites yet!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
            Save your favorite recipes by clicking the heart icon on any recipe
            card.
          </p>
          <Link
            to="/search"
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors"
          >
            Explore Recipes
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((recipe, idx) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
