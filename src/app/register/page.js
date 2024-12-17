"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import redirectIfAuth from "@/hooks/redirectIfAuth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  redirectIfAuth(); // redirect to home page if user already logged in

  const handleRegister = async (e) => {
    e.preventDefault();

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
      <div className="navbar bg-base-100">
        <a href="/" className="btn btn-ghost text-2xl">
          AniRec
        </a>
      </div>
      <div className="flex justify-center h-full items-center">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 space-y-4 rounded-lg max-w-md w-full shadow"
        >
          <h1 className="text-2xl text-center font-bold">Sign up</h1>
          <div className="mt-8 flex flex-col">
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="border mt-2 px-4 py-2 rounded-md"
            />
          </div>
          <div className="mt-8 flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="border mt-2 px-4 py-2 rounded-md"
            />
          </div>
          <div className="mt-8 flex flex-col">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="border mt-2 px-4 py-2 rounded-md"
            />
          </div>
          {/* <div className="mt-8 flex flex-col">
            <input
              type="password"
              placeholder="Confirm password"
              required
              className="border mt-2 px-4 py-2 rounded-md"
            />
          </div> */}

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
            <span className="mx-3 font-bold">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* <button className="bg-slate-800 w-full p-4 inline-flex justify-center space-x-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span className="text-white">Continue with Google</span>
          </button> */}
        </form>
      </div>
    </div>
  );
}
