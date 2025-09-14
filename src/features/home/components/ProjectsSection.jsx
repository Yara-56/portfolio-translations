import React, { useEffect, useState } from "react";
import { ProjectsApi } from "@/features/projects/api";
import InlineProjectForm from "@/components/InlineProjectForm";
import ProjectCard from "@/features/projects/components/ProjectCard";

export default function ProjectsSection({ isAdmin }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      setLoading(true);
      setItems(await ProjectsApi.list());
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { reload(); }, []);

  return (
    <>
      {isAdmin && <InlineProjectForm onCreated={reload} />}
      {loading ? (
        <p className="mt-3">Carregando projetos...</p>
      ) : items.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {items.map(p => <ProjectCard key={p.id} item={p} />)}
        </div>
      ) : (
        <p className="text-gray-300 mt-3">Nenhum projeto disponível.</p>
      )}
    </>
  );
}
