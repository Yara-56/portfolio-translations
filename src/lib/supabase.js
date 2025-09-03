// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

/**
 * Em projetos CRA/Webpack as envs vêm de process.env e PRECISAM
 * ter o prefixo REACT_APP_ para irem ao bundle.
 */
const URL = (process.env.REACT_APP_SUPABASE_URL || "").trim();
const ANON_KEY = (process.env.REACT_APP_SUPABASE_ANON_KEY || "").trim();

// Validação clara das variáveis de ambiente
if (!URL || !ANON_KEY) {
  const faltando = [
    !URL && "REACT_APP_SUPABASE_URL",
    !ANON_KEY && "REACT_APP_SUPABASE_ANON_KEY",
  ]
    .filter(Boolean)
    .join(", ");

  // Log útil no console para debug
  // (o throw impede o app de iniciar incompleto)
  // Dica: coloque as variáveis em .env.local e reinicie `npm start`.
  console.error(
    `Supabase não configurado. Falta(m): ${faltando}. ` +
      "Defina-as no arquivo .env.local."
  );
  throw new Error(`Supabase não configurado. Falta(m): ${faltando}`);
}

// Client oficial do Supabase (auth persiste e auto refresh)
export const supabase = createClient(URL, ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
  global: { headers: { apikey: ANON_KEY } },
});

// Exporte também os valores crus, caso precise em outros pontos
export const SUPABASE_URL = URL;
export const SUPABASE_ANON_KEY = ANON_KEY;

/**
 * Headers prontos para chamadas diretas ao PostgREST (fetch):
 *   fetch(`${SUPABASE_URL}/rest/v1/videos?select=*`, { headers: supabaseHeaders() })
 */
export function supabaseHeaders(extra = {}) {
  return {
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/**
 * Helper seguro para usar fetch com o PostgREST.
 * Sem exceções não tratadas: sempre retorna { data, error }.
 *
 * Ex:
 *   const { data, error } = await safeFetch(
 *     `/rest/v1/videos?select=id,title&order=published_at.desc&limit=20`
 *   );
 */
export async function safeFetch(path, init = {}) {
  try {
    const url =
      path.startsWith("http") ? path : `${SUPABASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

    const res = await fetch(url, {
      ...init,
      headers: supabaseHeaders(init.headers || {}),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => res.statusText);
      return { data: null, error: new Error(msg || `HTTP ${res.status}`) };
    }

    // Pode haver endpoints que retornam 204/empty
    const text = await res.text();
    const json = text ? JSON.parse(text) : null;
    return { data: json, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}

/**
 * Helper seguro usando o SDK supabase-js.
 * Ex:
 *   const { data, error } = await safeQuery("videos", "id,title", {
 *     order: ["published_at", false], // false = desc
 *     limit: 20,
 *   });
 */
export async function safeQuery(table, select = "*", opts = {}) {
  try {
    let q = supabase.from(table).select(select);

    if (opts.eq) {
      // eq: { coluna: valor }
      Object.entries(opts.eq).forEach(([col, val]) => {
        q = q.eq(col, val);
      });
    }

    if (opts.order) {
      const [col, ascending = true] = Array.isArray(opts.order)
        ? opts.order
        : [opts.order, true];
      q = q.order(col, { ascending });
    }

    if (opts.limit) q = q.limit(opts.limit);

    const { data, error } = await q;
    return { data: data ?? [], error: error ?? null };
  } catch (e) {
    return { data: [], error: e };
  }
}
