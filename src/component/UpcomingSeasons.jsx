"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "./ErrorMessage";
import HomePageAnimeGrid from "./HomePageAnimeGrid";

export default function UpcomingSeasons() {
  const [upcomingSeasonsAnime, setUpcomingSeasonsAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUpcomingSeasonsAnime = async () => {
    try {
      const response = await fetch("/api/malUpcoming", {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log(data.data);

      setUpcomingSeasonsAnime(data.data)
      // fetch details for each anime
      // fetchAnimeDetails(data.data);
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // const fetchAnimeDetails = async (animeList) => {
  //   try {
  //     const detailsPromises = animeList.map(async (anime) => {
  //       const response = await fetch(`/api/malGetAnime/${anime.node.id}`, {
  //         method: "GET",
  //       });
  //       if (!response.ok) throw new Error("Failed to fetch anime details");
  //
  //       const data = await response.json();
  //       return data;
  //     });
  //
  //     const details = await Promise.all(detailsPromises);
  //     console.log(details);
  //     setUpcomingSeasonsAnime(details);
  //   } catch (error) {
  //     console.log("Error fetching anime details:", error);
  //   }
  // };

  useEffect(() => {
    fetchUpcomingSeasonsAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#080808" size={15} />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage category="upcoming seasons anime" />;
  }

  return (
    <HomePageAnimeGrid
      apiType="mal"
      title="Upcoming Seasons"
      animeList={upcomingSeasonsAnime
        .filter(
          (anime, index) =>
            upcomingSeasonsAnime.findIndex((a) => a.node.id === anime.node.id) ===
            index,
        )
        .slice(0, 6)}
      viewMoreHref={"upcomingSeasons"}
    />
  );
}
