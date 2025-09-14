import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectsApi } from "@/features/projects/api";
import ProjectCard from "@/features/projects/components/ProjectCard";

export default function FeaturedSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setItems(await ProjectsApi.featured());
      } catch {
        setErr("Não foi possível carregar os destaques.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="relative z-10 px-4 w-full max-w-6xl mx-auto pb-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Destaques</h2>
        <Link to="/projects" className="text-yellow-400 hover:underline">Ver todos</Link>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1,2,3,4].map(i => <div key={i} className="h-48 rounded-xl bg-white/10 animate-pulse" />)}
        </div>
      ) : err ? (
        <p className="text-red-300">{err}</p>
      ) : items.length === 0 ? (
        <p className="text-gray-300">Sem destaques por enquanto.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(item => <ProjectCard key={item.id} item={item} />)}
        </div>
      )}
    </section>
  );
}
