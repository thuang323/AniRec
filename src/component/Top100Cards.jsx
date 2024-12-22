import Link from "next/link";
import { isGenre, removeUnderscore } from "../utils/utils";

export default function Top100Cards({ animeList }) {
  return (
    <div className="space-y-4">
      {animeList.map((anime) => (
        <div
          key={anime.node.id}
          className="flex items-stretch p-4"
        >
          {/* Rank Number */}
          <div className="w-20 flex-shrink-0 flex justify-center items-center">
            <h1 className="font-bold text-4xl text-gray-400">
              #{anime.ranking.rank}
            </h1>
          </div>
          {/* Main Content Container */}
          <div className="bg-white w-full flex flex-col md:flex-row justify-between rounded-lg">
            {/* Left Side Content */}
            <div className="flex items-center flex-grow min-w-0">
              {/* Image */}
              <Link href={`/anime/${anime.node.id}`} className="flex-shrink-0">
                <div className="flex items-center gap-4 ml-4">
                  <div className="aspect-[3/4] h-32 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={anime.node.main_picture.medium}
                      alt={anime.node.title}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                </div>
              </Link>
              {/* Title and Genres */}
              <div className="flex flex-col justify-center ml-4 md:ml-6 min-w-0 flex-grow">
                <Link
                  href={`/anime/${anime.node.id}`}
                  className="text-base font-semibold line-clamp-2 hover:line-clamp-none text-gray-800 hover:text-rose-600 transition-colors duration-200"
                >
                  {anime.node.alternative_titles?.en || anime.node.title}
                </Link>
                <div className="mt-3 hidden sm:block">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {anime.node.genres.map(
                      (genre) =>
                        isGenre(genre.name) && (
                          <button
                            key={genre.id}
                            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-rose-100 hover:text-rose-700 transition-all duration-200 truncate"
                          >
                            {genre.name}
                          </button>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Side Info - Fixed Width Containers */}
            <div className="flex flex-shrink-0 overflow-hidden text-center divide-x divide-gray-100 capitalize truncate text-sm mt-4 md:mt-0">
              {/* Media Type and Episodes - Fixed Width */}
              <div className="flex flex-col p-4 w-32 md:w-36 justify-center space-y-3">
                <div className="px-3 py-1 bg-rose-50 rounded-lg w-full">
                  <p className="font-semibold text-rose-700">
                    {removeUnderscore(anime.node.media_type)}
                  </p>
                </div>
                <div className="px-3 py-1 bg-blue-50 rounded-lg w-full">
                  <p className="text-blue-700">
                    {anime.node.num_episodes} episodes
                  </p>
                </div>
              </div>
              {/* Season and Year - Fixed Width */}
              <div className="flex flex-col p-4 w-32 md:w-36 justify-center space-y-3">
                <div className="px-3 py-1 bg-purple-50 rounded-lg w-full">
                  <p className="font-semibold text-purple-700">
                    {anime.node.start_season.season} {anime.node.start_season.year}
                  </p>
                </div>
                <div className="px-3 py-1 bg-emerald-50 rounded-lg w-full">
                  <p className="text-emerald-700">
                    {removeUnderscore(anime.node.status)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
