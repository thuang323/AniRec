"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ProtectedRoute from "@/component/ProtectedRoute";
import Navbar from "@/component/Navbar";
import AnimeList from "@/component/AnimeList";
import redirectIfAuth from "@/hooks/redirectIfAuth";

export default function Favorites() {
  const user = redirectIfAuth(false);
  const [animeList, setAnimeList] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user) return;

    const queryParams = new URLSearchParams({
      userId: user.uid,
      type: "favorites",
    }).toString();

    const fetchAnimeList = async () => {
      try {
        const response = await fetch(`/api/lists/getAllLists?${queryParams}`, {
          method: "GET",
        });
        const data = await response.json();
        setAnimeList(Object.values(data.favorites));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimeList();
  }, [user]);

  const handleAnimeRemove = async (animeId) => {
    try {
      const body = {
        userId: user.uid,
        animeId: animeId,
        type: "favorites",
      };

      const response = await fetch("/api/lists/removeFromLists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setAnimeList((prevList) =>
          prevList.filter((anime) => anime.id !== animeId),
        );
      } else {
        console.log("Failed to remove anime from list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-w-fit min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
          {showContent ? (
            animeList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimeList animeList={animeList} onRemove={handleAnimeRemove} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Your Favorites List is Empty
                </h2>
                <p className="text-gray-600 text-center mb-4">
                  Start building your personalized collection by exploring and
                  adding your favorite anime series!
                </p>
                <a
                  href="/"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Discover Anime
                </a>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center h-screen">
              <PulseLoader color="#080808" size={15} />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
