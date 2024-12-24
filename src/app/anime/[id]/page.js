import React from "react";
import Navbar from "@/component/Navbar";
import { Star, Trophy, List, Heart, Trash2 } from "lucide-react";
import Recommendations from "@/component/Recommendations";

async function getAnime(id) {
  const res = await fetch("https://api.jikan.moe/v4/anime/" + id);
  const animeInfo = await res.json();
  return animeInfo.data;
}

export default async function AnimePage({ params }) {
  const { id } = await params;
  const anime = await getAnime(id);

  if (!anime) {
    return <div>Loading...</div>;
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
              <button className="btn rounded-lg bg-sky-300 hover:bg-sky-500">
                <List />
                <span>+ List</span>
              </button>

              <button className="btn rounded-lg bg-pink-400 hover:bg-pink-600">
                <Heart />
                <span>+ Favorites</span>
              </button>
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
