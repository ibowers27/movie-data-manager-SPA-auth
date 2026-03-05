/**
 * Home — Guest landing page.
 *
 * Shown to users who are not logged in:
 *  - Simple navbar/header (Watchlist & Likes hidden w/ isGuest)
 *  - Banner with feature highlights
 *  - Limited genre filter (reuses FilterBar for preview of filtering capability)
 *  - Limited to 6 movie cards (reuses MovieCard with isGuest={true})
 *  - Premium ad linking to /coming-soon (triggers 404 page)
 */
import { Link } from "react-router-dom";
import { FaFilm, FaHeart, FaThumbsUp, FaFilter, FaFileExport } from "react-icons/fa";

// Reuse existing components and hooks
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

import useMovieData from "../hooks/useFetchMovies";
import useMovieFilters from "../hooks/useMovieFilters";

export default function Home() {
  // Reuse the same hook Dashboard uses
  const { movies } = useMovieData();

  const previewMovies = movies.slice(0, 6); // Show only first 6 movies for preview

  // Reuse filtering logic for the genre dropdown in the preview section
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
  } = useMovieFilters(previewMovies);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar w/ Watchlist/Likes buttons hidden for guests */}
      <Header sidebarView={null} onSidebarToggle={() => {}} isGuest={true} />

      {/* Banner */}
      <section className="bg-[#4b0e13] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Logo + Title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <FaFilm className="text-[#be9859] text-5xl" />
            <h1 className="text-6xl font-['Abril_Fatface',serif] text-[#be9859]">
              Golden Reel
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl text-white mb-4 max-w-2xl mx-auto">
            Your personal movie collection manager. Browse, rate, and curate your
            watchlist from our catalog of 50 diverse films.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-8 my-8 text-sm text-white">
            <div className="flex items-center gap-2">
              <FaHeart className="text-[#be9859]" />
              <span>Build your watchlist</span>
            </div>
            <div className="flex items-center gap-2">
              <FaThumbsUp className="text-[#be9859]" />
              <span>Like & dislike movies</span>
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-[#be9859]" />
              <span>Filter by genre, year & age</span>
            </div>
            <div className="flex items-center gap-2">
              <FaFileExport className="text-[#be9859]" />
              <span>Export your lists to CSV</span>
            </div>
          </div>

          <p className="text-[#be9859] mt-8 text-lg">
            Click the profile icon in the top right to log in or sign up.
          </p>
        </div>
      </section>

      {/* Movie Previews */}
      <section className="max-w-6xl mx-auto px-6 py-12 relative">
        <h2 className="text-3xl font-bold text-center mb-2 relative">
          Explore Our Collection
        </h2>
        <p className="text-center text-base-content mb-6">
          Here's a preview — sign up to browse all 50 movies, build watchlists, and rate films.
        </p>

        {/* Reuses FilterBar — dropdown options are limited to the 6 preview movies */}
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
          isGuest={true}
        />

        {/* Movie Previews, reuses MovieCard with isGuest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} isGuest={true} />
          ))}
        </div>

        {/* If filter returns nothing */}
        {sortedMovies.length === 0 && movies.length > 0 && (
          <div className="alert alert-warning my-8 relative">
            <span>No movies found for this genre in the preview. Try another or sign up to see all!</span>
          </div>
        )}

        {/* Premium Ad */}
        <div className="text-center mt-12 bg-white rounded-lg p-8 shadow-2xl border-2 border-[#be9859] relative z-10">
          <h3 className="text-2xl font-bold mb-2 text-black">
            Want the <i>golden</i> experience?
          </h3>
          <p className="text-black/80 mb-6 max-w-lg mx-auto">
            Subscribe to premium for advanced access to our movie collection,
            add movies to the site, rate movies out of 5 stars, and more
            exclusive features. Your cinematic journey awaits!
          </p>
          <Link
            to="/coming-soon" // Not a real page, will trigger 404
            className="btn bg-[#be9859] text-white border-none px-10 text-lg"
          >
            Go Premium
          </Link>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}