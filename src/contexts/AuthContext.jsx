// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // CRA: use somente process.env.REACT_APP_*
  const ADMIN_EMAIL = (process.env.REACT_APP_ADMIN_EMAIL || "").toLowerCase();

  // Carrega sessão atual e escuta mudanças
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data?.session ?? null);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s ?? null);
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const user = session?.user ?? null;
  const email = (user?.email || "").toLowerCase();
  const isAdmin = !!user && (!!ADMIN_EMAIL ? email === ADMIN_EMAIL : true);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e) {
      return { success: false, error: "Erro ao iniciar login com Google." };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch {
      return { success: false, error: "Erro ao sair." };
    }
  };

  const value = useMemo(
    () => ({ loading, session, user, isAdmin, signInWithGoogle, signOut }),
    [loading, session, user, isAdmin]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (ctx) return ctx;
  // Fallback seguro se esquecer do provider
  return {
    loading: false,
    session: null,
    user: null,
    isAdmin: false,
    signInWithGoogle: async () => ({ success: false, error: "AuthProvider ausente." }),
    signOut: async () => ({ success: true }),
  };
}
