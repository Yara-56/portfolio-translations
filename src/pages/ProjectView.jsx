import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProjectView() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Erro ao buscar projeto:", error);
        setError("Projeto não encontrado.");
      } else {
        setProject(data);
      }

      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Carregando projeto...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-300">
        <p>{error}</p>
        <Link to="/" className="mt-4 text-yellow-400 hover:underline">
          Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Capa */}
        {project.cover_url && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={project.cover_url}
              alt={`Capa do projeto ${project.title}`}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Título */}
        <h1 className="text-3xl font-extrabold mb-4">{project.title}</h1>

        {/* Metadados */}
        <div className="text-gray-400 text-sm mb-6 space-y-1">
          {project.type && <p><span className="text-gray-200">Tipo:</span> {project.type}</p>}
          {project.languages?.length > 0 && (
            <p><span className="text-gray-200">Idiomas:</span> {project.languages.join(", ")}</p>
          )}
          {project.categories?.length > 0 && (
            <p><span className="text-gray-200">Categorias:</span> {project.categories.join(", ")}</p>
          )}
          {project.updated_at && (
            <p>
              <span className="text-gray-200">Última atualização:</span>{" "}
              {new Date(project.updated_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Conteúdo */}
        {project.content ? (
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed">
              {project.content}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">Este projeto ainda não possui descrição detalhada.</p>
        )}

        {/* Voltar */}
        <div className="mt-10">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
          >
            ← Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
