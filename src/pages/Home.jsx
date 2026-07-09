import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { recipeService } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { useAppContext } from "../context/AppContext";
import useDocumentSEO from "../hooks/useDocumentSEO";

export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [paneerRecipes, setPaneerRecipes] = useState([]);
  const [seafoodRecipes, setSeafoodRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const navigate = useNavigate();
  const { addRecentSearch } = useAppContext();

  useDocumentSEO({
    title: "Home",
    description:
      "Discover thousands of delicious recipes from around the world. Cook, share, and enjoy with Chefist.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Chefist",
      url: "https://chefist.com/",
    },
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 255) {
      setSubscribeStatus("error");
      return;
    }
    // Simulate API call
    setSubscribeStatus("success");
    setEmail("");
    setTimeout(() => setSubscribeStatus(""), 3000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const sanitizedQuery = searchQuery
      .replace(/[^\w\s-]/gi, "")
      .trim()
      .substring(0, 50);
    if (sanitizedQuery) {
      addRecentSearch(sanitizedQuery);
      navigate(`/search?q=${encodeURIComponent(sanitizedQuery)}`);
    }
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Fetch some initial recipes for featured
        const featured = await recipeService.searchRecipesByName("chicken");
        // Fetch some for latest
        const latest = await recipeService.searchRecipesByName("beef");
        // Fetch paneer recipes
        const paneer = await recipeService.searchRecipesByName("paneer");

        // Fetch seafood recipes
        const seafood = await recipeService.searchRecipesByName("fish");

        setFeaturedRecipes(featured ? featured.slice(0, 10) : []);
        setLatestRecipes(latest ? latest.slice(0, 10) : []);
        setPaneerRecipes(paneer ? paneer.slice(0, 10) : []);
        setSeafoodRecipes(seafood ? seafood.slice(0, 10) : []);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Hero food background"
            className="w-full h-full object-cover opacity-40"
            width="2070"
            height="1380"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 md:p-16 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6 break-words"
          >
            Discover <span className="text-orange-500">Delicious</span> Recipes
            for Every Occasion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 mb-8"
          >
            Find easy and tasty recipes you'll love. From quick meals to
            indulgent desserts, we have it all.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              aria-label="Search recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-w-0 pl-12 pr-24 py-4 rounded-full bg-white text-slate-900 border-none focus:ring-4 focus:ring-orange-500/50 outline-none text-base md:text-lg shadow-xl placeholder-slate-400"
            />
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={24}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 sm:px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors text-sm sm:text-base"
            >
              Search
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-2 text-sm text-slate-300 items-center"
          >
            <span>Popular:</span>
            {["Italian", "Chicken", "Dessert", "Seafood", "Vegetarian"].map(
              (tag) => (
                <Link
                  key={tag}
                  to={`/search?q=${tag}`}
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm transition-colors"
                >
                  {tag}
                </Link>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Trending Recipes
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Most popular choices this week
            </p>
          </div>
          <Link
            to="/search?q=chicken"
            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <SkeletonLoader count={10} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {featuredRecipes.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Special Banner & Random */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 overflow-hidden relative">
          <div className="flex-1 z-10">
            <span className="text-sm font-bold text-orange-500 tracking-wider uppercase mb-2 block">
              Today's Special
            </span>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Creamy Garlic Chicken
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              A rich and creamy garlic chicken recipe that's perfect for dinner.
            </p>
            <Link
              to="/recipe/52796"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-orange-500/30"
            >
              View Recipe
            </Link>
          </div>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl z-10 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Special creamy garlic chicken"
              className="w-full h-full object-cover"
              width="800"
              height="800"
              loading="lazy"
              decoding="async"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 dark:bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-slate-900" />
          <div className="relative z-10 max-w-sm">
            <span className="text-sm font-bold text-orange-400 tracking-wider uppercase mb-2 block">
              Random Recipe
            </span>
            <h3 className="text-3xl font-bold mb-4">
              Discover a random delicious recipe
            </h3>
            <Link
              to="/random"
              className="inline-block px-8 py-3 bg-white text-slate-900 hover:bg-orange-50 rounded-full font-bold transition-colors"
            >
              Surprise Me
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Recipes */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Latest Recipes
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Freshly added to our collection
            </p>
          </div>
          <Link
            to="/search?q=beef"
            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <SkeletonLoader count={10} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {latestRecipes.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Paneer Delights */}
      {paneerRecipes.length > 0 && (
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Paneer Delights
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Discover delicious paneer recipes
              </p>
            </div>
            <Link
              to="/search?q=paneer"
              className="text-orange-500 hover:text-orange-600 font-medium text-sm"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {paneerRecipes.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* Seafood Specials */}
      {seafoodRecipes.length > 0 && (
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Seafood Specials
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Fresh catches and delicious ocean flavors
              </p>
            </div>
            <Link
              to="/search?q=seafood"
              className="text-orange-500 hover:text-orange-600 font-medium text-sm"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {seafoodRecipes.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Get delicious recipes straight to your inbox
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Join our newsletter and receive weekly recipe updates.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full gap-3 sm:gap-2"
            >
              <div className="w-full sm:flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 text-slate-900 dark:text-white"
                />
                {subscribeStatus === "error" && (
                  <p className="absolute -bottom-6 left-4 text-xs text-red-500">
                    Please enter a valid email.
                  </p>
                )}
                {subscribeStatus === "success" && (
                  <p className="absolute -bottom-6 left-4 text-xs text-green-500">
                    Subscribed successfully!
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
