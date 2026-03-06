import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { loginWithEmail, registerWithEmail, resetPasswordWithEmail } from "../firebase/auth.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase.js";

export default function Authenticator() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const audioRef = React.useRef(null);

  // Firebase Auth instance and Google provider
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  // Email/password login
  async function handleLogin(interactedTarget) {
    interactedTarget.preventDefault();
    const result = await loginWithEmail(email, password);
    if (result.success) {
      alert("Login successful");
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } else {
      alert(result.message);
    }
  }

  // Email/password registration
  async function handleRegister(interactedTarget) {
    interactedTarget.preventDefault();
    const result = await registerWithEmail(email, password);
    if (result.success) {
      alert("Registration successful");
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } else {
      alert(result.message);
    }
  }

  async function handleResetPassword(interactedTarget) {
    interactedTarget.preventDefault();
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    const result = await resetPasswordWithEmail(email);
    if (result.success) {
      alert("Password reset email sent.");
    } else {
      alert(result.message);
    }
  }

  // Google popup authentication
  async function handleGoogleLogin(interactedTarget) {
    interactedTarget.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in user:", user);
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Failed to login with Google: " + error.message);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Google sign-out error:", error);
      alert("Failed to sign out: " + error.message);
    }
    setEmail("");
    setPassword("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    navigate("/");
  }

  let content;
  if (currentUser) {
    content = (
      <>
        <span className="font-semibold mr-3">{currentUser.displayName || currentUser.email}</span>
        <button className="btn bg-[#be9859] text-white" onClick={handleLogout}>
          Logout
        </button>
      </>
    );
  } else {
    content = (
      <details className="dropdown dropdown-end">
        <summary className="btn btn-square btn-ghost">
          <FaUserCircle className="text-2xl" />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-80 p-4 shadow-sm mt-2">
          
          <li className="mb-3">
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-base-content/50 mt-1">
              Enter your email
            </p>
          </li>

          
          <li className="mb-3">
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-base-content/50 mt-1">
              Password Must be at least 6 characters
            </p>
          </li>

          <li>
            <button className="btn bg-[#be9859] w-full" onClick={handleLogin}>
              Log in
            </button>
          </li>

          <li className="mt-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                className="btn btn-ghost border border-base-300 w-full active:bg-neutral active:text-neutral-content active:border-neutral"
                onClick={handleRegister}
              >
                Register
              </button>
              <button
                className="btn btn-ghost border border-base-300 w-full active:bg-neutral active:text-neutral-content active:border-neutral"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </li>

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