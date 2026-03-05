import React from "react";
import ExportCSV from "./Export.jsx";

function WatchlistPanel({ items, onRemove, allMovies }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-2 text-base-content">Watchlist</h2>
      <div className="h-125 overflow-y-auto bg-base-100 rounded-lg shadow p-2 flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="text-base-content/50 text-center py-8">
            No movies watchlisted yet
          </div>
        ) : (
          items.map((title) => (
            <div key={title} className="card card-compact bg-base-200 shadow-sm">
              <div className="card-body flex-row items-center justify-between py-2 px-3">
                <span className="text-sm">{title}</span>
                {/* btn-error = dark red (#7f2d31) */}
                <button
                  className="btn btn-xs bg-[#7f2d31] text-white"
                  onClick={() => onRemove(title)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 flex justify-end">
        <ExportCSV movies={allMovies} watchlist={items} list="watchlist" />
      </div>
    </section>
  );
}

function LikedPanel({ items, onRemove, allMovies }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-2 text-base-content">Liked Movies</h2>
      <div className="h-125 overflow-y-auto bg-base-100 rounded-lg shadow p-2 flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="text-base-content/50 text-center py-8">
            No liked movies yet
          </div>
        ) : (
          items.map((title) => (
            <div key={title} className="card card-compact bg-base-200 shadow-sm">
              <div className="card-body flex-row items-center justify-between py-2 px-3">
                <span className="text-sm">{title}</span>
                {/* btn-error = dark red (#7f2d31) */}
                <button
                  className="btn btn-xs bg-[#7f2d31] text-white"
                  onClick={() => onRemove(title)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 flex justify-end">
        <ExportCSV movies={allMovies} liked={items} list="liked" />
      </div>
    </section>
  );
}

export default function DisplayManager({
  sidebarView,
  watchlist,
  liked,
  onRemoveWatchlist,
  onRemoveLike,
  movies: allMovies,
}) {
  // Show the panel that matches the current sidebarView
  if (sidebarView === "watchlist") {
    return (
      <WatchlistPanel items={watchlist} onRemove={onRemoveWatchlist} allMovies={allMovies} />
    );
  }

  if (sidebarView === "liked") {
    return <LikedPanel items={liked} onRemove={onRemoveLike} allMovies={allMovies} />;
  }

  return null;
}