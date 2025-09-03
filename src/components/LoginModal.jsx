// src/components/LoginModal.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginModal({ open, onClose }) {
  const { signIn } = useAuth();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const resp = await signIn(password);
    const { success = false, error = null } = resp || {};
    setBusy(false);

    if (success) {
      setPassword("");
      onClose?.();
    } else {
      setErr(error || "Não foi possível entrar.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-xl font-bold mb-4">Entrar</h3>
        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full border rounded-lg p-2"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg py-2 font-semibold bg-yellow-400 disabled:opacity-60"
          >
            {busy ? "Entrando…" : "Entrar"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
