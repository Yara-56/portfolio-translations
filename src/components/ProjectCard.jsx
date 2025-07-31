import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "250px" }}>
      <h3>{project.title}</h3>
      <p><strong>De:</strong> {project.sourceLang}</p>
      <p><strong>Para:</strong> {project.targetLang}</p>
      <p><strong>Categoria:</strong> {project.category}</p>
      <Link to={`/edit/${project.id}`}>
        <button>Editar</button>
      </Link>
    </div>
  );
}
