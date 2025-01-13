"use client";

import redirectIfAuth from "@/hooks/redirectIfAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import GoogleSign from "@/component/GoogleSign";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  redirectIfAuth(); // redirect if user already logged in

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User data: ", userDoc.data());
      } else {
        console.log("No user data found!");
      }
      router.push("/");
      toast.success("Login successfully");
    } catch (error) {
      // console.error("Invalid email or password: ", error.message);
      toast.error("Invalid email or password");
    }
  };
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div className="navbar bg-black text-white">
        <a href="/" className="btn btn-ghost hover:bg-gray-800 text-2xl">
          AniRec
        </a>
      </div>
      <div className="flex flex-col justify-center h-full items-center space-y-8">
        <h1 className="text-3xl font-bold">Welcome to AniRec</h1>
        <div className="bg-white p-8 space-y-4 rounded-lg max-w-md w-full shadow">
          <form onSubmit={handleLogin} className="space-y-4">
            <h1 className="text-2xl text-center font-bold">Sign in</h1>
            <label className="input input-bordered flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="h-5 w-5 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-slate-800 w-full p-2 text-white rounded-md"
            >
              Sign in
            </button>

            <p className="text-center">
              Dont have an account?{" "}
              <a
                href="/register"
                className="text-blue-500 font-bold hover:underline"
              >
                Create new account
              </a>
            </p>

            {/* horizontal with text */}
            <div className="flex items-center mx-auto my-8">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 font-bold">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </form>
          <GoogleSign />
        </div>
      </div>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        pauseOnHover={false}
        closeOnClick={true}
        draggable
        newestOnTop
      />
    </div>
  );
}
