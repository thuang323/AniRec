import Link from "next/link";

export default function AnimeCard({ apiType, animeList }) {
  return apiType != "mal"
    ? animeList.map((anime) => (
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
            {anime.title_english != null ? anime.title_english : anime.title}
          </h3>
        </div>
      </Link>
    ))
    : animeList.map((anime) => (
      <Link
        href={`/anime/${anime.id}`}
        key={anime.id}
        className="w-full max-w-[200px] bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={anime.main_picture.medium}
            alt={anime.title}
            className="object-cover w-full h-full hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-center line-clamp-2 hover:line-clamp-none">
            {anime.alternative_titles?.en ?? anime.title}
          </h3>
        </div>
      </Link>
    ));
}
