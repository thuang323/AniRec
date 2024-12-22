import Link from "next/link";
import AnimeCards from "./AnimeCards";

export default function HomePageAnimeGrid({ apiType, title, animeList, viewMoreHref }) {
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
        <AnimeCards apiType={apiType} animeList={animeList} />
      </div>
    </div>
  );
}
