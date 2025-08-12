// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const url =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  process.env.REACT_APP_SUPABASE_URL;

const key =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
  process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!url || !key) {
  // Não lançar erro — só avisa e exporta null para não derrubar a UI
  console.error(
    "Supabase: variáveis ausentes. Defina REACT_APP_SUPABASE_URL e REACT_APP_SUPABASE_ANON_KEY no .env.local (CRA) ou VITE_SUPABASE_* (Vite)."
  );
}

export const supabase = url && key ? createClient(url, key) : null;
