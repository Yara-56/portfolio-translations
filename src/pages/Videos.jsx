import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../contexts/AuthContext";

export default function Videos() {
  const { isAdmin } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase
      .from("videos")
      .select("id, title, youtube_url, slug, published_at")
      .order("published_at", { ascending: false });
    if (error) setErr("Não foi possível carregar os vídeos.");
    setVideos(data || []);
    setLoading(false);
  }

  function getId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      return m ? m[1] : null;
    } catch { return null; }
  }

  function thumb(url) {
    const id = getId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }

  function askDelete(v) { setToDelete(v); setConfirmOpen(true); }
  async function doDelete() {
    if (!toDelete) return;
    await supabase.from("videos").delete().eq("id", toDelete.id);
    setToDelete(null);
    load();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">Vídeos</h1>
          <Link to="/" className="text-yellow-400 hover:underline">← Voltar</Link>
        </div>

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-video rounded-xl bg-white/10 animate-pulse" />)}
          </div>
        )}

        {!loading && err && <p className="text-red-300">{err}</p>}

        {!loading && !err && videos.length === 0 && (
          <p className="text-gray-400">Nenhum vídeo encontrado.</p>
        )}

        {!loading && !err && videos.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map(v => {
              const t = thumb(v.youtube_url);
              return (
                <div key={v.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <Link to={`/videos/${v.slug || v.id}`}>
                    <div className="aspect-video w-full bg-black/30">
                      {t ? (
                        <img src={t} alt={v.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-gray-400 text-sm">Sem preview</div>
                      )}
                    </div>
                  </Link>
                  <div className="p-3 flex items-center justify-between gap-3">
                    <Link to={`/videos/${v.slug || v.id}`} className="font-semibold hover:text-yellow-300">
                      {v.title}
                    </Link>
                    {isAdmin && (
                      <button onClick={() => askDelete(v)} className="text-sm px-3 py-1 rounded bg-red-500/80">
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Excluir vídeo?"
        description={toDelete ? `“${toDelete.title}” será removido.` : "Tem certeza?"}
        variant="danger"
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={doDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}
