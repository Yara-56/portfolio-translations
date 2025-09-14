const BASE = process.env.REACT_APP_API_BASE || "/api";

export async function http(path, init) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init && init.headers) },
    cache: "no-store",
  });
  if (!res.ok) {
    let msg = "";
    try { msg = await res.text(); } catch {}
    throw new Error(msg || `HTTP ${res.status} em ${path}`);
  }
  return res.status === 204 ? null : res.json();
}
