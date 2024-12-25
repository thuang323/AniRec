import SeasonsAllTimeTop100 from "@/component/SeasonsAllTimeTop100";

export default function allTimePopularPage() {
  const baseURL = "https://api.jikan.moe/v4/top/anime?sfw&filter=bypopularity";
  return (
    <SeasonsAllTimeTop100
      baseURL={baseURL}
      query="type"
      category="All Time Popular"
    />
  );
}
