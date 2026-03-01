import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { validateLogin } from "./authenticator";
// Firebase authentication using google auth
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// Added: Firebase app instance from your initialized config
import { app } from "../firebase/firebase.js";

export default function Authenticator() {
  // useState hooks to track user input and login status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const audioRef = React.useRef(null);
  //Google provider
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Handle login with username and password
  function handleLogin(interactedTarget) {
    interactedTarget.preventDefault();
    const result = validateLogin(username, password);
    alert(result.message);
    if (result.Login) {
      setIsLoggedIn(true);
      setDisplayName(username);
      if (username === "thien" && password === "thien" && audioRef.current) {
        audioRef.current.play();
      }
    }
  }

  //Google popup auth
  async function handleGoogleLogin(interactedTarget) {
    interactedTarget.preventDefault();
    try {
      // pop up using google provider authenticator 
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setIsLoggedIn(true);
      setDisplayName(user.displayName || "Google User");
      console.log("Logged in user:", user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Failed to login with Google: " + error.message);
    }
  }

  // Reset fields on logout
  async function handleLogout() {
    try {
      await signOut(auth);
    } catch {
      // ignore sign out errors and still reset local state
    }
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setDisplayName("");
    //stop and restart audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  let content;
  if (isLoggedIn) {
    // Logged-in view: display name + logout button
    content = (
      <>
        <span className="font-semibold mr-3">{displayName}</span>
        {/* btn-error = dark red (#7f2d31) */}
        <button className="btn bg-[#be9859] text-white" onClick={handleLogout}>
          Logout
        </button>
      </>
    );
  } else {
    // Logged-out view: profile icon dropdown with login form
    content = (
      <details className="dropdown dropdown-end">
        <summary className="btn btn-square btn-ghost">
          {/* Profile icon instead of hamburger menu */}
          <FaUserCircle className="text-2xl" />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-80 p-4 shadow-sm mt-2">
          {/* Username input */}
          <li className="mb-3">
            <input
              type="text"
              className="input w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-xs text-base-content/50 mt-1">
              Must be at least 5 characters
            </p>
          </li>

          {/* Password input */}
          <li className="mb-3">
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-base-content/50 mt-1">
              Must be at least 5 characters
            </p>
          </li>

          {/* Login button */}
          <li>
            <button className="btn bg-[#be9859] w-full" onClick={handleLogin}>
              Log in
            </button>
          </li>

          {/* Google login */}
          <li className="mt-3">
            <button
              className="btn btn-ghost border border-base-300 w-full"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </li>
        </ul>
      </details>
    );
  }

  return (
    <div className="flex-none flex items-center">
      <audio ref={audioRef} src="/public/totallyfordebug.MP3" style={{ display: "none" }} />
      {content}
    </div>
  );
}