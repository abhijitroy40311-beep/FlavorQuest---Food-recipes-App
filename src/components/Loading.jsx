import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-16 h-16">
        <motion.div className="absolute inset-0 border-4 border-orange-200 dark:border-orange-900 rounded-full" />
        <motion.div
          className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="mt-4 text-slate-500 font-medium">
        Loading deliciousness...
      </p>
    </div>
  );
}
