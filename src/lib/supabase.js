import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error(
    "Supabase: variáveis ausentes. Defina REACT_APP_SUPABASE_URL e REACT_APP_SUPABASE_ANON_KEY no .env.local."
  );
}

export const supabase = url && key ? createClient(url, key) : null;
