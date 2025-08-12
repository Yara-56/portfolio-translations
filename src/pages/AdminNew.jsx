import AdminProjectForm from "../components/AdminProjectForm";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminNew() {
  const navigate = useNavigate();

  const handleSave = async (form) => {
    const { error } = await supabase.from("projects").insert([form]);
    if (!error) navigate("/admin");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Novo Projeto</h1>
      <AdminProjectForm onSave={handleSave} />
    </div>
  );
}
