import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function useMovieData() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie data once on mount
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/movie.json");
        if (!response.ok) throw new Error("Failed to load movie data.");

        const data = await response.json();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovies([]);
        toast.error("Could not load movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return { movies, isLoading, error };
}