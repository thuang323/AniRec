import AllTimePopular from "@/component/AllTimePopular";
import Navbar from "@/component/Navbar";
import TopAiring from "@/component/TopAiring";
import UpcomingSeasons from "@/component/UpcomingSeasons";
import PopularThisSeason from "@/component/PopularThisSeason";
import Top100Ranking from "@/component/Top100Ranking";

export default function Home() {
  return (
    <div className="min-w-fit min-h-screen bg-gray-100">
      <Navbar />
      <div className="xl:mx-36 lg:mx-24">
        <TopAiring />
        <PopularThisSeason />
        <UpcomingSeasons />
        <AllTimePopular />
        <Top100Ranking />
      </div>
    </div>
  );
}
