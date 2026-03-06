import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginWithEmail, registerWithEmail, resetPasswordWithEmail } from "../firebase/auth.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase.js";

export default function Authenticator() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    function handleEsc(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  // Email/password login
  async function handleLogin(interactedTarget) {
    interactedTarget.preventDefault();
    const result = await loginWithEmail(email, password);
    if (result.success) {
      alert("Login successful");
      navigate("/dashboard");
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);
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
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);
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
      navigate("/dashboard");
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);
      console.log("Logged in user:", user);
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
    setShowPassword(false);
    setIsModalOpen(false);
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
      <>
        <button
          type="button"
          className="btn btn-square btn-ghost"
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
          aria-controls="auth-modal"
          onClick={() => setIsModalOpen(true)}
        >
          <FaUserCircle className="text-2xl" />
        </button>

        {isModalOpen && (
          <div
            id="auth-modal"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-3 py-6 sm:py-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-label"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="mx-auto w-full max-w-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-col rounded-xl border border-base-300 bg-base-100 shadow-xl">
                <div className="flex items-center justify-between border-b border-base-300 px-4 py-3">
                  <h3 id="auth-modal-label" className="font-semibold text-base-content">
                    Account Access
                  </h3>
                  <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost"
                    aria-label="Close"
                    onClick={() => setIsModalOpen(false)}
                  >
                    x
                  </button>
                </div>

                <div className="max-h-[65vh] space-y-4 overflow-y-auto p-4">
                  <div>
                    <label htmlFor="auth-email" className="mb-2 block text-sm text-base-content">
                      Email
                    </label>
                    <input
                      id="auth-email"
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="auth-password" className="mb-2 block text-sm text-base-content">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="auth-password"
                        type={showPassword ? "text" : "password"}
                        className="input input-bordered w-full pr-12"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-base-content/70 hover:text-base-content"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-base-content/60">Password must be at least 6 characters.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-base-300 px-4 py-3">
                  <button type="button" className="btn bg-[#be9859] text-white" onClick={handleLogin}>
                    Log in
                  </button>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      className="btn btn-ghost border border-base-300"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost border border-base-300"
                      onClick={handleResetPassword}
                    >
                      Reset Password
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost border border-base-300"
                    onClick={handleGoogleLogin}
                  >
                    Login with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex-none flex items-center">
      <audio ref={audioRef} src="/public/totallyfordebug.MP3" style={{ display: "none" }} />
      {content}
    </div>
  );
}