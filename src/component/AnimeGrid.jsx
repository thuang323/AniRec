import React from "react";
import Link from "next/link";

export default function AnimeGrid({ title, animeList, viewMoreHref }) {
  return (
    <div className="w-full max-w-screen mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <Link
          href={viewMoreHref}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-900 transition-colors text-sm font-bold"
        >
          view more
        </Link>
      </div>
      <div className="grid min-w-full grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 justify-items-center">
        {animeList.map((anime) => (
          <Link
            href={`/anime/${anime.mal_id}`}
            key={anime.mal_id}
            className="w-full max-w-[200px] bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="object-cover w-full h-full hover:opacity-90 transition-opacity"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-center line-clamp-2 hover:line-clamp-none">
                {anime.title_english != null
                  ? anime.title_english
                  : anime.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
