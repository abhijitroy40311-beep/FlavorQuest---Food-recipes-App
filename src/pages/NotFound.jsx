import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[8rem] font-black text-orange-500 leading-none mb-4"
      >
        404
      </motion.div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
      >
        Go Home
      </Link>
    </div>
  );
}
