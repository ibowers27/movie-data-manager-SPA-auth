import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// Custom hooks
import useMovieData from "./hooks/useFetchMovies";
import useMovieInteractions from "./hooks/useMovieInteractions";
import useMovieFilters from "./hooks/useMovieFilters";

// Components
import Header from "./components/header";
import FilterBar from "./components/Filterbar";
import MovieList from "./components/movielist";
import BodyPiece from "./components/body";
import Footer from "./components/footer";

const App = () => {
  const { movies } = useMovieData();
  const { watchlist, liked, disliked, toggleWatchlist, toggleLike, toggleDislike } =
    useMovieInteractions();
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

  // null = closed, "watchlist" = watchlist panel, "liked" = liked panel
  const [sidebarView, setSidebarView] = useState(null);

  // Click same button = close, different button = switch
  function handleSidebarToggle(view) {
    setSidebarView((prev) => (prev === view ? null : view));
  }

  {/* DaisyUI loader goes here*/}

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header + Navbar */}
      <Header
        sidebarView={sidebarView}
        onSidebarToggle={handleSidebarToggle}
      />

      <div className="flex flex-1">
        {/* Main content area */}
        <main className="flex-1 px-6 py-4">
          {/* Filter and sort controls */}
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

          {/* Movie card grid */}
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

        {/* Sidebar — only renders when a view is selected */}
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

      {/* Footer goes here*/}
      <Footer />
      {/* Toast notifications (react-toastify) */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default App;