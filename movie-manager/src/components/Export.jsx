import { useState } from "react";

export default function ExportCSV({ movies = [], watchlist = [], liked = [], list = "watchlist" }) {
  // loading state for button
  const [loading, setLoading] = useState(false);

  // decide which array of titles we're exporting
  const titles = list === "liked" ? liked : watchlist;
  // look up the full movie object for each title; filter out any missing
  const rows = titles.map(t => movies.find(m => m.title === t)).filter(Boolean);

  // fctn to create csv and trigger download on btn click
  function downloadCSV() {
    if (!rows.length) return; // nothing to export
    // grab property names from the first movie to use as CSV headers
    const keys = Object.keys(rows[0]);
    // convert array of objects to CSV string
    const csv = [keys.join(",")]
      .concat(
        rows.map(r =>
          keys
            .map(k => `"${(r[k] ?? "").toString().replace(/"/g, '""')}"`)
            .join(",")
        )
      )
      .join("\n");
    // create a blob and temporary anchor element to download it
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${list}-movies.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // release object URL
    URL.revokeObjectURL(url);
  }

  // click handler to simulate loading
  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      downloadCSV();
      setLoading(false);
    }, 1500);
  }

  return (
    <button
      className="btn bg-[#7f2d31] text-white relative z-10 flex items-center"
      onClick={handleClick}
    >
      Export {list} CSV
      {loading && <span className="loading loading-spinner loading-md ml-2"></span>}
    </button>
  );
}