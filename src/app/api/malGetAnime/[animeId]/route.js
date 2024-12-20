import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const animeId = (await params).animeId;
  const malBaseURL = "https://api.myanimelist.net/v2/";
  const queryParams = new URLSearchParams({
    fields: "id,title,main_picture,alternative_titles",
  }).toString();
  const token = process.env.NEXT_PUBLIC_MAL_TOKEN;

  try {
    const response = await fetch(
      `${malBaseURL}anime/${animeId}?${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from MyAnimeList" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data from MyAnimeList:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
