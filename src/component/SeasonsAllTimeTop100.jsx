"use client";

import AnimeCards from "@/component/AnimeCards";
import Navbar from "@/component/Navbar";
import { useEffect, useState } from "react";

export default function SeasonsAllTimeTop100({ baseURL, category, query }) {
  const [currentTVPage, setCurrentTVPage] = useState(1);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [lastVisiblePage, setLastVisiblePage] = useState(1);
  const [currentType, setCurrentType] = useState("tv");

  const fetchViewMore = async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const currentPage =
        currentType === "tv" ? currentTVPage : currentMoviePage;
      console.log(currentType);

      const response = await fetch(
        baseURL + `&${query}=${currentType}&page=${currentPage}`
      );

      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      console.log(data.data);

      setAnimeList(data.data);
      setLastVisiblePage(data.pagination.last_visible_page);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchViewMore();
  }, [currentType, currentTVPage, currentMoviePage]);

  const handlePageClicked = (page) => {
    if (currentType === "tv") setCurrentTVPage(page);
    else setCurrentMoviePage(page);
  };

  const handleTypeClicked = (type) => {
    if (type !== currentType) {
      setCurrentType(type);
      if (type === "tv") setCurrentTVPage(1);
      else setCurrentMoviePage(1);
    }
  };

  // for pagination
  const currentPage = currentType === "tv" ? currentTVPage : currentMoviePage;

  const pageButton = (page) => (
    <button
      key={page}
      className={`join-item btn ${
        page === currentPage
          ? "bg-purple-500 text-white hover:bg-purple-900"
          : "bg-gray-100 text-black hover:bg-gray-200"
      }`}
      onClick={() => handlePageClicked(page)}
    >
      {page}
    </button>
  );

  const pageNums = [...Array(5)]
    .map((_, index) => currentPage - 2 + index)
    .filter((page) => page > 1 && page < lastVisiblePage);

  if (lastVisiblePage <= 1) return null;

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white p-5 my-8 rounded-lg shodow-lg">
        <div className="flex text-white mb-5">
          <button
            onClick={() => handleTypeClicked("tv")}
            className="bg-purple-500 hover:bg-purple-800 p-3 w-full rounded-l-lg border-r-2"
          >
            {category} TV Shows
          </button>
          <button
            onClick={() => handleTypeClicked("movie")}
            className="bg-purple-500 hover:bg-purple-800 p-3 w-full rounded-r-lg"
          >
            {category} Movies
          </button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimeCards
            apiType="jikan"
            animeList={animeList.filter(
              (anime, index) =>
                animeList.findIndex((a) => a.mal_id === anime.mal_id) === index
            )}
          />
        </div>
        
        {/* paginatio */}
        <div className="join flex justify-center mt-8">
          {/* first page */}
          {pageButton(1)}

          {currentPage > 4 && (
            <button className="join-item btn bg-gray-300 cursor-not-allowed opacity-50">
              ...
            </button>
          )}

          {/* middle pages */}
          {pageNums.map((page) => pageButton(page))}

          {currentPage < lastVisiblePage - 3 && (
            <button className="join-item btn bg-gray-300 cursor-not-allowed opacity-50">
              ...
            </button>
          )}

          {/* last page */}
          {pageButton(lastVisiblePage)}
        </div>
      </div>
    </div>
  );
}
