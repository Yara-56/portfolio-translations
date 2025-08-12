import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProjectView() {
  const { slug } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => {
    supabase.from("projects").select("*").eq("slug", slug).eq("visibility", "public").single()
      .then(({ data, error }) => {
        if (error) console.error(error);
        setP(data);
      });
  }, [slug]);

  if (!p) return <div className="max-w-4xl mx-auto p-6">Carregando…</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {p.cover_url && <img src={p.cover_url} alt="" className="w-full h-64 object-cover rounded-xl" />}
      <h1 className="mt-6 text-3xl font-bold">{p.title}</h1>
      <p className="text-gray-600 mt-1">{p.type} · {p.languages?.join?.(", ")} · {p.categories?.join?.(", ")}</p>
      <div className="prose mt-6 whitespace-pre-wrap">{p.description}</div>
    </div>
  );
}
