// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext({
  isAdmin: false,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // quando abre o site, lê do localStorage
    const saved = localStorage.getItem("isAdmin");
    setIsAdmin(saved === "true");
  }, []);

  function signIn(password) {
    if (password === "Cauan1980") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: "Senha incorreta" };
  }

  function signOut() {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  }

  return (
    <AuthCtx.Provider value={{ isAdmin, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
