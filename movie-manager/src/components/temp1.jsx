import React from "react";
import DisplayManager from "./DisplayManager.jsx";

const BodyPiece = ({ sidebarView, watchlist, liked, onRemoveWatchlist, onRemoveLike, movies }) => {
  return (
    <aside className="w-80 shrink-0 p-4 pt-8 border-l border-base-300 bg-base-100/90">
      <DisplayManager
        sidebarView={sidebarView}
        watchlist={watchlist}
        liked={liked}
        onRemoveWatchlist={onRemoveWatchlist}
        onRemoveLike={onRemoveLike}
        movies={movies}
      />
    </aside>
  );
};

export default BodyPiece;