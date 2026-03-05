/**
 * Unauthorized — 401 Error Page.
 *
 * Shown when a user tries to access a protected page (Dashboard)
 * without being logged in.
 * Button to go home
 */
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#4b0e13] -mt-20 flex flex-col items-center justify-center px-6 text-center">
      {/* Lock icon */}
      <div className="p-6 mb-6">
        <FaLock className="text-[#be9859] text-5xl relative" />
      </div>

      <h1 className="text-9xl font-['Abril_Fatface',serif] text-[#be9859] mb-2 relative">
        401
      </h1>

      <h2 className="text-3xl font-bold text-white mb-4 relative">
        Access Denied
      </h2>
      <p className="text-white max-w-md mb-4 text-lg relative">
        You need to be logged in to view this page.
        Please log in or create an account to access your dashboard.
      </p>

      {/* What they're missing */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-white relative">
        <span className="badge badge-outline border-white text-white">Browse 50 movies</span>
        <span className="badge badge-outline border-white text-white">Build watchlists</span>
        <span className="badge badge-outline border-white text-white">Rate & review</span>
        <span className="badge badge-outline border-white text-white">Export to CSV</span>
      </div>

      <div className="flex gap-4">
        <Link
        to="/"
        className="btn bg-[#be9859] text-white border-none px-8 text-lg relative"
      >
        ← Back to Home
      </Link>
      </div>

      <p className="text-white/60 mt-8 text-sm">
        Error 401 — Authentication required
      </p>
    </div>
  );
}