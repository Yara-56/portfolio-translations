import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function VideoView() {
  const { slug } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);

      // tenta por slug; se falhar, tenta por id (fallback)
      let qry = supabase.from("videos").select("*").eq("slug", slug).single();
      let { data, error } = await qry;
      if (error) {
        const byId = await supabase.from("videos").select("*").eq("id", slug).single();
        data = byId.data; error = byId.error;
      }

      if (error || !data) setErr("Vídeo não encontrado.");
      else setVideo(data);
      setLoading(false);
    }
    load();
  }, [slug]);

  function extractId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      return m ? m[1] : null;
    } catch { return null; }
  }

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-gray-300">Carregando vídeo…</div>;
  }
  if (err) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-300">
        <div className="text-center">
          <p>{err}</p>
          <Link to="/videos" className="mt-3 inline-block text-yellow-400 hover:underline">← Voltar para vídeos</Link>
        </div>
      </div>
    );
  }

  const vid = extractId(video.youtube_url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/videos" className="text-yellow-400 hover:underline">← Voltar</Link>
        <h1 className="text-3xl font-extrabold mt-3 mb-4">{video.title}</h1>
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/30">
          {vid ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${vid}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-gray-400">URL inválida</div>
          )}
        </div>
        {video.published_at && (
          <p className="text-gray-400 text-sm mt-3">
            Publicado em{" "}
            {new Date(video.published_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
