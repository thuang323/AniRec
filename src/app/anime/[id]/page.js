"use client";

import React, { use, useState, useEffect } from "react";
import Navbar from "@/component/Navbar";
import { useRouter } from "next/navigation";
import { Star, Trophy, List, Heart, Trash2 } from "lucide-react";
import Recommendations from "@/component/Recommendations";
import redirectIfAuth from "@/hooks/redirectIfAuth";
import { PulseLoader } from "react-spinners";

async function getAnime(id) {
  const res = await fetch("https://api.jikan.moe/v4/anime/" + id);
  const animeInfo = await res.json();
  return animeInfo.data;
}

async function getListsStatus(userId, animeId) {
  try {
    const queryParams = new URLSearchParams({
      userId: userId,
      animeId: animeId,
    }).toString();

    const response = await fetch(`/api/lists/getListsStatus?${queryParams}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function removeFromList(userId, animeId, type, updateListStatus) {
  try {
    const body = {
      userId: userId,
      animeId: animeId,
      type: type,
    };

    const response = await fetch(`/api/lists/removeFromLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      const updatedStatus = await getListsStatus(userId, animeId);
      updateListStatus(updatedStatus);
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function addToList(userId, animeId, animeData, type, updateListStatus) {
  try {
    const body = {
      userId: userId,
      animeId: animeId,
      animeData: animeData,
      type: type,
    };

    const response = await fetch(`/api/lists/addToLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      const updatedStatus = await getListsStatus(userId, animeId);
      updateListStatus(updatedStatus);
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export default function AnimePage({ params }) {
  const { id } = use(params);
  const [anime, setAnime] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [listStatus, setListStatus] = useState(null);
  const [listButtonDisabled, setListButtonDisabled] = useState(false);
  const [favButtonDisabled, setFavButtonDisabled] = useState(false);
  const user = redirectIfAuth(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animeInfo = await getAnime(id);
        setAnime(animeInfo);

        const data = {
          id: animeInfo.mal_id,
          title: animeInfo.title_english || animeInfo.title,
          images: animeInfo.images.jpg.image_url,
          synopsis: animeInfo.synopsis,
          type: animeInfo.type,
          episodes: animeInfo.episodes,
          seasons: animeInfo.season,
          year: animeInfo.year,
          studios: animeInfo.studios?.[0]?.name || "",
          genres: animeInfo.genres.map((genre) => genre.name),
        };
        setAnimeData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    const fetchStatus = async () => {
      try {
        const status = await getListsStatus(user.uid, id);
        setListStatus(status);
        console.log(status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatus();
  }, [id, user]);

  const handleAddRemove = async (buttonType, listType) => {
    if (listType === "myList") {
      setListButtonDisabled(true);
    } else {
      setFavButtonDisabled(true);
    }

    if (buttonType === "add") {
      await addToList(user.uid, id, animeData, listType, setListStatus);
    } else {
      await removeFromList(user.uid, id, listType, setListStatus);
    }

    if (listType === "myList") {
      setTimeout(() => setListButtonDisabled(false), 1000);
    } else {
      setTimeout(() => setFavButtonDisabled(false), 1000);
    }
  };

  const handleRedirect = () => {
    router.push("/login");
  };

  if (!anime) {
    return (
      <div className="flex justify-center items-center">
        <PulseLoader color="#080808" size={15} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
          <div className="md:col-span-1 space-y-5">
            {/* image */}
            <div className="relative p-6 flex justify-center items-center">
              <div className="absolute inset-0 blur-lg">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="h-full w-full"
                />
              </div>
              <div className="relative">
                <div className="max-h-[500px] max-w-[350px]">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="h-full w-full rounded-lg border border-gray-200"
                  />
                </div>
              </div>
            </div>
            {/* buttons for list and favorites */}
            <div className="flex justify-center">
              {listStatus ? (
                <>
                  {listStatus.isMyList ? (
                    <button
                      onClick={() => handleAddRemove("remove", "myList")}
                      disabled={listButtonDisabled}
                      className="btn rounded-lg bg-red-400 hover:bg-red-700"
                    >
                      <Trash2 />
                      <span>- List</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddRemove("add", "myList")}
                      disabled={listButtonDisabled}
                      className="btn rounded-lg bg-sky-300 hover:bg-sky-500"
                    >
                      <List />
                      <span>+ List</span>
                    </button>
                  )}

                  {listStatus.isFavorites ? (
                    <button
                      onClick={() => handleAddRemove("remove", "favorites")}
                      disabled={favButtonDisabled}
                      className="btn rounded-lg bg-red-400 hover:bg-red-700"
                    >
                      <Trash2 />
                      <span>- Favorites</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddRemove("add", "favorites")}
                      disabled={favButtonDisabled}
                      className="btn rounded-lg bg-pink-400 hover:bg-pink-600"
                    >
                      <Heart />
                      <span>+ Favorites</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={handleRedirect}
                    className="btn rounded-lg bg-sky-300 hover:bg-sky-500"
                  >
                    <List />
                    <span>+ List</span>
                  </button>
                  <button
                    onClick={handleRedirect}
                    className="btn rounded-lg bg-pink-400 hover:bg-pink-600"
                  >
                    <Heart />
                    <span>+ Favorites</span>
                  </button>
                </>
              )}
            </div>
            {/* anime info */}
            <div className="bg-white p-3 rounded-lg mx-6 text-sm shadow-lg">
              <p>
                <strong>Status:</strong> {anime.status}
              </p>
              <p>
                <strong>Type:</strong> {anime.type}
              </p>
              <p>
                <strong>Episodes:</strong> {anime.episodes}
              </p>
              <p>
                <strong>Duration:</strong> {anime.duration}
              </p>
              <p>
                <strong>Year:</strong> {anime.year}
              </p>
              <p>
                <strong>Season:</strong> {anime.season}
              </p>
              <p>
                <strong>Source:</strong> {anime.source}
              </p>
              <p>
                <strong>Rating:</strong> {anime.rating}
              </p>
              <p>
                <strong>Alternative names:</strong> {anime.title_japanese}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 p-6 space-y-2">
            {/* title, category, and score */}
            <div className="bg-white p-4 rounded-lg items-center sm:items-start flex flex-col space-y-3 shadow-lg">
              <h1 className="font-bold text-2xl">
                {anime.title_english || anime.title}
              </h1>
              <div className="space-x-1">
                {anime.genres.map((genre) => (
                  <button key={genre.mal_id} className="btn btn-xs">
                    {genre.name}
                  </button>
                ))}
              </div>
              <div className="inline-flex gap-6">
                <div className="flex gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-500">Score:</span>
                  <span className="font-bold">
                    {anime.score || <span>N/A</span>}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Trophy className="text-blue-500" />
                  <span className="text-gray-500">Rank:</span>
                  <span className="font-bold">
                    {anime.rank ? <span>#{anime.rank}</span> : <span>N/A</span>}
                  </span>
                </div>
              </div>
            </div>
            {/* synopsis */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-3">Synopsis</h2>
              <p className="text-gray-600">{anime.synopsis}</p>
            </div>
            {/* embedded youtube video for trailer */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-3">Trailer</h2>
              <iframe
                src={anime.trailer.embed_url}
                className="w-full aspect-video"
                allowFullScreen
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </div>
        </div>
        {/* recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-lg m-6">
          <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
          <Recommendations id={id} anime={anime} />
        </div>
      </div>
    </div>
  );
}
