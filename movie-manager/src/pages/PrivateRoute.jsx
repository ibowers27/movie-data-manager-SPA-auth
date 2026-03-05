/**
 * PrivateRoute — Wrapper for pages that require authentication.
 *
 * If the user is logged in, renders the child page.
 * If not, redirects to the /unauthorized (401) page.
 */
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}