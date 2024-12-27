import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase/index";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const type = searchParams.get("type");

  if (!userId || !type || (type !== "favorites" && type !== "myList")) {
    return NextResponse.json({ error: "Bad Requests - check parameters" }, { status: 400 });
  }

  try {
    const userSnap = await getDoc(doc(db, "users", userId));

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnap.data();
    const lists = userData[type];
    return NextResponse.json({ [type]: lists }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
