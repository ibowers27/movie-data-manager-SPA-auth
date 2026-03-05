import MovieCard from "./MovieCard";

function MovieList({
  movies,
  watchlist,
  liked,
  disliked,
  onToggleWatchlist,
  onToggleLike,
  onToggleDislike,
}) {
  // Empty state — shown when filters produce no results
  if (movies.length === 0) {
    return (
      <div className="alert alert-warning my-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54
               0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464
               0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>No movies found for the selected filters. Try a different combination!</span>
      </div>
    );
  }

  // Movie grid — max 3 columns to leave room for sidebar
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          isWatchlisted={watchlist.includes(movie.title)}
          isLiked={liked.includes(movie.title)}
          isDisliked={disliked.includes(movie.title)}
          onToggleWatchlist={onToggleWatchlist}
          onToggleLike={onToggleLike}
          onToggleDislike={onToggleDislike}
        />
      ))}
    </div>
  );
}

export default MovieList;