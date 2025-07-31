import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Traduções Cadastradas</h2>

      <div style={{ margin: "1rem 0" }}>
        <Link to="/edit">
          <button>+ Novo Projeto</button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>Nenhuma tradução cadastrada ainda.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
