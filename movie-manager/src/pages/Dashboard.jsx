/**
 * Dashboard — Full movie management experience for logged-in users.
 *
 * This is the mini-project-04 functionality restored as a page in the new React Router structure.
 */
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom hooks
import useMovieData from "../hooks/useFetchMovies";
import useMovieInteractions from "../hooks/useMovieInteractions";
import useMovieFilters from "../hooks/useMovieFilters";

// Components
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import MovieList from "../components/MovieList";
import BodyPiece from "../components/Body";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { movies, isLoading, error } = useMovieData();
  const {
    watchlist,
    liked,
    disliked,
    toggleWatchlist,
    toggleLike,
    toggleDislike,
  } = useMovieInteractions();
  const {
    sortedMovies,
    genres,
    ageGroups,
    years,
    filterGenre,
    setFilterGenre,
    filterAgeGroup,
    setFilterAgeGroup,
    filterYear,
    setFilterYear,
    sortBy,
    setSortBy,
  } = useMovieFilters(movies);

  const [sidebarView, setSidebarView] = useState(null);

  function handleSidebarToggle(view) {
    setSidebarView((prev) => (prev === view ? null : view));
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 gap-4">
        <span className="loading loading-bars loading-lg text-[#be9859]"></span>
        <p className="text-lg font-semibold animate-pulse">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="alert alert-error max-w-md shadow-lg">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header + Navbar with Watchlist/Likes toggle buttons */}
      <Header
        sidebarView={sidebarView}
        onSidebarToggle={handleSidebarToggle}
      />

      <div className="flex flex-1">
        <main className="flex-1 px-6 py-4">
          {/* Filter and sort controls (genre, age group, year, sort) */}
          <FilterBar
            genres={genres}
            ageGroups={ageGroups}
            years={years}
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
            filterAgeGroup={filterAgeGroup}
            setFilterAgeGroup={setFilterAgeGroup}
            filterYear={filterYear}
            setFilterYear={setFilterYear}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Movie card grid with full like/dislike/watchlist functionality */}
          <MovieList
            movies={sortedMovies}
            watchlist={watchlist}
            liked={liked}
            disliked={disliked}
            onToggleWatchlist={toggleWatchlist}
            onToggleLike={toggleLike}
            onToggleDislike={toggleDislike}
          />
        </main>

        {sidebarView && (
          <BodyPiece
            sidebarView={sidebarView}
            watchlist={watchlist}
            liked={liked}
            onRemoveWatchlist={toggleWatchlist}
            onRemoveLike={toggleLike}
            movies={movies}
          />
        )}
      </div>
      {/* Footer */}
      <Footer />
      {/* Toast notifications */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}