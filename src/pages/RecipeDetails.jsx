import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShare2,
  FiPrinter,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiChevronLeft,
  FiActivity,
} from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { recipeService } from "../services/recipeService";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { estimateNutrition } from "../utils/nutritionEstimator";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useAppContext();

  useDocumentSEO({
    title: recipe ? recipe.strMeal : "Loading...",
    description: recipe
      ? `Learn how to make ${recipe.strMeal}. A delicious ${recipe.strCategory} recipe from ${recipe.strArea} cuisine.`
      : "",
    image: recipe ? recipe.strMealThumb : "",
    schema: recipe
      ? {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          author: {
            "@type": "Organization",
            name: "Chefist",
          },
          datePublished: new Date().toISOString().split("T")[0],
          description: `Learn how to make ${recipe.strMeal}. A delicious ${recipe.strCategory} recipe from ${recipe.strArea} cuisine.`,
          recipeCategory: recipe.strCategory,
          recipeCuisine: recipe.strArea,
        }
      : null,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const data = await recipeService.getRecipeById(id);
        if (data) {
          setRecipe(data);
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, navigate]);

  const ingredients = useMemo(() => {
    const list = [];
    if (!recipe) return list;
    for (let i = 1; i <= 20; i++) {
      if (
        recipe[`strIngredient${i}`] &&
        recipe[`strIngredient${i}`].trim() !== ""
      ) {
        list.push({
          ingredient: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    return list;
  }, [recipe]);

  const nutrition = useMemo(
    () => estimateNutrition(ingredients),
    [ingredients],
  );

  if (loading) return <Loading />;
  if (!recipe) return null;

  const isFav = isFavorite(recipe.idMeal);

  // Extract ingredients and measurements

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Recipe link copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:space-y-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors print:hidden"
      >
        <FiChevronLeft size={20} /> Back
      </button>

      {/* Hero Section */}
      <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 aspect-video md:aspect-[21/9]">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover opacity-80"
          width="1200"
          height="600"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-4 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-full shadow-lg">
              {recipe.strCategory}
            </span>
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
              {recipe.strArea}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight break-words">
            {recipe.strMeal}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/90 print:hidden">
            <div className="flex items-center gap-2">
              <FiClock size={20} className="text-orange-400" />
              <span>Prep: 15 min</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock size={20} className="text-orange-400" />
              <span>Cook: 30 min</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers size={20} className="text-orange-400" />
              <span>Serves: 4</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex items-center gap-3 print:hidden">
          <button
            onClick={() => toggleFavorite(recipe)}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20"
          >
            <FiHeart
              size={24}
              className={
                isFav ? "fill-orange-500 text-orange-500" : "text-white"
              }
            />
          </button>
          <button
            onClick={handleShare}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20"
          >
            <FiShare2 size={24} className="text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Action Bar Mobile */}
          <div className="flex flex-wrap items-center justify-between lg:hidden print:hidden border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
            <button
              onClick={() => toggleFavorite(recipe)}
              className={`flex items-center gap-2 font-medium ${isFav ? "text-orange-500" : "text-slate-600 dark:text-slate-300"}`}
            >
              <FiHeart size={20} className={isFav ? "fill-orange-500" : ""} />
              {isFav ? "Saved" : "Save"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300"
            >
              <FiShare2 size={20} /> Share
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300"
            >
              <FiPrinter size={20} /> Print
            </button>
          </div>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Instructions
            </h2>
            <div className="prose prose-lg dark:prose-invert prose-orange max-w-none">
              {recipe.strInstructions
                .split("\n")
                .filter((step) => step.trim())
                .map((step, index) => (
                  <div key={index} className="flex gap-6 mb-6 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center text-lg mt-1 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 pt-2 leading-relaxed break-words min-w-0">
                      {step}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {recipe.strYoutube && recipe.strYoutube.includes("v=") && (
            <section className="print:hidden">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Video Tutorial
              </h2>
              <div className="rounded-3xl overflow-hidden aspect-video shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1].split("&")[0]}`}
                  title={`YouTube video tutorial for ${recipe.strMeal}`}
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Ingredients
              </h3>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
                {ingredients.length} items
              </span>
            </div>

            <ul className="space-y-4">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0 gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FiCheckCircle className="text-orange-500 flex-shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 capitalize break-words min-w-0">
                      {item.ingredient}
                    </span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-sm break-words min-w-0 text-right">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>

            {/* Nutrition Facts */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <FiActivity className="text-orange-500" size={24} />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Estimated Nutrition
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {nutrition.calories}
                  </div>
                  <div className="text-xs text-orange-800 dark:text-orange-200 font-medium">
                    Calories
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {nutrition.protein}g
                  </div>
                  <div className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                    Protein
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {nutrition.fat}g
                  </div>
                  <div className="text-xs text-red-800 dark:text-red-200 font-medium">
                    Fat
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">
                * Estimated values based on general ingredients.
              </p>
            </div>

            {/* Desktop Print Button */}
            <button
              onClick={handlePrint}
              className="hidden lg:flex w-full items-center justify-center gap-2 mt-8 px-6 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-bold transition-colors print:hidden"
            >
              <FiPrinter size={20} />
              Print Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
