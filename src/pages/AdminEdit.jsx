import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (data) setProject(data);
    };
    loadProject();
  }, [id]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("projects")
      .update({
        title: project.title,
        slug: project.slug,
        visibility: project.visibility,
      })
      .eq("id", id);

    if (error) {
      alert("Erro ao atualizar o projeto");
    } else {
      navigate("/admin"); // Redireciona para a página do admin após atualizar
    }
  };

  if (!project) return <div>Carregando...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Editar Projeto</h1>
      <div className="mt-4">
        <label className="block">Título</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          className="w-full p-2 border"
        />
      </div>
      <div className="mt-4">
        <label className="block">Slug</label>
        <input
          type="text"
          value={project.slug}
          onChange={(e) => setProject({ ...project, slug: e.target.value })}
          className="w-full p-2 border"
        />
      </div>
      <div className="mt-4">
        <label className="block">Visibilidade</label>
        <select
          value={project.visibility}
          onChange={(e) =>
            setProject({ ...project, visibility: e.target.value })
          }
          className="w-full p-2 border"
        >
          <option value="public">Público</option>
          <option value="private">Privado</option>
        </select>
      </div>
      <button
        onClick={handleUpdate}
        className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded"
      >
        Atualizar Projeto
      </button>
    </div>
  );
}
