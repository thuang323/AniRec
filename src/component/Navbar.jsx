"use client";

import redirectIfAuth from "@/hooks/redirectIfAuth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

export default function Navbar() {
  const router = useRouter();
  const user = redirectIfAuth(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
      console.log("Logout successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar text-white bg-black">
      <div className="dropdown md:hidden z-50">
        <label
          tabIndex={0}
          className="btn btn-square btn-ghost hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 p-2 shadow-lg rounded-lg w-52 bg-black"
        >
          <li>
            <a>Genres</a>
          </li>
          <li>
            <a href="/myList">My List</a>
          </li>
          <li>
            <a href="/favorites">Favorites</a>
          </li>
        </ul>
      </div>

      <div className="flex-auto">
        <a href="/" className="btn btn-ghost hover:bg-gray-800 text-2xl">
          AniRec
        </a>
      </div>
      <div className="hidden md:flex md:flex-1">
        <a className="btn btn-ghost hover:bg-gray-800 text-lg">Genres</a>
        <a href="/myList" className="btn btn-ghost hover:bg-gray-800 text-lg">My List</a>
        <a href="/favorites" className="btn btn-ghost hover:bg-gray-800 text-lg">Favorites</a>
      </div>

      <label className="input input-bordered flex items-center gap-2 mr-1">
        <input type="text" className="text-gray-600" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="h-5 w-5 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {user ? (
        <button
          onClick={handleLogout}
          className="btn btn-ghost hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-5 w-5"
          >
            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
          </svg>
          <span>Logout</span>
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="btn btn-ghost hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <span>Login</span>
        </button>
      )}
    </div>
  );
}
