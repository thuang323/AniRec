import Link from "next/link";
import { X } from "lucide-react";

export default function AnimeList({ animeList, onRemove }) {
  return (
    <>
      {animeList.map((anime) => (
        <div
          key={anime.id}
          className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-row"
        >
          {/* left content with image */}
          <div className="relative w-32 sm:w-48 h-44 sm:h-64 shrink-0 bg-gray-900">
            <Link href={`/anime/${anime.id}`} key={anime.id}>
              <img
                src={anime.images}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-3 px-3">
                <h3 className="text-white text-sm sm:text-base line-clamp-2">
                  {anime.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-0.5">
                  {anime.studios}
                </p>
              </div>
            </Link>
          </div>

          {/* right content */}
          <div className="flex-1 p-4 flex flex-col min-w-0">
            {/* season/year and delete button */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600 text-sm capitalize">
                {anime.season} {anime.year}
              </p>
              <button
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => onRemove(anime.id)}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {/* media type and episodes */}
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              {anime.type} • {anime.episodes} episodes
            </p>

            {/* synopsis */}
            <div className="flex-1 mb-3">
              <div className="h-16 sm:h-24 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {anime.synopsis}
                </p>
              </div>
            </div>

            {/* genres */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
              {anime.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
                >
                  {genre.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
