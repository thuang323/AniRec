"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "./ErrorMessage";
import HomePageAnimeGrid from "./HomePageAnimeGrid";

export default function PopularThisSeason() {
  const [popularSeasonAnime, setPopularSeasonAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPopularSeasonAnime = async () => {
    const baseURL = "https://api.jikan.moe/v4/";
    const params = {
      filter: "tv",
      page: 1,
      limit: 10,
      sfw: "",
    };

    const queryParams = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`${baseURL}seasons/now?${queryParams}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log(data.data);
      setPopularSeasonAnime(data.data);
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularSeasonAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#080808" size={15} />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage category="popular this season anime" />;
  }

  return (
    <HomePageAnimeGrid
      apiType="jikan"
      title="Popular This Season"
      animeList={popularSeasonAnime
        .filter(
          (anime, index) =>
            popularSeasonAnime.findIndex((a) => a.mal_id === anime.mal_id) ===
            index,
        )
        .slice(0, 6)}
      viewMoreHref={"popularSeason"}
    />
  );
}
