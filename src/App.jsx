import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import Favorites from "./pages/Favorites.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Categories from "./pages/Categories.jsx";
import NotFound from "./pages/NotFound.jsx";
import RandomRecipePage from "./pages/RandomRecipePage.jsx";

import { AppProvider } from "./context/AppContext.jsx";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-50">
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/random" element={<RandomRecipePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </AppProvider>
  );
}
