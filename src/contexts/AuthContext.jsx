// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// ⚠️ Troque a senha aqui ou use variável de ambiente:
const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS || "Cauan1980";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // restaura do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("isAdmin");
    setIsAdmin(saved === "true");
  }, []);

  const signIn = async (password) => {
    if (!ADMIN_PASS) {
      return { success: false, error: "ADMIN_PASS não configurada." };
    }
    if (String(password) === String(ADMIN_PASS)) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return { success: true };
    }
    return { success: false, error: "Senha incorreta." };
  };

  const signOut = async () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    return { success: true };
  };

  const value = useMemo(() => ({ isAdmin, signIn, signOut }), [isAdmin]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (ctx) return ctx;
  // fallback seguro se esquecer do Provider
  return {
    isAdmin: false,
    signIn: async () => ({ success: false, error: "AuthProvider ausente." }),
    signOut: async () => ({ success: true }),
  };
}
