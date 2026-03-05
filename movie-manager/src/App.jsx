import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/firebase";
import "./App.css";

import MainRoute from "./pages/MainRoute";

export default function App() {
  const [user, setUser] = useState(null);

  // This should controlling the authentication state of the user across the app???
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <MainRoute user={user} />
    </BrowserRouter>
  );
}