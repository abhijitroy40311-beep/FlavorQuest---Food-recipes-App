import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { recipeService } from "../services/recipeService";
import useDocumentSEO from "../hooks/useDocumentSEO";

export default function RandomRecipePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useDocumentSEO({
    title: "Surprise Me",
    description:
      "Get a random recipe picked just for you. Perfect for when you do not know what to cook.",
  });

  const fetchRandom = async () => {
    setLoading(true);
    try {
      const recipe = await recipeService.getRandomRecipe();
      if (recipe) {
        navigate(`/recipe/${recipe.idMeal}`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl bg-white dark:bg-slate-800 p-6 sm:p-12 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden w-full"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600" />

        <div className="text-6xl mb-6 md:mb-8">🎲</div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 break-words">
          Discover a Random Recipe
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-8 md:mb-10 max-w-md mx-auto">
          Click the button below and get a surprise recipe picked just for you!
          Perfect for when you don't know what to cook.
        </p>

        <button
          onClick={fetchRandom}
          disabled={loading}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-orange-500 rounded-full hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 disabled:opacity-70 disabled:hover:scale-100"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Cooking up...
            </span>
          ) : (
            <span>Surprise Me!</span>
          )}
        </button>
      </motion.div>
    </div>
  );
}
