import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminProjectForm({ initialData = {}, onSave }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    type: initialData.type || "",
    description: initialData.description || "",
    visibility: initialData.visibility || "public",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Título"
        className="w-full border px-3 py-2"
      />
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full border px-3 py-2"
      />
      <input
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Tipo"
        className="w-full border px-3 py-2"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descrição"
        className="w-full border px-3 py-2"
      />
      <select
        name="visibility"
        value={form.visibility}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      >
        <option value="public">Público</option>
        <option value="private">Privado</option>
        <option value="unlisted">Não listado</option>
      </select>

      <button type="submit" className="px-4 py-2 border rounded bg-green-500 text-white">
        Salvar
      </button>
    </form>
  );
}
