import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Portfólio de Traduções</h1>
      <p>Bem-vindo ao portfólio. Aqui você pode visualizar e gerenciar suas traduções.</p>
      <Link to="/projects">
        <button>Ver Projetos</button>
      </Link>
    </div>
  );
}
