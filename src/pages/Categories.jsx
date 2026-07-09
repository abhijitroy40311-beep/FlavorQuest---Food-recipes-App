import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { recipeService } from "../services/recipeService";
import SkeletonLoader from "../components/SkeletonLoader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await recipeService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Browse Categories
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Explore recipes by your favorite categories.
        </p>
      </div>

      {loading ? (
        <SkeletonLoader count={12} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={category.idCategory}
            >
              <Link
                to={`/search?c=${category.strCategory}`}
                className="group flex flex-col items-center bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full text-center hover:-translate-y-1"
              >
                <div className="w-24 h-24 mb-4 shrink-0 rounded-full overflow-hidden bg-slate-50 dark:bg-slate-700 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors break-words w-full px-1">
                  {category.strCategory}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {Math.floor(Math.random() * 200 + 50)} Recipes
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
