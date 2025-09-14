import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VideosApi } from "@/features/videos/api";
import InlineVideoForm from "@/components/InlineVideoForm";
import { extractYouTubeId } from "@/shared/utils/youtube";

export default function VideosSection({ isAdmin }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      setLoading(true);
      setItems(await VideosApi.list());
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { reload(); }, []);

  return (
    <>
      {isAdmin && <InlineVideoForm onCreated={reload} />}
      {loading ? (
        <p className="mt-3">Carregando vídeos...</p>
      ) : items.length ? (
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {items.map((v) => {
            const vid = extractYouTubeId(v.youtube_url);
            return (
              <div key={v.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <Link to={`/videos/${v.slug || v.id}`}>
                  <div className="aspect-video w-full bg-black/30">
                    {vid ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${vid}`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-gray-400 text-sm">
                        URL inválida
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/videos/${v.slug || v.id}`} className="font-semibold hover:text-yellow-300">
                    {v.title}
                  </Link>
                  {v.published_at && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(v.published_at).toLocaleDateString("pt-BR", { day:"2-digit", month:"short", year:"numeric" })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-300 mt-3">Nenhum vídeo disponível.</p>
      )}
    </>
  );
}
