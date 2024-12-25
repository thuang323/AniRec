"use client";

import AnimeCards from "@/component/AnimeCards";
import Navbar from "@/component/Navbar";
import { useEffect, useState } from "react";

export default function PopularSeasonPage() {
  const baseURL = "https://api.jikan.moe/v4/seasons/now?sfw&filter=tv";
  const [currentPage, setCurrentPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [lastVisiblePage, setLastVisiblePage] = useState(1);

  const fetchViewMore = async () => {
    try {
      const response = await fetch(baseURL + `&page=${currentPage}`);
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
  }, [currentPage]);

  const handlePageClicked = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-5">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white p-5 my-8 rounded-lg shodow-lg">
        <h1 className="text-2xl font-bold mb-5">Popular This Season</h1>
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
                  page === currentPage
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
