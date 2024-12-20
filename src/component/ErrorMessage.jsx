import React from "react";

export default function ErrorMessage({ category }) {
  return (
    <div className="p-8 my-4 bg-rose-50 rounded-lg border border-rose-200 max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-rose-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-rose-900">
          Oops! Something went wrong
        </h3>
        <p className="text-rose-700">
          Failed to load {category}. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors duration-200 font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
