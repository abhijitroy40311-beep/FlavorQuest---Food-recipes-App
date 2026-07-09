import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiSearch, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { recipeService } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import SkeletonLoader from "../components/SkeletonLoader";
import useDebounce from "../hooks/useDebounce";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const c = searchParams.get("c");
  const typeParam = searchParams.get("type") || "name";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(q || "");
  const [searchType, setSearchType] = useState(typeParam);
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearch = useDebounce(
    searchInput
      .replace(/[^\w\s-]/gi, "")
      .trim()
      .substring(0, 50),
    500,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      if (debouncedSearch !== q || searchType !== typeParam) {
        navigate(
          `/search?q=${encodeURIComponent(debouncedSearch)}&type=${searchType}`,
          { replace: true },
        );
      }
    } else if (debouncedSearch.trim() === "" && searchInput === "" && q) {
      navigate(`/search`, { replace: true });
    }
  }, [debouncedSearch, searchType, navigate, q, typeParam, searchInput]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        let data = [];
        if (q) {
          if (typeParam === "ingredient") {
            data = await recipeService.getRecipesByIngredient(q);
          } else if (typeParam === "category") {
            data = await recipeService.getRecipesByCategory(q);
          } else {
            data = await recipeService.searchRecipesByName(q);
          }
        } else if (c) {
          data = await recipeService.getRecipesByCategory(c);
        }
        setResults(data || []);
      } catch (error) {
        console.error("Error searching recipes:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q, c, typeParam]);

  return (
    <div className="space-y-8 min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Search Recipes
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Find your favorite recipes by ingredients, categories, and more.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative flex items-center shadow-sm rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <FiSearch className="absolute left-6 text-slate-400" size={24} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={`Search by ${searchType}...`}
            className="w-full min-w-0 pl-14 pr-28 sm:pl-16 sm:pr-32 py-4 rounded-full bg-transparent border-none focus:ring-0 outline-none text-base sm:text-lg text-slate-900 dark:text-white"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-2 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-medium transition-colors flex items-center gap-2 text-sm sm:text-base ${showFilters ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200"}`}
          >
            <FiFilter /> <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Search By
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["name", "ingredient", "category"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSearchType(type)}
                          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${searchType === type ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Search Results {q ? `for "${q}"` : c ? `in "${c}" category` : ""}
          <span className="text-slate-500 font-normal ml-2">
            ({results.length} results)
          </span>
        </h2>

        {loading ? (
          <SkeletonLoader count={10} />
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
              <FiSearch className="text-4xl text-slate-300 dark:text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No Search Results
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
              Try different keywords or search something else.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {results.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
