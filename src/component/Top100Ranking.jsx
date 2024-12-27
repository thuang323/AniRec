"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import Top100Cards from "./Top100Cards";
import HomePageAnimeGrid from "./HomePageAnimeGrid";

export default function Top100Ranking() {
  const [top100Anime, setTop100Anime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTop100Anime = async () => {
    try {
      const response = await fetch("/api/malTop100", {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log(data.data);

      setTop100Anime(data.data);
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTop100Anime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#080808" size={15} />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage category="top 100 anime" />;
  }

  return (
    <div>
      {/* Render this component on medium screens or larger */}
      <div className="hidden md:block">
        <div className="w-full max-w-screen mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Top 100 Anime</h2>
            <Link
              href="topHundred"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-900 transition-colors text-sm font-bold"
            >
              view more
            </Link>
          </div>
          <Top100Cards animeList={top100Anime} />
        </div>
      </div>

      {/* Render this component on small screens or smaller */}
      <div className="block md:hidden">
        <HomePageAnimeGrid
          apiType="mal"
          title="Top 100 Anime"
          animeList={top100Anime}
          viewMoreHref={"topHundred"}
        />
      </div>
    </div>
  );
}
