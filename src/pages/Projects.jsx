import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("projects")
        .select("id, slug, title, cover_url, type, languages, categories, updated_at")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar projetos:", error);
        setError("Não foi possível carregar os projetos.");
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8">Projetos</h1>

        {/* Estado de carregamento */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-white/10 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Erro */}
        {!loading && error && (
          <p className="text-red-300">{error}</p>
        )}

        {/* Lista */}
        {!loading && !error && projects.length === 0 && (
          <p className="text-gray-400">Nenhum projeto encontrado.</p>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition block bg-white/5"
              >
                {project.cover_url && (
                  <img
                    src={project.cover_url}
                    alt={`Capa do projeto ${project.title}`}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {project.type}
                    {Array.isArray(project.languages) && project.languages.length
                      ? ` · ${project.languages.join(", ")}`
                      : ""}
                    {Array.isArray(project.categories) && project.categories.length
                      ? ` · ${project.categories.join(", ")}`
                      : ""}
                  </p>
                  {project.updated_at && (
                    <p className="text-xs text-gray-400 mt-2">
                      Atualizado em{" "}
                      {new Date(project.updated_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
