import React from "react";

export default function SkeletonLoader({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 animate-pulse"
          >
            <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 w-full" />
            <div className="p-3 md:p-5">
              <div className="flex gap-2 mb-2 md:mb-3 hidden sm:flex">
                <div className="h-4 md:h-6 w-12 md:w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="h-4 md:h-6 w-12 md:w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
              <div className="h-5 md:h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-3 md:mb-4" />
              <div className="flex justify-between">
                <div className="h-3 md:h-4 w-12 md:w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-3 md:h-4 w-10 md:w-12 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
