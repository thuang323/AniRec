"use client";

import AnimeCards from "@/component/AnimeCards";
import Navbar from "@/component/Navbar";
import { useEffect, useState } from "react";

export default function TopAiringPage() {
  const baseURL = "https://api.jikan.moe/v4/top/anime?sfw&filter=airing";

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
        baseURL + `&type=${currentType}&page=${currentPage}`
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

  return (
    <div className="min-h-screen bg-gray-100 pb-5">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white p-5 my-8 rounded-lg shodow-lg">
        <div className="flex text-white mb-5">
          <button
            onClick={() => handleTypeClicked("tv")}
            className="bg-purple-500 hover:bg-purple-800 p-3 w-full rounded-l-lg border-r-2"
          >
            Top Airing TV Shows
          </button>
          <button
            onClick={() => handleTypeClicked("movie")}
            className="bg-purple-500 hover:bg-purple-800 p-3 w-full rounded-r-lg"
          >
            Top Airing Movies
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
        <div className="join flex justify-center mt-8">
          {[...Array(lastVisiblePage)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`join-item btn ${
                  page ===
                  (currentType === "tv" ? currentTVPage : currentMoviePage)
                    ? "bg-purple-500 text-white hover:bg-purple-800"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                } `}
                onClick={() => handlePageClicked(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
