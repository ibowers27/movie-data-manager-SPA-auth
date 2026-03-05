import React from "react";
import { FaThumbsUp, FaHeart } from "react-icons/fa";
import Authenticator from "./Authenticator.jsx";

export default function Navbar({ sidebarView, onSidebarToggle, isGuest }) {
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-lg">
      <div className="flex-none flex items-center mr-4">
        <div className="btn btn-circle btn-ghost h-16 w-16 flex items-center justify-center">
          <img src="/movie-manager-icon.png" alt="Logo" className="h-11 w-11 object-contain" />
        </div>
        <span className="text-4xl ml-2 font-semibold font-['Abril_Fatface',serif] text-[#be9859]">
          Golden Reel
        </span>
      </div>

      <div className="flex-1" />

      {/* Only show Watchlist/Likes for logged-in users */}
      {!isGuest && (
        <>
          <button
            className={`btn mr-2 gap-2 ${sidebarView === "watchlist" ? "bg-[#be9859] text-white" : "btn-ghost"}`}
            onClick={() => onSidebarToggle("watchlist")}
          >
            Watchlist <FaHeart />
          </button>
          <button
            className={`btn mr-2 gap-2 ${sidebarView === "liked" ? "bg-[#be9859] text-white" : "btn-ghost"}`}
            onClick={() => onSidebarToggle("liked")}
          >
            Likes <FaThumbsUp />
          </button>
        </>
      )}
      <Authenticator />
    </div>
  );
}