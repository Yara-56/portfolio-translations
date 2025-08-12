import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase.from("projects").select("*").order("updated_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setProjects(data || []);
      });
  }, [session]);

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold">Login do Editor</h1>
        <button
          className="mt-6 px-4 py-2 border rounded"
          onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel de Projetos</h1>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => supabase.auth.signOut()}
        >
          Sair
        </button>
      </div>

      <Link to="/admin/new" className="inline-block mt-6 underline">
        Novo Projeto
      </Link>

      <ul className="mt-6 divide-y">
        {projects.map((p) => (
          <li key={p.id} className="py-4 flex justify-between">
            <div>
              <h2 className="font-medium">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.slug} · {p.visibility}</p>
            </div>
            <Link to={`/admin/edit/${p.id}`} className="underline">Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
