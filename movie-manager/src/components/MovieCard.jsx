
import React, { useRef } from "react";
import { FaThumbsUp, FaThumbsDown, FaHeart, FaRegHeart } from "react-icons/fa";

function MovieCard({
  movie,
  isWatchlisted,
  isLiked,
  isDisliked,
  onToggleWatchlist,
  onToggleLike,
  onToggleDislike,
}) {
  const audioYesRef = useRef(null);
  const audioNoRef = useRef(null);

  const handleLikeClick = (title) => {
    onToggleLike(title);
    // play sound yes
    if (audioYesRef.current) {
      audioYesRef.current.currentTime = 0;
      audioYesRef.current.play();
    }
  };

  const handleDislikeClick = (title) => {
    onToggleDislike(title);
    // play sound no
    if (audioNoRef.current) {
      audioNoRef.current.currentTime = 0;
      audioNoRef.current.play();
    }
  };
  return (
    // border-[#be9859] = gold card frame
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-[#be9859]">
      <div className="card-body p-5">
        {/* Header row: title + watchlist heart */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title text-lg leading-tight">{movie.title}</h2>
          <button
            className="btn btn-ghost btn-sm text-lg shrink-0"
            onClick={() => onToggleWatchlist(movie.title)}
            aria-label={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
            title={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
          >
            {/* text-[#7f2d31] = dark red when watchlisted */}
            {isWatchlisted ? (
              <FaHeart className="text-[#7f2d31]" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mt-1">
          {/* bg-[#7f2d31] = dark red genre badge */}
          <span className="badge bg-[#7f2d31] text-white">{movie.genre}</span>
          <span className="badge badge-outline">{movie.age_group}</span>
          <span className="badge badge-outline">{movie.releasing_year}</span>
          <span className="badge badge-ghost">{movie.runtime}</span>
        </div>

        {/* Short description */}
        <p className="text-sm text-base-content/70 mt-2">
          {movie.short_description}
        </p>

        {/* Movie details */}
        <div className="text-xs text-base-content/50 mt-1 space-y-0.5">
          <p>
            <span className="font-semibold">Director:</span> {movie.director}
          </p>
          <p>
            <span className="font-semibold">Language:</span> {movie.language}
          </p>
          <p>
            <span className="font-semibold">Budget:</span> {movie.budget}
          </p>
        </div>

        {/* Footer row: IMDb rating + like/dislike buttons */}
        <div className="card-actions items-center justify-between mt-3 pt-3 border-t border-base-300">
          {/* IMDb Rating — text-[#be9859] = gold star */}
          <div className="flex items-center gap-1">
            <span className="text-[#be9859] font-bold text-sm">★</span>
            <span className="font-semibold text-sm">{movie.imdb_rating}</span>
            <span className="text-xs text-base-content/50">IMDb</span>
          </div>

          {/* Like / Dislike buttons */}
          <div className="flex gap-1">
            {/* btn-success (green) when liked, btn-ghost when not */}
            <button
              className={`btn btn-sm ${isLiked ? "btn-success" : "btn-ghost"}`}
              onClick={() => handleLikeClick(movie.title)}
              aria-label={isLiked ? "Remove like" : "Like"}
              title={isLiked ? "Remove like" : "Like"}
            >
              <FaThumbsUp />
            </button>
            <button
              className={`btn btn-sm ${isDisliked ? "bg-[#7f2d31] text-white" : "btn-ghost"}`}
              onClick={() => handleDislikeClick(movie.title)}
              aria-label={isDisliked ? "Remove dislike" : "Dislike"}
              title={isDisliked ? "Remove dislike" : "Dislike"}
            >
              <FaThumbsDown />
            {/* bg-[#7f2d31] = dark red when disliked, btn-ghost when not */}
            </button>

            {/* audio for yes */}
            <audio
              ref={audioYesRef}
              src="/yes.mp3"
              onEnded={() => { audioYesRef.current.currentTime = 0; }}
              style={{ display: "none" }}
            />
            {/* audio for no */}
            <audio
              ref={audioNoRef}
              src="/no.mp3"
              onEnded={() => { audioNoRef.current.currentTime = 0; }}
              style={{ display: "none" }}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;