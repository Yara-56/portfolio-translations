import React, { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

export default function InlineVideoForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const videoId = useMemo(() => extractYouTubeId(youtubeUrl), [youtubeUrl]);
  const slug = useMemo(() => slugify(title), [title]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    if (!title.trim()) return setErr("Informe um título.");
    if (!videoId) return setErr("URL do YouTube inválida.");
    setSaving(true);

    const payload = {
      title: title.trim(),
      youtube_url: youtubeUrl.trim(),
      slug,
      published_at: new Date().toISOString(),
    };

    let resp;
    try {
      resp = await supabase.from("videos").insert(payload);
    } catch {
      setSaving(false);
      setErr("Falha na conexão com o banco.");
      return;
    }

    setSaving(false);

    if (!resp || resp.error) {
      setErr(resp?.error?.message || "Não foi possível salvar.");
      return;
    }

    setTitle(""); setYoutubeUrl("");
    onCreated?.();
  }

  return (
    <div className="mt-6 border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/10"><h3 className="font-semibold">Novo vídeo (YouTube)</h3></div>
      <form onSubmit={handleSubmit} className="p-4 grid md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <Field label="Título*" value={title} onChange={setTitle} placeholder="Ex.: Leitura comentada" required />
          <Field label="URL do YouTube*" value={youtubeUrl} onChange={setYoutubeUrl} placeholder="https://www.youtube.com/watch?v=..." required />
        </div>
        <div className="space-y-2">
          <label className="block text-sm mb-1">Pré-visualização</label>
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/30">
            {videoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-gray-400 text-sm">
                Cole uma URL válida do YouTube
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-2 flex items-center justify-end gap-3">
          {err && <span className="text-red-300 text-sm mr-auto">{err}</span>}
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold disabled:opacity-60">
            {saving ? "Salvando…" : "Adicionar vídeo"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, ...rest }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input className="w-full rounded-lg p-3 bg-black/30 border border-white/10" value={value} onChange={(e)=>onChange(e.target.value)} {...rest}/>
    </div>
  );
}
function extractYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  } catch { return null; }
}
function slugify(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,"");}
