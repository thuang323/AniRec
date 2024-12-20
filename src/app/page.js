import AllTimePopular from "@/component/AllTimePopular";
import Navbar from "@/component/Navbar";
import TopAiring from "@/component/TopAiring";
import UpcomingSeasons from "@/component/UpcomingSeasons";
import PopularThisSeason from "@/component/PopularThisSeason";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="xl:mx-36 lg:mx-24">
        <TopAiring />
        <PopularThisSeason />
        <UpcomingSeasons />
        <AllTimePopular />
      </div>
    </div>
  );
}
