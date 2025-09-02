import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Verificação das variáveis de ambiente
if (!url || !key) {
  console.error(
    "Supabase: variáveis ausentes. Defina REACT_APP_SUPABASE_URL e REACT_APP_SUPABASE_ANON_KEY no .env.local."
  );
  // Se as variáveis estiverem ausentes, garantimos que o supabase não seja inicializado
  throw new Error("Supabase não configurado corretamente.");
}

export const supabase = createClient(url, key); // Não precisa mais do ternário aqui, pois o erro já será lançado
