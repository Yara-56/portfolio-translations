import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useParams } from "react-router-dom";
import AdminProjectForm from "../components/AdminProjectForm";

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    supabase.from("projects").select("*").eq("id", id).single()
      .then(({ data }) => setData(data));
  }, [id]);

  const handleSave = async (form) => {
    const { error } = await supabase.from("projects").update(form).eq("id", id);
    if (!error) navigate("/admin");
  };

  if (!data) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Projeto</h1>
      <AdminProjectForm initialData={data} onSave={handleSave} />
    </div>
  );
}
