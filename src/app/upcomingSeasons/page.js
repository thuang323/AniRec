"use client";

import SeasonsAllTimeTop100 from "@/component/SeasonsAllTimeTop100";

export default function UpcomingSeasonsPage() {
  const baseURL = "https://api.jikan.moe/v4/seasons/upcoming?sfw";

  return (
    <SeasonsAllTimeTop100
      baseURL={baseURL}
      query="filter"
      category="Upcoming Seasons"
    />
  );
}
