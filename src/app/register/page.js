"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import redirectIfAuth from "@/hooks/redirectIfAuth";
import GoogleSign from "@/component/GoogleSign";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  redirectIfAuth(); // redirect to home page if user already logged in

  const handleRegister = async (e) => {
    setError("");
    e.preventDefault();

    // check if password and confirm password are matched
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });
      console.log("User registered successfully!");
      router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="navbar bg-black text-white">
        <a href="/" className="btn btn-ghost hover:bg-gray-800 text-2xl">
          AniRec
        </a>
      </div>
      <div className="flex justify-center h-full items-center">
        <div className="bg-white p-8 space-y-4 rounded-lg max-w-md w-full shadow">
          <form onSubmit={handleRegister} className="space-y-4">
            <h1 className="text-2xl text-center font-bold">Sign up</h1>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="h-5 w-5 opacity-70"
              >
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
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="h-4 w-4 opacity-70"
              >
                <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </label>

            <label
              className={`input input-bordered flex items-center gap-2 ${
                error ? "input-error" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="h-4 w-4 opacity-70"
              >
                <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
              </svg>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </label>
            {error && (
              <p className="text-red-500 inline-flex">
                <svg
                  className="h-4 w-4 fill-red-500 m-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-slate-800 w-full p-2 text-white rounded-md"
            >
              Register
            </button>

            <p className="text-center ">
              Already have an Account?{" "}
              <a
                href="/login"
                className="text-blue-500 font-bold hover:underline"
              >
                Login
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
    </div>
  );
}
