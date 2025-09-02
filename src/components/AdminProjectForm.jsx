import { useState } from "react";
import { supabase } from "../lib/supabase";  // Certifique-se de que o supabase está corretamente importado

export default function AdminProjectForm({ initialData = {}, onSave }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    type: initialData.type || "",
    description: initialData.description || "",
    visibility: initialData.visibility || "public",
  });

  const [loading, setLoading] = useState(false);  // Para controle de carregamento
  const [errorMessage, setErrorMessage] = useState("");  // Para mensagens de erro
  const [successMessage, setSuccessMessage] = useState("");  // Para mensagens de sucesso

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Inicia o estado de carregamento
    setLoading(true);
    setErrorMessage("");  // Limpa qualquer erro anterior
    setSuccessMessage("");  // Limpa qualquer mensagem de sucesso anterior

    try {
      // Chama o Supabase para salvar ou atualizar o projeto
      const { data, error } = await supabase
        .from("projects")
        .upsert([
          {
            id: initialData.id,  // Se o projeto já existir, ele será atualizado. Se não, será inserido.
            title: form.title,
            slug: form.slug,
            type: form.type,
            description: form.description,
            visibility: form.visibility,
          }
        ]);

      if (error) {
        throw error;  // Lança erro para ser capturado no catch
      }

      // Se não houver erro, mostra a mensagem de sucesso e os dados do projeto
      setSuccessMessage(`Projeto "${data[0].title}" atualizado com sucesso!`);
      console.log("Dados do projeto atualizado:", data);
      
      // Opcional: Chamar onSave, caso você queira propagar para um componente pai
      if (onSave) onSave(data[0]);

    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro
      console.error("Erro ao salvar o projeto:", error);
      setErrorMessage("Erro ao salvar o projeto. Tente novamente.");
    } finally {
      // Finaliza o estado de carregamento
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      {/* Exibindo mensagens de erro ou sucesso */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      <div>
        <label>Título</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full border px-3 py-2"
        />
      </div>
      <div>
        <label>Slug</label>
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="w-full border px-3 py-2"
        />
      </div>
      <div>
        <label>Tipo</label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Tipo"
          className="w-full border px-3 py-2"
        />
      </div>
      <div>
        <label>Descrição</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border px-3 py-2"
        />
      </div>
      <div>
        <label>Visibilidade</label>
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
      </div>

      {/* Botão de envio com controle de carregamento */}
      <button 
        type="submit" 
        className={`px-4 py-2 border rounded bg-green-500 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
        disabled={loading}
      >
        {loading ? "Carregando..." : "Salvar"}
      </button>
    </form>
  );
}
