import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Chefist
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Discover thousands of delicious recipes from around the world.
              Cook, share, and enjoy.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/random"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  Surprise Me
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-500 hover:text-orange-500 dark:text-slate-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Chefist. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
