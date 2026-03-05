import { useState } from "react";

export default function MovieFilters(movies) {
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterAgeGroup, setFilterAgeGroup] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [sortBy, setSortBy] = useState("year-desc"); // default: newest first

  // Unique values for filter dropdowns (derived from data)
  const genres = [...new Set(movies.map((m) => m.genre))].sort();
  const ageGroups = [...new Set(movies.map((m) => m.age_group))];
  const years = [
    ...new Set(movies.map((m) => m.releasing_year.toString())),
  ].sort((a, b) => b - a);

  // Filter movies by genre, age group, and year
  const filteredMovies = movies.filter((movie) => {
    const genreMatch = filterGenre === "all" || movie.genre === filterGenre;
    const ageMatch =
      filterAgeGroup === "all" || movie.age_group === filterAgeGroup;
    const yearMatch =
      filterYear === "all" || movie.releasing_year.toString() === filterYear;
    return genreMatch && ageMatch && yearMatch;
  });

  // Sort filtered results (default: year newest to oldest)
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "year-desc":
        return b.releasing_year - a.releasing_year;
      case "year-asc":
        return a.releasing_year - b.releasing_year;
      case "rating-desc":
        return b.imdb_rating - a.imdb_rating;
      case "rating-asc":
        return a.imdb_rating - b.imdb_rating;
      case "runtime-desc":
        return parseInt(b.runtime) - parseInt(a.runtime);
      case "runtime-asc":
        return parseInt(a.runtime) - parseInt(b.runtime);
      default:
        return b.releasing_year - a.releasing_year;
    }
  });

  return {
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
  };
}