import { useState } from "react";
import { toast } from "react-toastify";

export default function MovieInteractions() {
  const [watchlist, setWatchlist] = useState([]);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);

  // Toggle watchlist — toast outside setter to avoid StrictMode double-fire
  function toggleWatchlist(movieTitle) {
    const isRemoving = watchlist.includes(movieTitle);
    if (isRemoving) {
      toast.info(`Removed "${movieTitle}" from watchlist`);
      setWatchlist((prev) => prev.filter((t) => t !== movieTitle));
    } else {
      toast.success(`Added "${movieTitle}" to watchlist`);
      setWatchlist((prev) => [...prev, movieTitle]);
    }
  }

  // Toggle like — removes dislike if switching
  function toggleLike(movieTitle) {
    if (liked.includes(movieTitle)) {
      setLiked((prev) => prev.filter((t) => t !== movieTitle));
      return;
    }
    setDisliked((prev) => prev.filter((t) => t !== movieTitle));
    setLiked((prev) => [...prev, movieTitle]);
  }

  // Toggle dislike — removes like if switching
  function toggleDislike(movieTitle) {
    if (disliked.includes(movieTitle)) {
      setDisliked((prev) => prev.filter((t) => t !== movieTitle));
      return;
    }
    setLiked((prev) => prev.filter((t) => t !== movieTitle));
    setDisliked((prev) => [...prev, movieTitle]);
  }

  return { watchlist, liked, disliked, toggleWatchlist, toggleLike, toggleDislike };
}