import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebase/index";

export async function POST(req) {
  const body = await req.json();
  const { userId, animeId, animeData, type } = body;

  if (!userId || !animeId || !animeData || !type || (type !== "favorites" && type !== "myList")) {
    return NextResponse.json({ error: "Bad Requests - check parameters" }, { status: 400 });
  }

  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, {
      [`${type}.${animeId}`]: animeData,
    });
    
    return NextResponse.json({ "message": "Anime added to list" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
