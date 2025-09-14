import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) throw error;
      navigate("/admin");
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold">Login de Administrador</h1>
      <button
        className="mt-6 px-4 py-2 border rounded"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Carregando..." : "Entrar com Google"}
      </button>
    </div>
  );
}
