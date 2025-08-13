import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddTranslation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("tech"); // Categoria
  const [file, setFile] = useState(null); // Arquivo PDF
  const [textContent, setTextContent] = useState(""); // Texto direto
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let fileUrl = "";
    if (file) {
      // Envio do PDF para o Supabase Storage
      const { data, error } = await supabase.storage
        .from("translations") // Criar bucket de traduções
        .upload(`translations/${Date.now()}_${file.name}`, file);
      
      if (error) {
        console.error("Erro ao fazer upload do arquivo:", error);
        setLoading(false);
        return;
      }

      fileUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
    }

    // Adicionando a tradução no banco de dados
    const { error } = await supabase
      .from("translations")
      .insert([
        {
          title,
          description,
          category,
          file_url: fileUrl,
          text_content: textContent,
        },
      ]);

    if (error) {
      console.error("Erro ao adicionar tradução:", error);
      setLoading(false);
      return;
    }

    setSuccessMessage("Tradução adicionada com sucesso!");
    setLoading(false);
    setTitle("");
    setDescription("");
    setCategory("tech");
    setFile(null);
    setTextContent("");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Adicionar Tradução</h1>

      {successMessage && <p className="text-green-400 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-md"
          >
            <option value="tech">Textos Técnicos</option>
            <option value="academic">Textos Acadêmicos</option>
            <option value="literary">Textos Literários</option>
            <option value="subtitling">Legendagem</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Arquivo PDF</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="w-full p-3 bg-gray-800 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Texto (opcional)</label>
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-md"
            placeholder="Ou insira o texto diretamente aqui"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-yellow-400 text-black rounded-md"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Adicionar Tradução"}
        </button>
      </form>
    </div>
  );
}
