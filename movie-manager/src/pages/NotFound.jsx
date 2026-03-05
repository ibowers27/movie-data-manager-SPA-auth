/**
 * NotFound — 404 Error Page.
 *
 * Shown when the user navigates to a URL that doesn't exist
 * (e.g., /coming-soon).
 *  Button to navigate back to home
 */
import { Link } from "react-router-dom";
import { FaFilm } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#4b0e13] -mt-20 flex flex-col items-center justify-center px-6 text-center">
      <FaFilm className="text-[#be9859] text-7xl mb-6 relative" />

      <h1 className="text-9xl font-['Abril_Fatface',serif] text-[#be9859] mb-2 relative">
        404
      </h1>

      <h2 className="text-3xl font-bold text-white mb-4 relative">
        Page Not Found
      </h2>
      <p className="text-white max-w-md mb-8 text-lg relative">
        Looks like this page is missing.
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="btn bg-[#be9859] text-white border-none px-8 text-lg relative"
        >
          ← Back to Home
        </Link>
      </div>

      <p className="text-white/60 mt-12 text-sm">
        Error 404 — Page not found
      </p>
    </div>
  );
}