"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/component/ProtectedRoute";
import Navbar from "@/component/Navbar";
import AnimeList from "@/component/AnimeList";
import redirectIfAuth from "@/hooks/redirectIfAuth";

export default function MyList() {
  const user = redirectIfAuth(false);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    if (!user) return;

    const queryParams = new URLSearchParams({
      userId: user.uid,
      type: "myList",
    }).toString();

    const fetchAnimeList = async () => {
      try {
        const response = await fetch(`/api/lists/getAllLists?${queryParams}`, {
          method: "GET",
        });
        const data = await response.json();
        setAnimeList(Object.values(data.myList));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimeList();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="min-w-fit min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimeList listType="list" animeList={animeList} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// const animeList = {
//   54857: {
//     id: 54857,
//     title: "Re:ZERO -Starting Life in Another World- Season 3",
//     images: "https://cdn.myanimelist.net/images/anime/1706/144725.jpg",
//     synopsis:
//       "One year after the events at the Sanctuary, Subaru Natsuki trains hard to better face future challenges. The peaceful days come to an end when Emilia receives an invitation to a meeting in the Watergate City of Priestella from none other than Anastasia Hoshin, one of her rivals in the royal selection. Considering the meeting's significance and the potential dangers Emilia could face, Subaru and his friends accompany her.\n\nHowever, as Subaru reconnects with old associates and companions in Priestella, new formidable foes emerge. Driven by fanatical motivations and engaging in ruthless methods to achieve their ambitions, the new enemy targets Emilia and threaten the very existence of the city. Rallying his allies, Subaru must give his all once more to stop their and nefarious goals from becoming a concrete reality.\n\n[Written by MAL Rewrite]",
//     type: "TV",
//     episodes: 16,
//     season: "fall",
//     year: 2024,
//     studios: "White Fox",
//     genres: ["Drama", "Fantasy", "Suspense"],
//   },
//   52299: {
//     id: 52299,
//     title: "Solo Leveling",
//     images: "https://cdn.myanimelist.net/images/anime/1801/142390.jpg",
//     synopsis:
//       "Humanity was caught at a precipice a decade ago when the first gates—portals linked with other dimensions that harbor monsters immune to conventional weaponry—emerged around the world. Alongside the appearance of the gates, various humans were transformed into hunters and bestowed superhuman abilities. Responsible for entering the gates and clearing the dungeons within, many hunters chose to form guilds to secure their livelihoods.\n\nSung Jin-Woo is an E-rank hunter dubbed as the weakest hunter of all mankind. While exploring a supposedly safe dungeon, he and his party encounter an unusual tunnel leading to a deeper area. Enticed by the prospect of treasure, the group presses forward, only to be confronted with horrors beyond their imagination. Miraculously, Jin-Woo survives the incident and soon finds that he now has access to an interface visible only to him. This mysterious system promises him the power he has long dreamed of—but everything comes at a price.\n\n[Written by MAL Rewrite]",
//     type: "TV",
//     episodes: 12,
//     season: "winter",
//     year: 2024,
//     studios: "A-1 Pictures",
//     genres: ["Action", "Adventure", "Fantasy"],
//   },
//   55888: {
//     id: 55888,
//     title: "Mushoku Tensei: Jobless Reincarnation Season 2 Part 2",
//     images: "https://cdn.myanimelist.net/images/anime/1876/141251.jpg",
//     synopsis:
//       "Following the faceless god Hitogami's advice seems to have worked wonders for Rudeus Greyrat. After enrolling into the University of Magic as he was told, Rudeus reunites with his childhood friend Sylphiette, who put a valiant effort into curing his condition. The two grow ever closer together and decide to host a wedding party, inviting the friends they have made over the years to announce and formalize their relationship.\n\nFor all his recent blessings, however, Rudeus' troubles are far from over. The research he is helping Shizuka Nanahoshi conduct hits a bottleneck, sending her into a deep slump much like he experienced in his previous life. Furthermore, a letter from his father, Paul, brings complications to Rudeus' relationships, and Sylphiette still knows next to nothing about his real background. In the face of these issues, Rudeus will have to apply the lessons he has learned in this new world to navigate through the challenges that come with living a life to its fullest.\n\n[Written by MAL Rewrite]",
//     type: "TV",
//     episodes: 12,
//     season: "spring",
//     year: 2024,
//     studios: "Studio Bind",
//     genres: ["Adventure", "Drama", "Fantasy"],
//   },
// }
// const animeArray = Object.values(animeList);
// console.log(animeArray);
