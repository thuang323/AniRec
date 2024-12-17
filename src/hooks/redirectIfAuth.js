"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export default function redirectIfAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });

    return () => unsubsribe();
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return user;
}
