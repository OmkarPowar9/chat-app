import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { login } from "../services/auth";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentAuth) => {
      if (currentAuth !== null) {
        setCurrentUser(currentAuth);
      }
    });

    return () => unsub();
  }, []);

  async function userLogin(email, password) {
    try {
      const { user } = await login(email, password);
      setCurrentUser(user);
    } catch (e) {
      console.error(e);
    }
  }

  async function logoutUser() {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, userLogin, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, useAuth };
