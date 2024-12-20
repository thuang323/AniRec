"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "./ErrorMessage";
import AnimeGrid from "./AnimeGrid";

export default function AllTimePopular() {
  const [allTimePopularAnime, setAllTimePopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAllTimePopularAnime = async () => {
    const baseURL = "https://api.jikan.moe/v4/";
    const params = {
      filter: "bypopularity",
      page: 1,
      limit: 6,
      sfw: "",
    };

    const queryParams = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`${baseURL}top/anime?${queryParams}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log(data.data);
      setAllTimePopularAnime(data.data);
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTimePopularAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#080808" size={15} />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage category="all time popular anime" />;
  }

  return (
    <AnimeGrid
      title="All Time Popular"
      animeList={allTimePopularAnime}
      viewMoreHref={"youtube.com"}
    />
  );
}
