import { NextResponse } from "next/server";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "firebase/index";

export async function POST(req) {
  const body = await req.json();
  const { userId, animeId, type } = body;

  if (!userId || !animeId || !type || (type !== "favorites" && type !== "myList")) {
    return NextResponse.json({ error: "Bad Requests - check parameters" }, { status: 400 });
  }

  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, {
      [`${type}.${animeId}`]: deleteField(),
    });
    
    return NextResponse.json({ "message": "Anime removed from list" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

