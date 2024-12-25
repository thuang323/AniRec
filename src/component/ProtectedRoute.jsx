"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // if no user logged in, redirect them to the login page
      if (!user) {
        router.replace("/login");
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // render nothing when checking for authentication
  if (isLoading) return null;

  // render only when user is authenticated
  return children;
}

