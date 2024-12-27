"use client";

import Navbar from "@/component/Navbar";
import { useEffect, useState } from "react";
import { GENRES } from "@/utils/utils";
import AnimeCards from "@/component/AnimeCards";
import { useSearchParams } from "next/navigation";

export default function Genre() {
  const TYPE = ["TV", "Movie"];
  const [keyword, setKeyword] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [type, setType] = useState("");
  const [selectedGenre, setSeletedGenre] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisiblePage, setLastVisiblePage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [noResult, setNoResult] = useState(true);

  const searchParams = useSearchParams();
  const searchInput = searchParams.get("searchInput");

  const baseURL = "https://api.jikan.moe/v4/anime?sfw";
  const getAnime = async () => {
    const genreQuery = selectedGenre.map((genre) => GENRES[genre]).join(",");
    console.log(genreQuery);

    try {
      const response = await fetch(
        `${baseURL}&q=${keyword}&type=${type}&genres=${genreQuery}&page=${currentPage}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      console.log(
        `${baseURL}&q=${keyword}&type=${type}&genres=${genreQuery}&page=${currentPage}`
      );

      const data = await response.json();
      setAnimeList(data.data);
      setLastVisiblePage(data.pagination.last_visible_page);
      setNoResult(data.data.length === 0);
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectType = (type) => {
    setType(type);
    setOpenDropdown(null);
  };

  const removeType = () => {
    setType("");
  };

  const selectGenre = (genre) => {
    if (!selectedGenre.includes(genre)) {
      setSeletedGenre([...selectedGenre, genre]);
    }
    setOpenDropdown(null);
  };

  const removeGenre = (genre) => {
    setSeletedGenre(selectedGenre.filter((g) => g !== genre));
  };

  const handlePageClicked = (page) => {
    setCurrentPage(page);
    getAnime(page);
  };

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

  const handleFilter = () => {
    if (!type) {
      alert("Please select type");
      return;
    }

    setCurrentPage(1);
    setIsFiltered(true);
    getAnime();
  };

  useEffect(() => {
    if (isFiltered) getAnime();
  }, [currentPage, keyword]);

  useEffect(() => {
    if (searchInput) {
      setKeyword(searchInput);
      setIsFiltered(true);
    }
  }, [searchInput]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* search bar */}
          <label className="input input-bordered flex justify-between items-center gap-2 mr-1 w-full max-w-xs">
            <input
              type="text"
              className="text-gray-400"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              placeholder="Search"
            />
            <svg viewBox="0 0 16 16" className="h-5 w-5 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* type */}
          <div className="w-full max-w-xs">
            <div className="relative">
              <button
                className="select select-bordered items-center w-full"
                onClick={() =>
                  setOpenDropdown(openDropdown === "type" ? null : "type")
                }
              >
                <span className="text-gray-600">{type || "Type"}</span>
              </button>
              {openDropdown === "type" && (
                <div className="absolute bg-white z-10 w-full mt-2 rounded-lg shadow-lg p-1">
                  {TYPE.map((type) => (
                    <button
                      key={type}
                      className="w-full text-left px-3 py-1 hover:bg-gray-200 rounded-lg"
                      onClick={() => selectType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* genre */}
          <div className="w-full max-w-xs">
            <div className="relative">
              <button
                className="select select-bordered items-center w-full"
                onClick={() =>
                  setOpenDropdown(openDropdown === "genre" ? null : "genre")
                }
              >
                <span className="text-gray-600">Genres</span>
              </button>
              {openDropdown === "genre" && (
                <div className="absolute bg-white z-10 w-full mt-2 rounded-lg shadow-lg">
                  <div className="p-1">
                    {Object.keys(GENRES).map((genre) => (
                      <button
                        key={GENRES[genre]}
                        className="w-full text-left px-3 py-1 hover:bg-gray-200 rounded-lg"
                        onClick={() => selectGenre(genre)}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleFilter}
            className="btn bg-sky-400 w-full sm:w-fit max-w-xs text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 512 512">
              <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
            </svg>
            Filter
          </button>
        </div>

        {/* tags */}
        {(type || selectedGenre.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <svg className="h-4 w-4" viewBox="0 0 512 512">
              <path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5L0 80C0 53.5 21.5 32 48 32l149.5 0c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
            </svg>

            {type && (
              <button
                className="btn bg-sky-400 btn-sm text-white rounded-full"
                onClick={() => removeType(type)}
              >
                {type}
              </button>
            )}

            {selectedGenre.map((genre) => (
              <button
                key={genre}
                className="btn bg-sky-400 btn-sm text-white rounded-full"
                onClick={() => removeGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        )}

        {/* no results */}
        {noResult && (
          <div className="flex jusitfy-center items-center min-h-[60vh]">
            <div className="max-w-xs mx-auto space-y-4">
              <svg
                className="h-16 w-16 mx-auto text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <h1 className="text-2xl font-bold">No Results Found</h1>
            </div>
          </div>
        )}

        {/* anime list */}
        {!noResult && isFiltered && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center my-6">
            <AnimeCards
              apiType="jikan"
              animeList={animeList.filter(
                (anime, index) =>
                  animeList.findIndex((a) => a.mal_id === anime.mal_id) ===
                  index
              )}
            />
          </div>
        )}

        {/* pagination */}
        {lastVisiblePage > 1 && (
          <div className="jion flex justify-center">
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
        )}
      </div>
    </div>
  );
}
