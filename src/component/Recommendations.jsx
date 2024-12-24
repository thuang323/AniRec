"use client";

import { useEffect, useState } from "react";
import AnimeCards from "./AnimeCards";
import { PulseLoader } from "react-spinners";

export default function Recommendations({ id, anime }) {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendAnime, setRecommendAnime] = useState([]);

  // only contains recommendations id
  const fetchRecommendations = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        synopsis: anime.synopsis,
        genres: anime.genres,
        popularity: anime.popularity,
        rank: anime.rank,
        score: anime.score,
        favorites: anime.favorites,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch recommendations");

    return response.json();
  };

  // get recommendations anime info
  const fetchAnimeDetails = async (recommendations) => {
    try {
      const animeDetail = recommendations.map(async (recommendation) => {
        const res = await fetch("/api/malGetAnime/" + recommendation, {
          method: "GET",
        });
        // console.log(res);
        if (!res.ok)
          throw new Error("Failed to fetch recommendation anime details");

        return res.json();
      });

      return await Promise.all(animeDetail);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    async function getRecommendations() {
      try {
        const data = await fetchRecommendations();
        console.log(data);
        setRecommendations(data);
        const recommend_anime = await fetchAnimeDetails(data);
        console.log(recommend_anime);
        setRecommendAnime(recommend_anime);
      } catch (error) {
        console.error(error.message);
        return [];
      }
    }

    getRecommendations();
  }, [id]);

  return (
    <div>
      {recommendAnime.length === 0 ? (
        <div className="flex justify-center items-center">
          <PulseLoader color="#080808" size={15} />
        </div>
      ) : (
        <div className="grid min-w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
          <AnimeCards apiType={"recommendation"} animeList={recommendAnime} />
        </div>
      )}
    </div>
  );
}
