import SeasonsAllTimeTop100 from "@/component/SeasonsAllTimeTop100";

export default function topHundredPage() {
  const baseURL = "https://api.jikan.moe/v4/top/anime?sfw";
  return <SeasonsAllTimeTop100 baseURL={baseURL} query="type" category="Top" />;
}
