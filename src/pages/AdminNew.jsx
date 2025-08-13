import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminNew() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [visibility, setVisibility] = useState("public");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("projects").insert([
      {
        title,
        slug,
        visibility,
      },
    ]);

    if (error) {
      alert("Erro ao criar o projeto");
    } else {
      navigate("/admin"); // Redireciona para a página do admin após criar o projeto
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Novo Projeto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block">Visibilidade</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full p-2 border"
          >
            <option value="public">Público</option>
            <option value="private">Privado</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded"
        >
          Criar Projeto
        </button>
      </form>
    </div>
  );
}
